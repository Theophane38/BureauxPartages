import React, { Component } from 'react';
import 'react-input-range/lib/css/index.css'
import '../App.css';
import FontAwesome from 'react-fontawesome'
import moment from 'moment'
import 'moment/locale/fr'
import InputRange from 'react-input-range';

export default class Reservation extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	value: { 
	    		min: 8, 
	    		max: 18 
	    	},
	    };
	}

	render(){
		return(
			<div className="reservation">
				<h1>Reservation</h1>
				<p>Quel créneau souhaitez-vous réserver ?</p>
				<h2>De {this.state.value.min}h à {this.state.value.max}h</h2>
				<div className="min">8h</div>
				<InputRange
		        maxValue={18}
		        minValue={8}
		        value={this.state.value}
		        step={1}
		        onChange={value => this.setState({ value: value })}
		        onChangeComplete={value => console.log(value)} />
		        <div className="max">18h</div>
		    </div>	
		);
	}
}
