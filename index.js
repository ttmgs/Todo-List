const express = require('express');
const ejs = require('ejs');
const app = express();
const mongoose = require("mongoose");


const PORT = process.env.PORT || 8080;
app.use(express.urlencoded({extented: true}));
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static("public"));

// mongodb connection
mongoose.connect("mongodb://localhost:27017/toDB", {useNewUrlParser: true})

// schema
const listSchema = mongoose.Schema({
  item: String
}) 

// model
const List = mongoose.model("List", listSchema)

const first = new List({
  item: "first Item"
});





app.get('/', (req, res) => {

  List.find(function(err, lists) {
    if (err) {
      console.log(err)
    } else {
      res.render("list", {listtitle: "Everyday is a blessing", items: lists})
    };
  });


})

app.post("/", (req, res) => {
  var itemInput = req.body.input
 
const newlist = new List({
  item: itemInput
})
newlist.save()
res.redirect("/");

});

app.get("/work", (req,res) => {
  res.render("work", {listtitle: "Work List", items: itemInputs})
})

app.post("/work", (req,res) => {

  var input = req.body.winput


})




app.listen(PORT, function() {
  console.log('app is listening on http://localhost:' + PORT)
});