const autoBind = require("auto-bind");

const OptionModel = require("./../option/option.model");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");

const { default: slugify } = require("slugify");
const PostModel = require("./post.model");

class PostService {
  #model;
  #optionModel;
  constructor() {
    autoBind(this);
    this.#model = PostModel;
    this.#optionModel = OptionModel;
  }
}

module.exports = new PostService();
