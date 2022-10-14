const router = require("express").Router();
const Post = require("../src/models/post");


const fs = require("fs");
const axios = require("axios");
const formData = require("form-data");
const { Console } = require("console");
let urlImgRes = []


router.get("/getDataPosts", async function (req, res) {
  const posts = await Post.find().sort({ creationdate: -1 })
  res.send(posts)
});

router.post("/inserPost", async (req, res) => {
  //console.log("estoy entrando bien", req.body, req.params, res.body)
  insertPost(req.body)
  res.status(200)
  //console.log(res)
  res.send()
})

const insertPost = async (postadd) => {

  const post = new Post({
    user: postadd.user,
    creationdate: new Date(postadd.creationdate),
    category: postadd.category,
    title: postadd.title,
    msj: postadd.msj,
    urlImg: postadd.urlImg,
    comments: postadd.comments
  });
  await post.save()




}

router.post("/post/uploadfile", async function (req, res) {
  console.log("llegue a subir el archivo", req.files.file)
  let arrayFiles = []
  urlImgRes = []
  try {
    if (!req.files) {
      console.log("entre 1")
      res.send({
        status: false,
        message: 'No file uploaded'

      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      if (req.files.file.length == undefined) {
        console.log("Asi estaba el array ",arrayFiles)
        arrayFiles.push(req.files.file)
        console.log("Asi estaba el array 2 ",arrayFiles)
      } else {
        for (var i = 0; i < req.files.file.length; i++) {
          //req.files.file[i].mv('./uploads/' + req.files.file[i].name)
          arrayFiles.push(req.files.file[i])
          console.log("entre al for")
        }
      }
      
        console.log('./uploads/')
        uploadAxios(arrayFiles)
          .then(() => {
            res.send({
              status: true,
              message: 'File is uploaded',
              data: {
                name: "respuesta fija",
                url: urlImgRes
              }
            });
          })

      

    }

  } catch (err) {
    res.status(500).send(err);
  }



});

const uploadAxios = async (files) => {
  const promises = [];
  console.log("pre for ", files, files.length)
  for (let i = 0; i < files.length; i++) {

      console.log("ping !");
      //const myFile = fs.readFileSync(
      //  files[i], { encoding: "base64" }
      //);
      const myForm = new formData();
      myForm.append("image", files[i].data.toString('base64'));
      console.log("form ",myForm)
      promises.push(axios
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
          urlImgRes.push(response.data.data.url);
        })
        .catch((err) => {
          console.log("API error ↓");
          console.log(err);

          

        }));
  }
  try {
    return Promise.all(promises);
  } catch(err) {
    console.log(err);
  }
}

router.get("/getDataPosts/:category", async function (req, res) {
  let category = req.params.category;


  const posts = await Post.find({ category: category }).sort({ creationdate: -1 })

  res.send(posts)

})

router.get("/getDataPosts/:category/:id", async function (req, res) {
  let postid = req.params.id;
  let posts = await Post.findOne({ _id: postid }).sort({ creationdate: -1 })

  res.send(posts)

})



router.post("/inserComment/:postid", async (req, res) => {
  insertComment(req.body, req.params.postid)
  res.status(200)
  res.send()
})

const insertComment = async (commadd, postid) => {
  Post.updateOne({ _id: postid }, { $push: { comments: commadd } }, function (err, docs) {
    if (err) {
      console.log(err)
    }
    else {
      console.log("Updated Docs : ", docs);
    }
  })
}


module.exports = router