import React from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { increment, incrementAsync, decrement, decrementAsync } from '../../modules/counter';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import ChoroplethMap from '../../components/ChoroplethMap';


const mockCoronaData =  [
	["CH", 75], ["HR", 43], ["JK", 50], ["BC", 88], ["NU", 21], ["NT", 43],
	["KA", 100], ["ON", 19], ["QC", 60], ["NB", 4], ["NS", 44], ["NF", 38],
	["PE", 67]];
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			choroplethData: [
				],

		};
	}

	componentDidMount(){
		this.setState({choroplethData:mockCoronaData})
	}

	

	render() {
		return (
			<React.Fragment>
				<div >
					<ChoroplethMap data={this.state.choroplethData} />
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ counter }) => ({
	count: counter.count,
	isIncrementing: counter.isIncrementing,
	isDecrementing: counter.isDecrementing
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			changePage: () => push('/p')
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
