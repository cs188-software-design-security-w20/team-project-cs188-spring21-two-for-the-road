import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button } from 'reactstrap';
import "../App.css";
import Header from "../components/Header"
import StudentformFirstStep from './StudentformFirstStep'
import SformSecondstep from './SformSecondstep'
import SformThirdStep from './SformThirdStep'
import SformfourthStep from './SformfourthStep'
import CompanyForm from './CompanyForm'

export default class FormeChose extends Component {


	state = {
		step: 1,
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		sid: '',
		YearLevel: '',
		gradTerm: '',
		major: '',
		minor: '',
		club: '',
		honorStudent: false,
		resume: '',
		profileImageUrl: null,
		profileImage: null,
		companyName: '',
		JobOffers: {},
		StudentORrecruiter: 'student',
		validate: {
			emailState: 'danger',
			firstNameState: 'danger',
			lasNameState: 'danger'
		},
	
	}

	




	//go to the next step in the signup form
	nextStep = () => {
		const { step } = this.state;
		this.setState({
			step: step + 1
		})
	}

	//go to the previous step in the signup form
	prevStep = () => {
		const { step } = this.state;
		this.setState({
			step: step - 1
		})
	}

	handleChange = (name, value) => {
		//console.log(event.target);
		//const name = event.target.name;
		//const value = event.target.value;
		this.setState({
			[name]: value
		})

	}

	render() {
		const { step,
			email,
			password,
			firstName,
			lastName,
			sid,
			YearLevel,
			gradTerm,
			major,
			minor,
			club,
			honorStudent,
			resume,
			profileImageUrl,
			profileImage,
			companyName,
			JobOffers,
			StudentORrecruiter } = this.state

		const values = {
			email,
			password,
			firstName,
			lastName,
			sid,
			YearLevel,
			gradTerm,
			major,
			minor,
			club,
			honorStudent,
			resume,
			profileImageUrl,
			profileImage,
			companyName,
			JobOffers,
			StudentORrecruiter
		}

		switch (step) {
			case 1:
				return (
					<div className="form-selector">
						<StudentformFirstStep
							nextStep={this.nextStep}
							handleChange={this.handleChange}
							values={values}
						/>
					</div>
				)
			case 2:
				return (
					<div className="form-selector">
						<SformSecondstep
							nextStep={this.nextStep}
							prevStep={this.prevStep}
							handleChange={this.handleChange}
							values={values}
						/>
					</div>
				)
			case 3:
				if (this.state.StudentORrecruiter === 'student') {
					return (
						<div className="form-selector">
							<SformThirdStep
								nextStep={this.nextStep}
								prevStep={this.prevStep}
								handleChange={this.handleChange}
								values={values}
							/>
						</div>
					)
				}
				else if (this.state.StudentORrecruiter === 'recruiter') {
					return (
						<div className="form-selector">
							<CompanyForm
								nextStep={this.nextStep}
								prevStep={this.prevStep}
								handleChange={this.handleChange}
								values={values}
							/>
						</div>
					)
				}
			case 4:
				if (this.state.StudentORrecruiter === 'student') {
					return (
						<div className="form-selector">
							<SformfourthStep
								nextStep={this.nextStep}
								prevStep={this.prevStep}
								handleChange={this.handleChange}
								values={values}
							/>
						</div>
					)
				}
				else if (this.state.StudentORrecruiter === 'recruiter') {
					return (
						<div className="form-selector">
							<h1>company form</h1>
						</div>
					)
				}

		}


	}
}
