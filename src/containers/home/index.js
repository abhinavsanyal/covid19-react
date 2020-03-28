import React from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { increment, incrementAsync, decrement, decrementAsync } from '../../modules/counter';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      userRole:"paitent"
    };
  }

	render() {
		return (
			<div>
				<div>
					<Button  onClick={()=>this.props.history.push("/doctor/login")} color="purple" content="Doctor" />
          <Button onClick={()=>this.props.history.push("/paitent/login")} color="yellow" content="Paitent" />
          
				</div>
			</div>
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
			increment,
			incrementAsync,
			decrement,
			decrementAsync,
			changePage: () => push('/about-us')
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
