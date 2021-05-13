const mongoose = require('mongoose')
const express =require('express')
const config = require('../config/config.js')

const { app: { port, node_env }, database: { username, password, db } } = config;
const uri = `mongodb+srv://${username}:${password}@cs188.pjfhc.mongodb.net/${db}?retryWrites=true&w=majority`;

const connectDb =async ()=> {
   try {await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true

  }).then(() => console.log('DB Connected!'))}
  catch(err){
    console.log(err.message)
  }
  
}
module.exports = connectDb