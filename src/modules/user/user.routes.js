const {Router} = require("express");
const userController = require("./user.controller");
const Authorization = require("../../common/guard/authorization.guard");
const router = Router();

router.get("/user_info" , Authorization ,userController.userInfo);


module.exports = {
    UserRouter: router
}