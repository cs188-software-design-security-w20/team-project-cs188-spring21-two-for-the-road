import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import Headerhome from "../components/Headerhome"



export default class jobs extends Component {
	render() {
		return (
			<div>
				<Headerhome />
				<Sidebar />
			</div>
		)
	}
}
