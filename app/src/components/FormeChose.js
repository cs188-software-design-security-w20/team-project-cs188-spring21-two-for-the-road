import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormFeedback, FormText , Button} from 'reactstrap';
import "../App.css";
import Header from "../components/Header"
import StudentformFirstStep from './StudentformFirstStep'
import SformSecondstep from './SformSecondstep'

export default class FormeChose extends Component {
	
	state={
		step:1,
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		sid: '',
		YearLevel: '',
		gradTerm:'',
		major: '',
		minor: '',
		club: '',
		honorStudent: false,
		resume: '',
		profileImage: '',
		companyName: '',
		JobOffers: {},
		StudentORrecruiter: 'student'
	}

	//go to the next step in the signup form
	nextStep = () => {
		const {step} = this.state;
		this.setState({
			step: step+1
		})
	}
	
	//go to the previous step in the signup form
	prevStep = () => {
		const {step} = this.state;
		this.setState({
			step: step-1
		})
	}

	handleChange = input => e => {
		this.setState({
			[input]: e.target.value
		})
	  }

	render() {
		const {step,
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
		profileImage,
		companyName,
		JobOffers,
		StudentORrecruiter} = this.state

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
			profileImage,
			companyName,
			JobOffers,
			StudentORrecruiter}

			switch(step){
				case 1: 
					return (
					<div className ="form-selector">
					<StudentformFirstStep 
						nextStep = {this.nextStep}
						handleChange = {this.handleChange}
						values = {values}
					/>
					</div>
				)
				case 2: 
					return (
					<div className ="form-selector">
						<SformSecondstep
						nextStep = {this.nextStep}
						prevStep = {this.prevStep }
						handleChange = {this.handleChange}
						values = {values}
					/>
					</div>
				)
				case 3: 
					return (
					<div className ="form-selector">
					<h1>case 3</h1>
					</div>
				)

			}

		
	}
}
