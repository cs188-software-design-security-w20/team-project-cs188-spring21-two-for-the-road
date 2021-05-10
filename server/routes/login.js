// const express = require('express')
const express = require('express')
const router = express.Router()
/*
  This file contains function that can be called when a User signs up for an account:
    - signUpStudent
    - signUpRecruiter
*/

const config = require('../config/config.js')
// const mongoose = require('mongoose')
const { app: {port, node_env}, database: { username, password, db } } = config;
const uri = `mongodb+srv://${username}:${password}@cs188.pjfhc.mongodb.net/${db}?retryWrites=true&w=majority`;

const client = require('mongodb').MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express()
require('dotenv').config({path: './config/config.env'})

/*
  Function that validates that an email address only contains unicode

  PARAMETERS
   email : string
    String of the email we want to check for validy
*/
let handleError = (error) => {
  console.log(error);
}

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
// signUpStudent("Test2", "Test", "test2@ucla.edu", "123456789", 4, "W21", "CS", "NA", "test", true, "NA", "NA");
// signUpStudent("Arabelle", "Siahaan", "test@gmail.edu", "123456789", 4, "W21", "CS", "NA", "test", true, "NA", "NA");
// signUpStudent("Arabelle", "Siahaan", "test@ucla.edu", "12356789", 4, "W21", "CS", "NA", "test", true, "NA", "NA");
// signUpStudent("Arabelle", "Siahaan", "test@ucla.edu", "12356789", 4, "L21", "CS", "NA", "test", true, "NA", "NA");
// signUpRecruiter("Recruiter", "Test", "Company", "abc@company.com", "NA");

router.post('/', async (req,res,next) => {
    // await signUpStudent()
    console.log(req.body);
    await loginUser("test2@ucla.edu", "123456789");
    res.status(200).json(
        {
            "message" : "Using a POST in /login"
        }
    );
});

module.exports = router;
