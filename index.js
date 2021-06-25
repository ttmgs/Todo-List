const express = require('express');
const ejs = require('ejs');
const e = require('express');
const { getDay } = require('./views/date');
const { getDate } = require('./views/date');
const app = express();
var itemInputs = []
var workinput = []

const PORT = process.env.PORT || 8080;
app.use(express.urlencoded({extented: true}));
app.use(express.json());



app.set("view engine", "ejs");
app.use(express.static(__dirname + '/views'));


app.get('/', (req, res) => {

  let day = getDate()


    res.render("list", {listtitle: day, items: itemInputs})
  
})

app.post("/", (req, res) => {

  var itemInput = req.body.input
  itemInputs.push(itemInput)
     res.redirect("/");
});

app.get("/work", (req,res) => {
  res.render("work", {listtitle: "Work List", items: itemInputs, worklist: workinput})
})

app.post("/work", (req,res) => {

  var input = req.body.winput

if (input === "") {
  return null;
} else {
  workinput.push(input)
  res.redirect('/work');
}
})




app.listen(PORT, function() {
  console.log('app is listening on http://localhost:' + PORT)
});