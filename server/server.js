/*
  This file connects to MongoDB database in the cloud server
*/
const config = require('./config/config.js')

const mongoose = require('mongoose')
const { app: {port, node_env}, database: { username, password, db } } = config;
const uri = `mongodb+srv://${username}:${password}@cs188.pjfhc.mongodb.net/${db}?retryWrites=true&w=majority`;

const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
require('dotenv').config({path: './config/config.env'})

const client = require('mongodb').MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const signUpRoute = require ('./routes/signUp.js');
const loginRoute = require ('./routes/login.js');

const my_port = process.env.PORT || 5000;
const NODE_ENV = process.env.PORT || config.app.node_env;

// const programmingLanguagesRouter = require('./routes/programmingLanguages');

let handleError = (error) => {
  console.log(error);
}

mongoose.createConnection(uri, {useNewUrlParser: true, useUnifiedTopology: true}).
  catch(error => handleError(error));
  
  console.log("Succesfully connected to DB...")

  // .listen(process.env.PORT || 5000)
const server = app.listen(my_port, () => {
    console.log("Server started in " + node_env + " environment on port: " + my_port);
});


app.use(jsonParser);
app.use('/signup', signUpRoute);
app.use('/login', loginRoute);

// app.use('/programming-languages', programmingLanguagesRouter);
