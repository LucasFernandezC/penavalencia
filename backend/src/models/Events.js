const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let event = new Schema({
    title: {type: String},
    eventdate:{type: Date},
    text: {type: String},
    url: {type:String},
    creationdate: {type:Date}
})

module.exports = mongoose.model("event", event)