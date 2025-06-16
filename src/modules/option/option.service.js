const autoBind = require("auto-bind");
const OptionModel = require("./Option.model");
const CategoryModel = require("./../category/category.model");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const OptionMessage = require("./Option.message");
const { default: slugify } = require("slugify");

class OptionService {
  #model;
  #categoryModel;
  constructor(){
    autoBind(this);
    this.#model = OptionModel;
    this.#categoryModel = CategoryModel;
  }
  async find(){
   
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
  async checkExistById(id) {
   const category = await this.#categoryModel.findById(id);
     if(!category) throw new createHttpError.NotFound(OptionMessage.NotFound) 
    return category;
  }
    async alreadyExistByCategoryAndKey(key , category) {
   const isExist = await this.#model.findOne({category , key});
     if(isExist) throw new createHttpError.Conflict(OptionMessage.AlreadyExists) 
    return null;
  }

}

module.exports = new OptionService();