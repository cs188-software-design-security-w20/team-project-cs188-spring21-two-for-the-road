import React, { Component } from 'react'
import Header from "../components/Header"
import {register} from '../actions/authAction'
import {clearErrors} from '../actions/errorActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Route , withRouter} from 'react-router-dom';


class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  msg:null
	
		};
		this.reader = new FileReader();
	  }

	  static propTypes = {
        auth : PropTypes.object.isRequired,	
    }

	componentDidUpdate(prevProps){
		const { error, history, location, isAthenticated } = this.props;
		  
		  if(error !== prevProps.error){
			  if(error.id=== 'REGISTER_FAIL'){
				  this.setState({msg: error.msg})
  
			  }
			  else {
				  this.setState({ msg: null})
			  }
		  }
		 // const redirect = location.search ? location.search.split('=')[1] : '/'
		 // if (!isAthenticated) {
		 //     history.push(redirect)
		 // }
  
	  }

	render() {
		const { auth} = this.props
		// var imagePath
		
		// const imageName = user.profileImage.filename
		//  const imageExtention = user.profileImage.mimetype.split("/")[1]
	    // const imagePath = user.profileImage.path + '.' +imageExtention
	
		
		
		return (
			<div>
				{console.log("karim")}
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
    
	user: state.auth,
  
})
export default connect (
    mapStateToProps,
    null
)(withRouter(Profile));
