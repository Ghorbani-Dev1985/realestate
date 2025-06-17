const autoBind = require("auto-bind");
const CategoryModel = require("./category.model");
const OptionModel = require("./../option/option.model")
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const CategoryMessage = require("./category.message");
const { default: slugify } = require("slugify");

class CategoryService {
  #model;
  #optionModel;
  constructor(){
    autoBind(this);
    this.#model = CategoryModel;
    this.#optionModel = OptionModel;
  }
  async find(){
    return await this.#model.find({parent: {$exists : false}});
  }
   async remove(id){
    await this.checkExistById(id);
    await this.#optionModel.deleteMany({category : id}).then(async () => {
      await this.#model.deleteMany({_id : id});
    });
    return true;
  }

  async create(categoryDto) {
    if(categoryDto?.parent && isValidObjectId(categoryDto.parent)) {
      const existCategory = await this.checkExistById(categoryDto.parent);
      categoryDto.parent = existCategory._id;
      categoryDto.parents = [
    ...Array.from(
    new Set([
      existCategory._id.toString(),
      ...existCategory.parents.map(id => id.toString())
    ])
    ).map(id => new Types.ObjectId(id))
    ];
    }
    if(categoryDto?.slug){
      categoryDto.slug = slugify(categoryDto.slug , {trim: true , replacement: "_", lower: true});
      await this.alreadyExistBySlug(categoryDto.slug);
    }else{
      categoryDto.slug = slugify(categoryDto.name);
    }
    const category = await this.#model.create(categoryDto);
    return category;
  }
  async update(id, updateDto) {
  await this.checkExistById(id);

  if (updateDto?.parent) {
  if (isValidObjectId(updateDto.parent)) {
    const parentCategory = await this.checkExistById(updateDto.parent);
    updateDto.parents = [
      ...Array.from(
        new Set([
          parentCategory._id.toString(),
          ...parentCategory.parents.map(id => id.toString())
        ])
      ).map(id => new Types.ObjectId(id))
    ];
  } else {
    throw new createHttpError.BadRequest(CategoryMessage.InvalidParent);
  }
}


  if (updateDto?.slug) {
    updateDto.slug = slugify(updateDto.slug, {
      trim: true,
      replacement: "_",
      lower: true
    });

    const slugOwner = await this.#model.findOne({ slug: updateDto.slug });
    if (slugOwner && slugOwner._id.toString() !== id) {
      throw new createHttpError.Conflict(CategoryMessage.AlreadyExists);
    }
  }

  await this.#model.updateOne({ _id: id }, { $set: updateDto });
  return await this.#model.findById(id); 
}

  async checkExistById(id) {
    const category = await this.#model.findById(id);
    if(!category) throw new createHttpError.NotFound(CategoryMessage.NotFound);
    return category;
  }
  async checkExistBySlug(slug) {
    const category = await this.#model.findOne({ slug });
    if(!category) throw new createHttpError.NotFound(CategoryMessage.NotFound);
    return category;
    }
  async alreadyExistBySlug(slug) {
    const category = await this.#model.findOne({ slug });
    if(category) throw new createHttpError.Conflict(CategoryMessage.AlreadyExists);
    return null;
  }
}

module.exports = new CategoryService();