import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormFeedback, FormText , Button, Card} from 'reactstrap';
import "../App.css";

export default class SformThirdStep extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  selectedFile: null, // to store selected file
		  handleResponse: null, // handle the API response
		  imageUrl: null, // to store uploaded image path
		  invalidImage: null // handle the message of the image validation
		};
		this.reader = new FileReader();
	  }

	continue = e => {
		e.preventDefault()
	
		if (this.state.invalidImage ===  "In valid file: Please select valid image.") {
			alert("Something is wrong with your inputs: Please Select a valid image JPG or PNG")

		}
		else{
			this.props.nextStep()
		}
		
	}


	back = e => {
		e.preventDefault()
		this.props.prevStep()
	}

	imagevalidate = e => {
		const imageFile = e.target.files[0];
			if (!imageFile) {
			this.setState({ invalidImage: "In valid file: Please select valid image." });
			return false;
		  }
	  
		  if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
			this.setState({ invalidImage: "In valid file: Please select valid image." });
			return false;
		  }
		
	}
	render() {
		const { handleResponse, imageUrl, invalidImage } = this.state;
		const { values, handleChange} = this.props
		return (
		<div >
			<form >

			<FormGroup>
        <Label for="profileImage">Upload a profile image</Label>
        <Input type="file" name="profileImage" id="profileImage" 
		onChange = { (e) => {
			handleChange(e.target.name, e.target.value);
			this.imagevalidate(e)
			
		}}
	
		/>
		{invalidImage && <p className="error">{invalidImage}</p>}
        <FormText color="muted">
          Only file with image extensions are allowed: .JPG or NPG
        </FormText>
      </FormGroup>
			<FormGroup>
        <Label for="sid">Your Student ID</Label>
        <Input type="text" name="sid" id="sid" placeholder="" 
		onChange = {e => handleChange(e.target.name, e.target.value)}
		defaultValue={values.sid}
		/>
      </FormGroup>

	  <FormGroup>
        <Label for="yearLevel">Select Your University level</Label>
        <Input type="select" name="YearLevel" id="YearLevel"
		onChange = {e => handleChange(e.target.name, e.target.value)}
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
		onChange = {e => handleChange(e.target.name, e.target.value)}
		defaultValue={values.gradTerm}
		/>
      </FormGroup>

	  <FormGroup>
        <Label for="major">Your major</Label>
        <Input type="text" name="major" id="major" placeholder="" 
		onChange = {e => handleChange(e.target.name, e.target.value)}
		defaultValue={values.major}
		/>
      </FormGroup>

	  <FormGroup>
        <Label for="minor">Your minor (If applicable)</Label>
        <Input type="text" name="minor" id="minor" placeholder="" 
		onChange = {e => handleChange(e.target.name, e.target.value)}
		defaultValue={values.minor}
		/>
      </FormGroup>

	  <FormGroup className="my-2" check>
          <Label check>
            <Input type="radio" name="honorStudent" value="true"  defaultValue={values.honorStudent} onChange = {e => handleChange(e.target.name, e.target.value)}/>{' '}
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
