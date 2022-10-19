const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let categories = new Schema({
    category: {type: String},
    creationdate:{type: Date},
    description:{type:String}
})

module.exports = mongoose.model("categories", categories)