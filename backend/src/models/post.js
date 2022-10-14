const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let post = new Schema({
    user: {type: String},
    creationdate:{type: Date},
    category: {type: String},
    title: {type:String},
    msj: {type:String},
    urlImg: {type:Array},
    comments: {type:Array}
})

module.exports = mongoose.model("post", post)