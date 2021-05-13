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

  var email = null;
  var payload = null;

  let handleError = (error) => {
    console.log(error);
  }

  router.all('/', (req, res, next) => {
    var toekn = req.cookies.jwt;


    if (token) {
        jwt.verify(token, config.JWT_SECRET, function(err, decoded) {
            if (err) {
                console.log("Error with Verifying!");
                res.sendStatus(401);
            } else {
                console.log('JWT cookie verified!');
                email = decoded.usr;
                next();
            }
        })

    } else {
        res.sendStatus(400);
    }
  });


  async function updateRecruiterEmail(new_email) {
	try {
		// connect to database
		await client.connect()
			.catch(error => handleError(error));
		console.log("Succesfully connected to DB...")

		const database = client.db("test");
		const col = database.collection("Recruiter");


		// create doc to be inserted after checking for params
		var doc = {
			email: new_email,
		};

		const result = await col.updateOne({email: email}, doc)
			.catch(error => handleError(error));
		return result

		//working on jWT and coockie creation in the signup

	} finally {
		// await client.close();
		;
	}
	return 1;
}

async function updateStudentEmail(new_email) {
	try {
		// connect to database
		await client.connect()
			.catch(error => handleError(error));
		console.log("Succesfully connected to DB...")

		const database = client.db("test");
		const col = database.collection("Student");

		var doc = {
			email: new_email,
		};

		const result = await col.updateOne({email: email}, doc)
			.catch(error => handleError(error));
		return result



	} finally {
		// await client.close();
		;
	}
	return 1;
}



  router.post('/changeStudentEmail', async (req, res, next) => {
    await client.connect()
    .catch(error => handleError(error));
    console.log("Succesfully connected to DB...")
    const database = client.db("test");
    const col = database.collection("Student");
    const finduser = col.findOne({ "email": email }, async function (err, result) {
        if (result) {
            //console.log("email alfrrady used!")
            var doc = updateStudentEmail(req.body.email);
            console.log("Successfully Updated Student's Email!");
            res.status(200).send("Student's new Email Address: " +  req.body.email);
            return
        }

  })
});

  router.post('/changeRecruiterEmail', async (req, res, next) => {
    await client.connect()
    .catch(error => handleError(error));
    console.log("Succesfully connected to DB...")
    const database = client.db("test");
    const col = database.collection("Recruiter");
    const finduser = col.findOne({ "email": email }, async function (err, result) {
        if (result) {
            //console.log("email alfrrady used!")
            var doc = updateRecruiterEmail(req.body.email);
            console.log("Successfully Updated Recruiter's Email!");
            res.status(200).send("Recruiter's new Email Address: " +  req.body.email);
            return
        }

  })
});

  async function updateStudentPassword(new_password) {
	try {
		// connect to database
		await client.connect()
			.catch(error => handleError(error));
		console.log("Succesfully connected to DB...")

		const database = client.db("test");
		const col = database.collection("Student");

        var salt = bcrypt.genSaltSync(10);
		var hashed_password = bcrypt.hashSync(new_password, salt);

		var doc = {
			hashed_password: new_password,
		};

		const result = await col.updateOne({email: email}, doc)
			.catch(error => handleError(error));
		return result;

	} finally {
		// await client.close();
		;
	}
	return 1;
}

async function updateRecruiterPassword(new_password) {
	try {
		// connect to database
		await client.connect()
			.catch(error => handleError(error));
		console.log("Succesfully connected to DB...")

		const database = client.db("test");
		const col = database.collection("Recruiter");

        var salt = bcrypt.genSaltSync(10);
		var hashed_password = bcrypt.hashSync(new_password, salt);

		var doc = {
			hashed_password: new_password,
		};

		const result = await col.updateOne({email: email}, doc)
			.catch(error => handleError(error));
		return result;

	} finally {
		// await client.close();
		;
	}
	return 1;
}


  router.post('/changeRecruiterPassword', async (req, res, next) => {
    await client.connect()
    .catch(error => handleError(error));
    console.log("Succesfully connected to DB...")
    const database = client.db("test");
    const col = database.collection("Recruiter");
    const finduser = col.findOne({ "email": email }, async function (err, result) {
        if (result) {
            //console.log("email alfrrady used!")
            var doc = updateRecruiterPassword(req.body.password);
            console.log("Successfully Updated Recruiter's Password!");
            res.status(200).send("Recruiter's new Password: " +  req.body.password);
            return;
        }
  })
});

  router.post('/changeStudentPassword', async (req, res, next) => {
    await client.connect()
    .catch(error => handleError(error));
    console.log("Succesfully connected to DB...")
    const database = client.db("test");
    const col = database.collection("Student");
    const finduser = col.findOne({ "email": email }, async function (err, result) {
        if (result) {
            //console.log("email alfrrady used!")
            var doc = updateStudentPassword(req.body.password);
            console.log("Successfully Updated Recruiter's Password!");
            res.status(200).send("Recruiter's new Password: " +  req.body.password);
            return;
        }
  })
});

router.get('/showInfo',  async (req, res)=>{
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
					res.status(200).json(payload);
					return

				

			}
		});
    
	});

    module.exports = router;