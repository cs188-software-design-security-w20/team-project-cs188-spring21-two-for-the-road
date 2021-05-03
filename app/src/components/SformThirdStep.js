import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormFeedback, FormText , Button, Card} from 'reactstrap';
import "../App.css";

export default class SformThirdStep extends Component {
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
			<form >

			<FormGroup>
        <Label for="profileImage">Upload a profile image</Label>
        <Input type="file" name="profileImage" id="profileImage" />
        <FormText color="muted">
          Only file with image extensions are allowed: .JPG or NPG
        </FormText>
      </FormGroup>
			<FormGroup>
        <Label for="sid">Your Student ID</Label>
        <Input type="text" name="sid" id="sid" placeholder="" 
		onChange = {handleChange('sid')}
		defaultValue={values.sid}
		/>
      </FormGroup>

	  <FormGroup>
        <Label for="yearLevel">Select Your University level</Label>
        <Input type="select" name="YearLevel" id="YearLevel"
		onChange = {handleChange('YearLevel')}
		defaultValue={values.YearLevel}
		>
          <option value="freshman">Freshman</option>
          <option value="somophore">Somophore</option>
          <option value="junior">Junior</option>
          <option value="senior">Senior</option>
          <option value="supersenior or above">Supersenior & above</option>
        </Input>
      </FormGroup>

	  <FormGroup>
        <Label for="gradTerm">Graduation Term</Label>
        <Input type="text" name="gradTerm" id="gradTerm" placeholder="" 
		onChange = {handleChange('gradTerm')}
		defaultValue={values.gradTerm}
		/>
      </FormGroup>

	  <FormGroup>
        <Label for="major">Your major</Label>
        <Input type="text" name="major" id="major" placeholder="" 
		onChange = {handleChange('major')}
		defaultValue={values.major}
		/>
      </FormGroup>

	  <FormGroup>
        <Label for="minor">Your minor (If applicable)</Label>
        <Input type="text" name="minor" id="minor" placeholder="" 
		onChange = {handleChange('minor')}
		defaultValue={values.minor}
		/>
      </FormGroup>

	  <FormGroup className="my-2" check>
          <Label check>
            <Input type="radio" name="honorStudent" value="true"  defaultValue={values.honorStudent} onChange = {handleChange('honorStudent')}/>{' '}
           I am an honor student
          </Label>
        </FormGroup>


	<Button  onClick={this.back} > Previeus step</Button>
	  <Button className="mx-2" onClick={this.continue} >Next Step</Button>
			</form>
			</div>
		)
	}
}
