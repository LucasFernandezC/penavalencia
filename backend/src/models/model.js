const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let user = new Schema({
    nombre: {type: String},
    fechanac:{type: Date},
    email: {type: String},
    telefono: {type: Number},
    domicilio: {type: String},
    socio: {type: Number},
    sociofundador: {type: Number},
    password: {type:String},
    url: {type:String}
})

module.exports = mongoose.model("user", user)