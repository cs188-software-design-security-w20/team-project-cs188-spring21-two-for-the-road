import React from 'react'
import Header from "../components/Header"
import { connect } from 'react-redux'
import { getJobs } from '../actions/jobActions'
import { clearErrors } from '../actions/errorActions'
import PropTypes from 'prop-types'
import { Route, withRouter } from 'react-router-dom';
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
	CardTitle,
	InputGroup,
	CardText,
	CardBody, 
	ListGroup,
	ListGroupItem,
	CardImg,  CardGroup,
	CardSubtitle,
	Modal, ModalHeader, ModalBody, ModalFooter
	
	} from 'reactstrap'



class listOfJobs extends React.Component {
	constructor(){
        super();
        this.state = { modal: false,
                    title: '',
                    description:'',
                    ownerEmail:'',
					companyName:''};
      }

	  static propTypes = {
        isAuthenticated : PropTypes.bool,
        error : PropTypes.object.isRequired,
        getJobs : PropTypes.func.isRequired,
        job : PropTypes.object.isRequired
    
	  }
	  componentDidMount(){
        this.props.getJobs();
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

	// async componentWillMount() {
	// 	await this.getData();
	// }


	// renderTableHeader() {
	// 	// await this.componentDidMount();
	// 	let header = Object.keys(this.state.students[0])
	// 	return header.map((key, index) => {
	// 		return <th key={index}>{key.toUpperCase()}</th>
	// 	})
	// }

	// renderTableData() {
	// 	return this.state.students.map((student, index) => {
	// 		const { id, name, age, email } = student //destructuring
	// 		return (
	// 			<tr key={id}>
	// 				<td>{id}</td>
	// 				<td>{name}</td>
	// 				<td>{age}</td>
	// 				<td>{email}</td>
	// 			</tr>
	// 		)
	// 	})
	// }

	render() {
		const { jobs } = this.props.job;
		if (!this.props.isAuthenticated) { this.props.history.push('/') }
		return (
			<div>
				<Header />
				<div className="mb-4 mt-4 pl-15 recipe_header" ><h4>posted </h4></div>
            <Container fluid>
            
            
           
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 5 }}>
                {jobs.map(({_id, title, description, ownerEmail, companyName, dateCreated})=>(
                    <ListGroup>
                    <ListGroupItem>
                  
                    <Card>
                      <CardBody>
                        <CardTitle tag="h5">{title}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-1 text-muted">Job description: {description}</CardSubtitle>
                        <CardText><Button outline className="recipe_button" color="danger" onClick={() => this.setState({ modal: !this.state.modal, title: title, description: description, ownerEmail:ownerEmail, companyName:companyName })} >Read more</Button> </CardText>
                        <Modal isOpen={this.state.modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
                        toggle={() => this.setState({ modal: !this.state.modal })} >
                        <ModalHeader toggle={() => this.setState({ modal: !this.state.modal })}>{this.state.title}</ModalHeader>
                         <ModalBody>
                         <img src={'/images/logo.jpeg'} className="recipe_img2"></img>
                         <hr></hr>
                         <h5>Job Description:</h5>
                         {this.state.description}
                         <hr></hr>
                         <h5>Company Email:</h5>
                        {this.state.ownerEmail}
                          </ModalBody>
                            <ModalFooter>
                        <Button color="secondary" onClick={() => this.setState({ modal: !this.state.modal })}>Close</Button>
						<Button >Apply for this Job</Button>
                         </ModalFooter>
                          </Modal>
						  <Button >Apply for this Job</Button>
                      </CardBody>
                    </Card> 
                 
                    </ListGroupItem>
                    </ListGroup>
                    
                   
                   

                ))}
                </div>
              
       
                </Container>
            
        )
           
    
			</div>
		)
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
	job: state.job
})
export default connect(
	mapStateToProps,
	{ getJobs, clearErrors }
)(withRouter(listOfJobs));