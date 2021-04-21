/*
  This file contains function that can be called when a User signs up for an account:
    - signUpStudent
    - signUpRecruiter
*/

const config = require('./config/config.js')
// const mongoose = require('mongoose')
const { app: {port, node_env}, database: { username, password, db } } = config;
const uri = `mongodb+srv://${username}:${password}@cs188.pjfhc.mongodb.net/${db}?retryWrites=true&w=majority`;

const client = require('mongodb').MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const express = require('express')
const app = express()
require('dotenv').config({path: './config/config.env'})

/*
  Function that validates that an email address only contains unicode

  PARAMETERS
   email : string
    String of the email we want to check for validy
*/
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/*
  Function to be called when a Student signs up and logs value into the DB

  PARAMETERS
    firstName : string
      First name of student
    lastName : string
      Last name of student
    email : string
      Student's email - check that it ends with ucla.edu
    sid : string
      Student UCLA ID - 9 digits, number only
    year : Int
      Current year at UCLA
        1 - freshman, 2 - sophomore, 3 - junior, 4 - senior, 5 - supersenior & above
    gradTerm : string
      string consisting of 1-2 capital letter graduation quarter and
      2 digit graduation year (i.e. 21 is 2021, 22 is 2022, etc.)
        F   - Fall, W   - Winter, Sp  - Spring, S   - Summer
    major : string
      Student's major
    minor : string
      Student's minor, NA if not applicable
    club : string
      Student's associated club
    honorStudent : bool
      True if student is in an honor's student, False otherwise
    resume : BinData
      PDF file of the Student's resume
    profileImage : BinData
      JPEG, PNG or JPG file of Student's profile picture

  RETURN VALUES
    Err - If the insert failed, function will return error
    ID - If the insert is successful, function will return 1
*/
async function signUpStudent(firstName, lastName, email, sid, year, gradTerm, major, minor, club, honorStudent, resume, profileImage) {
  try {
    // connect to database
    await client.connect()
      .catch(error => handleError(error));
    console.log("Succesfully connected to DB...")

    const database = client.db("test");
    const col = database.collection("Student");

    // check validity of values
    if (typeof(firstName) != 'string' || typeof(lastName) != 'string' || typeof(major) != 'string' ||
        typeof(minor) != 'string' || typeof(club) != 'string' || typeof(email) != 'string' || typeof(gradTerm) != 'string' ||
        typeof(year) != 'number' || typeof(honorStudent) != 'boolean'){
      throw new TypeError("One or more parameters have the wrong type");
    }
    if (year < 1 && year > 5){
      throw new Error("year value can only be between 1 to 5");
    }
    if (!(/^\d+$/.test(sid)) || sid.length != 9){
      throw new Error("sid should contain 9 digits");
    }
    if (!validateEmail(email) || !email.includes("ucla.edu")){
      throw new Error("Email contains invalid characters or is not UCLA email");
    }
    var gradQ1 = gradTerm.charAt(0);
    var gradQ2 = gradTerm.substring(0,1);
    if (!(gradQ2.includes("Sp") || gradQ1.includes("F") || gradQ1.includes("W") ||
    gradQ1.includes("S")) || !(/^\d+$/.test(gradTerm.slice(-2)))){
      throw new Error("gradTerm has invalid format")
    }

    // create doc to be inserted after checking for params
    var doc = {
      firstName:firstName,
      lastName:lastName,
      email:email,
      sid:sid,
      year:year,
      major:major,
      minor:minor,
      club:club,
      honorStudent:honorStudent,
      resume:resume,
      profileImage:profileImage
    };

    const result = await col.insertOne(doc)
      .catch(error => handleError(error));
    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
    );
  } finally {
    await client.close();
  }
  return 1;
}


/*
  Function to be called when a Recruiter signs up and logs all values into the DB

  PARAMETERS
    firstName : string
      First name of recruiter
    lastName : string
      Last name of recruiter
    companyName : string
      Company that the recruiter is working forr
    email : string
      Recruiter's email
    profileImage : BinData
      JPEG, PNG or JPG file of Student's profile picture

  RETURN VALUES
    Err - If the insert failed, function will return error
    1 - If the insert is successful, function will return 1
*/
async function signUpRecruiter(firstName, lastName, companyName, email, profileImage) {
  try {
    // connect to database
    await client.connect()
      .catch(error => handleError(error));
    console.log("Succesfully connected to DB...")

    const database = client.db("test");
    const col = database.collection("Recruiter");

    // check validity of values
    if (typeof(firstName) != 'string' || typeof(lastName) != 'string' ||
        typeof(companyName) != 'string' || typeof(email) != 'string'){
      throw new TypeError("One or more parameters have the wrong type");
    }
    if (!validateEmail(email)){
      throw new Error("Email contains invalid characters");
    }

    // create doc to be inserted after checking for params
    var doc = {
      firstName:firstName,
      lastName:lastName,
      company:companyName,
      email:email,
      profileImage:profileImage
    };

    const result = await col.insertOne(doc)
      .catch(error => handleError(error));
    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
    );
  } finally {
    await client.close();
  }
  return 1;
}



// TESTS - uncomment this to test the function
// signUpStudent("Test2", "Test", "test2@ucla.edu", "123456789", 4, "W21", "CS", "NA", "test", true, "NA", "NA");
// signUpStudent("Arabelle", "Siahaan", "test@gmail.edu", "123456789", 4, "W21", "CS", "NA", "test", true, "NA", "NA");
// signUpStudent("Arabelle", "Siahaan", "test@ucla.edu", "12356789", 4, "W21", "CS", "NA", "test", true, "NA", "NA");
// signUpStudent("Arabelle", "Siahaan", "test@ucla.edu", "12356789", 4, "L21", "CS", "NA", "test", true, "NA", "NA");
// signUpRecruiter("Recruiter", "Test", "Company", "abc@company.com", "NA");
