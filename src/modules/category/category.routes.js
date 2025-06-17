const { Router } = require("express");
const categoryController = require("./category.controller");

const router = Router();
router.post("/" , categoryController.create)
router.get("/" , categoryController.find)
router.put("/:id" , categoryController.update)
router.delete("/:id" , categoryController.remove)

module.exports = {
    CategoryRouter : router
}