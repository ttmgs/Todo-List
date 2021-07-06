const express = require('express');
const ejs = require('ejs');
const app = express();
const mongoose = require("mongoose");
var _ = require('lodash');

const PORT = process.env.PORT || 8080;
app.use(express.urlencoded({extented: true}));
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static("public"));

// mongodb connection
mongoose.connect("mongodb+srv://ttmgs:Windsor2000!!@cluster0.a9rki.mongodb.net/toDB", {useNewUrlParser: true})

// schemas
const listSchema = mongoose.Schema({
  item: String
}) 

const listedSchema = ({
  name: String,
  items: [listSchema]
})
const Title = mongoose.model("Title", listedSchema)


// model
const List = mongoose.model("List", listSchema)

const first = new List({
  item: "first Item"
});
const defaultItems = [first]

app.get('/', (req, res) => {
  List.find({}, function(err, lists) {
    if (lists.length === 0) {
      List.insertMany(defaultItems, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log("successfully saved items to DB")
    }
  });
      res.redirect("/");
    } else {
      res.render("list", {listtitle: "Today", items: lists})
    }
});
});

app.post("/", (req, res) => {
  const itemInput = req.body.input
  const listname = req.body.list

  const newlist = new List({
    item: itemInput
  })
  if (listname === "Today") {
    newlist.save();
    res.redirect("/")
  } else {
    Title.findOne({name: listname}, function(err, foundlist) {
      foundlist.items.push(newlist)
      foundlist.save();
      res.redirect("/" + listname)

    })

  }



  
});

app.post("/delete", (req, res) => {
const checkedItemId = req.body.checkbox
var list = req.body.listname

if (list === "Today") {
List.findByIdAndRemove(checkedItemId, function(err) {
  if (err) {
    console.log("error removing list item")
  } else {
    res.redirect("/")
     }
})
} else {
  Title.findOneAndUpdate({name: list}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundlist){
    if (!err) {
      res.redirect("/" + list)
    }
  })

  
}
})





app.get("/:custom", (req, res) => {

  const title = _.capitalize(req.params.custom)



Title.findOne({name: title}, function(err, foundlist) {
  if (!err) {
    if (!foundlist) {
   
// create new list
const newItem = new Title({
  name: title,
  items: first
})
newItem.save();
res.redirect("/" + title)
    } else {
// show list
res.render("list", {listtitle: foundlist.name, items: foundlist.items})

    }
  }
  


})
})










app.listen(PORT, function() {
  console.log('app is listening on http://localhost:' + PORT)
});