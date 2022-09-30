const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let categories = new Schema({
    category: {type: String},
    creationdate:{type: Date}
})

module.exports = mongoose.model("categories", categories)