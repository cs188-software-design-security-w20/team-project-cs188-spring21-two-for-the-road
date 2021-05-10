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


/*
  Function that validates that an email address only contains unicode

  PARAMETERS
   email : string
    String of the email we want to check for validy
*/
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


module.exports = router;