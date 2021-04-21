/*
  This file contains function that can be called when a User signs up for an account
*/

const config = require('./config/config.js')

const mongoose = require('mongoose')
const { database: { username, password, db } } = config;
const uri = `mongodb+srv://${username}:${password}@cs188.pjfhc.mongodb.net/${db}?retryWrites=true&w=majority`;
const client = require('mongodb').MongoClient.connect();

/*
  Function that validates that an email address only contains unicode
*/
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/*
  Function to be called when a Student signs up - logs value into the DB

  PARAMETERS
    firstName : String
      First name of student
    lastName : String
      Last name of student
    email : String
      Student's email - check that it ends with ucla.edu
    sid : String
      Student UCLA ID - 9 digits, number only
    year : Int
      Current year at UCLA
        1 - freshman, 2 - sophomore, 3 - junior, 4 - senior, 5 - supersenior & above
    gradTerm : String
      String consisting of 1-2 capital letter graduation quarter and
      2 digit graduation year (i.e. 21 is 2021, 22 is 2022, etc.)
        F   - Fall, W   - Winter, Sp  - Spring, S   - Summer
    major : String
      Student's major
    minor : String
      Student's minor, NA if not applicable
    club : String
      Student's associated club
    honorStudent : bool
      True if student is in an honor's student, False otherwise
    resume : BinData
      PDF file of the Student's resume
    profileImage : BinData
      JPEG, PNG or JPG file of Student's profile picture

  RETURN VALUES
    Err - If the values failed to be inserted into the DB, function will return error
    Success - If the values are successfully inserted into the DB, function will return Success
*/
async function signUpStudent(firstName, lastName, email, sid, year, gradTerm, major, minor, club, honorStudent, resume, profileImage) {
  try {
    // connect to database
    await client.connect();
    const database = client.db("test");
    const col = database.collection("Student");

    // check validity of values
    if (typeof(firstname) != 'string' || typeof(lastName) != 'string' || typeof(major) != 'string' ||
    typeof(minor) != 'string' || typeof(club) != 'string' || typeof(email) != 'string' || typeof(gradTerm) != 'string' ||
    typeof(year) != 'number' || typeof(honorStudent) != 'boolean'){
      throw new TypeError("One or more parameters have the wrong type");
    }
    if(sid.match(/^[0-9]+$/) != null || sid.length != 9){
      throw new Error("sid can only contain digits");
    }
    if (!vaildateEmail(email) && !email.includes("ucla.edu")){
      throw new Error("Email contains invalid characters or is not UCLA email");
    }
    if ((gradTerm.includes('Sp') || gradTerm.includes('F') || gradTerm.includes('W') || gradTerm.includes('S')) && !isNaN(gradTerm.slice(-2))){
      throw new Error("gradTerm has invalid format")
    }

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

    const result = await col.insertOne(doc);
    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
    );
  } finally {
    await client.close();
  }
}


// test function
signUpStudent("Arabelle", "Siahaan", "arabellek@ucla.edu", "604928106", "4", "Sp21", "CS", "NA", "ACM", true, "NA", "NA");
