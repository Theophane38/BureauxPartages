import React, { Component } from 'react';
import 'react-input-range/lib/css/index.css'
import '../App.css';
import FontAwesome from 'react-fontawesome'
import {Button} from 'react-bootstrap'
import Modal from 'react-responsive-modal'
import InputRange from 'react-input-range'
import {Link} from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/fr'
import ascenseur from '../Images/ascenseur.svg';

export default class DetailsBureau extends Component {

	constructor(props){
		super(props)
		this.state = {
			result: '',
			isLoading: true,
			showInfos: false,
			value: {min: '', max: ''},
			teste: '',
			showSuccessReservation: false,
			showReservation: false,
			favoris: false
		}
	}

	componentWillMount() {
		this.getPret();
	}

	getPret(){
        fetch('http://localhost/phpawesomeproject/getPret.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            	username: this.props.username,
            	id: this.props.match.params.id,
                date: this.props.match.params.date,
                hourD: this.props.match.params.hourD,
                hourF: this.props.match.params.hourF,
            })
        })            
        .then((response) => response.json())
        .then((res) => {
            this.setState({result: res.infos, nbTranches: res.nbTranches, isLoading: false, nbFavoris: res.nbFavoris, infosFavoris: res.infosFavoris})
            let i
            for (i = 0; i < this.state.nbFavoris; i++){
				if (this.state.infosFavoris[i].idBureau === this.state.result[0].idBureau){
					this.setState({
						favoris: true
					})
				}
			}
        })
        .catch((error) => console.error(error))
    }

    openReservation(){
  		if (this.props.username === this.state.result[0].username){
  			this.setState({ 
  				showYourBureau: true,
  			})
  		} else {
	    	this.setState({ 
	    		showReservation: true,
	    		value: {
	    			min: parseFloat(this.props.match.params.hourD.substring(0,this.props.match.params.hourD.length-3)), 
	    			max: parseFloat(this.props.match.params.hourF.substring(0,this.props.match.params.hourF.length-3)),
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

  	closeReservation(){
  		this.setState({
  			showReservation: false,
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

  	confirmReservation(){
  		console.log(this.state.result[0].idPret)
  		console.log(this.state.result[0].dateTranche)
  		console.log(this.props.username)
  		console.log(this.state.value.min)
  		console.log(this.state.value.max)
  		console.log(moment(this.state.result[0].dateTranche).format('dddd DD MMMM'))
  		fetch('http://localhost/phpawesomeproject/addReservation.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idPret: this.state.result[0].idPret,
                dateTranche: this.state.result[0].dateTranche,
                usernameReservateur: this.props.username,
                heureDebutTranche: this.state.value.min,
                heureFinTranche: this.state.value.max,
                completeDate: moment(this.state.result[0].dateTranche).format('dddd DD MMMM')
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

  	addToFavoris(){
  		fetch('http://localhost/phpawesomeproject/addToFavoris.php', {
  			method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            	idBureau: this.state.result[0].idBureau,
            	username: this.props.username
            })
        })
        .then((response) => response.json())
        .then((res) => {
            if (res.success){
            	this.setState({favoris: true})
            } else {
            	this.setState({favoris: false})
            }
        })
        .catch((error) => console.error(error))
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
			var favoris = []
			let i
			if (this.state.favoris === false){
				favoris.push(<div onClick={() => this.addToFavoris()} className="buttonCheck"><FontAwesome className='favorisTrue' name='star'/> Ajouter aux favoris</div>)
			} else {
				favoris.push(<p><FontAwesome className='favorisTrue' name='star'/> Favoris</p>)
			}
			if (this.state.result[0].fixe === '1'){
				fixe.push(<div key={'materiel' + moment()}><img alt="ordinateur fixe" width="20px" height="20px" src={require('../Images/ordinateur-fixe.svg')}/><p>Ordinateur fixe</p></div>)
			} else {
				fixe.push(<div key={'materiel' + moment()}></div>)
			}

			if (this.state.result[0].portable === '1'){
				portable.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/ordinateur-portable.svg')}/><p>Ordinateur portable</p></div>)
			} else {
				portable.push(<div key={'materiel' + moment()}></div>)
			}


			if (this.state.result[0].phone === '1'){
				phone.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/phone.svg')}/><p>Téléphone</p></div>)
			} else {
				phone.push(<div key={'materiel' + moment()}></div>)
			}

			if (this.state.result[0].ethernet === '1'){
				ethernet.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/cable.svg')}/><p>Cable ethernet</p></div>)
			} else {
				ethernet.push(<div key={'materiel' + moment()}></div>)
			}

			if (this.state.result[0].reunion === '1'){
				reunion.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/table.svg')}/><p>Table de réunion</p></div>)
			} else {
				reunion.push(<div key={'materiel' + moment()}></div>)
			}

			if (this.state.result[0].imprimante === '1'){
				imprimante.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/imprimante.svg')}/><p>Imprimante</p></div>)
			} else {
				imprimante.push(<div key={'materiel' + moment()}></div>)
			}

			if (this.state.result[0].caftiere === '1'){
				caftiere.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/cafetiere.svg')}/><p>Cafetière</p></div>)
			} else {
				caftiere.push(<div key={'materiel' + moment()}></div>)
			}

			if (this.state.result[0].bouilloire === '1'){
				bouilloire.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/bouilloire.svg')}/><p>Bouilloire</p></div>)
			} else {
				bouilloire.push(<div key={'materiel' + moment()}></div>)
			}

			if (this.state.result[0].refrigerateur === '1'){
				refrigerateur.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/frigo.svg')}/><p>Réfrigérateur</p></div>)
			} else {
				refrigerateur.push(<div key={'materiel' + moment()}></div>)
			}

			if (this.state.result[0].microOnde === '1'){
				microOnde.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/micro-ondes.svg')}/><p>Micro-ondes</p></div>)
			} else {
				microOnde.push(<div key={'materiel' + moment()}></div>)
			}

			if (this.state.result[0].ascenseur === '1'){
				ascenseur.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/ascenseur.svg')}/><p>Ascenseur</p></div>)
			} else {
				ascenseur.push(<div key={'materiel' + moment()}></div>)
			}
			return(
				<div className="detailsBureau">
					<h3>{this.state.result[0].nomLieu} - {moment(this.state.result[0].dateTranche).format('dddd DD MMM')}</h3>
					<div className="left">
						<div className="infosBureau">
							<h4>Informations</h4>
							<div className="corps">
								<div className="infosBureauLeft">
									<img alt="bureau001" src={this.state.result[0].image}/>
								</div>
								<div className="infosBureauRight">
									<p><b>Lieu:</b> <a href={"https://maps.google.fr/maps?f=q&hl=fr&q=" + this.state.result[0].lattitude + "," + this.state.result[0].longitude} target="_blank">{this.state.result[0].nomLieu}</a></p>
									<p><b>Bâtiment/Aile:</b> {this.state.result[0].name}</p>
									<p><b>Bureau:</b> {this.state.result[0].bureau}</p>
									<p><b>Etage:</b> {this.state.result[0].etage}</p>
									<p><b>Collègues:</b> {this.state.result[0].partage}</p>
								</div>
							</div>
						</div>

						<div className="infosMateriel">
							<h4>Matériel disponible</h4>
							<div className="corps">
								{portable}
								{fixe}
								{phone}
								{ethernet}
								{reunion}
							</div>
						</div>

						<div className="infosMateriel">
							<h4>Services à proximité</h4>
							<div className="corps">
								{imprimante}
					    		{ascenseur}
					    		{caftiere}
					    		{bouilloire}
					    		{refrigerateur}
					    		{microOnde}
							</div>
						</div>
					</div>
					<div className="right">
						<div className="reservation">
							<h4>Réservation</h4>
							<div className="corps">
								<p className="horaires">Disponibilité:<br/> <b>{this.props.match.params.hourD} - {this.props.match.params.hourF}</b></p>
								<div onClick={() => this.openReservation()} className="buttonCheck">Choisir un créneau</div>
							</div>
						</div>
						<div className="infosPreteur">
							<h4>Prêteur</h4>
							<div className="corps">
								<p className="horaires"><b>Nom:</b> {this.state.result[0].nom}</p>
								<p className="horaires"><b>Prénom:</b> {this.state.result[0].prenom}</p>
								<p className="horaires"><b>Service:</b> {this.state.result[0].service}</p>
								<p className="horaires"><b>Téléphone:</b> {this.state.result[0].numberPhone}</p>
								<p className="horaires"><b>Email:</b> {this.state.result[0].mail}</p>
							</div>
						</div>
						<div className="infosFavoris">
							<h4>Favoris</h4>
							<div className="corps">
								{favoris}
							</div>
						</div>
					</div>
					<Modal open={this.state.showReservation} onClose={() => this.closeReservation()} center>
          				<div className="bigModal">
          					<div className="reservation">
								<h1>Reservation</h1>
								<p>Quel créneau souhaitez-vous réserver ?</p>
								<h2>De {this.state.value.min}h à {this.state.value.max}h</h2>
								<div className="min">{parseFloat(this.props.match.params.hourD.substring(0,this.props.match.params.hourD.length-3))}h</div>
								<InputRange
						        maxValue={parseFloat(this.props.match.params.hourF.substring(0,this.props.match.params.hourF.length-3))}
						        minValue={parseFloat(this.props.match.params.hourD.substring(0,this.props.match.params.hourD.length-3))}
						        value={this.state.value}
						        step={1}
						        onChange={value => this.setState({ value: value })}
						        onChangeComplete={value => console.log(value)} />
						        <div className="max">{parseFloat(this.props.match.params.hourF.substring(0,this.props.match.params.hourF.length-3))}h</div>
						    </div>	
          					<Button style={confirmButton} onClick={() => this.confirmReservation()}>
						      	Confirmer ma réservation
						    </Button>
            				<Button style={cancelButton} onClick={() => this.closeReservation()}>
						      	Annuler
						    </Button>
         	 			</div>
        			</Modal>
        			<Modal open={this.state.showYourBureau} onClose={() => this.closeYourBureau()} center>
          				<div className="bigModal">
          					<div className="reservation">
								<h1>Erreur</h1>
								<p style={phrase}>Aussi bizarre que cela puisse paraître, vous ne pouvez pas réserver votre propre bureau...</p>
            				<Button style={closeButton} onClick={() => this.closeYourBureau()}>
						      	Fermer
						    </Button>
						    </div>
         	 			</div>
        			</Modal>
        			<Modal open={this.state.showSuccessReservation}  showCloseIcon={false} center>
          				<div className="bigModal">
          					<div className="reservation">
								<h1>Succès !</h1>
								<p style={phrase}>Votre réservation a bien été prise en compte !</p>
								<Link to="/Emprunt">
									<Button style={otherButton}>
								      	Effectuer une autre réservation
								    </Button>
								</Link>
	            				<Link to="/Accueil">
	            					<Button style={closeButton}>
								      	Revenir à l'accueil
								    </Button>
								</Link>
						    </div>
         	 			</div>
        			</Modal>
        			<Modal open={this.state.showErrorReservation} showCloseIcon={false} center>
          				<div>
          					<div className="reservation">
								<h1>Erreur</h1>
								<p style={phrase}>Il semblerait que ce bureau ne soit plus disponible !</p>
							<Button style={otherButton} onClick={() => this.closeErrorReservation()}>
						      	Effectuer une autre réservation
						    </Button>
            				<Link to="/Accueil">
            					<Button style={closeButton}>
							      	Revenir à l'accueil
							    </Button>
							</Link>
						    </div>
         	 			</div>
        			</Modal>
				</div>
			)
		} else {
			return(<h1>h1</h1>)
		}
	}
}
const closeButton = {
	float: 'right'
}
const otherButton = {
	float: 'left',
	backgroundColor: '#0060aa',
	color: '#fff'
}
const confirmButton = {
	float: 'right',
	backgroundColor: '#0060aa',
	color: '#fff'
}
const cancelButton = {
	float: 'left',
}
const phrase = {
	margin: '20px 0'
}