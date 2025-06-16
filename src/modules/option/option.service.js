const autoBind = require("auto-bind");
const OptionModel = require("./Option.model");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const OptionMessage = require("./Option.message");

class OptionService {
  #model;
  constructor(){
    autoBind(this);
    this.#model = OptionModel;
  }
  async find(){
   
  }

  async create(OptionDto) {
   
  }
  async checkExistById(id) {
  
  }

}

module.exports = new OptionService();