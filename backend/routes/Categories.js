const router = require("express").Router();
const Category = require("../src/models/categories");

router.get("/getDataCategories", async function (req, res) {
    const categories = await Category.find().sort({creationdate: -1})
    res.send(categories)
  });


  router.post("/insertCategories", async (req, res) => {
    console.log("estoy entrando bien" ,req.body, req.params, res.body)
          insertCategory(req.body)
          res.status(200)
          console.log(res)
          res.send()
    })
  
    const insertCategory = async (postadd) => {
  
      const category = new Category({
        category: postadd.category,
        creationdate:new Date(postadd.creationdate)
        
      });
      await category.save()
        

    
    
    }
    module.exports=router