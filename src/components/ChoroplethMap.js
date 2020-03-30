import React, { Component } from 'react';
import Datamap from 'datamaps/dist/datamaps.world.min.js';
import d3 from 'd3';
import IndiaJson from './India.topo.json';
import areArraysEqual from '../utils/areArraysEqual';
import maps from './maps'
import jsonFinder from './india.states.json'

class ChoroplethMap extends Component {
	componentDidMount() {
		this.buildMap();
	}
	componentDidUpdate(prevProps, prevState) {
		if (!areArraysEqual(prevProps.data, this.props.data)) this.buildMap();
	}

	buildMap = () => {
		const {data,scope,handleScopeChange,center,scale,mapType} = this.props;
		console.log(center,scale,"Printing center and scale")
		let dataset = {};
		let mapKey = jsonFinder[`${scope}`];
		console.log(`### the map to use := ${mapKey}, ### current scope := ${scope},## data := ${data}`)
		let jsonFile = maps[`${mapKey}`];
		let onlyValues;
		if(mapType==='country'){
			 onlyValues = data.map(function(obj) {
				return obj[1]['active'];
			});
		} else {
			onlyValues = data.map(function(obj) {
				return obj[1]['confirmed'];
			});
		}
		let minValue = Math.min.apply(null, onlyValues),
			maxValue = Math.max.apply(null, onlyValues);
		let paletteScale = d3.scale.linear().domain([ minValue, maxValue / 2 ]).range([ '#accbff', '#ed2939' ]); // red orange #fa954c85
		// fill dataset in appropriate format
		data.forEach(function(item) {
			let iso = item[0],
				value = item[1];

			dataset[iso] = mapType==='country' ?{
                numberOfThings: value['active'],
                confirmed:value['confirmed'],
				active: value['active'],
				recovered: value['recovered'],
				deaths: value['deaths'],
				fillColor: paletteScale(value['active'])
			}:{ numberOfThings: value['confirmed'],
			fillColor: paletteScale(value['confirmed'])};
		});
		let elem = document.getElementById('cloropleth_map');
		elem.innerHTML = '';

		let map = new Datamap({
			element: elem,
			scope: scope,
			responsive: true,
			geographyConfig: {
				popupOnHover: true,
				highlightOnHover: true,
				borderColor: '#444',
				highlightBorderWidth: 1,
				borderWidth: 0.5,
				dataJson: jsonFile,
				popupTemplate: function(geo, data) {
					// don't show tooltip if country don't present in dataset
					if (!data) {
						return;
					}

					let popup = mapType === 'country'?[
						'<div class="hoverinfo">',
						'<strong>',
						geo.properties.name + " total: " + data.confirmed,
						'</strong>',
						'<br>Active Cases: <strong>',
						data.active,
						'</strong>',
						'<br>Recovered Cases: <strong>',
						data.recovered,
						'</strong>',
						'<br>Death Toll: <strong>',
						data.deaths,
						'</strong>',
						'</div>'
					]:[
						'<div class="hoverinfo">',
						'<strong>',
						geo.properties.name ,
						'</strong>',
						'<br>Total Infected: <strong>',
						data.numberOfThings,
						'</strong>',
					]
					// tooltip content
					return popup.join('');
				}
			},
			fills: {
				HIGH: '#afafaf',
				LOW: '#123456',
				MEDIUM: 'blue',
				UNKNOWN: 'rgb(0,0,0)',
				defaultFill: 'white'
			},
			data: dataset,
			done: function(datamap) {
				datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
					handleScopeChange(geography.properties[`name`],"state")
				});
			},
			setProjection: function(element) {
				var projection = d3.geo
					.mercator()
					.center(center) // always in [East Latitude, North Longitude]
					.scale(scale)
					.translate([ element.offsetWidth / 2, element.offsetHeight / 2 ]);

				var path = d3.geo.path().projection(projection);
				return { path: path, projection: projection };
			}
		});
		d3.select(window).on('resize', function() {
			map.resize();
		});
	};
	render() {
		return (
			<div
				id="cloropleth_map"
				style={{
					height: '100%',
					width: '100%'
				}}
			/>
		);
	}
}

export default ChoroplethMap;
