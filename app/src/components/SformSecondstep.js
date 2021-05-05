import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormFeedback, FormText , Button, Card} from 'reactstrap';
import "../App.css";
import validator from 'validator'

export default class StudentformSecontStep extends Component {

	constructor(props) {
		super(props);
		this.state = {
			password: "",
			isSelect: false,
			validate: {
				passwordState : 'danger',
				passwordError : "",
				passwordConfirm: "",
				isConfirmed: false
			},
		}
		
	}

	continue = e => {
		e.preventDefault()
		const {values} = this.props
		if(!values.password ){
			alert("Something is wrong with your inputs: Password is required to signup!")

		}
		else if(!this.state.validate.isConfirmed){
			alert("Something is wrong with your inputs: Your password confirmarion doesn't match!")

		}
		else if(!this.state.isSelect){
			alert("Something is wrong with your inputs: Please select if you are a sudent or recruiter!")

		}
		else
	{
			this.props.nextStep()
		}

	}


	back = e => {
		e.preventDefault()
		// this.setState({
		// 	validate: {
		// 		passwordState : 'danger',
		// 		passwordError : "",
		// 		passwordConfirm: "",
		// 		isConfirmed: false
		// 	}
		// })
		this.props.prevStep()

	}

	validate = (value) => {
		const { validate } = this.state
		if (validator.isStrongPassword(value, {
		  minLength: 8, minLowercase: 1,
		  minUppercase: 1, minNumbers: 1, minSymbols: 1
		})) {
		validate.passwordError = "Is Strong Password"
		} else {
		validate.passwordError = "Is Not Strong Password"
		}
		this.setState({ validate })
	  }

    passwordUpdate(e){
		
		
		this.setState({ 
			password : e.target.value
		 })
	}

	selectconfirm(e){
		this.setState({
			isSelect : true
		})
	}

	passwordValidate(e){
		const { validate } = this.state
		const {values} = this.props
		if(e.target.value === values.password){
			validate.passwordConfirm = "Passwords match"
			validate.isConfirmed = true
		}
		else {
			validate.passwordConfirm = "Passwords do not match"
			validate.isConfirmed = false
		}
		this.setState({ validate })
	}

	render() {
		const { values, handleChange, nextStep} = this.props
		return (
		<div >
			<h3 className="my-2">Make the most of your journey in UCLA</h3>
			<hr></hr>
			<form className="my-2">
			<FormGroup>
        <Label for="Password">Password</Label>
        <Input type="password" name="password" id="Password" placeholder="password" 
		valid={this.state.validate.passwordState === 'has-success'}
		invalid={this.state.validate.passwordState === 'has-danger'}
		onChange = {
			e => {
			//this.passwordUpdate(e)
			handleChange(e.target.name, e.target.value);
			this.validate(e.target.value);
			//this.passwordUpdate(e)
			
		}}
		defaultValue={values.password}
		/>
		<span className={this.state.validate.passwordError === "Is Not Strong Password" ? 'invalid-pass' : 'valid-pass' }>{this.state.validate.passwordError}</span>
		<FormText color="muted">
          At least 8 characters with at least: 1 Upper case/ 1 lower case/ 1 digit/ 1 special character
        </FormText>
      </FormGroup>

	  <FormGroup>
        <Label for="confirmPassword">Confirm password</Label>
        <Input type="password" name="confirmpassword" id="confirmPassword" placeholder="Confirm your password" 
		onChange = {(e) => {
			this.passwordValidate(e);
			
		}}
		/>
		<span className={this.state.validate.passwordConfirm === "Passwords do not match" ? 'invalid-pass' : 'valid-pass' }>{this.state.validate.passwordConfirm}</span>
      </FormGroup>

      <FormGroup tag="fieldset">
        <legend>Select what applies to you:</legend>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="StudentORrecruiter" value="student" onChange = {
				(e) => {
					handleChange(e.target.name, e.target.value);
					this.selectconfirm(e);
					}}/>
            I am a student?
          </Label>
        </FormGroup>

        <FormGroup check>
          <Label check>
            <Input type="radio" name="StudentORrecruiter" value="recruiter"  onChange = {
				(e) => {
					handleChange(e.target.name, e.target.value);
					this.selectconfirm(e);
					}}/>
           I am a recruiter?
          </Label>
        </FormGroup>
		</FormGroup>
	<Button className="mx-2" onClick={this.back} > Previeus step</Button>
	  <Button onClick={this.continue} >Next Step</Button>
			</form>
			</div>
		)
	}
}
