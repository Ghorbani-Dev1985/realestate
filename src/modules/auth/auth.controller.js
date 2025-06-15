const NodeEnv = require("../../common/constant/env.enum");
const { AuthMessage } = require("./auth.messages");
const authService = require("./auth.service");
const autoBind = require("auto-bind");

class AuthController{
    #service;
    constructor(){
     autoBind(this);
     this.#service = authService;
    }
    async sendOTP(req , res , next){
        try {
            const {mobile} = req.body;
           await this.#service.sendOTP(mobile);
           return res.json({
            message: AuthMessage.SendOtpSuccessfully
           });
        } catch (error) {
            next(error)
        }
    }
    async checkOTP(req , res , next){
        try {
             const {mobile, code} = req.body;
          const accessToken = await this.#service.checkOTP(mobile , code);
         return res.cookie('real_estate' , accessToken , {
            httpOnly: true,
            secure: process.env.NODE_ENV === NodeEnv.Production,
            sameSite: "none"
          }).status(200).json({
            message: AuthMessage.LoginSuccessfully
          })           
        } catch (error) {
            next(error)
        }
    }
    async logout(req , res , next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AuthController()