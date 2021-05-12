import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button, Card, Alert } from 'reactstrap';
import "../App.css";
import {register} from '../actions/authAction'
import {clearErrors} from '../actions/errorActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Route , withRouter} from 'react-router-dom';



 class SformThirdStep extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  msg:null,
		  selectedFile: null, // to store selected file
		  handleResponse: null, // handle the API response
		  imageUrl: null, // to store uploaded image path
		  invalidImage: null,
		  validate: {
			sidState: 'danger',
			YearLevelState: 'danger',
			gradTermState: 'danger',
			majorState: 'danger',
			minorState: 'danger',
			honorState: 'danger',
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
		//   if (!isAthenticated) {
        //     history.push("/job-apps")
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
        formData.append("honorStudent" , values.honorStudent)
        formData.append("StudentORrecruiter" , values.StudentORrecruiter)
		formData.append("password" , values.password)
        formData.append('profileImage', values.profileImage)
    
		
		
    
		
		
		
        
		
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
		e.preventDefault()
		const {values} = this.props
		if (!values.profileImage || this.state.invalidImage ===  "Invalid file: Please select a valid image.") {
			alert("Something is wrong with your inputs: Please Select a valid image JPG or PNG")

		}
		
		else if (!values.sid ) {
			alert("Something is wrong with your inputs: Your student ID is required and it should be numbers")

		}

		else if (!values.YearLevel ) {
			alert("Something is wrong with your inputs: Your university level is required")

		}
		else if (!values.gradTerm) {
			alert("Something is wrong with your inputs: Your graduation term is required!")

		}
		else if (!values.major) {
			alert("Something is wrong with your inputs: Your major is required!")

		}
	
		else if (!values.honorStudent) {
			alert("Something is wrong with your inputs: Your email should be a valid UCLA Email and not empty!")

		}

		else {
			this.props.nextStep()

		}
		
	}


	back = e => {
		e.preventDefault()
		this.props.prevStep()
	}

	imagevalidate = e => {
		const imageFile = e.target.files[0];
			if (!imageFile) {
			this.setState({ invalidImage: "Invalid file: Please select a valid image." });
			return false;
		  }
	  
		  if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
			this.setState({ invalidImage: "Invalid file: Please select a valid image." });
			return false;
		  }
		else{
			this.setState({ invalidImage: null });
		}
	}

	sidvalidation(e) {
		const { validate } = this.state
		const { values, handleChange, nextStep } = this.props
		var reg = /^([0-9\b]{9})$/;
		if (reg.test(e.target.value)) {
			validate.sidState = 'has-success'
		}
		else {
			validate.sidState = 'has-danger'
		}
		this.setState({ validate })
		


	}

	gradvalidation(e) {
		const { validate } = this.state
		const { values, handleChange, nextStep } = this.props
		var reg = /^[a-zA-Z]{1,6}[0-9]{2}[:.,-]?$/;
		if (reg.test(e.target.value)) {
			validate.gradTermState = 'has-success'
		}
		else {
			validate.gradTermState = 'has-danger'
		}
		this.setState({ validate })
		


	}

	majorvalidation(e) {
		const { validate } = this.state
		const { values, handleChange, nextStep } = this.props
		var reg = /^[a-zA-Z\s]*$/;
		if (reg.test(e.target.value)) {
			validate.majorState = 'has-success'
		}
		else {
			validate.majorState = 'has-danger'
		}
		this.setState({ validate })
		


	}
	minorvalidation(e) {
		const { validate } = this.state
		const { values, handleChange, nextStep } = this.props
		var reg = /^[a-zA-Z\s]*$/;
		if (reg.test(e.target.value)) {
			validate.minorState = 'has-success'
		}
		else {
			validate.minorState = 'has-danger'
		}
		this.setState({ validate })
		


	}


	render() {
		const { handleResponse, imageUrl, invalidImage } = this.state;

		const { values, handleChange, history} = this.props
		if(this.props.isAuthenticated)
		{this.props.history.push('/job-apps')}

		return (
		<div >
		{this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}

			<form onSubmit={this.onSubmit} enctype="multipart/form-data">

{/*  picture profile*/}
			<FormGroup>
        <Label for="profileImage">Upload a profile image</Label>
        <Input type="file" name="profileImage" id="profileImage" 
		onChange = { (e) => {
			handleChange(e.target.name, e.target.files[0]);
			this.imagevalidate(e)
			
		}}
		
		/>
		{invalidImage && <p className="invalid-pass">{invalidImage}</p>}
        <FormText color="muted">
          Only file with image extensions are allowed: JPG or PNG
        </FormText>
      </FormGroup>



{/*  student ID*/}
			<FormGroup>
        <Label for="sid">Your Student ID</Label>
        <Input type="text" name="sid" id="sid" placeholder="" 
		onChange = {e => {handleChange(e.target.name, e.target.value);
		this.sidvalidation(e)}}
		valid={this.state.validate.sidState === 'has-success'}
		invalid={this.state.validate.sidState === 'has-danger'}
		defaultValue={values.sid}
		/>
		<FormFeedback valid>
							Your student id looks good.
             		    </FormFeedback>
						<FormFeedback>
							Uh oh! Your student Id should only be numbers and exactly 9 digits in length
              			</FormFeedback>
      </FormGroup>




{/*  YearLevel*/}

	  <FormGroup>
        <Label for="yearLevel">Select Your University level</Label>
        <Input type="select" name="YearLevel" id="YearLevel"
		onChange = {e => handleChange(e.target.name, e.target.value)}
		defaultValue={values.YearLevel}
		>
		  <option value="">select your level</option>
          <option value="freshman">Freshman</option>
          <option value="somophore">Somophore</option>
          <option value="junior">Junior</option>
          <option value="senior">Senior</option>
          <option value="supersenior or above">Supersenior & above</option>
        </Input>
      </FormGroup>


	  {/*  Graduation term*/}

	  <FormGroup>
        <Label for="gradTerm">Graduation Term</Label>
        <Input type="text" name="gradTerm" id="gradTerm" placeholder="" 
		onChange = {e => {
			handleChange(e.target.name, e.target.value)
			this.gradvalidation(e)
		
		}}
		valid={this.state.validate.gradTermState === 'has-success'}
		invalid={this.state.validate.gradTermState === 'has-danger'}
		defaultValue={values.gradTerm}
		/>
		<FormFeedback valid>
							Your student id looks good.
             		    </FormFeedback>
						<FormFeedback>
							Uh oh! Your gradution should be in this form: summer21, winter22, fall21...
              			</FormFeedback>
    
      </FormGroup>




			{/*  major*/}
	  <FormGroup>
        <Label for="major">Your major</Label>
        <Input type="text" name="major" id="major" placeholder="" 
		onChange = {e => {
			this.majorvalidation(e)
			handleChange(e.target.name, e.target.value)}}
		valid={this.state.validate.majorState === 'has-success'}
		invalid={this.state.validate.majorState === 'has-danger'}
		defaultValue={values.major}
		/>
		<FormFeedback valid>
							Your student id looks good.
             		    </FormFeedback>
						<FormFeedback>
							Uh oh! Your major and your minor input should not contain numbers or speciak charachters.
              			</FormFeedback>
     
      </FormGroup>

			{/*  minor*/}
	  <FormGroup>
        <Label for="minor">Your minor (If applicable)</Label>
        <Input type="text" name="minor" id="minor" placeholder="" 
		onChange = {e => {
			this.minorvalidation(e)
			handleChange(e.target.name, e.target.value)}}
		valid={this.state.validate.minorState === 'has-success'}
		invalid={this.state.validate.minorState === 'has-danger'}
		defaultValue={values.minor}
		/>
      </FormGroup>

			{/*  honor*/}
	  <FormGroup className="my-1" check>
          <Label check>
            <Input type="radio" name="honorStudent" value="true"  defaultValue={values.honorStudent} onChange = {e => handleChange(e.target.name, e.target.value)}/>{' '}
           I am an honor student
          </Label>
        </FormGroup>


	<Button  onClick={this.back} > Previeus step</Button>
	  <Button className="mx-2" 
	//   onClick={this.continue} 
	  >Sign up</Button>
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
)(withRouter(SformThirdStep));
