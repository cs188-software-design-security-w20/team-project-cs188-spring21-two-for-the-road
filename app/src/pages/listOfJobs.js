import React from 'react'
import Header from "../components/Header"
import {connect} from 'react-redux'
import {register} from '../actions/authAction'
import {clearErrors} from '../actions/errorActions'
import PropTypes from 'prop-types'
import { Route , withRouter} from 'react-router-dom';



class listOfJobs extends React.Component {
   

	static propTypes = {
        isAuthenticated : PropTypes.bool,
        error : PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

   
  async getData() {
    //do mongowork here
      let result = {
        students: [
           { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com' },
           { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
           { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
           { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
        ]
     }
      this.setState(result);
  }
  
  async componentWillMount() {
     await this.getData();
  }
  

   renderTableHeader() {
   // await this.componentDidMount();
     let header = Object.keys(this.state.students[0])
     return header.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
     })
  }

renderTableData() {
     return this.state.students.map((student, index) => {
        const { id, name, age, email } = student //destructuring
        return (
           <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{email}</td>
           </tr>
        )
     })
  }

  render() {
	if(!this.props.isAuthenticated)
	{this.props.history.push('/')}
     return (
        <div>
      <Header />
           <h1 id='title'>React Dynamic Table</h1>
           <table id='students'>
              <tbody>
                 <tr>{this.renderTableHeader()}</tr>
                 {this.renderTableData()}
              </tbody>
           </table>
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
)(withRouter(listOfJobs));