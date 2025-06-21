const { Router } = require("express");
const postController = require("./post.controller");
const upload = require("./../../common/utils/multer")
const Authorization = require("../../common/guard/authorization.guard")

const router = Router();
router.post("/create" , Authorization ,upload.array("images" , 10) ,postController.create)
router.get("/create/categories" , Authorization ,postController.categories)
router.get("/create/posts" , Authorization , postController.findUserPosts)
router.put("/:id" , Authorization , categoryController.update)
router.delete("/:id" , Authorization , categoryController.remove)

module.exports = {
    PostRouter : router
}