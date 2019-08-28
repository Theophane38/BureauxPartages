import React, { Component } from 'react';
import 'react-input-range/lib/css/index.css'
import '../App.css';
import moment from 'moment'
import 'moment/locale/fr'
import {Button} from 'react-bootstrap'
import Modal from 'react-responsive-modal'
import DetailsReservateurs from './detailsReservateurs'

export default class MyPrets extends Component {

	constructor(props){
	    super(props)
	    this.state = {
			currentDate: moment().format('YYYY-MM-DD'), 
			currentHour: moment().format('HH:mm:ss'),
			currentDateHour: moment().format('YYYYMMDDHH'),
			isLoadinginfosReservedPrets: true,
			showReservationsPret: false,
			showDetailsMyPret: false,
			showConfirmCancel: false,
	    }
	}


  	deletePret(idPret){
		fetch('http://localhost/phpawesomeproject/deletePret.php', {
		  	method: 'POST',
		  	headers: {
		      	'Accept': 'application/json',
		      	'Content-Type': 'application/json',
		  	},
		  	body: JSON.stringify({
		      	idPret: idPret,
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

	openReservationsPret(){
	    this.setState({ 
	    	showReservationsPret: true,
	    })
	}

	closeReservationsPret(){
	    this.setState({ 
	      	showReservationsPret: false,
	    })
	}

	openDetailsMyPret(){
		this.setState({ 
	      	showDetailsMyPret: true,
	    })
	}
	closeDetailsMyPret(){
		this.setState({ 
	      	showDetailsMyPret: false,
	    })
	}

	openConfirmCancel(){
		this.setState({ 
	      	showConfirmCancel: true,
	      	showDetailsMyPret: false,
	    })
	}

	closeConfirmCancel(){
		this.setState({ 
	      	showConfirmCancel: false,
	    })
	}

	closeInfos(){
    	this.setState({ showInfos: false });
  	}

  	openInfos(){
    	this.setState({ showInfos: true });
  	}

	render(){
			var reservation = []
			var when = ''
			var classe
			var nombreReservations = []
			var duree = []
			var phraseAnnulation = []
			var i = 0
			let nbDateHeureDebut = parseInt(moment(this.props.infos.dateDebut).format('YYYYMMDD') + moment(this.props.infos.heureDebut, "h:mm:ss").format('HH'), 10)
			let nbDateHeureFin = parseInt(moment(this.props.infos.dateFin).format('YYYYMMDD') + moment(this.props.infos.heureFin, "h:mm:ss").format('HH'), 10)
			if (nbDateHeureDebut <= this.state.currentDateHour && this.state.currentDateHour < nbDateHeureFin){
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
			if (this.props.nbReservedPrets !== 0){
				phraseAnnulation.push(
					<h6 key={'phraseAnnulation' + moment()} style={annulation}>Etes-vous certain(e) de vouloir annuler votre prêt ?<br/> Cela mettra <b>{this.props.nbReservedPrets} personne(s)</b> à la porte !</h6>
				)
				for (i = 0; i < this.props.nbReservationsTotal; i++){
					console.log(this.props.infos.idPret)
					console.log(this.props.infosReservedPrets[i].idPret)
					if (this.props.infosReservedPrets[i].idPret === this.props.infos.idPret){
						console.log('test' + i)
						let heureFinResa = parseInt(moment(this.props.infosReservedPrets[i].dateReservation).format('YYYYMMDD') + moment(this.props.infosReservedPrets[i].heureFinReservation, ('h:mm:ss')).format('HHmm'), 10)
						let heureDebutResa = parseInt(moment(this.props.infosReservedPrets[i].dateReservation).format('YYYYMMDD') + moment(this.props.infosReservedPrets[i].heureDebutReservation, ('h:mm:ss')).format('HHmm'), 10)
						if (moment().format('YYYYMMDDHHmm') > heureFinResa){
							classe = 'past'
							console.log('past')
						} else if (moment().format('YYYYMMDDHHmm') < heureDebutResa){
							classe = 'later'
						} else {
							classe = 'current'
						}
						reservation.push(
							<DetailsReservateurs key={'detailsReservateur' + i} classe={classe} infosReservateur={this.props.infosReservateur[i]} infosReservedPrets={this.props.infosReservedPrets[i]}/>
						)
					}
				}
			} else {
				reservation.push(<tr key={'reservation' + moment()}></tr>)
				phraseAnnulation.push(
					<h6 key={'phraseAnnulation' + moment()} style={annulation}>Etes-vous certain(e) de vouloir annuler votre prêt ?</h6>
				)
			}
			if (this.props.nbReservedPrets === 0){
				nombreReservations.push (
					<td key={'nbreservation' + moment()}>0 Réservation</td>
				)
			} else if (this.props.nbReservedPrets === 1) {
				nombreReservations.push(
					<td key={'nbreservation' + moment()}><span className="nbReservations" onClick={() => this.openReservationsPret()}>{this.props.nbReservedPrets} Réservation</span></td>
				)
			} else {
				nombreReservations.push(
					<td key={'nbreservation' + moment()}><span className="nbReservations" onClick={() => this.openReservationsPret()}>{this.props.nbReservedPrets} Réservations</span></td>
				)
			}
			return(
				<table className="myPrets">
		            <tbody>
		                <tr>
							<td className="titreTab"><h4>{when}</h4></td>
							<td>Du {moment(this.props.infos.dateDebut).format('ddd DD MMM')} à {moment(this.props.infos.heureDebut, "h:mm:ss").format('HH')}h00<br/>au {moment(this.props.infos.dateFin).format('ddd DD MMM')} à {moment(this.props.infos.heureFin, "h:mm:ss").format('HH')}h00</td>
							{nombreReservations}
							<td><span className="details" onClick={() => this.openDetailsMyPret()}>Details(+)</span></td>
							<td><span className="cancel" onClick={() => this.openConfirmCancel()}>Annuler</span></td>
							<Modal open={this.state.showReservationsPret} onClose={() => this.closeReservationsPret()} center>
								<div>
									<h1>Réservations</h1>
									<table className="myPretsDetails">
									<tbody>
									<tr>
										<td>Identité</td>
										<td>Jour</td>
										<td>Heure de début</td>
										<td>Heure de fin</td>
									</tr>
									{reservation}
									</tbody>
									</table>
									
									<Button style={closeButton} onClick={() => this.closeReservationsPret()}>
										Fermer
									</Button>
								</div>
							</Modal>
							<Modal open={this.state.showDetailsMyPret} onClose={() => this.closeDetailsMyPret()} center>
								<div className="mediumModal">
									<h2 style={titreDetailsPret}>Details de votre prêt</h2>
									{duree}
									<p>Nombre actuel de réservations: <span style={reservations} onClick={() => this.openReservationsPret()}>{this.props.nbReservedPrets} Réservation(s)</span></p>					
									<p>Votre bureau: {this.props.infos.bureau}</p>
									<p>Bâtiment/Aile: {this.props.infos.name}</p>
									<p>Lieu: {this.props.infos.nomLieu}</p>
									<Button style={cancelButton} onClick={() => this.openConfirmCancel()}>
										Annuler mon prêt
									</Button>
									<Button style={closeButton} onClick={() => this.closeDetailsMyPret()}>
										Fermer
									</Button>
								</div>
							</Modal>
							<Modal open={this.state.showConfirmCancel} onClose={() => this.closeConfirmCancel()} center>
								<div className="mediumModal">
									<h1>Annulation</h1>
									{phraseAnnulation}
									<Button style={cancelButton} onClick={() => this.deletePret(this.props.infos.idPret)}>
										Oui, je confirme mon annulation
									</Button>
									<Button style={closeButton} onClick={() => this.closeConfirmCancel()}>
										Non
									</Button>
								</div>
							</Modal>
						</tr>
					</tbody>
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
const reservations = {
	textDecoration: 'underline',
	color: '#0060aa',
	cursor: 'pointer'
}
const annulation = {
	margin: '15px 0px'
}