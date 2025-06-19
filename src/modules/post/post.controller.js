const autoBind = require("auto-bind");
const HttpCodes = require("http-codes");
const PostService = require("./post.service");
const PostMessage = require("./post.message");
const CategoryModel = require("./../category/category.model");
const createHttpError = require("http-errors");
const { Types } = require("mongoose");
const { getAddressDetail } = require("../../common/utils/http");
const { removePropertyInObject } = require("../../common/utils/functions");


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
        let options , category;
        if(slug){
          slug = slug.trim();
          category = await CategoryModel.findOne({slug});
          if(!category) throw new createHttpError.NotFound(PostMessage.NotFoundCategory);
          options = await this.#service.getCategoryOptions(category.id);
          if(options.length === 0) options = null;
          match = {parent: CategoryModel._id}
        }
        const categories = await CategoryModel.aggregate([{$match: match}])
        return res.json(categories , options , category?._id.toString())
    } catch (error) {
        next(error)
    }
  }
 async create(req , res , next) {
    try {
        const images = req?.files?.map(image => image?.path?.slice(7))
        const {title , description , category , lat , lon} = req.body;
        const {province, city, region, address} = await getAddressDetail(lat , lon)
        const options = removePropertyInObject(req.body, ['post','description','category','lat','lon','images']) ;
        await this.#service.create({title , description , category: new Types.ObjectId(category) , coordinate: [lat , lon] , images, options , province , city, region, address});
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
