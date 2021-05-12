/*
  This file connects to MongoDB database in the cloud server
*/
const config = require('./config/config.js')
var cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
 const { app: {port, node_env}, database: { username, password, db } } = config;
 const uri = `mongodb+srv://${username}:${password}@cs188.pjfhc.mongodb.net/${db}?retryWrites=true&w=majority`;

const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
require('dotenv').config({path: './config/config.env'})

// const cors = require('cors')


const client = require('mongodb').MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const signUpRoute = require ('./routes/signUp.js');
const loginRoute = require ('./routes/login.js');


const my_port = process.env.PORT || config.app.port || 5000;
const NODE_ENV = process.env.NODE_ENV || config.app.node_env;


// mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).
//   catch(error => handleError(error));
//   console.log("Succesfully connected to DB...")
let handleError = (error) => {
  console.log(error);
}

mongoose.createConnection(uri, {useNewUrlParser: true, useUnifiedTopology: true}).
  catch(error => handleError(error));
  
  console.log("Succesfully connected to DB...")

app.use(bodyParser.urlencoded({ extended: false }))

app.use(jsonParser);
app.use(cookieParser())
// app.use(function(req, res, next) {
// 	   res.header("Access-Control-Allow-Origin", "*"); 
// 	   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	   res.header('Access-Control-Allow-Credentials', 'true');
// 	   next();
// 	});
app.use('/signup', signUpRoute);
app.use('/login', loginRoute);

  // .listen(process.env.PORT || 5000)
const server = app.listen(my_port, () => {
    console.log("Server started in " + node_env + " environment on port: " + my_port);
});


