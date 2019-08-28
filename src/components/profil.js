import React, { Component } from 'react'
import '../App.css'
import moment from 'moment'
import 'moment/locale/fr'
import {Button} from 'react-bootstrap'
import Modal from 'react-responsive-modal'
import ImageDrop from './imageDrop'
import {Link} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'

export default class Profil extends Component {

	constructor(props){
		super(props)
		this.state = { 
			isLoading: true
		}
	}

	componentWillMount() {
		this.getInfos();
		console.log('profil', this.props.username)
	}

	getInfos(){
        fetch('http://localhost/phpawesomeproject/getInfos.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.props.username,
            })
        })    
        .then((response) => response.json())
        .then((res) => {
            this.setState({infos: res.infos, bureau: res.bureau, isLoading: false});
        })
        .catch((error) => console.error(error))
    }

    openEditBureau(){
  		this.setState({ showEditBureau: true });
  	}

  	closeEditBureau(){
  		this.setState({ showEditBureau: false });
  		this.props.close()
  	}



	render(){
		if (!this.state.isLoading){
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
			var infosBureau = []
			if (!this.state.bureau){
				infosBureau.push(
					<p>Vous n'avez pas encore renseigné votre bureau</p>
				)
			} else {
				infosBureau.push(
					<div>
						<div className="modifyInfos" onClick={() => this.openEditBureau()}><FontAwesome name='pencil'/>Modifier</div>
				        <div className="ligneInfos">
				        	<p className="key">Lieu :</p><p className="value">{this.state.infos.nomLieu}</p>
				        </div>
				        <div className="ligneInfos">
				        	<p className="key">Code postal :</p><p className="value">{this.state.infos.codePostal}</p>
				        </div>
				        <div className="ligneInfos">
				        	<p className="key">Commune</p><p className="value">{this.state.infos.nomCommune}</p>
				        </div>
				        <div className="ligneInfos">
				        	<p className="key">Batiment/Aile :</p><p className="value">{this.state.infos.name}</p>
				        </div>
				        <div className="ligneInfos">
				        	<p className="key">Bureau :</p><p className="value">{this.state.infos.bureau}</p>
				        </div>
				        <div className="ligneInfos">
				        	<p className="key">Etage :</p><p className="value">{this.state.infos.etage}</p>
				        </div>
				        <div className="ligneInfos">
				        	<p className="key">Collègues :</p><p className="value">{this.state.infos.partage}</p>
				        </div>
				        <div className="ligneInfos">
				        	<p className="key">Matériel du bureau :</p>
			        		<ul>
			        			{portable}
			        			{fixe}
			        			{phone}
			        			{ethernet}
			        			{reunion}
			        		</ul>
				        </div>
				        <div className="ligneInfos">
				        	<p className="key">Services à proximité :</p>
				        	<ul>
				        		{imprimante}
				        		{ascenseur}
				        		{caftiere}
				        		{bouilloire}
				        		{refrigerateur}
				        		{microOnde}
				        	</ul>
				        </div>
			        </div>
				)
			}
			if (this.state.infos.portable === '1'){
				portable.push(<li key={"materiel" + moment()}>Ordinateur portable</li>)
			} else {
				portable.push(<div key={"materiel" + moment()}></div>)
			}

			if (this.state.infos.fixe === '1'){
				fixe.push(<li key={"materiel" + moment()}>Ordinateur fixe</li>)
			} else {
				fixe.push(<div key={"materiel" + moment()}></div>)
			}
			if (this.state.infos.phone === '1'){
				phone.push(<li key={"materiel" + moment()}>Téléphone</li>)
			} else {
				phone.push(<div key={"materiel" + moment()}></div>)
			}

			if (this.state.infos.ethernet === '1'){
				ethernet.push(<li key={"materiel" + moment()}>Câble ethernet</li>)
			} else {
				ethernet.push(<div key={"materiel" + moment()}></div>)
			}

			if (this.state.infos.reunion === '1'){
				reunion.push(<li key={"materiel" + moment()}>Table de réunion</li>)
			} else {
				reunion.push(<div key={"materiel" + moment()}></div>)
			}

			if (this.state.infos.imprimante === '1'){
				imprimante.push(<li key={"materiel" + moment()}>Imprimante</li>)
			} else {
				imprimante.push(<div key={"materiel" + moment()}></div>)
			}

			if (this.state.infos.caftiere === '1'){
				caftiere.push(<li key={"materiel" + moment()}>Caftière</li>)
			} else {
				caftiere.push(<div key={"materiel" + moment()}></div>)
			}

			if (this.state.infos.bouilloire === '1'){
				bouilloire.push(<li key={"materiel" + moment()}>Bouilloire</li>)
			} else {
				bouilloire.push(<div key={"materiel" + moment()}></div>)
			}

			if (this.state.infos.refrigerateur === '1'){
				refrigerateur.push(<li key={"materiel" + moment()}>Réfrigérateur</li>)
			} else {
				refrigerateur.push(<div key={"materiel" + moment()}></div>)
			}

			if (this.state.infos.microOnde === '1'){
				microOnde.push(<li key={"materiel" + moment()}>Micro-ondes</li>)
			} else {
				microOnde.push(<div key={"materiel" + moment()}></div>)
			}

			if (this.state.infos.ascenseur === '1'){
				ascenseur.push(<li key={"materiel" + moment()}>Ascenseur</li>)
			} else {
				ascenseur.push(<div key={"materiel" + moment()}></div>)
			}
			return(
				<div className="detailsProfil">
					<h3 id='modal-label'>Mon profil</h3>
	            	<h4>MES COORDONNEES</h4>
	            	<div className="triangle"></div>
	            	<div className="triangle2"></div>
	            	<div className="ligneInfos">
			        	<p className="key">Nom :</p><p className="value">{this.state.infos.nom}</p>
			        </div>
			        <div className="ligneInfos">
			        	<p className="key">Prenom :</p><p className="value">{this.state.infos.prenom}</p>
			        </div>
	        		<div className="ligneInfos">
			        	<p className="key">Service :</p><p className="value">{this.state.infos.service}</p>
			        </div>
			        <div className="ligneInfos">
			        	<p className="key">Téléphone :</p><p className="value">{this.state.infos.numberPhone}</p>
			        </div>
			        <div className="ligneInfos">
			        	<p className="key">Email :</p><p className="value">{this.state.infos.mail}</p>
			        </div>
			        <h4>MON BUREAU</h4>
			        <div className="triangle"></div>
			        <div className="triangle2"></div>
			       	{infosBureau}
			        <Modal open={this.state.showEditBureau} showCloseIcon={false}>
	      				<div className="bigModal">
	      					<h1>Editer votre bureau</h1>
	      					<ImageDrop username={this.props.username}/>
        					<Link to="/Accueil">
	        					<Button className='closeButton' onClick={() => this.closeEditBureau()}>
							      	Fermer
							    </Button>
							</Link>
	     	 			</div>
	    			</Modal>
	            </div>
			)
		} else {
			return(
				<div></div>
			)
		}
	}
}

