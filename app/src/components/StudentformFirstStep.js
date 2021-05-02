import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button, InputGroup, Card } from 'reactstrap';
import "../App.css";

export default class StudentformFirstStep extends Component {

	constructor(props) {
		super(props);
		this.state = {
			validate: {
				emailState: 'danger',
				firstNameState: 'danger',
				lasNameState: 'danger'
			},
		}

	}

	continue = e => {
		e.preventDefault()
		if(this.state.validate.emailState === "has-danger" || this.state.validate.emailState === "danger"){
			alert("Something is wrong with your inputs: Your email should be a valid UCLA Email and not empty!")
	
		   }
		   else if(this.state.validate.firstNameState === "has-danger" || this.state.validate.firstNameState === "danger"){
			alert("Something is wrong with your inputs: Your first name is required and it should be only characters and spaces")
	
		   }
		   else if(this.state.validate.lasNameState === "has-danger" || this.state.validate.lasNameState === "danger"){
			alert("Something is wrong with your inputs: Your last nname is required and it should be only characters and spaces")
	
		   }
		   else{
			this.props.nextStep()

		   }
	}

	firstvalidation(e){
		const {validate} = this.state
		var reg = /^[a-zA-Z\s]*$/;
		if(reg.test(e.target.value))
		{
			validate.firstNameState = 'has-success'
		}
		else {
			validate.firstNameState  = 'has-danger'
		}
		this.setState({ validate })
	
	}

	Lastvalidation(e){
		const {validate} = this.state
		var reg = /^[a-zA-Z\s]*$/;
		if(reg.test(e.target.value))
		{
			validate.lasNameState = 'has-success'
		}
		else {
			validate.lasNameState = 'has-danger'
		}
		this.setState({ validate })
	
	}
	validateEmail(e) {
		const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const { validate } = this.state
		if (emailRex.test(e.target.value) && e.target.value.includes('ucla.edu')) {
			validate.emailState = 'has-success'
		}
		else {
			validate.emailState = 'has-danger'
		}
		
		this.setState({ validate })

	}
	
	render() {
		const { values, handleChange, nextStep } = this.props
		return (
			<div >
				<h3 className="my-2">Make the most of your journey in UCLA</h3>
				<hr></hr>
				<form className="my-2">
					<FormGroup >
						<Label for="firstName" >Your first name</Label>
						<Input className="form-control" type="text" name="firstName" id="firstName"
						
							onChange={ (e) =>
								{
									this.firstvalidation(e)
									handleChange('firstName')}}
									valid={this.state.validate.firstNameState === 'has-success'}
									invalid={this.state.validate.firstNameState === 'has-danger'}
							Value={values.firstName}
						/>
						<FormFeedback valid>
							Your first name looks good.
             		    </FormFeedback>
						<FormFeedback>
							Uh oh! Looks like there is an issue with your first name. Please input a correct email.
              			</FormFeedback>

					</FormGroup>
					<FormGroup>
						<Label for="lastName">Your last name</Label>
						<Input type="text" name="lastName" id="lastName"
							onChange={(e)=>
								{
									this.Lastvalidation(e)
									handleChange('lastName')}}
									valid={this.state.validate.lasNameState === 'has-success'}
									invalid={this.state.validate.lasNameState === 'has-danger'}
							Value={values.lastName}
						/>
						<FormFeedback valid>
							Your last name looks good.
             		    </FormFeedback>
						<FormFeedback>
							Uh oh! Looks like there is an issue with your last name. Please input a correct email.
              			</FormFeedback>
					</FormGroup>
					<FormGroup>
						<Label for="email">Your email</Label>
						<Input type="text" name="email" id="email" placeholder="Email"
							onChange={ (e)=> {
								this.validateEmail(e)
								handleChange('email')}
								}
							valid={this.state.validate.emailState === 'has-success'}
							invalid={this.state.validate.emailState === 'has-danger'}
							Value={values.email}
						/>
						<FormFeedback valid>
							Your Email looks good.
             		    </FormFeedback>
						<FormFeedback>
							Uh oh! Looks like there is an issue with your email. Please input a correct email.
              			</FormFeedback>
					</FormGroup>
					<Button onClick={this.continue} >Next Step</Button>
				</form>
			</div>
		)
	}
}
