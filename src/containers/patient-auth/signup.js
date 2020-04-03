import React from 'react';
import './index.scss';
import { Form,  Message } from 'semantic-ui-react';
import _ from 'lodash';
import { Dropdown } from 'semantic-ui-react';
import 'react-phone-number-input/style.css';
import  { isValidPhoneNumber } from 'react-phone-number-input';
import Input from 'react-phone-number-input/input';
import addressDefinitions from '../../utils/indianStateList.json';

//   const addressDefinitions = faker.definitions.address;
console.log(addressDefinitions);

const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
	key: addressDefinitions.state_abbr[index],
	text: state,
	value: addressDefinitions.state_abbr[index]
}));

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
								<label className="form-label">Phone number</label>
								<Form.Group>
									{<span style={{marginRight:"10px",lineHeight:"3"}} >{'+91'}</span>}<Input country="IN" placeholder="Enter phone number"  onChange={this.props.phoneChange} />
									</Form.Group>
							</Form.Field>

							<Form.Field>
								<label className="form-label">State / Province</label>
								<Dropdown
									placeholder="Please Select"
									search
									selection
									options={stateOptions}
									name="province"
									onChange={this.props.locationChange}
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

						{this.props.errorMssage && <Message color="red">{this.props.errorMssage}</Message>}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default PaitentSignup;
