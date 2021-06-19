const express = require('express');
const ejs = require('ejs');
const e = require('express');
const app = express();
var itemInputs = []


const PORT = process.env.PORT || 8080;
app.use(express.urlencoded({extented: true}));
app.use(express.json());



app.set("view engine", "ejs");




app.get('/', (req, res) => {

  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  }

  var day = today.toLocaleDateString("en-US", options)
 


    res.render("list", {kindOfDay: day, items: itemInputs})
  
})

app.post("/", (req, res) => {

  var itemInput = req.body.input
  itemInputs.push(itemInput)
     res.redirect("/");
});






app.listen(PORT, function() {
  console.log('app is listening on http://localhost:' + PORT)
});