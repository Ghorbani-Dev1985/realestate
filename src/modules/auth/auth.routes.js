const {Router} = require("express");
const authController = require("./auth.controller");
const router = Router();

router.post("/send_otp" , authController.sendOTP);
router.post("/check_otp" , authController.checkOTP);

module.exports = {
    AuthRouter: router
}