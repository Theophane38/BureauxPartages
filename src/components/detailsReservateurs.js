import React, { Component } from 'react';
import '../App.css';
import moment from 'moment'
import 'moment/locale/fr'
import DetailsProfil from './detailsProfil'
import {Button, Modal} from 'react-bootstrap'

export default class DetailsReservateurs extends Component {

	constructor(props){
	    super(props)
	    this.state = {
			showReservationsPret: false,
	    }
	}
	
	closeInfos(){
    	this.setState({ showInfos: false });
  	}

  	openInfos(){
    	this.setState({ showInfos: true });
  	}

	render(){
		return(
			<tr className={this.props.classe}>
				<td><span className="lienProfil" onClick={() => this.openInfos()}>{this.props.infosReservateur.prenom} {this.props.infosReservateur.nom}</span></td>
				<td>{moment(this.props.infosReservedPrets.dateReservation).format('ddd DD MMM')}</td>
				<td>{this.props.infosReservedPrets.heureDebutReservation}</td>
				<td>{this.props.infosReservedPrets.heureFinReservation}</td>
				<Modal aria-labelledby='modal-label' style={modalStyle} backdropStyle={backdropStyle} show={this.state.showInfos} onHide={() => this.closeInfos()}>
      				<div style={dialogStyle} >
      					<DetailsProfil profil={this.props.infosReservateur}/>
        				<Button style={closeButton} onClick={() => this.closeInfos()}>
					      	Fermer
					    </Button>
     	 			</div>
    			</Modal>
			</tr>
		);
	}
}

const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0, bottom: 0, left: 0, right: 0
};

const backdropStyle = {
  ...modalStyle,
  zIndex: 'auto',
  backgroundColor: '#000',
  opacity: 0.5
};
const dialogStyle = {
    position: 'absolute',
    width: 800,
    top: '50px',
    left: -100,
    border: '1px solid #e5e5e5',
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    padding: 20
}
const closeButton = {
	float: 'right'
}
