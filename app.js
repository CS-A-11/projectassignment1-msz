const express = require('express');
const path  = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var router = express.Router();
// import dependencies
var dotenv=require('dotenv');
// set up dotenv
require('dotenv').config();
//Init App
const app=express();

//Router Get
var indexRouter = require("./routes/index");
//Mongodb


// Set up mongoose connection
const mongo = require('mongodb').MongoClient
function doConnect() {
 	var url = 'mongodb://someone:abcd12345@ds143143.mlab.com:43143/hostlyte'
	mongo.connect(url, (err, db) => {
		if(err) {
			throw err
		} else {
			console.log('Successfully connected to MongoDB')
		}
	})
}
doConnect()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
});
//Routes
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'pug');
//Static file
app.set(express.static(path.join(__dirname,'view')));
app.use('/',express.static(path.join(__dirname, 'public')))
//body-parser

//Home routes
app.use("/", indexRouter);

//app.get("/",function(req,res){
//  res.render('index');
//  });


//Listig
app.listen(process.env.PORT || 3000, function(){
    console.log('Your node js server is running');
})
module.exports= router;
