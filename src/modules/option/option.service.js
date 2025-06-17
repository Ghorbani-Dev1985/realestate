const autoBind = require("auto-bind");
const OptionModel = require("./option.model");
const CategoryModel = require("./../category/category.model");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const OptionMessage = require("./option.message");
const { default: slugify } = require("slugify");

class OptionService {
  #model;
  constructor(){
    autoBind(this);
    this.#model = OptionModel;
  }
  async find(){
    const options = await this.#model.find({} , {__v:0} , {sort: {_id: -1}}).populate([{path: "category", select: {name: 1, slug: 1}}]);
    return options;
  }

  async create(OptionDto) {
     const category = await this.checkExistById(OptionDto.category);
     OptionDto.category = category._id;
     OptionDto.key= slugify(OptionDto.key , {trim: true, replacement: "_" , lower: true});
     await this.alreadyExistByCategoryAndKey(OptionDto.key , category._id);
     if(OptionDto.enum && typeof OptionDto.enum === "string"){
        OptionDto.enum = OptionDto.enum.split(",")
     }else if(Array.isArray(OptionDto.enum)) OptionDto.enum = [];
     const option = await this.#model.create(OptionDto);
     return option;
  }
  async findById(id){
    return await this.checkExistById(id)
  }
  async removeById(id){
    await this.checkExistById(id);
   return await this.#model.deleteOne({_id: id});
  }
  async findByCategoryId(category){
    return await this.#model.findOne({category}, {__v: 0}).populate([{path: "category", select: {name: 1, slug: 1}}]);
  }
  async findByCategorySlug(slug){
    const options = await this.#model.aggregate([
      {
        $lookup: {
        from:  "categories",
        localField: "category",
        foreignField: "_id",
        as: "category"
        }
      },
      {
        $unwind: "$category"
      },
      {
        $addFields: {
          categorySlug: "$category.slug"
        }
      },
      {
        $project: {
          "category.parent" : 0,
          "category.parents" : 0,
          "category._id" : 0,
          "category.icon" : 0,
          __v: 0
        }
      },
      {
        $match: {
          categorySlug: slug
        }
      }
    ]);
    return options;
  }
  async checkExistById(id) {
    if (!isValidObjectId(id)) {
    throw new createHttpError.BadRequest(OptionMessage.InvalidId);
   }
   const option = await this.#model.findById(id);
     if(!option) throw new createHttpError.NotFound(OptionMessage.NotFound) 
    return option;
  }
    async alreadyExistByCategoryAndKey(key , category) {
   const isExist = await this.#model.findOne({category , key});
     if(isExist) throw new createHttpError.Conflict(OptionMessage.AlreadyExists) 
    return null;
  }
}

module.exports = new OptionService();