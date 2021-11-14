//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');
const mongoose = require("mongoose");
const date = require(__dirname+"/date.js");

const app = express();

const items = ["Do exercise","Eat Breakfast","Study Javascript"];
const  workItems = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use (express.static("public"));

mongoose.connect ("mongodb://localhost:27017/todolistDB", {useNewUrlParser:  true});

const itemsSchema = {
  name : String
};

const Item = mongoose.model("Item", itemsSchema); //Name for mongose model should be capitalized



app.get('/', function(req, res) {

const day = date.getDate();

  res.render('list', {  listTitle: day, newListItems: items });
});

app.post('/', function(req, res){
const item = req.body.newItem;
if (req.body.list === "Work"){
  workItems.push(item);
  res.redirect("/work");
}else{
  items.push(item);
  res.redirect("/");
}
});


app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function(req, res){
  res.render("about");
});


app.listen(process.env.PORT||'3000', function() {
  console.log("Server running on port 3000.");
});
