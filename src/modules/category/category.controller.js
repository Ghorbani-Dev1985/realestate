const autoBind = require("auto-bind");
const CategoryService = require("./category.service");
const CategoryMessage = require("./category.message");
const HttpCodes = require("http-codes")
class CategoryController {
    #service;
  constructor(){
    autoBind(this);
    this.#service = CategoryService;
  }
  async create(req , res , next) {
    try {
        const {name , icon , slug , parent} = req.body;
        await this.#service.create({name , icon , slug , parent});
       return res.status(HttpCodes.CREATED).json({message: CategoryMessage.Created});
    } catch (error) {
        next(error);
    }
  }
  async update(req, res, next) {
  try {
    const { id } = req.params;
    const updateDto = req.body;
    await this.#service.update(id, updateDto);
    res.json({
      message: CategoryMessage.Updated
    });
  } catch (error) {
    next(error);
  }
}

   async find(req , res , next) {
    try {
        const categories = await this.#service.find();
        res.json(categories);
    } catch (error) {
        next(error);
    }
  }
    async remove(req , res , next) {
    try {
        const {id} = req.params;
        await this.#service.remove(id);
        res.json({
          message : CategoryMessage.Deleted
        });
    } catch (error) {
        next(error);
    }
  }
}

module.exports = new CategoryController();