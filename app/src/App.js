import React, { Component, Fragment } from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom"
import {Provider} from 'react-redux'
import {loadUser} from './actions/authAction'
import {store} from './store'
//import "./App.css";
//import Header from "./components/Header"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import listOfJobs from './pages/listOfJobs'
import Jobs from './pages/Jobs'
import Profile from './pages/Profile'
import { CookiesProvider } from 'react-cookie';


class App extends React.Component{
	componentDidMount(){
		store.dispatch(loadUser())
	  }


	render() {
	return (
		<CookiesProvider>
		<BrowserRouter >
			<Switch>
				<Route path="/" exact component= {Home} ></Route>
				<Route path="/signupUser" component= {Signup} ></Route>
				<Route path="/job-apps" component= {listOfJobs} ></Route>
				<Route path="/jobs" component= {Jobs} ></Route>
				<Route path="/profile" component= {Profile} ></Route>
			</Switch>
			</BrowserRouter>
			</CookiesProvider>
	);

	}
  }
  export default App