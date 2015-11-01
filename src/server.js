// ---- require dependencies and set port variable
var express    = require("express");
var app        = express();
var mongoose   = require("mongoose");
var morgan     = require("morgan");
var passport   = require("passport");
var ejs        = require("ejs");
var bodyParser = require("body-parser");
var session    = require('express-session');
var db         = require('./server/config/database.js');

var port = process.env.PORT || 8080;

// ---- serve up static files
app.use(express.static(__dirname + "/client/"));

// ---- use middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

// ---- connect to dbs
mongoose.connect(db.mongo.url);


// ---- set view engine
app.set('views', './src/server/views');
app.set('view engine', 'ejs'); // set up ejs for templating


// ---- configure passport
require('./server/config/passport')(passport);
app.use(session({ secret: "thisIsSuperDuperUBERsecret", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// --- establish auth router
require('./server/routes/auth')(app,passport);


// ---- serve entry routes
app.get('/',function(req,res){
  res.render('index.ejs');
});

app.get('*',function(req,res){
  res.render('index.ejs');
});


// ---- start server
app.listen(port,function(){
  console.log("Running on port " + port);
});
