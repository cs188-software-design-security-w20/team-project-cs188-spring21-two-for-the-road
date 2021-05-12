import React, { Component, useState } from 'react';
import { Route , withRouter} from 'react-router-dom';
import SearchIcon from "@material-ui/icons/Search";
import users from '../data/users'
import { FaUserCircle, FaRegSave} from 'react-icons/fa';
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Row,
	Col,
	Alert,
	Navbar,
	NavItem,
	NavLink,
	Nav,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
  
  
  } from 'reactstrap'
import "../App.css";

const Headerhome = ({history}) =>{
 const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);
   let user = users.user1
   const imageUrl = user.profileImage
        return (
            <div className = "header" >
                <div className="logo">AppName
	  				</div>
					  <div className="dropD2"><FaRegSave className="mx-1"/>Saved Jobs</div>

					  <div className="dropD">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle className="joblink" nav caret>
	 
	  {/* <img src={imageUrl} className ="imageRound" /> */}
      { user ?  <div><FaUserCircle className="mx-1" />Hi {user.firstName}</div> : 'Sign In / Account' }
      </DropdownToggle>
      <DropdownMenu color="dark">

      { user ? <DropdownItem>

		  <NavLink href="/Account/" className="link">View profile </NavLink> </DropdownItem> : <DropdownItem><NavLink href="/Account/" className="link">JOIN US! </NavLink></DropdownItem> }
      
      <hr></hr>
      
      { user ? `` : <DropdownItem><NavLink href="/Account/" className="link">SIGN IN </NavLink></DropdownItem> }
      <DropdownItem><NavLink href="/Account/" className="link">View Your applications</NavLink></DropdownItem>
      <DropdownItem><NavLink href="/Account/" className="link">Privacy & sitting</NavLink></DropdownItem>
      <DropdownItem><NavLink href="/Account/" className="link">Manage your documents</NavLink></DropdownItem>
      { user ? <DropdownItem><NavLink  className="link">Sign out</NavLink></DropdownItem>: `` }
      


      </DropdownMenu>
      </Dropdown>
	  
      </div>
	  
                </div>
        );
    
}

export default withRouter(Headerhome);