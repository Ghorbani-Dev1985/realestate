const autoBind = require("auto-bind");

const OptionModel = require("./../option/option.model");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");

const { default: slugify } = require("slugify");
const PostModel = require("./post.model");
const PostMessage = require("./post.message");

class PostService {
  #model;
  #optionModel;
  constructor() {
    autoBind(this);
    this.#model = PostModel;
    this.#optionModel = OptionModel;
  }

  async getCategoryOptions(categoryId){
     const options = await this.#optionModel.find({category : categoryId})
     return options;
  }
  async create(dto){
   return await this.#model.create(dto)
  }
  async find(userId){
   if(userId && isValidObjectId(userId)) return await this.#model.find({userId});
   throw new createHttpError.BadRequest(PostMessage.RequestNotValid)
  }
}

module.exports = new PostService();
