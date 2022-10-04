const router = require("express").Router();
const User = require("../src/models/model");
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname)
  }
})

let urlImg;
let respuesta = {
  error: false,
  codigo: 200,
  mensaje: ''
};
const upload = multer({ storage: storage }).single('file')

/*prueba upload de archivos*/

const fs = require("fs");
const axios = require("axios");
const formData = require("form-data");

const uploadAxios = async (file) => {

  try {
      console.log("ping !");
      const myFile = fs.readFileSync(
        file, { encoding: "base64" }
      );
      const myForm = new formData();
      myForm.append("image", myFile);

      await axios
          .post(
              `https://api.imgbb.com/1/upload?key=4e30bbd6e5caf163d847d3ccde535c0e`,
              myForm,
              {
                  headers: {
                      "Content-Type": "multipart/form-data",
                  },
              }
          )
          .then((response) => {
              console.log("API response ↓");
              console.log(response.data.data.url);
              urlImg = response.data.data.url
          })
          .catch((err) => {
              console.log("API error ↓");
              console.log(err);

              if (err.response.data.error) {
                  console.log(err.response.data.error);
                  //When trouble shooting, simple informations about the error can be found in err.response.data.error so it's good to display it
              }

          });
  } catch (error) {
      console.log(error);
  }
}


/*----------------------------------*/
router.get("/getData/:mail", async function (req, res) {
    let mail = req.params.mail;
    console.log(mail)
    const usuario = await User.findOne({ email: mail })
    console.log(usuario)
    res.send(usuario)
  });

  router.post("/uploadfile", async function (req, res) {
    console.log("llegue a subir el archivo", req.params, req.file)
    try {
      if(!req.files) {
        console.log("entre 1")  
        res.send({
              status: false,
              message: 'No file uploaded'
              
          });
      } else {
          //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
          let file = req.files.file;
          console.log("entre 2")
          //Use the mv() method to place the file in upload directory (i.e. "uploads")
          file.mv('./uploads/' + file.name);
          setTimeout(() => {
            console.log('./uploads/' + file.name)
            uploadAxios('./uploads/' + file.name)
            .then(()=>{

              res.send({
                  status: true,
                  message: 'File is uploaded',
                  data: {
                      name: file.name,
                      mimetype: file.mimetype,
                      size: file.size,
                      url: urlImg
                  }
              });
            })
            
            
          }, 1000);
      }
  } catch (err) {
      res.status(500).send(err);
  }
   
    
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
      password: useradd.password,
      url: urlImg
    });
    await user.save()
      .then((respuesta) => {
        respuesta.mensaje = "Inserte el registro"
        console.log("inserte el registro")
        
      })
      .catch(respuesta.mensaje = "sali por error")
  
  
  }

module.exports = router