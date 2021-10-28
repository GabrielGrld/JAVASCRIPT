//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');


const app = express();
let items = ["Buy food","Cook food","Eat food"];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  let today = new Date();
  let options = {
     weekday: 'long',
     day: 'numeric',
     month: 'long'  };
  var day = today.toLocaleDateString("en-US", options);

  res.render('list', {  kindOfDay: day, newListItems: items });
});

app.post('/', function(req, res){
  var item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});



app.listen('3000', function() {
  console.log("Server running on port 3000.");
});
