import React from 'react';
import './index.scss';
import { Form, Input, Button } from 'semantic-ui-react';
import PatientLogin from './login';
import PatientSignup from './signup';

class PaitentAuth extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formType: 'login',
			username: '',
			password: '',
			confirmPass: '',
			location: ''
		};
	}

	handleSignup = (e) => {
		e.preventDefault();
		console.log(this.state.username, this.state.password, this.state.confirmPass, 'Signup data');
	};

	handleLogin = (e) => {
		e.preventDefault();
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
						/>
					) : (
						<PatientSignup
							handleFieldChange={this.handleFieldChange}
							handleSignup={this.handleSignup}
							changeFormType={this.handleChangeForm}
						/>
					)}
				</div>
			</React.Fragment>
		);
	}
}

export default PaitentAuth;
