import React from 'react';
import './index.scss';
import { Form, Input, Button } from 'semantic-ui-react';
import PatientLogin from './login';
import PatientSignup from './signup';
import client from '../../axios'

// const myApi = axios.create({
// 	baseURL: 'http://localhost:4000/api',
// 	timeout: 10000,
// 	headers: {
// 	  'Accept': 'application/json',
// 	  'Content-Type': 'application/json',
// 	}
//   });

class PaitentAuth extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formType: 'login',
			email: "",
			phone:"",
			password: "",
			confirmPass: "",
			province: "",
			errorMssage: ""
		};
	}

	handleSignup = (e) => {
		e.preventDefault();
		const { email, province, password,phone, confirmPass } = this.state;
		console.log(phone,"phone");
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let validEmail = re.test(String(email).toLowerCase())
		if (email === '' )
			this.setState({ errorMssage: "email can't be empty" })
		else if (validEmail !== true )
			this.setState({ errorMssage: "Enter a valid Email Id" })
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
			const data = { email, province, phone, password }
			client.post( 'patient/register', data)
				.then(( res) => {
					let {error,user} = res.data;
					console.log(error,"what the fuck is this");
					if(error){

						return this.setState({ errorMssage: `User with email id ${this.state.email} already exist` })
					} 
					console.log('user',user)
					this.handleLogin()
				})
		}
		// this.state.confirmPass && this.setState({errorMssage:"email can't be empty"})


	};

	handleLogin = (e) => {
		e && e.preventDefault();
		const { email, password  } = this.state;

		if (email === '' )
			this.setState({ errorMssage: "email can't be empty" })
		else if (password === "" )
			this.setState({ errorMssage: "Password can't be empty" })
		else {
			this.setState({ errorMssage: "" })
			console.log("all ok")
			const data = { email, password }
			client.post('patient/authenticate', data)
				.then((res) => {
					console.log(res.data);
				})
		}

		console.log(this.state.email, this.state.password, 'Login data');
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
