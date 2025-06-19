const { Router } = require("express");
const postController = require("./post.controller");
const upload = require("./../../common/utils/multer")

const router = Router();
router.post("/create" , upload.array("images" , 10) ,postController.create)
router.get("/create/categories" , postController.categories)
router.put("/:id" , categoryController.update)
router.delete("/:id" , categoryController.remove)

module.exports = {
    PostRouter : router
}