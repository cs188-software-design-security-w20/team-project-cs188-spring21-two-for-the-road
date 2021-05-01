import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Route , withRouter} from 'react-router-dom';
import "../App.css";

const header = ({history}) =>{
   
        return (
            <div className = "header" >
                <div className="logo">AppName</div>
                <div className="auth-menu">
                    <Button outline color="info" className ="mx-3"
					onClick = {()=> {
						history.push("/signup")
					}}
					>Join us!</Button>
                    <Button color="secondary">Sign in!</Button>{' '}
                </div>
                
                
                </div>
        );
    
}

export default withRouter(header);