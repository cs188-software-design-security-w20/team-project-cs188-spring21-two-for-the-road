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
		  invalidImage: null,
		  validate: {
			sidState: 'danger',
			YearLevelState: 'danger',
			gradTermState: 'danger',
			majorState: 'danger',
			minorState: 'danger',
			honorState: 'danger',
		}, 
		};
		this.reader = new FileReader();
	  }

	continue = e => {
		e.preventDefault()
		const {values} = this.props
		if (!values.profileImage || this.state.invalidImage ===  "Invalid file: Please select a valid image.") {
			alert("Something is wrong with your inputs: Please Select a valid image JPG or PNG")

		}
		
		else if (!values.sid ) {
			alert("Something is wrong with your inputs: Your student ID is required and it should be numbers")

		}

		else if (!values.YearLevel ) {
			alert("Something is wrong with your inputs: Your university level is required")

		}
		else if (!values.gradTerm) {
			alert("Something is wrong with your inputs: Your graduation term is required!")

		}
		else if (!values.major) {
			alert("Something is wrong with your inputs: Your major is required!")

		}
	
		else if (!values.honorStudent) {
			alert("Something is wrong with your inputs: Your email should be a valid UCLA Email and not empty!")

		}

		else {
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

	sidvalidation(e) {
		const { validate } = this.state
		const { values, handleChange, nextStep } = this.props
		var reg = /^([0-9\b]{9})$/;
		if (reg.test(e.target.value)) {
			validate.sidState = 'has-success'
		}
		else {
			validate.sidState = 'has-danger'
		}
		this.setState({ validate })
		


	}

	gradvalidation(e) {
		const { validate } = this.state
		const { values, handleChange, nextStep } = this.props
		var reg = /^[a-zA-Z]{1,6}[0-9]{2}[:.,-]?$/;
		if (reg.test(e.target.value)) {
			validate.gradTermState = 'has-success'
		}
		else {
			validate.gradTermState = 'has-danger'
		}
		this.setState({ validate })
		


	}

	majorvalidation(e) {
		const { validate } = this.state
		const { values, handleChange, nextStep } = this.props
		var reg = /^[a-zA-Z\s]*$/;
		if (reg.test(e.target.value)) {
			validate.majorState = 'has-success'
		}
		else {
			validate.majorState = 'has-danger'
		}
		this.setState({ validate })
		


	}
	minorvalidation(e) {
		const { validate } = this.state
		const { values, handleChange, nextStep } = this.props
		var reg = /^[a-zA-Z\s]*$/;
		if (reg.test(e.target.value)) {
			validate.minorState = 'has-success'
		}
		else {
			validate.minorState = 'has-danger'
		}
		this.setState({ validate })
		


	}









	render() {
		const { handleResponse, imageUrl, invalidImage } = this.state;
		const { values, handleChange} = this.props
		return (
		<div >
			<form >

{/*  picture profile*/}
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



{/*  student ID*/}
			<FormGroup>
        <Label for="sid">Your Student ID</Label>
        <Input type="text" name="sid" id="sid" placeholder="" 
		onChange = {e => {handleChange(e.target.name, e.target.value);
		this.sidvalidation(e)}}
		valid={this.state.validate.sidState === 'has-success'}
		invalid={this.state.validate.sidState === 'has-danger'}
		defaultValue={values.sid}
		/>
		<FormFeedback valid>
							Your student id looks good.
             		    </FormFeedback>
						<FormFeedback>
							Uh oh! Your student Id should only be numbers and exactly 9 digits in length
              			</FormFeedback>
      </FormGroup>




{/*  YearLevel*/}

	  <FormGroup>
        <Label for="yearLevel">Select Your University level</Label>
        <Input type="select" name="YearLevel" id="YearLevel"
		onChange = {e => handleChange(e.target.name, e.target.value)}
		defaultValue={values.YearLevel}
		>
		  <option value="">select your level</option>
          <option value="freshman">Freshman</option>
          <option value="somophore">Somophore</option>
          <option value="junior">Junior</option>
          <option value="senior">Senior</option>
          <option value="supersenior or above">Supersenior & above</option>
        </Input>
      </FormGroup>


	  {/*  Graduation term*/}

	  <FormGroup>
        <Label for="gradTerm">Graduation Term</Label>
        <Input type="text" name="gradTerm" id="gradTerm" placeholder="" 
		onChange = {e => {
			handleChange(e.target.name, e.target.value)
			this.gradvalidation(e)
		
		}}
		valid={this.state.validate.gradTermState === 'has-success'}
		invalid={this.state.validate.gradTermState === 'has-danger'}
		defaultValue={values.gradTerm}
		/>
		<FormFeedback valid>
							Your student id looks good.
             		    </FormFeedback>
						<FormFeedback>
							Uh oh! Your gradution should be in this form: summer21, winter22, fall21...
              			</FormFeedback>
    
      </FormGroup>




			{/*  major*/}
	  <FormGroup>
        <Label for="major">Your major</Label>
        <Input type="text" name="major" id="major" placeholder="" 
		onChange = {e => {
			this.majorvalidation(e)
			handleChange(e.target.name, e.target.value)}}
		valid={this.state.validate.majorState === 'has-success'}
		invalid={this.state.validate.majorState === 'has-danger'}
		defaultValue={values.major}
		/>
		<FormFeedback valid>
							Your student id looks good.
             		    </FormFeedback>
						<FormFeedback>
							Uh oh! Your major and your minor input should not contain numbers or speciak charachters.
              			</FormFeedback>
     
      </FormGroup>

			{/*  minor*/}
	  <FormGroup>
        <Label for="minor">Your minor (If applicable)</Label>
        <Input type="text" name="minor" id="minor" placeholder="" 
		onChange = {e => {
			this.minorvalidation(e)
			handleChange(e.target.name, e.target.value)}}
		valid={this.state.validate.minorState === 'has-success'}
		invalid={this.state.validate.minorState === 'has-danger'}
		defaultValue={values.minor}
		/>
      </FormGroup>

			{/*  honor*/}
	  <FormGroup className="my-1" check>
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
