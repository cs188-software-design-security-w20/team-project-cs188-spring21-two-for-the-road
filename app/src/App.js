import React, { Component, Fragment } from 'react'
import background from "./images/intro.png";
import "./App.css";
import Header from "./components/Header"
import Login from "./components/Login"



export default class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<div className='Home-intro'>
				</div>
				<div className='login-form'><Login /> </div>
			</div>
		)
	}
}
