import { Redirect, useHistory } from "react-router-dom"
import React, { Component, Fragment } from 'react';
import Recaptcha from 'react-recaptcha';

import { faUserAlt, faSignInAlt, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Row,
	Col,
	Alert,
	Container,
	Card,
	CardBody,
	CardTitle,
	CardText,
	InputGroup,
	CardLink,
	FormFeedback
} from 'reactstrap'

console.log(process.env.REACT_APP_GOOGLE_CAPTCH_API)

class Login extends Component {
	static API_KEY = process.env.REACT_APP_GOOGLE_CAPTCH_API
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			validate: {
				emailState: '',
			},
			isVerified: false
		}
		
	}
	callback =  () => {
		console.log('Done!!!!');
	  };

	onSubmit = e =>{
        //this.props.clearErrors();
        e.preventDefault();
       if(this.state.isVerified) {
		
		const {email, password} = this.state;
        //Create User Object
        const newUser =
        {
           
            email,
            password,
          
        }
	   }
	   else {
		   alert("Please verify that you are a human!")
	   }
		
        //Attempt to login
        //this.props.login(newUser);
       // console.log(`The message is : ${this.state.msg}`);

    }
	validateEmail(e) {
		const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const { validate } = this.state
		if (emailRex.test(e.target.value)) {
			validate.emailState = 'has-success'
		} else {
			validate.emailState = 'has-danger'
		}
		this.setState({ validate })
	}
	verifyCallback = (response) => {
		if (response) {
			this.setState({
				isVerified:true
			})
		}
	}
	changeValue = (e) => {
       //this.props.clearErrors();
        this.setState({
         [e.target.name] : e.target.value   })
    }
    onloadCallback = () =>{
		
	}
	render() {
		return (

			<Fragment>
				{this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
				<div className='signin-form'>
					<Form onSubmit={this.onSubmit}>

						<Container fluid >
							<Row className="h-100 justify-content-center full-height align-items-center Login-wrap">
								<Col xs="10" lg="3" className="p-0">
									<Card>
										<CardBody>
											<CardTitle><FontAwesomeIcon icon={faSignInAlt} size="2x" />   SIGN IN</CardTitle>
											<hr></hr>
											<CardText>Sign in with your account.</CardText>
											<InputGroup className="mb-3">
												<div className="input-group-prepend">
													<span className="input-group-text">
														<FontAwesomeIcon icon={faUserAlt} />
													</span>
												</div>
												<Input type="text" name='email' id='email' placeholder="Email" 
													valid={this.state.validate.emailState === 'has-success'}
													invalid={this.state.validate.emailState === 'has-danger'}
												    onChange={ (e) => {
														this.validateEmail(e)
														this.changeValue(e)
													  } }
												    // onChange={this.changeValue}
													 />
												<FormFeedback valid>
													Your Email looks good.
              </FormFeedback>
												<FormFeedback>
													Uh oh! Looks like there is an issue with your email. Please input a correct email.
              </FormFeedback>
											</InputGroup>
											<InputGroup className="mb-4">
												<div className="input-group-prepend">
													<span className="input-group-text">
														<FontAwesomeIcon icon={faLock} />
													</span>
												</div>
												<Input type="password" name='password' id='password' placeholder="Password" onChange={this.changeValue} />
											</InputGroup>
											<Row>
												<Col xs="12" lg="6">
													<Button color="secondary" id="click-login" className="px-4">Login</Button>
												</Col>
											
													  				
											</Row>
											<div className = "my-3">
											<Recaptcha 
   												 sitekey = "6Lc6Lr8aAAAAAMLBpBi9ryJU1PJn3d2XBxWAxmC-"
    											 render="explicit"
    											 onloadCallback={this.callback}
												 verifyCallback={this.verifyCallback}
  												/>
											</div>
										
										</CardBody>
									</Card>
								</Col>


							</Row>

							<Row className="h-100 justify-content-center full-height align-items-center Login-wrap">
								<Col xs="10" lg="3" className="p-0">
									<Card color="dark">
										<CardBody className="text-white">
											<Col xs="12" lg="12" className="text-center">
												<a className="link" href="/signup"> Or Just Sign Up</a>
											</Col>

										</CardBody>
									</Card>

								</Col>
							</Row>
						</Container>
					</Form>
				</div>
			</Fragment>
		);
	}
}
const style = {
	margin: 15,
};
export default Login;