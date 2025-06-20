const CookieNames = require("../../common/constant/cookie.enum");
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
          const oneWeekMs = 1000 * 60 * 60 * 24 * 7;
         return res.cookie(CookieNames.AccessToke , accessToken , {
            maxAge: oneWeekMs,
            httpOnly: true,
            secure: process.env.NODE_ENV === NodeEnv.Production,
          }).status(200).json({
            message: AuthMessage.LoginSuccessfully
          });           
        } catch (error) {
            next(error)
        }
    }
    async logout(req , res , next){
        try {
            return res.clearCookie(CookieNames.AccessToken).status(200).json({
                message: AuthMessage.LogoutSuccessfully
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AuthController()