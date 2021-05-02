import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormFeedback, FormText , Button, Card} from 'reactstrap';
import "../App.css";

export default class StudentformSecontStep extends Component {
	continue = e => {
		e.preventDefault()
		this.props.nextStep()
	}
	back = e => {
		e.preventDefault()
		this.props.prevStep()
	}
	render() {
		const { values, handleChange} = this.props
		return (
		<div >
			<h3 className="my-2">Make the most of your journey in UCLA</h3>
			<hr></hr>
			<form className="my-2">
			<FormGroup>
        <Label for="Password">Password</Label>
        <Input type="password" name="password" id="Password" placeholder="password" 
		onChange = {handleChange('password')}
		defaultValue={values.password}
		/>
      </FormGroup>

	  <FormGroup>
        <Label for="confirmPassword">Confirm password</Label>
        <Input type="password" name="confirmpassword" id="confirmPassword" placeholder="confirm your password" />
      </FormGroup>

      <FormGroup tag="fieldset">
        <legend>Select what applies to you:</legend>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="StudentORrecruiter" value="student" onChange = {handleChange('StudentORrecruiter')}/>{' '}
            I am a student?
          </Label>
        </FormGroup>

        <FormGroup check>
          <Label check>
            <Input type="radio" name="StudentORrecruiter" value="recruiter"  onChange = {handleChange('StudentORrecruiter')}/>{' '}
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
