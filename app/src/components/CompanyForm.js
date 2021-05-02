import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormFeedback, FormText , Button, Card} from 'reactstrap';
import "../App.css";

export default class CompanyForm extends Component {
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
        <Label for="profileImage">Upload a profile picture</Label>
        <Input type="file" name="profileImage" id="profileImage" />
        <FormText color="muted">
          Only JPG or PNG files are allowed
        </FormText>
      </FormGroup>

			<FormGroup>
        <Label for="companyName">Company name: </Label>
        <Input type="text" name="companyName" id="companyName" placeholder="" 
		onChange = {handleChange('companyName')}
		defaultValue={values.companyName}
		/>
      </FormGroup>
	<Button  onClick={this.back} > Previeus step</Button>
	  <Button className="mx-2" onClick={this.continue} >Next Step</Button>
			</form>
			</div>
		)
	}
}
