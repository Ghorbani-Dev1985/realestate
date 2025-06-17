const autoBind = require("auto-bind");
const OptionModel = require("./option.model");
const CategoryService = require("./../category/category.service");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const OptionMessage = require("./option.message");
const { default: slugify } = require("slugify");
const { isTrue, isFalse } = require("../../common/utils/functions");

class OptionService {
  #model;
  #categoryService;
  constructor(){
    autoBind(this);
    this.#model = OptionModel;
    this.#categoryService = CategoryService
  }
  async find(){
    const options = await this.#model.find({} , {__v:0} , {sort: {_id: -1}}).populate([{path: "category", select: {name: 1, slug: 1}}]);
    return options;
  }

  async create(OptionDto) {
     const category = await this.#categoryService.checkExistById(OptionDto.category);
     OptionDto.category = category._id;
     OptionDto.key= slugify(OptionDto.key , {trim: true, replacement: "_" , lower: true});
     await this.alreadyExistByCategoryAndKey(OptionDto.key , category._id);
     if(OptionDto.enum && typeof OptionDto.enum === "string"){
        OptionDto.enum = OptionDto.enum.split(",")
     }else if(!Array.isArray(OptionDto.enum)) OptionDto.enum = [];
    if(isTrue(OptionDto?.required)) OptionDto.required = true;
    if(isFalse(OptionDto?.required)) OptionDto.required = false;
     const option = await this.#model.create(OptionDto);
     return option;
  }
    async update(id , OptionDto) {
     const existOption = await this.checkExistById(id);
     if(OptionDto.category && isValidObjectId(OptionDto.category)){
       const category = await this.#categoryService.checkExistById(OptionDto.category);
       OptionDto.category = category._id;
     }else{
      delete OptionDto.category
     }
      if(OptionDto.slug){
         OptionDto.key= slugify(OptionDto.key , {trim: true, replacement: "_" , lower: true});
         let categoryId = existOption.category;
         if(OptionDto.category) categoryId = OptionDto.category;
       await this.alreadyExistByCategoryAndKey(OptionDto.key , categoryId);
     }  
   
     if(OptionDto.enum && typeof OptionDto.enum === "string"){
        OptionDto.enum = OptionDto.enum.split(",")
     }else if(!Array.isArray(OptionDto.enum)) delete OptionDto.enum;
    if(isTrue(OptionDto?.required)) OptionDto.required = true;
    else if(isFalse(OptionDto?.required)) OptionDto.required = false;
    else delete OptionDto.required;
    return await this.#model.updateOne({_id: id} , {$set: OptionDto});
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