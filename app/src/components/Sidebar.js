import React, { Component } from 'react'
import users from '../data/users'
import jobs from '../data/jobs'

console.log(users)
export default class Sidebar extends Component {
	render() {
		return (
			<div>
				<img src= {users.user1.profileImage} alt="Smiley face"></img>
				<p>this the side bar</p>
				
			</div>
		)
	}
}
