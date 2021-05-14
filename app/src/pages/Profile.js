import React, { Component } from 'react'
import Header from "../components/Header"
import {connect} from 'react-redux'
import {register} from '../actions/authAction'
import {clearErrors} from '../actions/errorActions'
import PropTypes from 'prop-types'
import { Route , withRouter} from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

console.log("karim")
class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  msg:null
	
		};
		this.reader = new FileReader();
	  }

	  static propTypes = {
        isAuthenticated : PropTypes.bool,
        error : PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

		 // const redirect = location.search ? location.search.split('=')[1] : '/'
		 // if (!isAthenticated) {
		 //     history.push(redirect)
		 // }
  
	  

	render() {
		const { auth} = this.props
		// var imagePath
		
		 const imageName = auth.user.profileImage.filename
		  const imageExtention = auth.user.profileImage.mimetype.split("/")[1]
	    const imagePath =  auth.user.profileImage.path + '.' +imageExtention
		
		const test = imagePath.slice(14)
		var replaced = test.replace(/\\/g, "/");
		
		return (
			
			<div>
				
				<Header />
				<h3 className ="spacer ">Your profile</h3>
				<div className="profilWrapper">
					 <img className = "profileImage" src={replaced}></img> 
					</div>
					<Form className= "spacer">
					<FormGroup>
        <Label for="firstName">Your First Name</Label>
        <Input type="text" name="firstName" id="firstName"  placeholder="with a placeholder" defaultValue={auth.user.firstName}/>
      </FormGroup>
	  <FormGroup>
        <Label for="lasttName">Your Last Name</Label>
        <Input type="text" name="lastName" id="lastName"  placeholder="with a placeholder" defaultValue={auth.user.lastName}/>
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Your Email</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" defaultValue={auth.user.email} disabled/>
      </FormGroup>
	  <FormGroup>
        <Label for="sid">Your student ID</Label>
        <Input type="text" name="sid" id="sid"  placeholder="with a placeholder" defaultValue={auth.user.sid} disabled/>
      </FormGroup>

	  <FormGroup>
        <Label for="gradTerm">Your gradution term</Label>
        <Input type="text" name="gradTerm" id="gradTerm"  placeholder="with a placeholder" defaultValue={auth.user.gradTerm}/>
      </FormGroup>

	  <FormGroup>
        <Label for="major">Your major</Label>
        <Input type="text" name="major" id="major"  placeholder="with a placeholder" defaultValue={auth.user.major}/>
      </FormGroup>

	  



      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
      </FormGroup>
      <FormGroup>
		  </FormGroup>
		  <FormGroup check row>
        <Col sm={{ size: 10, offset: 2 }}>
          <Button>Update profile</Button>
        </Col>
      </FormGroup>
		  </Form>
			</div>
		)
	}
}
const mapStateToProps = state =>({
	auth: state.auth,
    error: state.error
})
export default connect (
    mapStateToProps,
    {register, clearErrors}
)(withRouter(Profile));