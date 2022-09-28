const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const corse = require("cors");
const PORT = 4000;
const qs = require('querystring');


var http = require("http");

const mongoose = require("mongoose");
let User = require("./model")


let respuesta = {
  error: false,
  codigo: 200,
  mensaje: ''
};

const router = express.Router();
mongoose.connect("mongodb+srv://lucken99:Bariloche1@notas.ha5hfzh.mongodb.net/test", {
  useNewUrlParser: true
});

const connection = mongoose.connection;
connection.once("open", function () {
  console.log("Connection with MongoDB was successful");
});
app.use(corse())
app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
app.use("/", router);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())



router.get("/getData:mail", async function (req, res) {
  let mail = req.params.mail;
  console.log(mail)
  const usuario = await User.findOne({ email: mail })
  console.log(usuario)
  res.send(usuario)
});



app.post("/inserUser", async (req, res) => {
  console.log(req.body, req.params, res.body)

  await User.findOne({ email: req.body.email })
    .then((encontre) => {
      console.log("encontre", encontre)
      if (encontre != null) {
        if (encontre != null) {
          console.log("mail ya existe")
          respuesta.error = true
          res.status(400);
          res.send("mail ya existe")
        } else {
          insertUser(req.body)
          res.status(200)
          res.send(respuesta)
        }
      } else if (req.body.email != null) {
        insertUser(req.body)
        res.status(200)
        res.send(respuesta)
      }
    })
})

const insertUser = async (useradd) => {

  const user = new User({
    nombre: useradd.nombre,
    fechanac: new Date(useradd.fechanac),
    email: useradd.email,
    telefono: useradd.telefono,
    domicilio: useradd.domicilio,
    socio: useradd.socio,
    sociofundador: useradd.sociofundador,
    password: useradd.password
  });
  await user.save()
    .then((respuesta) => {
      respuesta.mensaje = "Inserte el registro"
      console.log("inserte el registro")
      
    })
    .catch(respuesta.mensaje = "sali por error")


}


