const mongoose = require('mongoose')

const JobPostings = mongoose.Schema({
    CompanyName :{type : String, required: true},
    Email :{type : String, required: true},
    CompanyLogo :{type : String, required: false},
    JobTitle :{type : String, required: true},
    jobFunction :{type : String, required: true},
    JobLocation :{type : String, required: true},
    numberofApplicants :{type : Number, required: false}, //number of applicants applied for this job
    seniorityLevel : {type : String, required: true},
    description :{type : String, required: true},
    employmentType : {type : String, required: true},
    industryType : {type : String, required: true},
    experience : {type : Number, required: true},
    budget : {type : Number, required: true},
	applicationDeadline : {type : Date, required: true},
}, {timestamps: true})

module.exports=mongoose.model('JobPostings', userSchema)