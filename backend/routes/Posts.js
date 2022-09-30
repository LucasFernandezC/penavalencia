const router = require("express").Router();
const Post = require("../src/models/post");

router.get("/getDataPosts", async function (req, res) {
    const posts = await Post.find().sort({creationdate: -1})
    res.send(posts)
  });

router.post("/inserPost", async (req, res) => {
    console.log("estoy entrando bien" ,req.body, req.params, res.body)
          insertPost(req.body)
          res.status(200)
          console.log(res)
          res.send()
    })
  
    const insertPost = async (postadd) => {
  
      const post = new Post({
        user: postadd.user,
        creationdate:new Date(postadd.creationdate),
        category: postadd.category,
        title: postadd.title,
        msj: postadd.msj,
        comments: postadd.comments
      });
      await post.save()
        

    
    
    }

router.get("/getDataPosts/:category", async function (req,res) {
  let category = req.params.category;
    
    
  const posts = await Post.find({ category: category }).sort({creationdate: -1})
  
  res.send(posts)

})

router.get("/getDataPosts/:category/:id", async function (req,res) {
  let postid = req.params.id;
  let posts = await Post.findOne({ _id: postid }).sort({creationdate: -1})
  res.send(posts)

})



router.post("/inserComment/:postid", async (req, res) => {
        insertComment(req.body, req.params.postid)
        res.status(200)
        res.send()
  })

  const insertComment = async (commadd,postid) => {
    Post.updateOne({_id:postid},{$push:{comments:commadd}},function (err,docs) {
      if (err){
        console.log(err)
    }
    else{
        console.log("Updated Docs : ", docs);
    }
    })
  }


module.exports=router