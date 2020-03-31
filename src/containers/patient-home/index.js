import React from 'react';
import { push } from 'connected-react-router';
import ChoroplethMap from '../../components/ChoroplethMap';



class PatientHome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			choroplethData: [],
			scope: 'India',
		};
	}


	render() {
		return (
			<React.Fragment>
			
			</React.Fragment>
		);
	}
}


export default PatientHome;
