/*
  This file connects to MongoDB database in the cloud server
*/
const config = require('./config/config.js')

const mongoose = require('mongoose')
const { app: {port, node_env}, database: { username, password, db } } = config;
const uri = `mongodb+srv://${username}:${password}@cs188.pjfhc.mongodb.net/${db}?retryWrites=true&w=majority`;

const express = require('express')
const app = express()
require('dotenv').config({path: './config/config.env'})

const PORT = process.env.PORT || config.app.port || 5000;
const NODE_ENV = process.env.PORT || config.app.node_env;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).
  catch(error => handleError(error));
  console.log("Succesfully connected to DB...")

const server = app.listen(port, () => {
    console.log("Server started in " + node_env + " environment on port: " + port);
});
