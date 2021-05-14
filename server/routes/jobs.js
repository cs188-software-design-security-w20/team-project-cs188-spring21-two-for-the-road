const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router()
// var multer  = require('multer')
// var upload = multer({ dest: '../app/public/images' })
const jwt = require('jsonwebtoken')

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

let handleError = (error) => {
	console.log(error);
}

async function addJob(title, description, ownerEmail, companyName){
  try {
    // connect to database
    await client.connect()
      .catch(error => handleError(error));
    console.log("Succesfully connected to DB...")

    const database = client.db("test");
    const col = database.collection("Jobs");

    const max_id = await col.find().sort({jobID:-1}).limit(1).toArray()
      .catch(error => handleError(error));
    console.log(max_id[0].jobID);

    var jobID;
    if (!max_id){
      jobId = 1;
    } else{
      console.log(max_id);
      jobID = max_id[0].jobID + 1;
    }

    console.log(jobID);
    // create doc to be inserted
    var doc = {
      jobID:jobID,
      title:title,
      description:description,
      ownerEmail:ownerEmail,
      companyName:companyName,
      dateCreated: new Date()
    };

    const result = await col.insertOne(doc)
      .catch(error => handleError(error));
    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
    );
  } finally {
    // await client.close();
    ;
  }
  return jobID;
}

async function getJob(jobID) {
    try {
      // connect to database
      await client.connect()
        .catch(error => handleError(error));
      console.log("Succesfully connected to DB...")

      const database = client.db("test");
      const col = database.collection("Jobs");

      // create doc to be inserted after checking for params
      var query = {
        jobID:jobID
      };

      const result = await col.findOne(query)
        .catch(error => handleError(error));
      console.log(result);

      } finally {
        ;
      }
    return result;
}



//get job by Id
router.get('/getJob', async (req, res) => {
  // connect to database
  var jobID = req.body.jobID;
  await client.connect()
    .catch(error => handleError(error));
  console.log("Succesfully connected to DB...")

  const database = client.db("test");
  const col = database.collection("Jobs");

  // create doc to be inserted after checking for params
  var query = {
    "jobID" : parseInt(jobID)
  };

  const result = await col.findOne(query, async function (err, result){
    
	
	if (!result){
      return res.status(401).send("No jobs found with jobID " + jobID);
    } else{
      return res.status(200).json(result)
    }
	
  });
});






//create a job offer
router.post('/postjob', async (req, res) =>{

  let title = req.body.title;
  let description = req.body.description;
  let ownerEmail = req.body.ownerEmail;
  let companyName = req.body.companyName;

  if (!title || !ownerEmail){
    res.status(404).send("Need job title and owner email");
	return
  }

  await client.connect()
    .catch(error => handleError(error));
  console.log("Succesfully connected to DB...")

  const database = client.db("test");
  const col = database.collection("Jobs");

  const max_id = await col.find().sort({jobID:-1}).limit(1).toArray()
    .catch(error => handleError(error));

  var jobID;
  if (!max_id){
    jobId = 1;
  } else{
    console.log(max_id);
    jobID = max_id[0].jobID + 1;
  }

  console.log(jobID);
  // create doc to be inserted
  var doc = {
    jobID:jobID,
    title:title,
    description:description,
    ownerEmail:ownerEmail,
    companyName:companyName,
    dateCreated: new Date()
  };

  const result = await col.insertOne(doc)
    .catch(error => handleError(error));
  console.log(
   // `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
  );
console.log(result)
  res.status(200).send('created!');
  return
});

router.get('/jobs', async (req, res)=> {
	await client.connect()
    .catch(error => handleError(error));
  console.log("Succesfully connected to DB...")
  const database = client.db("test");
  const col = database.collection("Jobs");
  const jobs = await col.find().toArray().then( jobs => {
	res.status(200).json(jobs)
  }

  )
	
})

module.exports = router;
