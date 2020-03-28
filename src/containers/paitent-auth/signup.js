import React from 'react';
import './index.scss';
import { Form, Input, Button } from 'semantic-ui-react';

class PaitentSignup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			confirmPass: '',
		};
	}

	handleSignup = (e) => {
		e.preventDefault();
		console.log(this.state.username, this.state.password, this.state.confirmPass);
		

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
							<Form.Field>
								<label>Confirm Password</label>
								<input
									id="confirmPass"
									name="confirmPass"
									required
									type="password"
									placeholder="Confirm Password"
									onChange={this.handleFieldChange}
								/>
							</Form.Field>
							<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
								<Button color="green" type="submit" onClick={this.handleSignup}>
									Sign Up
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
							Already a member ?{'  '} 
							<span
								onClick={() => this.props.history.push('/paitent/login')}
								className="blue-anchor-link"
							>
								{' '}
								Log in{' '}
							</span>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default PaitentSignup;
