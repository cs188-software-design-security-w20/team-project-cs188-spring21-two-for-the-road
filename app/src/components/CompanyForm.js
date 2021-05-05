import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormFeedback, FormText , Button, Card} from 'reactstrap';
import "../App.css";

export default class CompanyForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			invalidImage: null,
			validate: {
				companyState: 'danger',

			},
		};
		this.reader = new FileReader();
	}

	continue = e => {
		e.preventDefault()
		this.props.nextStep()
	}
	back = e => {
		e.preventDefault()
		this.props.prevStep()
	}


	imagevalidate = e => {
		const imageFile = e.target.files[0];
			if (!imageFile) {
			this.setState({ invalidImage: "Invalid file: Please select a valid image." });
			return false;
		  }
	  
		  if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
			this.setState({ invalidImage: "Invalid file: Please select a valid image." });
			return false;
		  }
		else{
			this.setState({ invalidImage: null });
		}
	}


	companyvalidation(e) {
		const { validate } = this.state
		const { values, handleChange, nextStep } = this.props
		var reg = /^[a-zA-Z0-9]*$/;
		if (reg.test(e.target.value)) {
			validate.companyState = 'has-success'
		}
		else {
			validate.companyState = 'has-danger'
		}
		this.setState({ validate })
		


	}


	render() {
		const {  invalidImage } = this.state;
		const { values, handleChange} = this.props
		return (
		<div >
			<hr></hr>
			<form className="my-1">

			<FormGroup>
        <Label for="profileImage">Upload a profile image</Label>
        <Input type="file" name="profileImage" id="profileImage" 
		onChange = { (e) => {
			handleChange(e.target.name, e.target.files[0]);
			this.imagevalidate(e)
			
		}}
		
		/>
		{invalidImage && <p className="invalid-pass">{invalidImage}</p>}
        <FormText color="muted">
          Only file with image extensions are allowed: JPG or PNG
        </FormText>
      </FormGroup>

			<FormGroup>
        <Label for="companyName">Company name: </Label>
        <Input type="text" name="companyName" id="companyName" placeholder="" 
		onChange = {e => 
			{handleChange(e.target.name, e.target.value);
				this.companyvalidation(e)
			}}
			valid={this.state.validate.companyState === 'has-success'}
							invalid={this.state.validate.companyState === 'has-danger'}
		defaultValue={values.companyName}
		/>
			<FormFeedback valid>
							Your student id looks good.
             		    </FormFeedback>
						<FormFeedback>
							Uh oh! This field should not contain digits or special characters
              			</FormFeedback>
      </FormGroup>
	<Button  onClick={this.back} > Previeus step</Button>
	  <Button className="mx-2" onClick={this.continue} >Next Step</Button>
			</form>
			</div>
		)
	}
}
