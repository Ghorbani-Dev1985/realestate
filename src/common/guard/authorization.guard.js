const createHttpError = require("http-errors");
const AuthorizationMessage = require("../messages/auth.message");
const jwt = require("jsonwebtoken");
const UserModel = require("../../modules/user/user.model");
require("dotenv").config();
const Authorization = async (req , res , next) => {
    try {
        const token = req?.cookie?.real_estate;
        if(!token) throw new createHttpError.Unauthorized(AuthorizationMessage.Login);
        const data = jwt.verify(token , process.env.JWT_SECRET_KEY);
        if(typeof data === "object" && data.id){
            const user = await UserModel.findById(data.id , {otp: 0}).lean(); // lean for better performance
            if(!user) throw new createHttpError.NotFound(AuthorizationMessage.NotFoundAccount)
            req.user = user;
            return next();
        }
        throw new createHttpError.Unauthorized(AuthorizationMessage.InvalidToken)
    } catch (error) {
        next(error)
    }
}

module.exports = Authorization