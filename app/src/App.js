import React, { Component, Fragment } from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom"
//import "./App.css";
//import Header from "./components/Header"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import listOfJobs from './pages/listOfJobs'
import Jobs from './pages/Jobs'

const App = (props) => {
	return (
		<BrowserRouter >
			<Switch>
				<Route path="/" exact component= {Home} ></Route>
				<Route path="/signup" component= {Signup} ></Route>
				<Route path="/job-apps" component= {listOfJobs} ></Route>
				<Route path="/jobs" component= {Jobs} ></Route>
			</Switch>
			</BrowserRouter>
	);
  }
  export default App