import React, { Component } from 'react';
import 'react-input-range/lib/css/index.css'
import '../App.css';
import FontAwesome from 'react-fontawesome'
import {Link} from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/fr'

export default class Bureau extends Component {

	constructor(props){
		super(props)
		this.state = {
			showInfos: false,
			value: {min: '', max: ''},
			teste: '',
			showSuccessReservation: false,
			showReservation: false,
		}
	}

	closeInfos(){
    	this.setState({ showInfos: false });
  	}

  	openInfos(){
    	this.setState({ showInfos: true });
  	}
  	closeReservation(){
    	this.setState({ showReservation: false });
  	}

  	confirmReservation(){
  		fetch('http://localhost/phpawesomeproject/addReservation.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idPret: this.props.infos.idPret,
                dateTranche: this.props.infos.dateTranche,
                usernameReservateur: this.props.username,
                heureDebutTranche: this.state.value.min,
                heureFinTranche: this.state.value.max,
            })
        })    
        .then((response) => response.json())
        .then((res) => {
        	console.log(res.success)
            if (res.success){
            	this.setState({showSuccessReservation: true})
            } else {
            	this.setState({showErrorReservation: true})
            }
        })
        .catch((error) => console.error(error))
    	this.setState({ showReservation: false });
  	}

  	openReservation(){
  		if (this.props.username === this.props.infos.username){
  			this.setState({ 
  				showYourBureau: true,
  			})
  		} else {
	    	this.setState({ 
	    		showReservation: true,
	    		value: {
	    			min: parseFloat(this.props.heureDebutNb.substring(0,this.props.heureDebutNb.length-3)), 
	    			max: parseFloat(this.props.heureFinNb.substring(0,this.props.heureFinNb.length-3)),
	    			teste: 'ok'
	    		}
	    	})
	    }
  	}

  	closeYourBureau(){
  		this.setState({ 
			showYourBureau: false,
		})
  	}

  	closeSuccessReservation(){
  		this.setState({showSuccessReservation: false})
  		window.location.reload()
  	}

  	closeErrorReservation(){
  		this.setState({showErrorReservation: false})
  		window.location.reload()
  	}

	render(){
		var portable = []
		var fixe = []
		var phone = []
		var ethernet = []
		var reunion = []
		var imprimante = []
		var caftiere = []
		var bouilloire = []
		var refrigerateur = []
		var microOnde = []
		var ascenseur = []
		var favoris = []
		let i
		for (i = 0; i < this.props.nbFavoris; i++){
			if (this.props.infosFavoris[i].idBureau === this.props.infos.idBureau){
				favoris.push(<FontAwesome className='favorisTrue' name='star'/>)
			}
		}
		if (this.props.infos.fixe === '1'){
			fixe.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/ordinateur-fixe.svg')}/><p>Ordinateur fixe</p></div>)
		} else {
			fixe.push(<div key={'materiel' + moment()}></div>)
		}

		if (this.props.infos.portable === '1'){
			portable.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/ordinateur-portable.svg')}/><p>Ordinateur portable</p></div>)
		} else {
			portable.push(<div key={'materiel' + moment()}></div>)
		}


		if (this.props.infos.phone === '1'){
			phone.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/phone.svg')}/><p>Téléphone</p></div>)
		} else {
			phone.push(<div key={'materiel' + moment()}></div>)
		}

		if (this.props.infos.ethernet === '1'){
			ethernet.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/cable.svg')}/><p>Cable ethernet</p></div>)
		} else {
			ethernet.push(<div key={'materiel' + moment()}></div>)
		}

		if (this.props.infos.reunion === '1'){
			reunion.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/table.svg')}/><p>Table de réunion</p></div>)
		} else {
			reunion.push(<div key={'materiel' + moment()}></div>)
		}

		if (this.props.infos.imprimante === '1'){
			imprimante.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/imprimante.svg')}/><p>Imprimante</p></div>)
		} else {
			imprimante.push(<div key={'materiel' + moment()}></div>)
		}

		if (this.props.infos.caftiere === '1'){
			caftiere.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/cafetiere.svg')}/><p>Cafetière</p></div>)
		} else {
			caftiere.push(<div key={'materiel' + moment()}></div>)
		}

		if (this.props.infos.bouilloire === '1'){
			bouilloire.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/bouilloire.svg')}/><p>Bouilloire</p></div>)
		} else {
			bouilloire.push(<div key={'materiel' + moment()}></div>)
		}

		if (this.props.infos.refrigerateur === '1'){
			refrigerateur.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/frigo.svg')}/><p>Réfrigérateur</p></div>)
		} else {
			refrigerateur.push(<div key={'materiel' + moment()}></div>)
		}

		if (this.props.infos.microOnde === '1'){
			microOnde.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/micro-ondes.svg')}/><p>Micro-ondes</p></div>)
		} else {
			microOnde.push(<div key={'materiel' + moment()}></div>)
		}

		if (this.props.infos.ascenseur === '1'){
			ascenseur.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/ascenseur.svg')}/><p>Ascenseur</p></div>)
		} else {
			ascenseur.push(<div key={'materiel' + moment()}></div>)
		}
		if (this.state.value.teste !== ''){
			return (
				<Link to={`/DetailsBureau/${this.props.infos.idPret}/${this.props.infos.dateTranche}/${this.props.heureDebutNb}/${this.props.heureFinNb}`}>
				    <div key="bureau" className="bureau">
				    	<div className="title">
				    		<p>Bureau de <span onClick={() => this.openInfos()}>{this.props.infos.prenom} {this.props.infos.nom.substring(1, -50)}</span>{favoris}</p>
				    	</div>
						<div className="image">
							<img alt="bureau001" src={this.props.infos.image}/>
						</div>
						<div className="infos">
							<div className="details">
								<h4>Informations</h4>
								<div>
					    			<FontAwesome className='iconsDetails' name='globe'/><p><a href={"https://maps.google.fr/maps?f=q&hl=fr&q=" + this.props.infos.lattitude + "," + this.props.infos.longitude} target="_blank">{this.props.infos.nomLieu}</a></p>
					    		</div>
					    		<div>
					    			<FontAwesome className='iconsDetails' name='building'/><p>{this.props.infos.name}</p>
					    		</div>
					    		<div>
					    			<FontAwesome className='iconsDetails' name='info-circle'/><p>étage {this.props.infos.etage}</p>
					    		</div>
					    		<div>
					    			<FontAwesome className='iconsDetails' name='circle-o'/><p>{this.props.infos.bureau}</p>
					    		</div>
					    		<div>
					    			<FontAwesome className='iconsDetails' name='users'/><p>{this.props.infos.partage} collègue(s)</p>
					    		</div>
					    	</div>
					    	<div className="materiel-services">
						    	<div className="materiel">
						    		<h4>Materiel disponible</h4>
						    		{portable}
						    		{fixe}
						    		{phone}
						    		{ethernet}
						    		{reunion}
						    	</div>
						    	<div className="services">
						    		<h4>Services à proximité</h4>
						    		{imprimante}
						    		{ascenseur}
						    		{caftiere}
						    		{bouilloire}
						    		{refrigerateur}
						    		{microOnde}
						    	</div>
						    </div>
					    </div>
						<div className="checkEmprunt">
							<p>{moment(this.props.infos.dateTranche).format('ddd DD MMM')}</p>
							<p><span>{parseFloat(this.props.heureDebutNb.substring(0,this.props.heureDebutNb.length-3))}</span>h00 - <span>{parseFloat(this.props.heureFinNb.substring(0,this.props.heureFinNb.length-3))}</span>h00</p>
					    </div>
					</div>
				</Link>
			)
		}
	}
}