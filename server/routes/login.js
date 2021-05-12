// const express = require('express')
const express = require('express')
const router = express.Router()
var bodyParser = require('body-parser')

const config = require('../config/config.js')
// const mongoose = require('mongoose')
const { app: {port, node_env}, database: { username, password, db } } = config;
const uri = `mongodb+srv://${username}:${password}@cs188.pjfhc.mongodb.net/${db}?retryWrites=true&w=majority`;

const client = require('mongodb').MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express()
require('dotenv').config({path: './config/config.env'})
const bcrypt = require('bcryptjs');
const e = require('express');
const jwt = require('jsonwebtoken')


<<<<<<< HEAD
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
=======


let handleError = (error) => {
  console.log(error);
}
var foundUser = 0
router.post('/', async (req, res, next) =>{
	let email = req.body.email
	let password = req.body.password
	

	//let's check if the user exist in our database
	await client.connect()
			.catch(error => handleError(error));
		console.log("Succesfully connected to DB...")
		const database = client.db("test");
		const colStudent = database.collection("Student");
		const findStudent = await colStudent.findOne({ "email": email }, async function (err, resul) {
			if (!resul) { //not found in student collection 
				const colrecruiter = database.collection("Recruiter");
				const findRecruiter = await colrecruiter.findOne({ "email": email }, async function (err, result) {
							if (!result) {
								return res.status(401).send('Email or password is incorrect');
								}
			else {
				
			//	console.log( result)
				const passValidate = await bcrypt.compare(req.body.password, result.hashed_password);
    			if (!passValidate) { return res.status(400).send('Email or password is incorrect'); }
				else{
					const payload = {
						"id" : result._id,
						"firstName": result.firstName,
						"lastName": result.lastName,
						"email": result.email,
						"companyName" : result.companyName,
						"profileImage" : result.profileImage,
						"StudentORrecruiter" : "recruter"
					}
					let expiration = Math.floor(Date.now() / 1000) + (2 * (60 * 60));
					let token = jwt.sign({ exp: expiration, usr: email }, config.JWT_SECRET);
					res.cookie('jwt', token);
					res.status(200).json(returnedUser);
					return
				}
				

			}
		})
			}
			else {
				//console.log(resul)
				const passValidate = await bcrypt.compare(req.body.password, resul.hashed_password);
    			if (!passValidate) { return res.status(400).send('Email or password is incorrect'); }
				else {
					var returnedUser = {
						"id" : resul._id,
						"firstName": resul.firstName,
						"lastName": resul.lastName,
						"email": resul.email,
						"sid": resul.sid,
						"YearLevel": resul.YearLevel,
						"gradTerm" : resul.gradTerm,
						"major" : resul.major,
						"minor" : resul.minor,
						"profileImage" : resul.profileImage,
						"resume" : resul.resume,
						"club" : resul.club,
						"gradTerm" : resul.gradTerm,
						"honorStudent" : resul.honorStudent,
						"StudentORrecruiter" : "student"
					}
					let expiration = Math.floor(Date.now() / 1000) + (2 * (60 * 60));
					let token = jwt.sign({ exp: expiration, usr: email }, config.JWT_SECRET);
					res.cookie('jwt', token);
					res.status(200).json(returnedUser);
					return

				}

			}
		})
		
})

//this route is to check if the user is authenticated or not --- to load user's information  in the frontend --- to be implemented with REDuX
router.get('/load',  async (req, res)=>{


	if(!req.cookies){ return res.status(400).send( "No cookie" ); }

	let secret = config.JWT_SECRET
	//console.log(req.cookies)
	if (req.cookies.jwt == null) {
		res.status(401).send("Your cookie is null " );
		return

	}
	jwt.verify(req.cookies.jwt, secret, async function (err, decoded) {
		if (err) {
			//	console.log(err)
			return res.status(400).send("Invalid cookie" );
			//return
			/*
			  err = {
				name: 'TokenExpiredError',
				message: 'jwt expired',
				expiredAt: 1408621000
			  }
			*/
		}
		else {

	var email = decoded.usr

	//let's check if the user exist in our database: if it does return the user's data
	await client.connect()
			.catch(error => handleError(error));
		console.log("Succesfully connected to DB...")
		const database = client.db("test");
		const colStudent = database.collection("Student");
		const findStudent = await colStudent.findOne({ "email": email }, async function (err, resul) {
			if (!resul) { //not found in student collection 
				const colrecruiter = database.collection("Recruiter");
				const findRecruiter = await colrecruiter.findOne({ "email": email }, async function (err, result) {
							if (!result) {
								return res.status(401).send('Email or password is incorrect');
								}
			else {
				
			//	console.log( result)
				
					const payload = {
						"id" : result._id,
						"firstName": result.firstName,
						"lastName": result.lastName,
						"email": result.email,
						"companyName" : result.companyName,
						"profileImage" : result.profileImage,
						"StudentORrecruiter" : "recruter"
					}
					let expiration = Math.floor(Date.now() / 1000) + (2 * (60 * 60));
					let token = jwt.sign({ exp: expiration, usr: email }, config.JWT_SECRET);
					res.cookie('jwt', token);
					res.status(200).json(payload);
					return
				
				

			}
		})
			}
			else {
				//console.log(resul)
					var payload = {
						"id" : resul._id,
						"firstName": resul.firstName,
						"lastName": resul.lastName,
						"email": resul.email,
						"sid": resul.sid,
						"YearLevel": resul.YearLevel,
						"gradTerm" : resul.gradTerm,
						"major" : resul.major,
						"minor" : resul.minor,
						"profileImage" : resul.profileImage,
						"resume" : resul.resume,
						"club" : resul.club,
						"gradTerm" : resul.gradTerm,
						"honorStudent" : resul.honorStudent,
						"StudentORrecruiter" : "student"
					}
					let expiration = Math.floor(Date.now() / 1000) + (2 * (60 * 60));
					let token = jwt.sign({ exp: expiration, usr: email }, config.JWT_SECRET);
					res.cookie('jwt', token);
					res.status(200).json(payload);
					return

				

			}
		})
		}
	});


router.get('/logout', (req, res) => {
console.log('You reach this route')
res.redirect('/')
})








	
})
>>>>>>> acad7e527671a795539811567190548ba8f0fd91

module.exports = router;
