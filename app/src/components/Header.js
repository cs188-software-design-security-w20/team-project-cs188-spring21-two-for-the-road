import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';
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
	

	const Login = (
		<div className = "header" >
                <div className="logo">AppName</div>
		<div className="auth-menu">
                    <Button outline color="info" className ="mx-3"
					onClick = {()=> {
						history.push("/signupUser")
					}}
					>Join us!</Button>
                    <Button color="secondary">Sign in!</Button>{' '}
                </div>
				</div>
	)

	const LogOut =(
		
		<div className = "header" >
			
                <div className="logo">AppName</div>
	<div className="auth-menu"> <Button to="/" onClick= {logoutHandler}>Logout</Button></div>
	</div>)
        return (
			
			<Fragment> {isAuthenticated ? LogOut : Login}</Fragment>
               
                
        );
    
}

export default withRouter(Header);