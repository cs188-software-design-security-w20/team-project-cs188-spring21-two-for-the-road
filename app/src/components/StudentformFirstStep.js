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
		const {values} = this.props
		if (!values.firstName || this.state.validate.firstNameState ==="has-danger") {
			alert("Something is wrong with your inputs: Your first name is required and it should be only characters and spaces")

		}

		else if (!values.lastName || this.state.validate.lasttNameState ==="has-danger" ) {
			alert("Something is wrong with your inputs: Your last name is required and it should be only characters and spaces")

		}
		else if (!values.email || this.state.validate.emailNameState ==="has-danger") {
			alert("Something is wrong with your inputs: Your email should be a valid UCLA Email and not empty!")

		}

		else {
			this.props.nextStep()

		}
	}

	firstvalidation(e) {
		const { validate } = this.state
		const { values, handleChange, nextStep } = this.props
		var reg = /^[a-zA-Z\s]*$/;
		if (reg.test(e.target.value)) {
			validate.firstNameState = 'has-success'
		}
		else {
			validate.firstNameState = 'has-danger'
		}
		this.setState({ validate })
		


	}

	Lastvalidation(e) {
		const { validate } = this.state
		var reg = /^[a-zA-Z\s]*$/;
		if (reg.test(e.target.value)) {
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
							onChange={
							e => {
								handleChange(e.target.name, e.target.value);
								this.firstvalidation(e)
							}}
							valid={this.state.validate.firstNameState === 'has-success'}
							invalid={this.state.validate.firstNameState === 'has-danger'}
							defaultValue={values.firstName}
						/>
						<FormFeedback valid>
							Your first name looks good.
             		    </FormFeedback>
						<FormFeedback>
							Uh oh! Looks like there is an issue with your first name. Please input a correct first name.
              			</FormFeedback>

					</FormGroup>
					<FormGroup>
						<Label for="lastName">Your last name</Label>
						<Input type="text" name="lastName" id="lastName"
							onChange={e => {
								handleChange(e.target.name, e.target.value);
								this.Lastvalidation(e)
							}}
							valid={this.state.validate.lasNameState === 'has-success'}
							invalid={this.state.validate.lasNameState === 'has-danger'}
							defaultValue={values.lastName}
						/>
						<FormFeedback valid>
							Your last name looks good.
             		    </FormFeedback>
						<FormFeedback>
							Uh oh! Looks like there is an issue with your last name. Please input a correct last name.
              			</FormFeedback>
					</FormGroup>
					<FormGroup>
						<Label for="email">Your email</Label>
						<Input type="text" name="email" id="email" placeholder="Email"
							onChange={e => {
								handleChange(e.target.name, e.target.value);
								this.validateEmail(e)
								
							}
							}
							valid={this.state.validate.emailState === 'has-success'}
							invalid={this.state.validate.emailState === 'has-danger'}
							defaultValue={values.email}
						/>
						<FormFeedback valid>
							Your Email looks good.
             		    </FormFeedback>
						<FormFeedback>
							Uh oh! Looks like there is an issue with your email. Please input a correct UCLA email.
              			</FormFeedback>
					</FormGroup>
					<Button onClick={this.continue} >Next Step</Button>
				</form>
			</div>
		)
	}
}
