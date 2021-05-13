/*
  This file contains function that can be called when a User logs into their account:
    - loginUser
*/

const config = require('./config/config.js')
const bcrypt = require('bcryptjs');
const { app: {port, node_env}, database: { username, password, db } } = config;
const uri = `mongodb+srv://${username}:${password}@cs188.pjfhc.mongodb.net/${db}?retryWrites=true&w=majority`;

const client = require('mongodb').MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const express = require('express')
const app = express()
require('dotenv').config({path: './config/config.env'})

/*
  Function to be called when an existing User signs up to DB
  PARAMETERS
  email : string
    User's email
  password : string
    Password entered by the user
  RETURN VALUES
    -1 - If there is no (username, password) combination in the DB, return -1
    JSON - If the entered password is correct, return JSON file of User's info
*/
async function loginUser(email, password){
  try {
    // connect to database
    await client.connect()
      .catch(error => handleError(error));
    console.log("Succesfully connected to DB...")

    const database = client.db("test");

    // check if user is student or recruiter
    if (email.includes("ucla.edu")){
      col = database.collection("Student");
    }
    else{
      col = database.collection("Recruiter");
    }

    // create doc to be inserted after checking for params
    var query = {
      email:email,
    };

    const result = await col.findOne(query)
      .catch(error => handleError(error));
    console.log(result);

    if (bcrypt.compareSync(password, result.password)){
      return result;
    }
    else{
      throw new Error("Invalid email and password combination")
      return -1;
    }
    } finally {
      await client.close();
    }
}

// TESTS - uncomment this to test the function
// loginUser("test123456@ucla.edu", "password1234");