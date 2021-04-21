/*
  This file connects to MongoDB database in the cloud server
*/
const config = require('./config/config.js')

const mongoose = require('mongoose')
const { database: { username, password, db } } = config;
const uri = `mongodb+srv://${username}:${password}@cs188.pjfhc.mongodb.net/${db}?retryWrites=true&w=majority`;

const express = require('express')
const app = express()
require('dotenv').config({path: './config/confi6g.env'})

const PORT = process.env.PORT || config.app.port || 5000;
const NODE_ENV = process.env.PORT || config.app.node_env;

mongoose.connect(uri, { useNewUrlParser: true }).
  catch(error => handleError(error));
  console.log("Succesfully connected to DB...")

const server = app.listen(PORT, () => {
    console.log("Server started in ${NODE_ENV} environment on port: ${PORT}");
});
