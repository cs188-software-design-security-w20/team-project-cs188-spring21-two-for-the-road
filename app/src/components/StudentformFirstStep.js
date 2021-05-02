import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button, InputGroup, Card } from 'reactstrap';
import "../App.css";

export default class StudentformFirstStep extends Component {

	constructor(props) {
		super(props);
		this.state = {
			validate: {
				emailState: '',
			},
		}

	}

	continue = e => {
		e.preventDefault()
		this.props.nextStep()
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
							onChange={handleChange('firstName')}
							Value={values.firstName}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="lastName">Your last name</Label>
						<Input type="text" name="lastName" id="lastName"
							onChange={handleChange('lastName')}
							Value={values.lastName}
						/>
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
