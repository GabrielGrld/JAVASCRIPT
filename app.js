//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');
const mongoose = require("mongoose");
const _ = require("lodash");
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
  name: "Here you can write your today's task"
});

const item2 = new Item({
  name: "Write your task and hit + button"
});

const item3 = new Item({
  name: "<-- to delete the completed task"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);


app.get("/:customListName", function(req, res) {
  const day = date.getDate();
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({
    name: customListName
  }, function(err, foundList) {
    if (!err) {
      if (!foundList) {
        //Create a new list
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        //Show an existing list
        res.render("list", {
          listTitleday: day,
          listTitle: foundList.name,
          newListItems: foundList.items
        });
      }
    }
  });


});



app.get('/', function(req, res) {

  const day = date.getDate();

  Item.find(function(err, foundItems) {

    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          //console.log("Syccessfully saved defaul items");
        }
      });
      res.redirect("/");
    } else {
      res.render('list', {
        listTitleday: day,
        listTitle: "Today",
        newListItems: foundItems
      });
    }
  });

});


app.post('/', function(req, res) {
  const item = req.body.newItem;
  const listName = req.body.list;
  const newItem = new Item({
    name: item
  });
if(listName === "Today"){
  newItem.save();
  res.redirect("/");
} else {
  List.findOne({name: listName}, function(err, foundList){
    foundList.items.push(newItem);  
    foundList.save();
    res.redirect("/"+listName);
  });
}


});

app.post("/delete", function(req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listTitleCheckbox;

if (listName === "Today"){
  Item.findByIdAndRemove(checkedItemId, function(err) {
    if (err) {
      console.log(err);
    } else {
      //console.log("item deleted");
    }
  });
  res.redirect("/");
}else {
  List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItemId}}},function(err, foundList){
    if (!err){
      res.redirect("/"+listName);
    }
  });

}


});




app.get("/about", function(req, res) {
  res.render("about");
});


app.listen(process.env.PORT || '3000', function() {
  console.log("Server running on port 3000.");
});
