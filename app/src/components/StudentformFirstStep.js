import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormFeedback, FormText , Button, Card} from 'reactstrap';
import "../App.css";

export default class StudentformFirstStep extends Component {
	continue = e => {
		e.preventDefault()
		this.props.nextStep()
	}
	render() {
		const { values, handleChange, nextStep} = this.props
		return (
		<div >
			<h3 className="my-2">Make the most of your journey in UCLA</h3>
			<hr></hr>
			<form className="my-2">
		<FormGroup >
        <Label for="firstName" >Your first name</Label>
        <Input className="form-control" type="text" name="firstName"  id="firstName"  
		 onChange = {handleChange('firstName')}
		 Value={values.firstName}
		/>
      </FormGroup>
	  <FormGroup>
        <Label for="lastName">Your last name</Label>
        <Input type="text" name="lastName" id="lastName" 
		onChange = {handleChange('lastName')}
		Value={values.lastName}
		/>
      </FormGroup>
	  <FormGroup>
        <Label for="email">Your email</Label>
        <Input type="email" name="email" id="email" 
		onChange = {handleChange('email')}
		Value={values.email}
		/>
      </FormGroup>
	  <Button onClick={this.continue} >Next Step</Button>
			</form>
			</div>
		)
	}
}
