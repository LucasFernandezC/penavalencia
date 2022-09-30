const router = require("express").Router();
const User = require("../src/models/model");

router.get("/getData/:mail", async function (req, res) {
    let mail = req.params.mail;
    console.log(mail)
    const usuario = await User.findOne({ email: mail })
    console.log(usuario)
    res.send(usuario)
  });

  router.get("/getData/usuario/:id", async function (req, res) {
    let id = req.params.id;
    console.log(id)
    const usuario = await User.findOne({ _id: id })
    console.log(usuario)
    res.send(usuario)
  });

router.post("/inserUser", async (req, res) => {
    console.log("me fui por usuario",req.body, req.params, res.body)
  
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

module.exports = router