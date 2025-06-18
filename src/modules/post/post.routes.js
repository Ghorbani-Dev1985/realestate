const { Router } = require("express");
const postController = require("./post.controller");


const router = Router();
router.post("/" , categoryController.create)
router.get("/" , categoryController.find)
router.get("/categories" , postController.categories)
router.put("/:id" , categoryController.update)
router.delete("/:id" , categoryController.remove)

module.exports = {
    PostRouter : router
}