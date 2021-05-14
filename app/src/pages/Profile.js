import React, { Component } from 'react'
import Header from "../components/Header"
import {connect} from 'react-redux'
import {register} from '../actions/authAction'
import {clearErrors} from '../actions/errorActions'
import PropTypes from 'prop-types'
import { Route , withRouter} from 'react-router-dom';

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
		
		// const imageName = user.profileImage.filename
		//  const imageExtention = user.profileImage.mimetype.split("/")[1]
	    // const imagePath = user.profileImage.path + '.' +imageExtention
	
		
		
		return (
			
			<div>
				
				<Header />
				<div className="profilWrapper">
					 {/* <img src={require(`${imagePath}`)}></img>  */}
					{ this.props.auth.user.email }
					
					</div>
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