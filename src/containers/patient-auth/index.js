import React from 'react';
import './index.scss';
import { Form, Input, Button } from 'semantic-ui-react';
import PatientLogin from './login';
import PatientSignup from './signup';
import axios from 'axios'

class PaitentAuth extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formType: 'login',
			username: "",
			phone:"",
			password: "",
			confirmPass: "",
			province: "",
			errorMssage: ""
		};
	}

	handleSignup = (e) => {
		e.preventDefault();
		const { username, province, password,phone, confirmPass } = this.state;
		console.log(phone,"phone");

		if (username === '' )
			this.setState({ errorMssage: "Username can't be empty" })
		else if (province === "" )
			this.setState({ errorMssage: "State / Province can't be empty" })
		else if (phone ==="" )
			this.setState({ errorMssage: "Phone can't be empty" })
		else if (phone.length !== 13 )
			this.setState({ errorMssage: "Enter a valid phone number" })
		else if (password === "" )
			this.setState({ errorMssage: "Password can't be empty" })
		else if (password.length < 6)
			this.setState({ errorMssage: "password must be at least 6 characters long" })
		else if (password !== confirmPass)
			this.setState({ errorMssage: "Password and Confirm Password must be same" })
		else {
			this.setState({ errorMssage: "" })
			console.log("all ok")
			const data = { username, province, phone, password }
			axios.post('localhost:3000/api/register', data)
				.then((req, res) => {
					console.log(res);
				})
		}
		// this.state.confirmPass && this.setState({errorMssage:"Username can't be empty"})


	};

	handleLogin = (e) => {
		e.preventDefault();
		const { username, password  } = this.state;

		if (username === '' )
			this.setState({ errorMssage: "Username can't be empty" })
		else if (password === "" )
			this.setState({ errorMssage: "Password can't be empty" })
		else {
			this.setState({ errorMssage: "" })
			console.log("all ok")
			const data = { username, password }
			axios.post('localhost:3000/api/authenticate', data)
				.then((req, res) => {
					console.log(res);
				})
		}

		console.log(this.state.username, this.state.password, 'Login data');
	};

	handleGuestLogin = (e) => {
		e.preventDefault();
		console.log('Guest Login');
	};

	handleFieldChange = (e) => {
		e.preventDefault();

		this.setState({ [e.target.name]: e.target.value });
	};
	handleLocationChange = (e, data) => {
		e.preventDefault();
		console.log(data.value);
		this.setState({ [data.name]: data.value });
	}
	handlePhoneChange = (data) => {
		console.log(data);
		this.setState({ "phone": data });

	}
	handleChangeForm = (type) => {
		console.log('working', type);
		this.setState({ formType: type });
	};

	render() {
		return (
			<React.Fragment>
				<div className="container">
					{this.state.formType === 'login' ? (
						<PatientLogin
							handleFieldChange={this.handleFieldChange}
							handleLogin={this.handleLogin}
							handleGuestLogin={this.handleGuestLogin}
							changeFormType={this.handleChangeForm}
							errorMssage={this.state.errorMssage}
						/>
					) : (
							<PatientSignup
								handleFieldChange={this.handleFieldChange}
								handleSignup={this.handleSignup}
								changeFormType={this.handleChangeForm}
								locationChange={this.handleLocationChange}
								phoneChange={this.handlePhoneChange}
								errorMssage={this.state.errorMssage}
							/>
						)}
				</div>
			</React.Fragment>
		);
	}
}

export default PaitentAuth;
