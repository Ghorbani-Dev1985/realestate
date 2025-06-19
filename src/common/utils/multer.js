const multer  = require('multer');
const fs = require("fs");
const path = require('path');
const createHttpError = require('http-errors');
const storage = multer.diskStorage({
    destination: function(req, file , cb){
    fs.mkdirSync(path.join(process.cwd() , "public" , "upload") , {recursive: true});
    cb(null , "public/upload");
    },
    filename: function(req , file , cb) {
        const whiteListFormat = ["image/png" , "image/jpg" , "image/jpeg" , "image/webp"];
        if(whiteListFormat.includes(file.mimetype)){
            const format = path.extname(file.originalname);
            const filename = new Date().getTime().toString() + format;
            cb(null , filename);
        }else{
            cb(new createHttpError.BadRequest("فرمت تصویر قابل قبول نمی باشد"));
        }
    }
})
const upload = multer({storage , limits: {
    fieldSize: 1 * 1000 * 1000,
    files: 10
}});

module.export = {upload}