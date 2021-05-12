import { Redirect, useHistory } from "react-router-dom"
import React, { Component, Fragment } from 'react';
import Recaptcha from 'react-recaptcha';
import validator from 'validator'
import {login} from '../actions/authAction'
import {clearErrors} from '../actions/errorActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Route , withRouter} from 'react-router-dom';


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





class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			msg:null,
			email: '',
			password: '',
			validate: {
				emailState: 'danger',
				passwordState : 'danger',
			},
			isVerified: false,
			fields: {},
            errors: {}
		}
		
	}
	callback =  () => {
		console.log('Done!!!!');
	  };


	  static propTypes = {
        isAuthenticated : PropTypes.bool,
        error : PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }


	componentDidUpdate(prevProps){
		const { error, history, location, isAthenticated } = this.props;
		  
		  if(error !== prevProps.error){
			  if(error.id=== 'LOGIN_FAIL'){
				  this.setState({msg: error.msg})
  
			  }
			  else {
				  this.setState({ msg: null})
			  }
		  }
		//   if (!isAthenticated) {
        //     history.push("/job-apps")
        // }

		
  
	  }






	  validateEmail(e) {
		const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const { validate } = this.state
		if ((emailRex.test(e.target.value) && e.target.value.includes('ucla.edu'))) {
			validate.emailState = 'has-success'
		} else {
			validate.emailState = 'has-danger'
		}
		this.setState({ validate })
	}

	passwordValidate(e){
		const { validate } = this.state
		var re = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,40})");

		if(re.test(e.target.value)){
			validate.passwordState = 'has-success'
			

		}
		else {
			validate.passwordState = 'has-danger'
		}
	}

	onSubmit = e =>{
        this.props.clearErrors();
        e.preventDefault();
		if(this.state.validate.emailState === "has-danger" || this.state.validate.emailState === "danger"){
			alert("Something is wrong with your inputs: Your email should be a valid UCLA Email and not empty!")
	
		   }
		   if(this.state.validate.passwordState === "has-danger" || this.state.validate.passwordState === "danger"){
			alert("Something is wrong with your inputs: Your password should be between between 8 and 40 characters!")
	
		   }
       else if(this.state.isVerified) {
		
		const {email, password} = this.state;
        //Create User Object
        const newUser =
        {
           
            email: this.state.email,
            password: this.state.password
          
        }
		console.log(newUser)
        this.props.login(newUser);
        console.log(`The message is : ${this.state.msg}`);
        e.target.className += " was-validated";

	   }
	    
	   else {
		   alert("Please verify that you are a human!")
	   }
		
        //Attempt to login
        //this.props.login(newUser);
       // console.log(`The message is : ${this.state.msg}`);

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
				
				<div className='signin-form'>
				{this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
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
													Uh oh! Looks like there is an issue with your email. Please input a correct UCLA email.
              </FormFeedback>
											</InputGroup>
											<InputGroup className="mb-4">
												<div className="input-group-prepend">
													<span className="input-group-text">
														<FontAwesomeIcon icon={faLock} />
													</span>
												</div>
												<Input type="password" name='password' id='password' placeholder="Password" 
												valid={this.state.validate.passwordState === 'has-success'}
												invalid={this.state.validate.passwordState === 'has-danger'}
												onChange={(e) =>{
													this.passwordValidate(e)
													this.changeValue(e)
												}
													} />
													<FormFeedback valid>
													Your password looks good.
              </FormFeedback>
												<FormFeedback>
													Uh oh! Looks like there is an issue with your email. Please input a correct email.
              </FormFeedback>
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
const mapStateToProps = state =>({
    isAuthenticated : state.auth.isAuthenticated,
    error: state.error
})
export default connect (
    mapStateToProps,
    {login, clearErrors}
)(withRouter(Login));
