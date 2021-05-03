import react from "react";
import "../App.css";
import Header from "../components/Header"
import FormeChose from "../components/FormeChose"




const Signup = (props) => {

	return (
		<div>
			<Header />
			<div className='Signup-intro'></div>
			<FormeChose />
		</div>
	)
}

export default  Signup;