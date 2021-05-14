import React, { Component, Fragment } from 'react';
import { Button, Nav, NavItem, NavLink  } from 'reactstrap';
import { Route , withRouter} from 'react-router-dom';
import {useDispatch, useSelector}  from 'react-redux'
import {logout} from '../actions/authAction'
import { Link } from "react-router-dom";

import "../App.css";

const Header = ({history}) =>{
	const dispatch = useDispatch();
	const auth = useSelector(state => state.auth)
	const {isloading, isAuthenticated, user} = auth

	const logoutHandler = () => {
		history.push('/')
		dispatch(logout())
		document.cookie = "jwt=; expires=Thu, 18 Dec 2013 12:00:00 UTC";
		
	}
	var loginMenue;
	if(isAuthenticated){
		loginMenue = (
		
			<div className = "header" >
				
					<div className="logo">AppName</div>
					<Nav className ="navLink">
			<NavItem>
			  <NavLink href="/profile">Profile</NavLink>
			</NavItem>
			<NavItem>
			  <NavLink href="/job-apps">jobs</NavLink>
			</NavItem>
			<NavItem>
			  <NavLink href="#">My applications</NavLink>
			</NavItem>
		  </Nav>
		<div className="auth-menu2"> <Button to="/" onClick= {logoutHandler}>Logout</Button></div>
		</div>)
	}
	else{
		loginMenue = (
			<div className = "header" >
					<div className="logo">AppName</div>
			<div className="auth-menu">
						<Button outline color="info" className ="mx-3"
						onClick = {()=> {
							history.push("/signupUser")
						}}
						>Join us!</Button>
						<Button color="secondary" onClick = {()=> {
							history.push("/")
						}}>Sign in!</Button>{' '}
					</div>
					</div>
		)
	}

	const Login = (
		<div className = "header" >
                <div className="logo">AppName</div>
		<div className="auth-menu">
                    <Button outline color="info" className ="mx-3"
					onClick = {()=> {
						history.push("/signupUser")
					}}
					>Join us!</Button>
                    <Button color="secondary" onClick = {()=> {
						history.push("/")
					}}>Sign in!</Button>{' '}
                </div>
				</div>
	)

	
        return (
			
			<Fragment> {loginMenue}</Fragment>
               
                
        );
    
}

export default withRouter(Header);