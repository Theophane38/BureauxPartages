import React, { Component } from 'react'
import '../App.css'
import moment from 'moment'
import 'moment/locale/fr'

export default class DetailsProfil extends Component {


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
		var infosBureau = []
		infosBureau.push(
			<div>
		        <div className="ligneInfos">
		        	<p className="key">Lieu :</p><p className="value">{this.props.profil.nomLieu}</p>
		        </div>
		        <div className="ligneInfos">
		        	<p className="key">Code postal :</p><p className="value">{this.props.profil.codePostal}</p>
		        </div>
		        <div className="ligneInfos">
		        	<p className="key">Commune</p><p className="value">{this.props.profil.nomCommune}</p>
		        </div>
		        <div className="ligneInfos">
		        	<p className="key">Batiment :</p><p className="value">{this.props.profil.name}</p>
		        </div>
		        <div className="ligneInfos">
		        	<p className="key">Bureau :</p><p className="value">{this.props.profil.bureau}</p>
		        </div>
		        <div className="ligneInfos">
		        	<p className="key">Etage :</p><p className="value">{this.props.profil.etage}</p>
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
        if (this.props.profil.portable === '1'){
			portable.push(<li key={"materiel" + moment()}>Ordinateur portable</li>)
		} else {
			portable.push(<div key={"materiel" + moment()}></div>)
		}

		if (this.props.profil.fixe === '1'){
			fixe.push(<li key={"materiel" + moment()}>Ordinateur fixe</li>)
		} else {
			fixe.push(<div key={"materiel" + moment()}></div>)
		}
		if (this.props.profil.phone === '1'){
			phone.push(<li key={"materiel" + moment()}>Téléphone</li>)
		} else {
			phone.push(<div key={"materiel" + moment()}></div>)
		}

		if (this.props.profil.ethernet === '1'){
			ethernet.push(<li key={"materiel" + moment()}>Câble ethernet</li>)
		} else {
			ethernet.push(<div key={"materiel" + moment()}></div>)
		}

		if (this.props.profil.reunion === '1'){
			reunion.push(<li key={"materiel" + moment()}>Salle de réunion</li>)
		} else {
			reunion.push(<div key={"materiel" + moment()}></div>)
		}

		if (this.props.profil.imprimante === '1'){
			imprimante.push(<li key={"materiel" + moment()}>Imprimante</li>)
		} else {
			imprimante.push(<div key={"materiel" + moment()}></div>)
		}

		if (this.props.profil.caftiere === '1'){
			caftiere.push(<li key={"materiel" + moment()}>Caftière</li>)
		} else {
			caftiere.push(<div key={"materiel" + moment()}></div>)
		}

		if (this.props.profil.bouilloire === '1'){
			bouilloire.push(<li key={"materiel" + moment()}>Bouilloire</li>)
		} else {
			bouilloire.push(<div key={"materiel" + moment()}></div>)
		}

		if (this.props.profil.refrigerateur === '1'){
			refrigerateur.push(<li key={"materiel" + moment()}>Réfrigérateur</li>)
		} else {
			refrigerateur.push(<div key={"materiel" + moment()}></div>)
		}

		if (this.props.profil.microOnde === '1'){
			microOnde.push(<li key={"materiel" + moment()}>Micro-onde</li>)
		} else {
			microOnde.push(<div key={"materiel" + moment()}></div>)
		}

		if (this.props.profil.ascenseur === '1'){
			ascenseur.push(<li key={"materiel" + moment()}>Ascenseur</li>)
		} else {
			ascenseur.push(<div key={"materiel" + moment()}></div>)
		}
		return(
			<div className="detailsProfil">
				<h3 id='modal-label'>{this.props.profil.prenom} {this.props.profil.nom}</h3>
            	<h4>COORDONNEES</h4>
            	<div className="triangle"></div>
            	<div className="triangle2"></div>
            	<div className="ligneInfos">
		        	<p className="key">Nom :</p><p className="value">{this.props.profil.nom}</p>
		        </div>
		        <div className="ligneInfos">
		        	<p className="key">Prenom :</p><p className="value">{this.props.profil.prenom}</p>
		        </div>
        		<div className="ligneInfos">
		        	<p className="key">Service :</p><p className="value">{this.props.profil.service}</p>
		        </div>
		        <div className="ligneInfos">
		        	<p className="key">Téléphone :</p><p className="value">{this.props.profil.numberPhone}</p>
		        </div>
		        <div className="ligneInfos">
		        	<p className="key">Email :</p><p className="value">{this.props.profil.mail}</p>
		        </div>
		        <h4>BUREAU</h4>
		        <div className="triangle"></div>
		        <div className="triangle2"></div>
		       	{infosBureau}
            </div>
		)
	}
}
