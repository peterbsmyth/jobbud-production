// ---- require dependencies and set port variable
var express       = require("express");
var app           = express();
var mongoose      = require("mongoose");
var morgan        = require("morgan");
var passport      = require("passport");
var ejs           = require("ejs");
var bodyParser    = require("body-parser");
var coookieParser = require('cookie-parser');
var session       = require('express-session');
var db            = require('./server/config/database');

var port = process.env.PORT || 8080;

// ---- serve up static files
app.use(express.static(__dirname + "/client/"));


// ---- use middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(coookieParser());
app.use(session({
  // name: 'user',
  secret: "thisIsSuperDuperUBERsecret",
  resave: false,
  saveUninitialized: false,
  maxAge: 3600000
}));


// ---- connect to dbs
mongoose.connect(db.mongo.url);


// ---- set view engine
app.set('views', './src/server/views');
app.set('view engine', 'ejs');


// ---- configure passport
require('./server/config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());


// ---- serve entry routes
app.get('/',function(req,res){
  res.render('index.ejs');
});

app.get('*',function(req,res){
  res.render('index.ejs');
});


// ---- bootstrap routes
require('./server/routes/auth')(app);


// ---- start server
app.listen(port,function(){
  console.log("Running on port " + port);
});
