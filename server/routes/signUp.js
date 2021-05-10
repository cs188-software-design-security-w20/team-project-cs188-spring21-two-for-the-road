// const express = require('express')
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router()

const jwt = require('jsonwebtoken')
/*
  This file contains function that can be called when a User signs up for an account:
	- signUpStudent
	- signUpRecruiter
*/
var bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const config = require('../config/config.js')
// const mongoose = require('mongoose')
const { app: { port, node_env }, database: { username, password, db } } = config;
const uri = `mongodb+srv://${username}:${password}@cs188.pjfhc.mongodb.net/${db}?retryWrites=true&w=majority`;

const client = require('mongodb').MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

require('dotenv').config({ path: './config/config.env' })

// app.use(bodyParser);
/*
  Function that validates that an email address only contains unicode

  PARAMETERS
   email : string
	String of the email we want to check for validy
*/
let handleError = (error) => {
	console.log(error);
}

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
async function signUpStudent(firstName, lastName, email, password, sid, year, gradTerm, major, minor, club, honorStudent, resume, profileImage) {
	try {
		// connect to database
		await client.connect()
			.catch(error => handleError(error));
		console.log("Succesfully connected to DB...")

		const database = client.db("test");
		const col = database.collection("Student");



		var salt = bcrypt.genSaltSync(10);
		var hashed_password = bcrypt.hashSync(password, salt);

		// create doc to be inserted after checking for params
		var doc = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			hashed_password: hashed_password,
			sid: sid,
			year: year,
			major: major,
			minor: minor,
			gradTerm: gradTerm,
			club: club,
			honorStudent: honorStudent,
			resume: resume,
			profileImage: profileImage
		};

		const result = await col.insertOne(doc)
			.catch(error => handleError(error));
		console.log(
			`${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
		);
		return result
	} finally {
		// await client.close();
		;
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
async function signUpRecruiter(firstName, lastName, companyName, email, password, profileImage) {
	try {
		// connect to database
		await client.connect()
			.catch(error => handleError(error));
		console.log("Succesfully connected to DB...")

		const database = client.db("test");
		const col = database.collection("Recruiter");

		// check validity of values



		var salt = bcrypt.genSaltSync(10);
		var hashed_password = bcrypt.hashSync(password, salt);

		// create doc to be inserted after checking for params
		var doc = {
			firstName: firstName,
			lastName: lastName,
			company: companyName,
			email: email,
			hashed_password: hashed_password,
			profileImage: profileImage
		};

		const result = await col.insertOne(doc)
			.catch(error => handleError(error));
		console.log(
			`${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
		);
		return result

		//working on jWT and coockie creation in the signup

	} finally {
		// await client.close();
		;
	}
	return 1;
}



// TESTS - uncomment this to test the function
// signUpStudent("Test2", "Test", "test2@ucla.edu", "123456789", 4, "W21", "CS", "NA", "test", true, "NA", "NA");
// signUpStudent("Arabelle", "Siahaan", "test@gmail.edu", "123456789", 4, "W21", "CS", "NA", "test", true, "NA", "NA");
// signUpStudent("Arabelle", "Siahaan", "test@ucla.edu", "12356789", 4, "W21", "CS", "NA", "test", true, "NA", "NA");
// signUpStudent("Arabelle", "Siahaan", "test@ucla.edu", "12356789", 4, "L21", "CS", "NA", "test", true, "NA", "NA");
// signUpRecruiter("Recruiter", "Test", "Company", "abc@company.com", "NA");

router.post('/', async (req, res, next) => {

	let StudentORrecruiter = req.body.StudentORrecruiter

	console.log(req.body.StudentORrecruiter)
	if (StudentORrecruiter === 'student') {
		let email = req.body.email
		let password = req.body.password
		let firstName = req.body.firstName
		let lastName = req.body.lastName
		let sid = req.body.sid
		let YearLevel = req.body.YearLevel
		let gradTerm = req.body.gradTerm
		let major = req.body.major
		let minor = req.body.minor
		let club = req.body.club
		let resume = req.body.resume
		let profileImage = req.body.profileImage
		let honorStudent = req.body.honorStudent

		// check validity of values
		var reg = /^[a-zA-Z\s]*$/;
		if (!reg.test(firstName) || !reg.test(lastName) || !reg.test(major) || !reg.test(minor) ||
			!reg.test(YearLevel)) {
			res.status(400).json({ msg: "One of the values is not valid input!" })
			return
		}

		if (YearLevel < 1 && year > 5) {
			res.status(400).json({ msg: "year value can only be between 1 to 5" })
			return
		}
		if (!(/^\d+$/.test(sid)) || sid.length != 9) {
			res.status(400).json({ msg: "sid should contain 9 digits" })
			return
		}
		if (!validateEmail(email) || !email.includes("ucla.edu")) {
			res.status(400).json({ msg: "Email contains invalid characters or is not UCLA email" })
			return
		}

		var gradQ1 = gradTerm.charAt(0);
		var gradQ2 = gradTerm.substring(0, 1);
		var reg = /^[a-zA-Z]{1,6}[0-9]{2}[:.,-]?$/;
		if (!reg.test(gradTerm)) {
			res.status(400).json({ msg: "gradTerm has invalid format" })
			return
		}

		// connect to database
		await client.connect()
			.catch(error => handleError(error));
		console.log("Succesfully connected to DB...")
		const database = client.db("test");
		const col = database.collection("Student");
		const finduser = col.findOne({ "email": email }, async function (err, result) {
			if (result) {
				res.status(400).json({ msg: "This email is already used!" })
				return
			}
			else {
				var doc = await signUpStudent(firstName, lastName, email, password, sid, YearLevel, gradTerm, major, minor, club, honorStudent, resume, profileImage);

				var returnedUser = {
					"id" : doc.ops[0]._id,
					"firstName": doc.ops[0].firstName,
					"lastName": doc.ops[0].lastName,
					"email": doc.ops[0].email,
					"sid": doc.ops[0].sid,
					"YearLevel": doc.ops[0].YearLevel,
					"gradTerm" : doc.ops[0].gradTerm,
					"major" : doc.ops[0].major,
					"minor" : doc.ops[0].minor,
					"profileImage" : doc.ops[0].profileImage,
					"resume" : doc.ops[0].resume,
					"club" : doc.ops[0].club,
					"gradTerm" : doc.ops[0].gradTerm,
					"honorStudent" : doc.ops[0].honorStudent,
					"StudentORrecruiter" : "student"
				}
				let expiration = Math.floor(Date.now() / 1000) + (2 * (60 * 60));
				let token = jwt.sign({ exp: expiration, usr: email }, config.JWT_SECRET);
				res.cookie('jwt', token);
				res.status(200).json(returnedUser);

			}
		})



	}
	if (StudentORrecruiter === 'recruter') {
		let email = req.body.email
		let password = req.body.password
		let firstName = req.body.firstName
		let lastName = req.body.lastName
		let companyName = req.body.companyName
		let profileImage = req.body.profileImage

		var reg = /^[a-zA-Z\s]*$/;

		// if (!reg.test(firstName) || !reg.test(lastName) || !reg.test(major) || !reg.test(minor)) {
		// 	res.status(400).json({ msg: "One of the values is not valid input!" })
		// 	return
		// }

		if (!validateEmail(email)) {
			res.status(400).json({ msg: "Email contains invalid characters" })
			return
		}

		if (!email || !password || !firstName || !lastName){
			res.status(400).json({ msg: "Inputs are required!" })
			return
		}
		
		
		// connect to database
		await client.connect()
			.catch(error => handleError(error));
		console.log("Succesfully connected to DB...")
		const database = client.db("test");
		const col = database.collection("Recruiter");
		const finduser = col.findOne({ "email": email }, async function (err, result) {
			if (result) {
				res.status(400).json({ msg: "This email is already used!" })
				return
			}
			else {
		const doc = await signUpRecruiter(firstName, lastName, companyName, email, password, profileImage)
		var returnedUser = {
			"id" : doc.ops[0]._id,
			"firstName": doc.ops[0].firstName,
			"lastName": doc.ops[0].lastName,
			"email": doc.ops[0].email,
			"companyName" : doc.ops[0].companyName,
			"profileImage" : doc.ops[0].profileImage,
			"StudentORrecruiter" : "recruter"
		}
		let expiration = Math.floor(Date.now() / 1000) + (2 * (60 * 60));
		let token = jwt.sign({ exp: expiration, usr: email }, config.JWT_SECRET);
		res.cookie('jwt', token);
		res.status(200).json(returnedUser);
		}})




	}
	else {
		res.status(400).json({ msg: "User status is undefined!" })
				return
	}




	// await signUpStudent()
	// console.log(req.body);
	// console.log(req.query)
	// let type_of_user = req.body;
	// console.log(type_of_user);

});

module.exports = router;