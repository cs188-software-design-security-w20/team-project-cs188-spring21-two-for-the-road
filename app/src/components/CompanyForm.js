import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button, Card, Alert } from 'reactstrap';
import "../App.css";
import {register} from '../actions/authAction'
import {clearErrors} from '../actions/errorActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Route , withRouter} from 'react-router-dom';

 class CompanyForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			msg:null,
			invalidImage: null,
			validate: {
				companyState: 'danger',

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
        formData.append("companyName" , values.companyName)
        formData.append("StudentORrecruiter" , values.StudentORrecruiter)
		formData.append("password" , values.password)
        formData.append('profileImage', values.profileImage)

		console.log(formData)
        this.props.register(formData);
        console.log(`The message is : ${this.state.msg}`);
        e.target.className += " was-validated";
	
	}

	continue = e => {
		e.preventDefault()
		this.props.nextStep()
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


	companyvalidation(e) {
		const { validate } = this.state
		const { values, handleChange, nextStep } = this.props
		var reg = /^[a-zA-Z0-9]*$/;
		if (reg.test(e.target.value)) {
			validate.companyState = 'has-success'
		}
		else {
			validate.companyState = 'has-danger'
		}
		this.setState({ validate })
		


	}


	render() {
		const {  invalidImage } = this.state;
		const { values, handleChange} = this.props
		if(this.props.isAuthenticated)
		{this.props.history.push('/job-apps')}
		return (

		<div >
			<hr></hr>
			{this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
			<form className="my-1" onSubmit={this.onSubmit} enctype="multipart/form-data">

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

			<FormGroup>
        <Label for="companyName">Company name: </Label>
        <Input type="text" name="companyName" id="companyName" placeholder="" 
		onChange = {e => 
			{handleChange(e.target.name, e.target.value);
				this.companyvalidation(e)
			}}
			valid={this.state.validate.companyState === 'has-success'}
							invalid={this.state.validate.companyState === 'has-danger'}
		defaultValue={values.companyName}
		/>
			<FormFeedback valid>
							Your student id looks good.
             		    </FormFeedback>
						<FormFeedback>
							Uh oh! This field should not contain digits or special characters
              			</FormFeedback>
      </FormGroup>
	<Button  onClick={this.back} > Previeus step</Button>
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
)(withRouter(CompanyForm ));