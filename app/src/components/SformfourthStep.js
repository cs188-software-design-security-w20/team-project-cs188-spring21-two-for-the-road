import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button, Card } from 'reactstrap';
import "../App.css";

export default class SformfourthStep extends Component {

	constructor(props) {
		super(props);
		this.state = {
			invalidImage: null,
			validate: {
				minorState: 'danger',

			},
		};
		this.reader = new FileReader();
	}

	continue = e => {
		const { values } = this.props
		e.preventDefault()
		if (!values.resume || this.state.invalidImage === "Invalid file: Please select a valid document.") {
			alert("Something is wrong with your inputs: Please Select a valid document PDF or doc")

		}
		else {
			this.props.nextStep()

		}
	}
	back = e => {
		e.preventDefault()
		this.props.prevStep()
	}

	resumevalidate = e => {
		const imageFile = e.target.files[0];
		if (!imageFile) {
			this.setState({ invalidImage: "Invalid file: Please select a valid document." });
			return false;
		}

		if (!imageFile.name.match(/\.(doc|pdf|docx)$/)) {
			this.setState({ invalidImage: "Invalid file: Please select a valid document." });
			return false;
		}
		else {
			this.setState({ invalidImage: null });
		}
	}


	clubvalidation(e) {
		const { validate } = this.state
		const { values, handleChange, nextStep } = this.props
		var reg = /^[a-zA-Z\s]*$/;
		if (reg.test(e.target.value)) {
			validate.clubState = 'has-success'
		}
		else {
			validate.clubState = 'has-danger'
		}
		this.setState({ validate })



	}





	render() {
		const { invalidImage } = this.state;
		const { values, handleChange } = this.props
		return (
			<div >
				<hr></hr>
				<form className="my-1">

					<FormGroup>
						<Label for="resume">Upload your resume</Label>
						<Input type="file" name="resume" id="resume"
							onChange={e => {
								handleChange(e.target.name, e.target.files[0]);
								this.resumevalidate(e);
							}}
						/>
						{invalidImage && <p className="invalid-pass">{invalidImage}</p>}
						<FormText color="muted">
							Only .docx or pdf files are allowed
        </FormText>
					</FormGroup>





					<FormGroup>
						<Label for="clubs">Clubs</Label>
						<Input type="text" name="club" id="club" placeholder=""
							onChange={e => {
								handleChange(e.target.name, e.target.value);
								this.clubvalidation(e)
							}}
							valid={this.state.validate.clubState === 'has-success'}
							invalid={this.state.validate.clubState === 'has-danger'}
							defaultValue={values.club}
						/>
						<FormFeedback valid>
							Your student id looks good.
             		    </FormFeedback>
						<FormFeedback>
							Uh oh! This field should not contain digits or special characters
              			</FormFeedback>

						<FormText color="muted">
							If you have more than one club sepearte them with comma.
        </FormText>
					</FormGroup>
					<Button onClick={this.back} > Previeus step</Button>
					<Button className="mx-2" onClick={this.continue} >Next Step</Button>
				</form>
			</div>
		)
	}
}
