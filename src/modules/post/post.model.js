const { Schema, Types } = require("mongoose");

const PostSchema = new Schema({
   userId: {type: Types.ObjectId , required: true},
   title: {type: String , required: true},
   description: {type: String , required: true},
   category: {type: Types.ObjectId, ref: "Category" , required: true},
   province: {type: String , required: false},
   city: {type: String , required: false},
   region: {type: String , required: false},
   address: {type: String , required: false},
   coordinate: {type: [Number], required: true},
   images: {type: [String], required: false, default: []},
   options: {type: Object , default: {}},
   publish: {type: Boolean , default: false}
}, {timestamps: true});

const PostModel = model("post" , PostSchema);
module.exports = PostModel;