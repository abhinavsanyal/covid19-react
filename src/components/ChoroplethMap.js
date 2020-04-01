import React, { Component } from 'react';
import Datamap from 'datamaps/dist/datamaps.world.min.js';
import d3 from 'd3';
import areArraysEqual from '../utils/areArraysEqual';
import maps from './maps'
import jsonFinder from './india.states.topo.json';
import testCenterIconURL from "./SVG/pin.svg"
import testCenters from "./testCenters"

class ChoroplethMap extends Component {
	componentDidMount() {
		
		this.customMarker();
		this.buildMap();
		
		
	}

	customMarker = () =>{
	
			if (typeof Datamap !== 'undefined') {
			  // Handler custom markers.
			  Datamap.customMarkers = function (layer, data, options) {
				var self = this,
				  fillData = this.options.fills,
				  svg = this.svg;
		  
				// Check for map data.
				if (!data || (data && !data.slice)) {
				  throw "Datamaps Error - markers must be an array";
				}
		  
				// Build markers.
				var markers = layer
				  .selectAll('image.datamaps-markers')
				  .data(data, JSON.stringify);
		  
				markers
				  .enter()
				  .append('image')
				  .attr('class', 'datamaps-marker')
				  .attr('xlink:href', options.icon.url)
				  .attr('width', options.icon.width)
				  .attr('height', options.icon.height)
				  .attr('x', function (markerData) {
					var latLng;
					if (markerHasCoordinates(markerData)) {
					  latLng = self.latLngToXY(markerData.latitude, markerData.longitude);
					}
					else if (markerData.centered) {
					  latLng = self.path.centroid(svg.select('path.' + markerData.centered).data()[0]);
					}
					if (latLng) return (latLng[0] - (options.icon.width / 2));
				  })
				  .attr('y', function (markerData) {
					var latLng;
					if (markerHasCoordinates(markerData)) {
					  latLng = self.latLngToXY(markerData.latitude, markerData.longitude);
					}
					else if (markerData.centered) {
					  latLng = self.path.centroid(svg.select('path.' + markerData.centered).data()[0]);
					}
					if (latLng) return (latLng[1] - options.icon.height);
				  })
				  .on('mouseover', function (markerData) {
					  var $this = d3.select(this);
					  if (options.popupOnHover) {
					  self.updatePopup($this, markerData, options, svg);
					}
				  })
				  .on('mouseout', function (markerData) {
					var $this = d3.select(this);
					if (options.highlightOnHover) {
					  // Reapply previous attributes.
					  var previousAttributes = JSON.parse($this.attr('data-previousAttributes'));
					  for (var attr in previousAttributes) {
						$this.style(attr, previousAttributes[attr]);
					  }
					}
					d3.selectAll('.datamaps-hoverover').style('display', 'none');
				  })
		  
				markers.exit()
				  .transition()
				  .delay(options.exitDelay)
				  .attr("height", 0)
				  .remove();
		  
				// Checks if a marker has latitude and longitude provided.
				function markerHasCoordinates(markerData) {
				  return typeof markerData !== 'undefined' && typeof markerData.latitude !== 'undefined' && typeof markerData.longitude !== 'undefined';
				}
			  }
			}
		  
	}
	componentDidUpdate(prevProps, prevState) {
		if (!areArraysEqual(prevProps.data, this.props.data)){
			this.buildMap();
			this.customMarker();
		} 
	}

	buildMap = () => {
		const {data,scope,handleScopeChange,center,scale,mapType,getDataOnHover,onHoverEnd} = this.props;
		let dataset = {};
		let mapKey = jsonFinder[`${scope}`];
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
					// don't show toolt	ip if country don't present in dataset
					if (!data) {
						return;
					}
					getDataOnHover(geo.properties.name,data);
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
				let Map = window.document.getElementsByClassName('datamaps-subunits')
				
				Map[0].addEventListener('mouseleave', function(e) {
					e.stopPropagation();
					onHoverEnd();
				})
				datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
					if(mapType === 'country') handleScopeChange(geography.properties[`name`],"state")
				})
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

		map.addPlugin('markers', Datamap.customMarkers);
		console.log(center,"center")
		var options = {
			fillOpacity: 1,
			popupOnHover: true,
			popupTemplate: function(data) {
				return "<div class='hoverinfo'>" + data.latitude + "   and the    " + data.longitude + "</div>";
			},
			icon: {
			  url: testCenterIconURL,
			  width: 30,
			  height: 30
			}
		  };
		  let markersData = testCenters.map(center=>{
			  center[`name`] = center.institution;
			  return center;
			})
			
			// .filter(marker => {
			// 	return !(marker.latitude >= center[0] && marker.longitude <= center[1])
			// })
			  

		  map.markers(markersData, options);
	
	};
	render() {
		return (
			<div
				id="cloropleth_map"
				className="cloropleth_map"
				style={{
					height: '100%',
					width: '100%',
				}}
			/>
		);
	}
}

export default ChoroplethMap;
