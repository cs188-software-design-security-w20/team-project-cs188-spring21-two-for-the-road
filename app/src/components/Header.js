import React, { Component } from 'react';
import { Button } from 'reactstrap';
import "../App.css";

class header extends Component {
    render() {
        return (
            <div className = "header" >
                <div className="logo">AppName</div>
                <div className="auth-menu">
                    <Button outline color="info">Join us!</Button>{' '}
                    <Button color="secondary">Sign in!</Button>{' '}
                </div>
                
                
                </div>
        );
    }
}

export default header;