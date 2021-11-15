//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

const workItems = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true
});

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema); //Name for mongose model should be capitalized

const item1 = new Item({
  name: "Do exercise"
});

const item2 = new Item({
  name: "Eat Breakfast"
});

const item3 = new Item({
  name: "Study Javascript"
});

const defaultItems = [item1, item2, item3];

// Item.insertMany(defaultItems, function(err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("Default items created");
//   }
// });



// console.log(todoItems.name);

app.get('/', function(req, res) {

  const day = date.getDate();

  var todoItems = Item.find(function(err, items){
    console.log(items);
    res.render('list', {
      listTitle: day,
      newListItems: items
    });
  });
  });

// Item.find({}, function(err, foundItems){
//   console.log(foundItems);
// });



app.post('/', function(req, res) {
  const item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});


app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});


app.listen(process.env.PORT || '3000', function() {
  console.log("Server running on port 3000.");
});
