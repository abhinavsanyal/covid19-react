import React from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { increment, incrementAsync, decrement, decrementAsync } from '../../modules/counter';
// import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import ChoroplethMap from '../../components/ChoroplethMap';
import stateData from './dummy/state-wise.json';
import districtData from './dummy/district-wise.json';

const mapMeta = {
	India: {
		name: 'India',
		mapType: 'country',
		graphObjectName: 'india',
		center: [ 78.9, 22 ],
		scale: 1000
	},
	'Andaman and Nicobar Islands': {
		name: 'Andaman and Nicobar Islands',
		mapType: 'state',
		graphObjectName: 'andamannicobarislands_district',
		center: [ 92, 8 ],
		scale: 4000
	},
	'Arunachal Pradesh': {
		name: 'Arunachal Pradesh',
		mapType: 'state',
		graphObjectName: 'arunachalpradesh_district',
		center: [ 94, 27 ],
		scale: 1000
	},
	'Andhra Pradesh': {
		name: 'Andhra Pradesh',
		mapType: 'state',
		graphObjectName: 'andhrapradesh_district',
		center: [ 80, 16 ],
		scale: 3200
	},

	Assam: {
		name: 'Assam',
		mapType: 'state',
		graphObjectName: 'assam_district',
		center: [ 92, 26 ],
		scale: 4500
	},
	Bihar: {
		name: 'Bihar',
		mapType: 'state',
		graphObjectName: 'bihar_district',
		center: [ 85, 25 ],
		scale: 6000
	},
	Chhattisgarh: {
		name: 'Chhattisgarh',
		mapType: 'state',
		graphObjectName: 'chhattisgarh_district',
		center: [ 82, 21 ],
		scale: 4500
	},
	Delhi: {
		name: 'Delhi',
		mapType: 'state',
		graphObjectName: 'delhi_1997-2012_district',
		center: [ 77, 28.5 ],
		scale: 30000
	},
	Karnataka: {
		name: 'Karnataka',
		mapType: 'state',
		graphObjectName: 'karnataka_district',
		center: [ 76, 15.05 ],
		scale: 4900
	},
	Kerala: {
		name: 'Kerala',
		mapType: 'state',
		graphObjectName: 'kerala_district',
		center: [ 76, 10.5 ],
		scale: 5000
	},
	Goa: {
		name: 'Goa',
		mapType: 'state',
		graphObjectName: 'goa_district',
		center: [ 74, 15 ],
		scale: 20000
	},
	Gujarat: {
		name: 'Gujarat',
		mapType: 'state',
		graphObjectName: 'gujarat_district_2011',
		center: [ 70.5, 22 ],
		scale: 4000
	},
	Haryana: {
		name: 'Haryana',
		mapType: 'state',
		graphObjectName: 'haryana_district',
		center: [ 76, 29 ],
		scale: 8000
	},
	'Himachal Pradesh': {
		name: 'Himachal Pradesh',
		mapType: 'state',
		graphObjectName: 'himachalpradesh_district',
		center: [ 77, 32 ],
		scale: 7000
	},
	'Jammu and Kashmir': {
		name: 'Jammu and Kashmir',
		mapType: 'state',
		graphObjectName: 'jammukashmir_district',
		center: [ 75, 34 ],
		scale: 5000
	},
	Jharkhand: {
		name: 'Jharkhand',
		mapType: 'state',
		graphObjectName: 'jharkhand_district',
		center: [ 85, 23 ],
		scale: 4500
	},
	Ladakh: {
		name: 'Ladakh',
		mapType: 'state',
		graphObjectName: 'ladakh_district',
		center: [ 76, 33 ],
		scale: 3000
	},
	'Madhya Pradesh': {
		name: 'Madhya Pradesh',
		mapType: 'state',
		graphObjectName: 'madhyapradesh_district',
		center: [ 77, 23 ],
		scale: 3000
	},
	Maharashtra: {
		name: 'Maharashtra',
		mapType: 'state',
		graphObjectName: 'maharashtra_district',
		center: [ 75, 18 ],
		scale: 3000
	},
	Manipur: {
		name: 'Manipur',
		mapType: 'state',
		graphObjectName: 'manipur_pre2016_districts',
		center: [ 93.5, 24 ],
		scale: 9000
	},
	Meghalaya: {
		name: 'Meghalaya',
		mapType: 'state',
		graphObjectName: 'meghalaya_district',
		center: [ 91, 24 ],
		scale: 6500
	},
	Mizoram: {
		name: 'Mizoram',
		mapType: 'state',
		graphObjectName: 'mizoram_district',
		center: [ 92.5, 23 ],
		scale: 10000
	},
	Nagaland: {
		name: 'Nagaland',
		mapType: 'state',
		graphObjectName: 'nagaland_district',
		center: [ 94, 25 ],
		scale: 7500
	},
	Odisha: {
		name: 'Odisha',
		mapType: 'state',
		graphObjectName: 'odisha_district',
		center: [ 84, 20 ],
		scale: 4000
	},
	Punjab: {
		name: 'Punjab',
		mapType: 'state',
		graphObjectName: 'punjab_district',
		center: [ 75, 30.7 ],
		scale: 8000
	},
	Rajasthan: {
		name: 'Rajasthan',
		mapType: 'state',
		graphObjectName: 'rajasthan_district',
		center: [ 73, 25 ],
		scale: 3000
	},
	Sikkim: {
		name: 'Sikkim',
		mapType: 'state',
		graphObjectName: 'sikkim_district',
		center: [ 88, 27.5 ],
		scale: 15000
	},
	'Tamil Nadu': {
		name: 'Tamil Nadu',
		mapType: 'state',
		graphObjectName: 'tamilnadu_district',
		center: [ 83, 18 ],
		scale: 1500
	},
	Telangana: {
		name: 'Telangana',
		mapType: 'state',
		graphObjectName: 'telugana',
		center: [ 79, 17 ],
		scale: 5000
	},
	Tripura: {
		name: 'Tripura',
		mapType: 'state',
		graphObjectName: 'tripura_district',
		center: [ 91.5, 23 ],
		scale: 10000
	},
	Uttarakhand: {
		name: 'Uttarakhand',
		mapType: 'state',
		graphObjectName: 'uttarakhand_district',
		center: [ 79, 30 ],
		scale: 8000
	},
	'Uttar Pradesh': {
		name: 'Uttar Pradesh',
		mapType: 'state',
		graphObjectName: 'uttarpradesh_district',
		center: [ 80, 27 ],
		scale: 3500
	},

	'West Bengal': {
		name: 'West Bengal',
		mapType: 'state',
		graphObjectName: 'westbengal_district',
		center: [ 87, 24 ],
		scale: 5000
	}
};
let countryInterval ;
let stateInterval ;
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			choroplethData: [],
			scope: 'India',
		};
	}


	 async getIndiaData(){
		const res = await fetch('https://api.covid19india.org/data.json');
		const states = await res.json();
		const data = states.statewise;
		let mockCovid =
			data.length > 0 &&
			data.map((info) => {
				let datapointArray = [];
				datapointArray[0] = info['state'];
				let obj = {};
				obj.confirmed = info.confirmed;
				obj.active = info.active;
				obj.recovered = info.recovered;
				obj.deaths = info.deaths;
				datapointArray[1] = obj;

				return datapointArray;
			});
		this.setState({
			choroplethData: mockCovid
		});
	}
	 async getStateData(scope){
		const res = await fetch('https://api.covid19india.org/state_district_wise.json');
		const states = await res.json();
 		const data = states[`${scope}`]['districtData'];
		const data_keys = Object.keys(data);
		let mockCovid =
			data_keys.length > 0 &&
			data_keys.map((info) => {
				let datapointArray = [];
				datapointArray[0] = info;
				let obj = {};
				console.log("sadasd", data[`${info}`])
				obj.confirmed = data[`${info}`].confirmed;
				// obj.active = info.active;
				// obj.recovered = info.recovered;
				// obj.deaths = info.deaths;
				datapointArray[1] = obj;

				return datapointArray;
			});
		this.setState({
			choroplethData: mockCovid
		});
	}

	componentDidMount() {
		this.getIndiaData();
		try {
		 countryInterval =	setInterval(async () => {
				this.getIndiaData();
			}, 4000);

		} catch (e) {
			console.log(e);
		}

	}

	handleScopeChange = (scope,mapType) => {
		let center = mapMeta[`${scope}`].center;
		let scale= mapMeta[`${scope}`].scale;
		clearInterval(countryInterval);
		this.getStateData(scope);
		try {
			setInterval(async () => {
				this.getStateData(scope);
			}, 4000);

		} catch (e) {
			console.log(e);
		}


		this.setState({scope});
	};

	render() {
		return (
			<React.Fragment>
				<div>
				{console.log()}
					<ChoroplethMap
						data={this.state.choroplethData}
						scope={this.state.scope}
						center={mapMeta[`${this.state.scope}`].center}
						scale={mapMeta[`${this.state.scope}`].scale}
						mapType={mapMeta[`${this.state.scope}`].mapType}
						handleScopeChange={this.handleScopeChange}
					/>
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
