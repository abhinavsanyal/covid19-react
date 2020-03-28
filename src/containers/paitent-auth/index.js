import React from 'react';
import './index.scss';
import { Form, Input, Button } from 'semantic-ui-react';

class PaitentLogin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
	}

	handleLogin = (e) => {
		e.preventDefault();
		console.log(this.state.username, this.state.password);
	};
	handleGuestLogin = (e) => {
		e.preventDefault();
		console.log(e.target.value);
	};
	handleFieldChange = (e) => {
		e.preventDefault();
		// console.log(e.target.name,e.target.value)
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<React.Fragment>
				<div className="login-wrapper">
					<div className="form-card">
						<Form>
							<Form.Field>
								<label>Username</label>
								<input
									id="username"
									name="username"
									required
									placeholder="Enter Username"
									onChange={this.handleFieldChange}
								/>
							</Form.Field>
							<Form.Field>
								<label>Password</label>
								<input
									id="password"
									name="password"
									required
									type="password"
									placeholder="Enter Password"
									onChange={this.handleFieldChange}
								/>
							</Form.Field>
							<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
								<Button color="green" type="submit" onClick={this.handleLogin}>
									Login
								</Button>
								<Button type="submit" onClick={this.handleGuestLogin}>
									Guest Login
								</Button>
							</div>
						</Form>
						<div
							style={{
								marginTop: '10px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							{' '}
							new to the platform ?{' '}
							<span
								onClick={() => this.props.history.push('/paitent/signup')}
								className="blue-anchor-link"
							>
								{' '}
								Sign up{' '}
							</span>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default PaitentLogin;
