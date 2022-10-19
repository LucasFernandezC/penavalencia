const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const corse = require("cors");
const PORT = 4000;
const qs = require('querystring');
const fileUpload = require("express-fileupload");


var http = require("http");

const mongoose = require("mongoose");
let User = require("./src/models/model")




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

app.use(fileUpload({limits: {filesize : 50 * 1024*1024}}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())


//routes

// routes
app.use(require("./routes/Posts"));
app.use(require("./routes/Events"))
app.use(require("./routes/User"));
app.use(require("./routes/Categories"));














