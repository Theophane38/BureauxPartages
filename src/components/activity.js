import React, { Component } from 'react'
import '../App.css'
import moment from 'moment'
import {Link, Redirect} from 'react-router-dom'
import 'moment/locale/fr'

class Activity extends Component {


	constructor(props){
	    super(props)
	    this.state = {
	      currentDate: moment().format('YYYY-MM-DD'), 
	      currentHour: moment().format('HH'),
	      currentPretsAreLoading: true
	    }
	}

	componentWillMount() {
	    this.getAllCurrentPrets();
	    this.getLieux();
	}


	getAllCurrentPrets(){
	    fetch('http://localhost/phpawesomeproject/getAllCurrentPrets.php', {
	        method: 'POST',
	        headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json',
	        },
	        body: JSON.stringify({
	          currentDate: this.state.currentDate,
	          currentHour: this.state.currentHour
	        })
	    })    
	    .then((response) => response.json())
	    .then((res) => {
	        this.setState({
	        	infosCurrentPrets: res.infosPrets,
	        	nbCurrentPrets: res.nbPrets,
	        	currentPretsAreLoading: false
	        })
	        console.log(res.infosPrets)
	    })
	    .catch((error) => console.error(error))
	}

	getLieux(){
        fetch('http://localhost/phpawesomeproject/getLieux.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            })
        })            
        .then((response) => response.json())
        .then((res) => {
            this.setState({lieux: res.lieux, nbLieux: res.nbLieux})
            console.log(res.lieux)
        })
        .catch((error) => console.error(error))
    }

  	render() {
  		if (typeof this.props.username === "undefined" ){
      		return(
        		<Redirect to="/"/>
      		)
      	} else {
		  	if (this.state.currentPretsAreLoading){
		  		return (
			      <div className="activity">
			        <h1>En Attente</h1>
			      </div>
			    );
		  	}
		  	else {
		  		let i
		  		let j
		  		let currentLieu = []
		  		for (j = 0; j < this.state.nbLieux; j++){
		  			let currentPret = []
		  			currentLieu.push(
	  					<div>
	  						<h3>{this.state.lieux[j].nomLieu}</h3>
	  						<table>
	  							<tbody>
	  								<tr>
	  									<td>Agent</td>
	  									<td>Bâtiment</td>
	  									<td>Bureau</td>
	  								</tr>
	  								{currentPret}
	  							</tbody>
	  						</table>
	  					</div>
	  				)
	  				let nbNoMatch = 0
	  				if (this.state.nbCurrentPrets > 0){
			  			for (i = 0; i < this.state.nbCurrentPrets; i++){
			  				if (this.state.lieux[j].idLieu === this.state.infosCurrentPrets[i].idLieu){
					  			currentPret.push(
					  				<tr>
						  				<td>{this.state.infosCurrentPrets[i].prenom} {this.state.infosCurrentPrets[i].nom}</td>
						  				<td>{this.state.infosCurrentPrets[i].name}</td>
						  				<td>{this.state.infosCurrentPrets[i].bureau}</td>
						  			</tr>
					  			)
					  		} else {
					  			nbNoMatch++
					  			if (nbNoMatch == this.state.nbCurrentPrets){
					  				currentPret.push(
						  				<tr>
							  				<td colSpan="3">Aucun prêt en cours dans ce lieu.</td>
							  			</tr>
						  			)
					  			}
					  		}
					  			
				  		}
				  	} else {
				  		currentPret.push(
			  				<tr>
				  				<td colSpan="3">Aucun prêt en cours dans ce lieu.</td>
				  			</tr>
			  			)
				  	}
		  		}
	  			return (
			      	<div className="activity">
			        	<h2>Tous les echanges de bureaux en cours.</h2>
			        	{currentLieu}
			      	</div>
			    )
		  	}
		}
  	}
}

export default Activity;
