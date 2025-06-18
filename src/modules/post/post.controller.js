const autoBind = require("auto-bind");

const HttpCodes = require("http-codes");
const PostService = require("./post.service");
const PostMessage = require("./post.message");
const CategoryModel = require("./../category/category.model");
const createHttpError = require("http-errors");

class PostController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = PostService;
  }

  async categories (req , res , next) {
    try {
        let {slug} = req.query;
        let match = {parent: null};
        if(slug){
          slug = slug.trim();
          const childrenCategory = await CategoryModel.findOne({slug});
          if(!childrenCategory) throw new createHttpError.NotFound(PostMessage.NotFoundCategory);
          match = {parent: CategoryModel._id}
        }
        const categories = await CategoryModel.aggregate([{$match: match}])
        return res.json(categories)
    } catch (error) {
        next(error)
    }
  }
 async create(req , res , next) {
    try {
        const {name , icon , slug , parent} = req.body;
        await this.#service.create({name , icon , slug , parent});
       return res.status(HttpCodes.CREATED).json({message: PostMessage.Created});
    } catch (error) {
        next(error);
    }
  }
  async update(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async find(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
