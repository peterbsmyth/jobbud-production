var express    = require("express");
var app        = express();
var mongoose   = require("mongoose");
var morgan     = require("morgan");
var passport   = require("passport");
var ejs        = require("ejs");
var bodyParser = require("body-parser");

var port = process.env.PORT || 8080;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './src/server/views');
app.set('view engine', 'ejs'); // set up ejs for templating

app.get('/',function(req,res){
  res.render('index.ejs');
});

app.listen(port,function(){
  console.log("Running on port " + port);
});
