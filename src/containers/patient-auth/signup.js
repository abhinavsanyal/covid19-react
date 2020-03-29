import React from 'react';
import './index.scss';
import { Form, Input, Button } from 'semantic-ui-react';

class PaitentSignup extends React.Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	username: '',
		// 	password: '',
		// 	confirmPass: '',
		// };
	}

	// handleSignup = (e) => {
	// 	e.preventDefault();
	// 	console.log(this.state.username, this.state.password, this.state.confirmPass);

	// };
	// handleFieldChange = (e) => {
	// 	e.preventDefault();
	// 	// console.log(e.target.name,e.target.value)
	// 	this.setState({ [e.target.name]: e.target.value });
	// };

	render() {
		return (
			<React.Fragment>
				<div className="login-wrapper">
					<div className="form-card">
						<Form>
							<Form.Field>
								<label className="form-label">Username</label>
								<input
									id="username"
									name="username"
									required
									placeholder="Enter Username"
									onChange={this.props.handleFieldChange}
								/>
							</Form.Field>
							<Form.Field>
								<label className="form-label">Password</label>
								<input
									id="password"
									name="password"
									required
									type="password"
									placeholder="Enter Password"
									onChange={this.props.handleFieldChange}
								/>
							</Form.Field>
						
							<Form.Field>
								<label className="form-label">Confirm Password</label>
								<input
									id="confirmPass"
									name="confirmPass"
									required
									type="password"
									placeholder="Confirm Password"
									onChange={this.props.handleFieldChange}
								/>
							</Form.Field>
							<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
								<span className="button-glow-red btn" onClick={this.props.handleSignup}>
									{' '}
									Signup{' '}
								</span>
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
							Already a member ?{' '}
							<span
								onClick={() => {
									this.props.changeFormType('login');
								}}
								className="blue-anchor-link"
							>
								{' '}
								Login{' '}
							</span>
						</div>
					</div>
				</div>
			</React.Fragment>
			// <React.Fragment>
			// 	<div className="login-wrapper">
			// 		<div className="form-card">
			// 			<Form>
			// 				<Form.Field>
			// 					<label>Username</label>
			// 					<input
			// 						id="username"
			// 						name="username"
			// 						required
			// 						placeholder="Enter Username"
			// 						onChange={this.props.handleFieldChange}
			// 					/>
			// 				</Form.Field>
			// 				<Form.Field>
			// 					<label>Password</label>
			// 					<input
			// 						id="password"
			// 						name="password"
			// 						required
			// 						type="password"
			// 						placeholder="Enter Password"
			// 						onChange={this.props.handleFieldChange}
			// 					/>
			// 				</Form.Field>
			// 				<Form.Field>
			// 					<label>Confirm Password</label>
			// 					<input
			// 						id="confirmPass"
			// 						name="confirmPass"
			// 						required
			// 						type="password"
			// 						placeholder="Confirm Password"
			// 						onChange={this.props.handleFieldChange}
			// 					/>
			// 				</Form.Field>
			// 				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			// 					<span className="button-glow-blue btn" onClick={this.props.handleSignup}>
			// 						{' '}
			// 						Sign Up{' '}
			// 					</span>
			// 				</div>
			// 			</Form>
			// 			<div
			// 				style={{
			// 					marginTop: '10px',
			// 					display: 'flex',
			// 					justifyContent: 'center',
			// 					alignItems: 'center'
			// 				}}
			// 			>
			// 				{' '}
			// 				Already a member ?{'  '}
			// 				<span
			// 					onClick={() => {
			// 						this.props.changeFormType('login');
			// 					}}
			// 					className="blue-anchor-link"
			// 				>
			// 					{' '}
			// 					Log in{' '}
			// 				</span>
			// 			</div>
			// 		</div>
			// 	</div>
			// </React.Fragment>
		);
	}
}

export default PaitentSignup;
