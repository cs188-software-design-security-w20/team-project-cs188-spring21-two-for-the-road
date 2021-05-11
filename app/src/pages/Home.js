import React, { Component, Fragment } from 'react'
import "../App.css";
import Header from "../components/Header"
import Login from "../components/Login"
import {connect} from 'react-redux'
import {register} from '../actions/authAction'
import {clearErrors} from '../actions/errorActions'
import PropTypes from 'prop-types'
import { Route , withRouter} from 'react-router-dom';


class Home extends Component {
	static propTypes = {
        isAuthenticated : PropTypes.bool,
        error : PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

	render(){
		if(this.props.isAuthenticated)
		{this.props.history.push('/job-apps')}
		return (
			
			<div>
				<Header />
				<div className='Home-intro'>
				</div>
				<div className='login-form'><Login /> </div>
			</div>
		)
	}
	
}
const mapStateToProps = state =>({
    isAuthenticated : state.auth.isAuthenticated,
    error: state.error
})

export default connect (
    mapStateToProps,
    {register, clearErrors}
)(withRouter(Home));