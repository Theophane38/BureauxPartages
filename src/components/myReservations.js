import React, { Component } from 'react';
import 'react-input-range/lib/css/index.css'
import '../App.css';
import moment from 'moment'
import 'moment/locale/fr'
import {Button} from 'react-bootstrap'
import Modal from 'react-responsive-modal'

export default class MyReservations extends Component {

	constructor(props){
	    super(props)
	    this.state = {
	    	currentDate: moment().format('YYYY-MM-DD'), 
			nbCurrentHour: moment().format('HH'),
			nbCurrentDate: moment().format('YYYYMMDD'),
			showConfirmCancel: false,
			showDetailsMyReservation: false
	    }
	}

	deletePret(){
		fetch('http://localhost/phpawesomeproject/deleteReservation.php', {
		  	method: 'POST',
		  	headers: {
		      	'Accept': 'application/json',
		      	'Content-Type': 'application/json',
		  	},
		  	body: JSON.stringify({
		  		idReservation: this.props.infos.idReservation,
		      	idPret: this.props.infos.idPret,
		      	heureDebutReservation: this.props.infos.heureDebutReservation,
		      	heureFinReservation: this.props.infos.heureFinReservation,
		  	})
		})    
		.then((response) => response.json())
		.then((res) => { 
		    this.props.refresh()
		  	this.setState({
		  		showConfirmCancel: false,
		  	})
		})
		.catch((error) => console.error(error))
	}

	openDetailsMyReservation(){
		this.setState({ 
	      	showDetailsMyReservation: true,
	    })
	}
	closeDetailsMyReservation(){
		this.setState({ 
	      	showDetailsMyReservation: false,
	    })
	}

	openConfirmCancel(){
		this.setState({ 
	      	showConfirmCancel: true,
	    })
	}

	closeConfirmCancel(){
		this.setState({ 
	      	showConfirmCancel: false,
	    })
	}

	render(){
		var duree = []
		let when
		let nbHeureDebut = moment(this.props.infos.heureDebutReservation, "h:mm:ss").format('HH')
		let nbHeureFin = moment(this.props.infos.heureFinReservation, "h:mm:ss").format('HH')
		console.log(nbHeureDebut)
		console.log(nbHeureFin)
		let nbDate = moment(this.props.infos.dateReservation).format('YYYYMMDD')
		if (nbHeureDebut <= this.state.nbCurrentHour && this.state.nbCurrentHour < nbHeureFin && this.state.nbCurrentDate === nbDate){
			when = 'En cours'
		} else {
			when = 'A venir'
		}
		if (this.props.infos.dateDebut === this.props.infos.dateFin){
			duree.push(
				<h5 key={'duree' + moment()}>Le <span style={date}>{moment(this.props.infos.dateDebut).format('ddd DD MMM')}</span> de <span style={date}>{moment(this.props.infos.heureDebut, "h:mm:ss").format('HH')}h00</span> à <span style={date}>{moment(this.props.infos.heureFin, "h:mm:ss").format('HH')}h00</span></h5>
			)
		} else {
			duree.push(
				<h5 key={'duree' + moment()}>Du <span style={date}>{moment(this.props.infos.dateDebut).format('ddd DD MMM')}</span> à <span style={date}>{moment(this.props.infos.heureDebut, "h:mm:ss").format('HH')}h00</span> au <span style={date}>{moment(this.props.infos.dateFin).format('ddd DD MMM')}</span> à <span style={date}>{moment(this.props.infos.heureFin, "h:mm:ss").format('HH')}h00</span></h5>
			)
		}
		return(
			<table key="enCours">
	            <tbody>
	                <tr>
						<td rowSpan="1000" className="titreTab"><h4>{when}</h4></td>
						<td>Le {moment(this.props.infos.dateReservation).format('ddd DD MMM')} <br/>De {moment(this.props.infos.heureDebutReservation, 'hh:mm:ss').format('HH')}h00 à {moment(this.props.infos.heureFinReservation, 'hh:mm:ss').format('HH')}h00</td>
						<td>{this.props.infos.bureau} <br/></td>
						<td><span className="details" onClick={() => this.openDetailsMyReservation()}>Details(+)</span></td>
						<td><span className="cancel" onClick={() => this.openConfirmCancel()}>Annuler</span></td>
	                </tr>
	            </tbody>
	            <Modal open={this.state.showDetailsMyReservation} onClose={() => this.closeDetailsMyReservation()} center>
					<div>
						<h2 style={titreDetailsPret}>Details de votre réservation</h2>
						{duree}					
						<p>Lieu: <a href={"https://maps.google.fr/maps?f=q&hl=fr&q=" + this.props.infos.lattitude + "," + this.props.infos.longitude} target="_blank">{this.props.infos.nomLieu}</a></p>
						<p>Bâtiment/Aile: {this.props.infos.name}</p>
						<p>Bureau: {this.props.infos.bureau}</p>
						<p>Prêteur: {this.props.infos.prenom} {this.props.infos.nom}</p>
						<Button style={cancelButton} onClick={() => this.openConfirmCancel()}>
							Annuler ma réservation car elle n'est pas top !
						</Button>
						<Button style={closeButton} onClick={() => this.closeDetailsMyReservation()}>
							Fermer
						</Button>
					</div>
				</Modal>
	            <Modal open={this.state.showConfirmCancel} onClose={() => this.closeConfirmCancel()} center>
					<div className="mediumModal">
						<h1>Annulation</h1>
						<h6 style={annulation}>Etes-vous certain(e) de vouloir annuler votre prêt ?</h6>
						<Button style={cancelButton} onClick={() => this.deletePret(this.props.infos.idPret)}>
							Oui, je confirme mon annulation
						</Button>
						<Button style={closeButton} onClick={() => this.closeConfirmCancel()}>
							Non
						</Button>
					</div>
				</Modal>
	        </table>
        )
	}
}
const titreDetailsPret = {
	margin: 0,
}
const closeButton = {
	padding: '5px',
	fontSize: '15px',
	float: 'right',
	marginRight: '10px'
}
const cancelButton = {
	padding: '5px',
	fontSize: '15px',
	float: 'right',
	backgroundColor: 'red',
	color: '#fff',
}
const date = {
	fontWeight: 'bold',
}
const annulation = {
	margin: '15px 0px'
}
