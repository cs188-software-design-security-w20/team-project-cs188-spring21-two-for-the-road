import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button, Card, Alert } from 'reactstrap';
import "../App.css";
import {register} from '../actions/authAction'
import {clearErrors} from '../actions/errorActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class SformfourthStep extends Component {

	constructor(props) {
		super(props);
		this.state = {
			msg:null,
			invalidImage: null,
			validate: {
				minorState: 'danger',

			},
		};
		this.reader = new FileReader();
	}

	static propTypes = {
        isAuthenticated : PropTypes.bool,
        error : PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }
  
	componentDidUpdate(prevProps){
		const { error, history, location, isAthenticated } = this.props;
		  
		  if(error !== prevProps.error){
			  if(error.id=== 'REGISTER_FAIL'){
				  this.setState({msg: error.msg})
  
			  }
			  else {
				  this.setState({ msg: null})
			  }
		  }
		 // const redirect = location.search ? location.search.split('=')[1] : '/'
		 // if (!isAthenticated) {
		 //     history.push(redirect)
		 // }
  
	  }


	  onSubmit = e =>{
        this.props.clearErrors();
        e.preventDefault();
        const { values } = this.props
        //Create User Object
		const formData = new FormData()
		formData.append("firstName", values.firstName)
		formData.append("lastName", values.lastName)
		formData.append("email", values.email)
		formData.append("sid", values.sid)
        formData.append("YearLevel", values.YearLevel)
        formData.append("gradTerm" , values.gradTerm)
        formData.append("major" , values.major)
        formData.append("minor" , values.minor)
        formData.append("club" , values.club)
        formData.append("honorStudent" , values.honorStudent)
        formData.append("StudentORrecruiter" , values.StudentORrecruiter)
		formData.append("password" , values.password)
        formData.append('profileImage', values.profileImage)
        formData.append("resume" , values.resume)
		
        
		
		const newUser =
        {
					"firstName": values.firstName,
					"lastName": values.lastName,
					"email": values.email,
					"sid": values.sid,
					"YearLevel": values.YearLevel,
					"gradTerm" : values.gradTerm,
					"major" : values.major,
					"minor" : values.minor,
					"profileImage" : formData,
					"resume" : values.resume,
					"club" : values.club,
					"password" : values.password,
					"honorStudent" : values.honorStudent,
					"StudentORrecruiter" : values.StudentORrecruiter
          
        }
        //Attempt to register
		console.log(formData)
        this.props.register(formData);
        console.log(`The message is : ${this.state.msg}`);
        e.target.className += " was-validated";

    }



	
	continue = e => {
		const { values } = this.props
		e.preventDefault()
		if (!values.resume || this.state.invalidImage === "Invalid file: Please select a valid document.") {
			alert("Something is wrong with your inputs: Please Select a valid document PDF or doc")

		}
		else {
			this.props.nextStep()

		}
	}
	back = e => {
		e.preventDefault()
		this.props.prevStep()
	}

	resumevalidate = e => {
		const imageFile = e.target.files[0];
		if (!imageFile) {
			this.setState({ invalidImage: "Invalid file: Please select a valid document." });
			return false;
		}

		if (!imageFile.name.match(/\.(doc|pdf|docx)$/)) {
			this.setState({ invalidImage: "Invalid file: Please select a valid document." });
			return false;
		}
		else {
			this.setState({ invalidImage: null });
		}
	}


	clubvalidation(e) {
		const { validate } = this.state
		const { values, handleChange, nextStep } = this.props
		var reg = /^[a-zA-Z\s]*$/;
		if (reg.test(e.target.value)) {
			validate.clubState = 'has-success'
		}
		else {
			validate.clubState = 'has-danger'
		}
		this.setState({ validate })



	}





	render() {
		const { invalidImage } = this.state;
		const { values, handleChange } = this.props
		return (
			<div >
				<hr></hr>
				{this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
				<form className="my-1" onSubmit={this.onSubmit} enctype="multipart/form-data">

					<FormGroup>
						<Label for="resume">Upload your resume</Label>
						<Input type="file" name="resume" id="resume"
							onChange={e => {
								handleChange(e.target.name, e.target.files[0]);
								this.resumevalidate(e);
							}}
						/>
						{invalidImage && <p className="invalid-pass">{invalidImage}</p>}
						<FormText color="muted">
							Only .docx or pdf files are allowed
        </FormText>
					</FormGroup>





					<FormGroup>
						<Label for="clubs">Clubs</Label>
						<Input type="text" name="club" id="club" placeholder=""
							onChange={e => {
								handleChange(e.target.name, e.target.value);
								this.clubvalidation(e)
							}}
							valid={this.state.validate.clubState === 'has-success'}
							invalid={this.state.validate.clubState === 'has-danger'}
							defaultValue={values.club}
						/>
						<FormFeedback valid>
							Your student id looks good.
             		    </FormFeedback>
						<FormFeedback>
							Uh oh! This field should not contain digits or special characters
              			</FormFeedback>

						<FormText color="muted">
							If you have more than one club sepearte them with comma.
        </FormText>
					</FormGroup>
					<Button onClick={this.back} > Previeus step</Button>
					<Button className="mx-2" >Next Step</Button>
				</form>
			</div>
		)
	}
}
const mapStateToProps = state =>({
    isAuthenticated : state.auth.isAuthenticated,
    error: state.error
})
export default connect (
    mapStateToProps,
    {register, clearErrors}
)(SformfourthStep );