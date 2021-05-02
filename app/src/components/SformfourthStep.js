import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormFeedback, FormText , Button, Card} from 'reactstrap';
import "../App.css";

export default class SformfourthStep extends Component {
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
			<hr></hr>
			<form className="my-1">

			<FormGroup>
        <Label for="resume">Upload your resume</Label>
        <Input type="file" name="resume" id="resume" />
        <FormText color="muted">
          Only .docx or pdf files are allowed
        </FormText>
      </FormGroup>
			<FormGroup>
        <Label for="clubs">Clubs</Label>
        <Input type="text" name="club" id="club" placeholder="" 
		onChange = {handleChange('club')}
		defaultValue={values.club}
		/>
		<FormText color="muted">
          If you have more than one club sepearte them with comma.
        </FormText>
      </FormGroup>
	<Button  onClick={this.back} > Previeus step</Button>
	  <Button className="mx-2" onClick={this.continue} >Next Step</Button>
			</form>
			</div>
		)
	}
}
