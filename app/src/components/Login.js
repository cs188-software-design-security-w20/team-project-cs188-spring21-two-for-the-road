import { Redirect, useHistory } from "react-router-dom"
import React, { Component, Fragment } from 'react';

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



} from 'reactstrap'

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		}
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
												<Input type="text" name='email' id='email' placeholder="Email" onChange={this.changeValue} />
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