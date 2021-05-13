const React = require('react')
const Header = require("../components/Header")
const config = require('../../server/config/config.js')
const { app: {port, node_env}, database: { username, password, db } } = config;
const uri = `mongodb+srv://${username}:${password}@cs188.pjfhc.mongodb.net/${db}?retryWrites=true&w=majority`;
const client = require('mongodb').MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const express = require('express')
const app = express()
require('dotenv').config({path: './config/config.env'})

class listOfJobs extends React.Component {

  async addJob(title, description, ownerEmail, companyName){
    try {
  		// connect to database
  		await client.connect()
  			.catch(error => handleError(error));
  		console.log("Succesfully connected to DB...")

  		const database = client.db("test");
  		const col = database.collection("Jobs");

      const max_id = col.find().sort({age:-1}).limit(1);
      var jobID = 0;
      if (max_id == {}){
        jobId = 1;
      } else{
        jobID = max_id.jobID + 1;
      }

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
  		return result
  	} finally {
  		// await client.close();
  		;
  	}
  	return 1;
  }
  }

  async function getData(jobID) {
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
        return result;

        } finally {
          await client.close();
        }

     //  let result = {
     //    students: [
     //       { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com' },
     //       { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
     //       { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
     //       { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
     //    ]
     // }
     //  this.setState(result);
  }

  async componentWillMount() {
     await this.getData();
  }


   renderTableHeader() {
   // await this.componentDidMount();
     let header = Object.keys(this.state.students[0])
     return header.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
     })
  }

renderTableData() {
     return this.state.students.map((student, index) => {
        const { id, name, age, email } = student //destructuring
        return (
           <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{email}</td>
           </tr>
        )
     })
  }

  render() {
     return (
        <div>
      <Header />
           <h1 id='title'>React Dynamic Table</h1>
           <table id='students'>
              <tbody>
                 <tr>{this.renderTableHeader()}</tr>
                 {this.renderTableData()}
              </tbody>
           </table>
        </div>
     )
  }
}

export default listOfJobs;

// TESTS - uncomment this to test the function
addJob("SWE", "SWE Job at UCLA", "own1@abc.com", "UCLA");
// signUpStudent("Arabelle", "Siahaan", "test@gmail.edu", "123456789", 4, "W21", "CS", "NA", "test", true, "NA", "NA");
// signUpStudent("Arabelle", "Siahaan", "test@ucla.edu", "12356789", 4, "W21", "CS", "NA", "test", true, "NA", "NA");
// signUpStudent("Arabelle", "Siahaan", "test@ucla.edu", "12356789", 4, "L21", "CS", "NA", "test", true, "NA", "NA");
// signUpRecruiter("Recruiter", "Test", "Company", "abc@company.com", "NA");
