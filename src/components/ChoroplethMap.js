import React, { Component } from 'react';
import Datamap from 'datamaps/dist/datamaps.world.min.js';
import d3 from 'd3';
import IndiaJson from './India.topo.json';
import areArraysEqual from '../utils/areArraysEqual'

class ChoroplethMap extends Component {
    componentDidMount() {
     this.buildMap();
    }
    componentDidUpdate(prevProps,prevState){
        console.log("prevProps",prevProps.data)
        console.log("current props", this.props.data)
        console.log("different or not",areArraysEqual(prevProps.data,this.props.data))
        if(!areArraysEqual(prevProps.data,this.props.data)) this.buildMap();
    }


    buildMap = () => {
        console.log("Coming here")
        // Datamaps expect data in format:
        // { "USA": { "fillColor": "#42a844", numberOfWhatever: 75},
        //   "FRA": { "fillColor": "#8dc386", numberOfWhatever: 43 } }
        let dataset = {};

        // We need to colorize every country based on "numberOfWhatever"
        // colors should be uniq for every value.
        // For this purpose we create palette(using min/max this.props.data-value)
        let onlyValues = this.props.data.map(function (obj) { return obj[1]; });
        let minValue = Math.min.apply(null, onlyValues),
            maxValue = Math.max.apply(null, onlyValues);

        // create color palette function
        // color can be whatever you wish
        let paletteScale = d3.scale.linear()
            .domain([minValue, maxValue])
            .range(["#EFEFFF", "#02386F"]); // blue color

        // fill dataset in appropriate format
        this.props.data.forEach(function (item) { //
            // item example value ["USA", 70]
            let iso = item[0],
                value = item[1];
            dataset[iso] = { numberOfThings: value, fillColor: paletteScale(value) };
        });

        console.log(dataset,"foo")

        let elem =document.getElementById('cloropleth_map');
        elem.innerHTML= "";

        let map = new Datamap({
            element: elem,
            scope: 'hr',
            geographyConfig: {
                popupOnHover: true,
                highlightOnHover: true,
                borderColor: '#444',
                highlightBorderWidth: 1,
                borderWidth: 0.5,
                dataJson: IndiaJson,
                popupTemplate: function (geo, data) {
                    // don't show tooltip if country don't present in dataset
                    if (!data) { return; }
                    // tooltip content
                    return ['<div class="hoverinfo">',
                        '<strong>', geo.properties.name, '</strong>',
                        '<br>Total Affected: <strong>', data.numberOfThings, '</strong>',
                        '<br>Discharged/Cured: <strong>', data.numberOfThings, '</strong>',
                        '<br>Death Toll: <strong>', data.numberOfThings, '</strong>',
                        '</div>'].join('');
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
                    console.log(geography.properties);
                });
            },
            setProjection: function (element) {
                
                var projection = d3.geo.mercator()
                    .center([ 78.9629, 23.5937]) // always in [East Latitude, North Longitude]
                    .scale(1000)
                    .translate([element.offsetWidth / 2, element.offsetHeight/2 ]);

                var path = d3.geo.path().projection(projection);
                return { path: path, projection: projection };
            }
        });
    }
    render() {
        return (
            <div id="cloropleth_map" style={{
                height: "100vh",
                width: "100%",
            }}></div>
        );
    }
}

export default ChoroplethMap;