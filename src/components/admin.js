import React, { Component } from 'react'
import 'react-input-range/lib/css/index.css'
import '../App.css'
import moment from 'moment'
import 'moment/locale/fr'
import {Redirect} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import DropdownList from 'react-widgets/lib/DropdownList'
import DatePicker from 'react-datepicker'
import {Button} from 'react-bootstrap'
import Modal from 'react-responsive-modal'
import Toggle from 'react-toggle'

export default class Admin extends Component {

	constructor(props){
	    super(props)
	    this.state = {
	    	users: '',
	    	nbUsers: '',
	    	search: '',
	    	pageDashboard: true,
	    	pageUsers: false,
	    	pageLieux: false,
	    	period: 'Depuis le début',
	    	statusPageDashboard: 'active',
	    	statusPageUsers: '',
	    	statusPageLieux: '',
	    	debutDate: 'all',
	    	finDate: 'all',
	    	startDate: '',
	    	endDate: '',
	    	ownDate: false,
	    	waitingTaux: true,
	    	orderBy: '',
	    	undderline2: 'selectedSort asc',
	    	orderBy: 'dateDebutAsc',
	    	showDeleteLieu: false,
	    	currentSuppression: '',
	    	showCreateLieu: false,
	    	nbBatiments: '',
	    	nomBatiment: '',
	    	currentArray: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	    	nomLieu: '',
	    	longitude: '',
	    	latitude: '',
	    	codePostal: '',
	    	commune: '',
	    	styleInputLong: '',
	    	styleInputLat: '',
	    	modifyInputNomLieuNotSave: '',
	    	modifyInputLongitudeNotSave: '',
	    	modifyInputLatitudeNotSave: '',
	    	modifyInputCPNotSave: '',
	    	modifyInputCommuneNotSave: '',
	    }
	    /* Déclaration fonctions changement de page */
	    this.goToDashborad = this.goToDashborad.bind(this)
	    this.goToUsers = this.goToUsers.bind(this)
	    this.goToLieux = this.goToLieux.bind(this)
	    /* ------------ */

	    /* Déclaration fonctions changement période dashboard  */
	    this.periodChange = this.periodChange.bind(this)
	    /* ------------ */

	    /* Déclaration fonctions tri par valeur -- "Compare()" pour trier -- "SortBy()" pour appliquer */
	    this.sortById = this.sortById.bind(this)
	    this.compareId = this.compareId.bind(this)
	    this.sortByStartDate = this.sortByStartDate.bind(this)
	    this.compareStartDate = this.compareStartDate.bind(this)
	    this.sortByEndDate = this.sortByEndDate.bind(this)
	    this.compareEndDate = this.compareEndDate.bind(this)
	    this.sortByPreteur = this.sortByPreteur.bind(this)
	    this.comparePreteur = this.comparePreteur.bind(this)
	    this.sortByNb = this.sortByNb.bind(this)
	    this.compareNb = this.compareNb.bind(this)
	    this.sortByBureau = this.sortByBureau.bind(this)
	    this.compareBureau = this.compareBureau.bind(this)
	    this.sortByLieu = this.sortByLieu.bind(this)
	    this.compareLieu = this.compareLieu.bind(this)
	    /* ------------ */

	    /* Déclaration fonctions changement recherche d'utilisateur */
	    this.searchChange = this.searchChange.bind(this)
	    /* ------------ */

	    /* Déclaration fonctions changement interval période */
	    this.startDateChange = this.startDateChange.bind(this)
	    this.endDateChange = this.endDateChange.bind(this)
	    /* ------------ */

	    /* Déclaration fonction changement valeurs formulaire d'ajout de lieu */
	    this.nbBatimentChange = this.nbBatimentChange.bind(this)
	    this.nomBatimentChange = this.nomBatimentChange.bind(this)
	    this.changeNomLieu = this.changeNomLieu.bind(this)
	    this.changeLongitude = this.changeLongitude.bind(this)
	    this.changeLatitude = this.changeLatitude.bind(this)
	    this.changeCodePostal = this.changeCodePostal.bind(this)
	    this.changeCommune = this.changeCommune.bind(this)
	    /* ------------ */

	    /* Déclaration fonction changement valeurs formulaire de modification de lieu */
	    this.changeModifyNomLieu = this.changeModifyNomLieu.bind(this)
	    this.changeModifyLongitude = this.changeModifyLongitude.bind(this)
	    this.changeModifyLatitude = this.changeModifyLatitude.bind(this)
	    this.changeModifyCodePostal = this.changeModifyCodePostal.bind(this)
	    this.changeModifyCommune = this.changeModifyCommune.bind(this)
	    /* ------------ */

	    this.addBatimentChange = this.addBatimentChange.bind(this)
	}

	componentWillMount() {
		this.getStatistics(this.state.debutDate, this.state.finDate);
		this.getUsersAdmin();
		this.getLieux();
	}

	/* Récupération des données pour la page "Tableau de bord" */

	getStatistics(dateDebut, dateFin){
		console.log(dateDebut)
		console.log(dateFin)
		fetch('http://localhost/phpawesomeproject/getStatistics.php', {
	        method: 'POST',
	        headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json',
	        },
	        body: JSON.stringify({
	        	debutDate: dateDebut,
	        	finDate: dateFin
	        })
	    })    
	    .then((response) => response.json())
	    .then((res) => {
	        this.setState({
	        	nbPrets: res.nbPrets,
	        	infosPrets: res.infosPrets,
	        	nbHoursPrets: res.nbHoursPrets,
	        	nbReservations: res.nbReservations,
	        	nbHoursReservations: res.nbHoursReservations,
		        waitingTaux: false,
	        })
	        console.log(res.infosPrets)
	    })
	    .catch((error) => console.error(error))
	}

	/* ------------ */

	/* Récupération des données pour la page "Utilisateurs" */

	getUsersAdmin(){
	    fetch('http://localhost/phpawesomeproject/getUsersAdmin.php', {
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
	        this.setState({
	        	users: res.users,
	        	nbUsers: res.nbUsers
	        })
	        console.log(this.state.users)
	    })
	    .catch((error) => console.error(error))
	}

	/* ------------ */

	/* Récupération des données pour la page "Gestion des lieux" */

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
        })
        .catch((error) => console.error(error))
    }

    /* ------------ */

	/* Changement de page */

	goToDashborad(){
		this.setState({
			pageDashboard: true,
			pageUsers: false,
			pageLieux: false,
			statusPageDashboard: 'active',
	    	statusPageUsers: '',
	    	statusPageLieux: '',
		})
	}

	goToUsers(){
		this.setState({
			pageDashboard: false,
			pageUsers: true,
			pageLieux: false,
			statusPageDashboard: '',
	    	statusPageUsers: 'active',
	    	statusPageLieux: '',
		})
	}

	goToLieux(){
		this.setState({
			pageDashboard: false,
			pageUsers: false,
			pageLieux: true,
			statusPageDashboard: '',
	    	statusPageUsers: '',
	    	statusPageLieux: 'active',
		})
	}

	/* ------------ */

	/* Changement périodes pour le tableau de bord */

	periodChange(period){
		this.setState({
			waitingTaux: true,
			period: period
	    })
	    if (period !== 'Personnaliser période'){
	    	this.setState({
	    		ownDate : false,
	    		startDateSearch: '',
	    		startDate: '',
	    		endDateSearch: '',
	    		endDate: ''
	    	})
	    	let dateDebut
		  	let dateFin
		  	let lastMonth
		  	let lastYear
		  	let currentMonth
		  	let currentYear
		    if (period === 'Depuis le début'){
				dateDebut = 'all'
				dateFin = 'all'
			} else if (period === 'Ce mois ci'){
				currentMonth = moment().format('MM')
				currentYear = moment().format('YYYY')
				dateDebut = currentYear + '-' + currentMonth + '-01'
				dateFin = currentYear + '-' + currentMonth + '-31'
			} else if (period === 'Le mois dernier'){
				if (moment().format('MM') > 1){
					lastMonth = moment().format('MM') - 1
					if (lastMonth < 10){
						lastMonth = '0' + lastMonth
					}
					currentYear = moment().format('YYYY')
				} else {
					lastMonth = 12
					currentYear = moment().format('YYYY') - 1
				}
				dateDebut = currentYear + '-' + lastMonth + '-01'
				dateFin = currentYear + '-' + lastMonth + '-31'
			}
			this.getStatistics(dateDebut, dateFin);
	    } else {
	    	this.setState({
	    		ownDate : true,
	    	})
	    }
	}

	startDateChange(date){
  		if (this.state.endDate !== '' && this.state.endDate < date){
  			this.setState({
  				endDate: '', endDateSearch: ''
  			})
  		}
		this.setState({
	      	startDate: date, startDateSearch: moment(date).format('YYYY-MM-DD')
	    })
	    if (this.state.endDate !== ''){
	    	this.setState({
	    		waitingTaux: true
	    	})
	    	this.getStatistics(moment(date).format('YYYY-MM-DD'), this.state.endDateSearch);
	    }
	}

	endDateChange(date){
		this.setState({
	      	endDate: date, 
	      	endDateSearch: moment(date).format('YYYY-MM-DD')
	    })
	    if (this.state.startDate !== ''){
	    	this.setState({
	    		waitingTaux: true
	    	})
	    	console.log(this.state.startDateSearch)
	    	console.log(moment(date).format('YYYY-MM-DD'))
	    	this.getStatistics(this.state.startDateSearch, moment(date).format('YYYY-MM-DD'));
	    }
	}

	/* ------------ */

	searchChange(search){
	    this.setState({
	      	search: search.target.value
	    })
  	}

  	/* Trie des données par champs */

	compareId(a, b) {
	  	const genreA = a.idPret;
	  	const genreB = b.idPret;
	  	let comparison = 0;
	  	comparison = genreA - genreB
	  	this.setState({
			undderline2: '',
			undderline3: '',
			undderline4: '',
			undderline5: '',
			undderline6: '',
			undderline7: '',
	  	})
	  	if (this.state.orderBy === 'idAsc'){
		  	this.setState({
		  		orderBy: 'idDesc',
		  		undderline1: 'selectedSort desc',
		  	})
	  		return comparison * -1;
	  	} else {
		  	this.setState({
		  		orderBy: 'idAsc',
		  		undderline1: 'selectedSort asc',
		  	})
		  	return comparison;
	  	}
	}

	compareStartDate(a, b) {
	  	const genreA = a.dateDebut.toUpperCase();
	  	const genreB = b.dateDebut.toUpperCase();
	  	const genreAA = a.heureDebut.toUpperCase();
	  	const genreBB = b.heureDebut.toUpperCase();
	  	let comparison = 0;
	  	if (genreA === genreB){
	  		if (genreAA > genreBB) {
		    	comparison = 1;
		  	} else if (genreA < genreB) {
		    	comparison = -1;
		  	}
	  	} else if (genreA > genreB) {
	    	comparison = 1;
	  	} else if (genreA < genreB) {
	    	comparison = -1;
	  	}
	  	this.setState({
	  		orderBy: 'dateDebutDesc',
	  		undderline1: '',
			undderline2: 'selectedSort desc',
			undderline3: '',
			undderline4: '',
			undderline5: '',
			undderline6: '',
			undderline7: '',
	  	})
	  	if (this.state.orderBy === 'dateDebutAsc'){
	  		this.setState({
		  		orderBy: 'dateDebutDesc',
				undderline2: 'selectedSort desc',
	  		})
	  		return comparison * -1;
	  	} else {
		  	this.setState({
		  		orderBy: 'dateDebutAsc',
				undderline2: 'selectedSort asc',
		  	})
	  		return comparison;
	  	}
	}

	compareEndDate(a, b) {
	  	const genreA = a.dateFin.toUpperCase();
	  	const genreB = b.dateFin.toUpperCase();
	  	const genreAA = a.heureFin.toUpperCase();
	  	const genreBB = b.heureFin.toUpperCase();
	  	let comparison = 0;
	  	if (genreA === genreB){
	  		if (genreAA > genreBB) {
		    	comparison = 1;
		  	} else if (genreA < genreB) {
		    	comparison = -1;
		  	}
	  	} else if (genreA > genreB) {
	    	comparison = 1;
	  	} else if (genreA < genreB) {
	    	comparison = -1;
	  	}
	  	this.setState({
	  		undderline1: '',
			undderline2: '',
			undderline4: '',
			undderline5: '',
			undderline6: '',
			undderline7: '',
	  	})
	  	if (this.state.orderBy === 'dateFinAsc'){
	  		this.setState({
		  		orderBy: 'dateFinDesc',
				undderline3: 'selectedSort desc',
	  		})
	  		return comparison * -1;
	  	} else {
		  	this.setState({
		  		orderBy: 'dateFinAsc',
				undderline3: 'selectedSort asc',
		  	})
	  		return comparison;
	  	}
	}

	comparePreteur(a, b) {
	  	const genreA = a.dateFin.toUpperCase();
	  	const genreB = b.dateFin.toUpperCase();
	  	const genreAA = a.heureFin.toUpperCase();
	  	const genreBB = b.heureFin.toUpperCase();
	  	let comparison = 0;
	  	if (genreA === genreB){
	  		if (genreAA > genreBB) {
		    	comparison = 1;
		  	} else if (genreA < genreB) {
		    	comparison = -1;
		  	}
	  	} else if (genreA > genreB) {
	    	comparison = 1;
	  	} else if (genreA < genreB) {
	    	comparison = -1;
	  	}
	  	this.setState({
	  		undderline1: '',
			undderline2: '',
			undderline3: '',
			undderline5: '',
			undderline6: '',
			undderline7: '',
	  	})
	  	if (this.state.orderBy === 'preteurAsc'){
	  		this.setState({
		  		orderBy: 'preteurDesc',
				undderline4: 'selectedSort desc',
	  		})
	  		return comparison * -1;
	  	} else {
	  		this.setState({
		  		orderBy: 'preteurAsc',
				undderline4: 'selectedSort asc',
	  		})
	  		return comparison;
	  	}
	}

	compareNb(a, b) {
	  	const genreA = a.nbResa;
	  	const genreB = b.nbResa;
	 	let comparison = 0;
	  	comparison = genreA - genreB
	  	this.setState({
	  		undderline1: '',
			undderline2: '',
			undderline3: '',
			undderline4: '',
			undderline6: '',
			undderline7: '',
  		})
	  	if (this.state.orderBy === 'nBAsc'){
	  		this.setState({
		  		orderBy: 'nBDesc',
				undderline5: 'selectedSort desc',
	  		})
	  		return comparison * -1;
	  	} else {
	  		this.setState({
		  		orderBy: 'nBAsc',
				undderline5: 'selectedSort asc',
	  		})
	  		return comparison;
	  	}
	}

	compareBureau(a, b) {
	  	const genreA = a.dateFin.toUpperCase();
	  	const genreB = b.dateFin.toUpperCase();
	  	const genreAA = a.heureFin.toUpperCase();
	  	const genreBB = b.heureFin.toUpperCase();
	  	let comparison = 0;
	  	if (genreA === genreB){
	  		if (genreAA > genreBB) {
		    	comparison = 1;
		  	} else if (genreA < genreB) {
		    	comparison = -1;
		  	}
	  	} else if (genreA > genreB) {
	    	comparison = 1;
	  	} else if (genreA < genreB) {
	    	comparison = -1;
	  	}
	  	console.log(this.state.orderBy)
	  	this.setState({
	  		undderline1: '',
			undderline2: '',
			undderline3: '',
			undderline4: '',
			undderline5: '',
			undderline7: '',
	  	})
	  	if (this.state.orderBy === 'bureauAsc'){
	  		this.setState({
		  		orderBy: 'bureauDesc',
				undderline6: 'selectedSort desc',
	  		})
	  		return comparison * -1;
	  	} else {
	  		this.setState({
		  		orderBy: 'bureauAsc',
				undderline6: 'selectedSort asc',
	  		})
	  		return comparison;
	  	}
	}

	compareLieu(a, b) {
	  	const genreA = a.dateFin.toUpperCase();
	  	const genreB = b.dateFin.toUpperCase();
	  	const genreAA = a.heureFin.toUpperCase();
	  	const genreBB = b.heureFin.toUpperCase();
	  	let comparison = 0;
	  	if (genreA === genreB){
	  		if (genreAA > genreBB) {
		    	comparison = 1;
		  	} else if (genreA < genreB) {
		    	comparison = -1;
		  	}
	  	} else if (genreA > genreB) {
	    	comparison = 1;
	  	} else if (genreA < genreB) {
	    	comparison = -1;
	  	}
	  	console.log(this.state.orderBy)
	  	this.setState({
	  		undderline1: '',
			undderline2: '',
			undderline3: '',
			undderline4: '',
			undderline5: '',
			undderline6: '',
		})
	  	if (this.state.orderBy === 'lieuAsc'){
	  		this.setState({
		  		orderBy: 'lieuDesc',
				undderline7: 'selectedSort desc',
	  		})
	  		return comparison * -1;
	  	} else {
	  		this.setState({
		  		orderBy: 'lieuAsc',
				undderline7: 'selectedSort asc',
	  		})
	  		return comparison;
	  	}
	}

	sortById(){
		this.setState({
			infosPrets: this.state.infosPrets.sort(this.compareId),
		})
	}

	sortByStartDate(){
		this.setState({
			infosPrets: this.state.infosPrets.sort(this.compareStartDate),
		})
	}

	sortByEndDate(){
		this.setState({
			infosPrets: this.state.infosPrets.sort(this.compareEndDate),
		})
	}

	sortByPreteur(){
		this.setState({
			infosPrets: this.state.infosPrets.sort(this.comparePreteur),
		})
	}

	sortByNb(){
		this.setState({
			infosPrets: this.state.infosPrets.sort(this.compareNb),
		})
	}

	sortByBureau(){
		this.setState({
			infosPrets: this.state.infosPrets.sort(this.compareBureau),
		})
	}

	sortByLieu(){
		this.setState({
			infosPrets: this.state.infosPrets.sort(this.compareLieu),
		})
	}

	/* ---------------- */

	/* Ouverture des modals */

    ShowDeleteLieu(idLieu){
        this.setState({
        	currentSuppression: idLieu,
        	showAvertLieu: true,
        })
    }

    showModifyLieu(idLieu){
    	this.setState({
    		currentIdModify: idLieu
    	})
    	fetch('http://localhost/phpawesomeproject/getLieuxBatiments.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            	idLieu: idLieu
            })
        })            
        .then((response) => response.json())
        .then((res) => {
			this.setState({
				currentModifylieu: res.infos,
				showModifyLieu: true,
				newNomLieu: res.infos[0].nomLieu,
				newLongitude: res.infos[0].longitude,
				newLatitude: res.infos[0].lattitude,
				newCodePostal: res.infos[0].codePostal,
				newCommune: res.infos[0].nomCommune,
				oldNomLieu: res.infos[0].nomLieu,
				oldLongitude: res.infos[0].longitude,
				oldLatitude: res.infos[0].lattitude,
				oldCodePostal: res.infos[0].codePostal,
				oldCommune: res.infos[0].nomCommune,
				modifyInputNomLieuStatus: '',
				modifyInputLongitudeStatus: '',
				modifyInputLatitudeStatus: '',
				modifyInputCPStatus: '',
				modifyInputCommuneStatus: '',
			})
			console.log(this.state.currentModifylieu)
        })
        .catch((error) => console.error(error))
    }

    showCreateLieu(){
    	this.setState({
    		showCreateLieu: true,
    	})
    }

    /* ---------------- */

    /* Fermeture des modals */

    closeModifyLieu(){
    	this.setState({
    		showModifyLieu: false,
    	})
    	this.getLieux()
    }
    
    closeCreateLieu(){
    	this.setState({
    		showCreateLieu: false,
    	})
    }

    closeErrLieu(){
    	this.setState({
    		showErrLieu: false,
    	})
    }

    closeErrBatiment(){
    	this.setState({
    		showErrBatiment: false,
    	})
    }

    closeAvertBatiment(){
    	this.setState({
    		showAvertBatiment: false,
    	})
    }

    closeAvertLieu(){
    	this.setState({
    		currentSuppression: '',
        	showAvertLieu: false,
    	})
    }

    closeDetailsUser(){
    	this.setState({
    		detailsUser: false
    	})
    }

    /* ---------------- */

    /* Supression d'un lieu */

    confirmDeleteLieu(){
    	this.setState({
        	showAvertLieu: false,
        })
    	if (this.state.nbLieux <= 1){
    		this.setState({
    			showErrLieu: true,
    		})
    	} else {
   	    	fetch('http://localhost/phpawesomeproject/deleteLieu.php', {
	            method: 'POST',
	            headers: {
	                'Accept': 'application/json',
	                'Content-Type': 'application/json',
	            },
	            body: JSON.stringify({
	            	idLieu: this.state.currentSuppression
	            })
	        })            
	        .then((response) => response.json())
	        .then((res) => {
				this.getLieux()
				this.setState({
		        	currentSuppression: '',
		        })
	        })
	        .catch((error) => console.error(error))
	    	}
    }

    /* ---------------- */

    /* Création d'un lieu */

    createLieu(){
    	if (this.state.nomLieu === '' || this.state.longitude === '' || this.state.styleInputLong === 'errorInput' || this.state.latitude === '' || this.state.styleInputLat === 'errorInput' || this.state.codePostal === '' || this.state.styleInputCP === 'errorInput' || this.state.commune
    	 === '' || this.state.nbBatiments === '' || this.state.nbBatiments === 0){
    		console.log('error')
    		if (this.state.nomLieu === ''){
    			this.setState({
    				styleInputNomLieu: 'errorInput'
    			})
    		}
    		if (this.state.longitude === ''){
    			this.setState({
    				styleInputLong: 'errorInput'
    			})
    		}
    		if (this.state.latitude === ''){
    			this.setState({
    				styleInputLat: 'errorInput'
    			})
    		}
    		if (this.state.codePostal === ''){
    			this.setState({
    				styleInputCP: 'errorInput'
    			})
    		}
    		if (this.state.commune === ''){
    			this.setState({
    				styleInputCommune: 'errorInput'
    			})
    		}
    		if (this.state.nbBatiments === '' || this.state.nbBatiments === 0){
    			this.setState({
    				styleInputNbBat: 'errorInput'
    			})
    		}
    	} else {
   			if (this.state.currentArray[0] === ''){
   				this.setState({
    				styleInputNameBat: 'errorInput'
    			})
   			} else {
	    		fetch('http://localhost/phpawesomeproject/addLieu.php', {
			        method: 'POST',
			        headers: {
			            'Accept': 'application/json',
			            'Content-Type': 'application/json',
			        },
			        body: JSON.stringify({
			        	nomLieu: this.state.nomLieu,
			        	longLieu: this.state.longitude,
			        	latLieu: this.state.latitude,
			        	codePostal: this.state.codePostal,
			        	commune: this.state.commune,
			        	batiments: this.state.currentArray,
			        })
			    })    
			    .then((response) => response.json())
			    .then((res) => {
			        if (res.success){
			        	this.getLieux();
			        }
			        this.setState({
			        	showCreateLieu: false,
			        	nomLieu: '',
			        	codePostal: '',
			        	commune: '',
			        	longitude: '',
			        	latitude: '',
			        	nbBatiments: '',
			        })
			    })
			    .catch((error) => console.error(error))
			}
    	}
    }

    /* ---------------- */

    /* Remplissage formulaire ajout de lieu */

    changeNomLieu(nomLieu){
    	this.setState({
    		styleInputNomLieu: '',
    		nomLieu: nomLieu.target.value
    	})
    }

    changeLongitude(longitude){
    	let long = longitude.target.value
    	var good = /^[0-9.]+$/
    	long = long.replace("," , ".")
    	if (!long.match(good)){
    		this.setState({
    			styleInputLong: 'errorInput'
    		})
    	} else {
    		this.setState({
    			styleInputLong: ''
    		})
    	}
    	this.setState({
    		longitude: long
    	})
    }

    changeLatitude(latitude){
    	let lat = latitude.target.value
    	var good = /^[0-9.]+$/
    	lat = lat.replace("," , ".")
    	if (!lat.match(good)){
    		this.setState({
    			styleInputLat: 'errorInput'
    		})
    	} else {
    		this.setState({
    			styleInputLat: ''
    		})
    	}
    	this.setState({
    		latitude: lat
    	})
    }

    changeCodePostal(codePostal){
    	if (codePostal.target.value.length != 5 || codePostal.target.value != parseInt(codePostal.target.value, 10)){
    		this.setState({
    			styleInputCP: 'errorInput'
    		})
    	} else {
    		this.setState({
    			styleInputCP: ''
    		})
    	}
    	this.setState({
    		codePostal: codePostal.target.value
    	})
    }

    changeCommune(commune){
    	this.setState({
    		styleInputCommune: '',
    		commune: commune.target.value
    	})
    }

    nbBatimentChange(nbBatiments){
    	let currentNbBatiments
    	if ((nbBatiments.target.value == parseInt(nbBatiments.target.value, 10))){
    		if (nbBatiments.target.value > 20){
    			currentNbBatiments = 20
    		} else {
    			currentNbBatiments = nbBatiments.target.value
    		}
    		this.setState({
    			styleInputNbBat: '',
		      	nbBatiments: currentNbBatiments,
		      	valueNbBatiments:  currentNbBatiments
		    })
    	} else {
    		currentNbBatiments = 0
    		this.setState({
		      	nbBatiments: currentNbBatiments,
		      	valueNbBatiments: ''
		    })
    	}
    }

    nomBatimentChange(nomBatiment){
    	let id = this.state.idCurrentInput
    	let currentArray = this.state.currentArray
    	currentArray[this.state.idCurrentInput] = nomBatiment.target.value
    	this.setState({
    		currentArray: currentArray
    	})
    }

    /* ---------------- */

    /* Remplissage formulaire ajout de lieu */

    changeModifyNomLieu(nomLieu){
    	this.setState({
    		styleInputNomLieu: '',
    		newNomLieu: nomLieu.target.value,
    		modifyInputNomLieuStatus: 'notSaved',
    	})
    }

    changeModifyLongitude(longitude){
    	let long = longitude.target.value
    	var good = /^[0-9.]+$/
    	long = long.replace("," , ".")
    	if (!long.match(good)){
    		this.setState({
    			styleInputLong: 'errorInput'
    		})
    	} else {
    		this.setState({
    			styleInputLong: ''
    		})
    	}
    	this.setState({
    		newLongitude: long,
    		modifyInputLongitudeStatus: 'notSaved',
    	})
    }

    changeModifyLatitude(latitude){
    	let lat = latitude.target.value
    	var good = /^[0-9.]+$/
    	lat = lat.replace("," , ".")
    	if (!lat.match(good)){
    		this.setState({
    			styleInputLat: 'errorInput'
    		})
    	} else {
    		this.setState({
    			styleInputLat: ''
    		})
    	}
    	this.setState({
    		newLatitude: lat,
    		modifyInputLatitudeStatus: 'notSaved',
    	})
    }

    changeModifyCodePostal(codePostal){
    	if (codePostal.target.value.length != 5 || codePostal.target.value != parseInt(codePostal.target.value, 10)){
    		this.setState({
    			styleInputCP: 'errorInput'
    		})
    	} else {
    		this.setState({
    			styleInputCP: ''
    		})
    	}
    	this.setState({
    		newCodePostal: codePostal.target.value,
    		modifyInputCPStatus: 'notSaved',
    	})
    }

    changeModifyCommune(commune){
    	this.setState({
    		styleInputCommune: '',
    		newCommune: commune.target.value,
    		modifyInputCommuneStatus: 'notSaved',
    	})
    }

    /* ---------------- */

    cancelModifyNomLieu(){
    	this.setState({
    		modifyInputNomLieuStatus: '',
    		newNomLieu: this.state.oldNomLieu,
    	})
    }

    cancelModifyLongitude(){
    	this.setState({
    		modifyInputLongitudeStatus: '',
    		newLongitude: this.state.oldLongitude,
    	})
    }

    cancelModifyLatitude(){
    	this.setState({
    		modifyInputLatitudeStatus: '',
    		newLatitude: this.state.oldLatitude,
    	})
    }

    cancelModifyCodePostal(){
    	this.setState({
    		modifyInputCPStatus: '',
    		newCodePostal: this.state.oldCodePostal,
    	})
    }
    cancelModifyCommune(){
    	this.setState({
    		modifyInputCommuneStatus: '',
    		newCommune: this.state.oldCommune,
    	})
    }

    changeCurrentId(id){
    	this.setState({
    		idCurrentInput: id
    	})
    }

    saveModif(nomModif){
    	let nomLieu = ''
    	let longitude = ''
    	let latitude = ''
    	let codePostal = ''
    	let commune = ''
    	if (nomModif === 'nomLieu'){
    		nomLieu = this.state.newNomLieu
    		this.setState({
    			oldNomLieu: nomLieu,
    			modifyInputNomLieuStatus: ''
    		})
    	} else if (nomModif === 'longitude'){
    		longitude = this.state.newLongitude
    		this.setState({
    			oldLongitude: longitude,
    			modifyInputLongitudeStatus: ''
    		})
    	} else if (nomModif === 'latitude'){
    		latitude = this.state.newLatitude
    		this.setState({
    			oldLatitude: latitude,
    			modifyInputLatitudeStatus: ''
    		})
    	} else if (nomModif === 'codePostal'){
    		codePostal = this.state.newCodePostal
    		this.setState({
    			oldCodePostal: codePostal,
    			modifyInputCPStatus: ''
    		})
    	} else if (nomModif === 'commune'){
    		commune = this.state.newCommune
    		this.setState({
    			oldCommune: commune,
    			modifyInputCommuneStatus: ''
    		})
    	}
    	console.log(nomModif)
    	fetch('http://localhost/phpawesomeproject/modifyLieu.php', {
	        method: 'POST',
	        headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json',
	        },
	        body: JSON.stringify({
	        	nomLieu: nomLieu,
	        	longitude: longitude,
	        	latitude: latitude,
	        	codePostal: codePostal,
	        	commune: commune,
	        	idLieu: this.state.currentIdModify,
	        })
	    })    
	    .then((response) => response.json())
	    .then((res) => {

	    })
	    .catch((error) => console.error(error))
    }

    deleteBatiment(idBatiment){
		this.setState({
			showAvertBatiment: true,
			currentDeleteBatiment: idBatiment
		})
    }

    confirmDeleteBatiment(){
    	if (this.state.currentModifylieu.length <= 1){
    		this.setState({
    			showErrBatiment: true,
    			showAvertBatiment: false,
    		})
    	} else {
	    	fetch('http://localhost/phpawesomeproject/deleteBatiment.php', {
		        method: 'POST',
		        headers: {
		            'Accept': 'application/json',
		            'Content-Type': 'application/json',
		        },
		        body: JSON.stringify({
		        	idBatiment: this.state.currentDeleteBatiment,
		        })
		    })    
		    .then((response) => response.json())
		    .then((res) => {
		    	this.setState({
		    		showAvertBatiment: false,
		    	})
		    	this.showModifyLieu(this.state.currentIdModify)
		    })
		    .catch((error) => console.error(error))
		}
    }

    addBatiment(){
    	this.setState({
    		addBatiment: true,
    	})
    }

    addBatimentChange(valueNewBatiment){
    	this.setState({
    		addedBatiment: valueNewBatiment.target.value
    	})
    }

    saveBatiment(){
    	console.log(this.state.addedBatiment)
    	if (typeof this.state.addedBatiment !== 'undefined'){
    		if (this.state.addedBatiment !== ''){
	    		fetch('http://localhost/phpawesomeproject/addBatiment.php', {
			        method: 'POST',
			        headers: {
			            'Accept': 'application/json',
			            'Content-Type': 'application/json',
			        },
			        body: JSON.stringify({
			        	nameBatiment: this.state.addedBatiment,
			        	idLieu: this.state.currentIdModify
			        })
			    })    
			    .then((response) => response.json())
			    .then((res) => {
			    	this.showModifyLieu(this.state.currentIdModify)
			    	this.setState({
			    		addedBatiment: '',
			    		addBatiment: false,
			    	})
			    })
			    .catch((error) => console.error(error))
			}
    	}
    }

    cancelAddBatiment(){
    	this.setState({
    		addBatiment: false,
    	})
    }

    getInfosUser(usernameUser){
    	console.log(usernameUser)
    	fetch('http://localhost/phpawesomeproject/getAllInfosUser.php', {
	        method: 'POST',
	        headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json',
	        },
	        body: JSON.stringify({
	        	username: usernameUser,
	        })
	    })    
	    .then((response) => response.json())
	    .then((res) => {
	    	this.setState({
	    		infosUserPrets: res.infosPrets,
	    		infosUserReservations: res.infosReservations,
	    		infosUser: res.infosUser,
	    		detailsUser: true,
	    	})
	    	console.log(res.infos)
	    })
	    .catch((error) => console.error(error))
    }

    handleChangeAdminStatus(id, i){
    	console.log(id)
    	fetch('http://localhost/phpawesomeproject/changeAdminStatus.php', {
	        method: 'POST',
	        headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json',
	        },
	        body: JSON.stringify({
	        	id: id,
	        })
	    })    
	    .then((response) => response.json())
	    .then((res) => {
	    	let users = this.state.users
	    	if (users[i].admin === '1'){
	    		users[i].admin = '0'
	    	} else {
	    		users[i].admin = '1'
	    	}
	    	this.setState({
	    		users: users
	    	})
	    })
	    .catch((error) => console.error(error))
    }

	render(){
		if (typeof this.props.username === "undefined" ){
	      	return(
	        	<Redirect to="/"/>
	      	)
	    } else {
	    	let detailsUser = []
	    	if (typeof this.state.infosUserPrets !== "undefined" ){
	    		let infosPretsUser = []
	    		let infosReservationsUser = []
	    		let i
	    		if (this.state.infosUserPrets != null){
	    			for (i = 0; i < this.state.infosUserPrets.length; i++){
		    			let style = ''
						if (this.state.infosUserPrets[i].dateFin < moment().format('YYYY-MM-DD')){
							style = 'past'
						} else if (this.state.infosUserPrets[i].dateDebut > moment().format('YYYY-MM-DD')){
							style = 'futur'
						} else {
							style = 'current'
						}
		    			infosPretsUser.push(
		    				<tr className={style}>
		    					<td>{this.state.infosUserPrets[i].idPret}</td>
		    					<td>{moment(this.state.infosUserPrets[i].dateDebut).format('DD/MM/YYYY')} à {moment(this.state.infosUserPrets[i].heureDebut, "h:mm:ss A").format("HH:00")}</td>
		    					<td>{moment(this.state.infosUserPrets[i].dateFin).format('DD/MM/YYYY')} à {moment(this.state.infosUserPrets[i].heureFin, "h:mm:ss A").format("HH:00")}</td>
		    				</tr>
		    			)
		    		}
	    		} else {
		    		infosPretsUser.push(
		    			<tr>
		    				<td colspan="3">
		    					Cet utilisateur n'a proposé aucun prêt
		    				</td>
		    			</tr>
		    		)
		    	}
	    		console.log(this.state.infosUserReservations)
	    		if (this.state.infosUserReservations != null){
		    		for (i = 0; i < this.state.infosUserReservations.length; i++){
		    			let style = ''
						if (this.state.infosUserReservations[i].dateReservation < moment().format('YYYY-MM-DD')){
							style = 'past'
						} else if (this.state.infosUserReservations[i].dateReservation > moment().format('YYYY-MM-DD')){
							style = 'futur'
						} else {
							style = 'current'
						}
		    			infosReservationsUser.push(
		    				<tr className={style}>
		    					<td>{moment(this.state.infosUserReservations[i].dateReservation).format('DD/MM/YYYY')} à {moment(this.state.infosUserReservations[i].heureDebutReservation, "h:mm:ss A").format("HH:00")}</td>
		    					<td>{moment(this.state.infosUserReservations[i].dateReservation).format('DD/MM/YYYY')} à {moment(this.state.infosUserReservations[i].heureFinReservation, "h:mm:ss A").format("HH:00")}</td>
		    					<td>{this.state.infosUserReservations[i].prenom} {this.state.infosUserReservations[i].nom}</td>
		    					<td>{this.state.infosUserReservations[i].bureau}</td>
		    					<td>{this.state.infosUserReservations[i].name}</td>
		    					<td>{this.state.infosUserReservations[i].nomLieu}</td>
		    				</tr>
		    			)
		    		}
		    	} else {
		    		infosReservationsUser.push(
		    			<tr>
		    				<td colspan="6">
		    					Cet utilisateur n'a effectué aucune réservation
		    				</td>
		    			</tr>
		    		)
		    	}
		    	console.log('test', this.state.infosUser)
	    		detailsUser.push(
	    			<div className="tableDetails">
		    			<h3>{this.state.infosUser[0].prenom} {this.state.infosUser[0].nom}</h3>
		    			<h4>Propositions de prêts</h4>
		    			<table>
		    				<tbody>
		    					<tr>
		    						<td>id</td>
		    						<td>Date de début</td>
		    						<td>Date de fin</td>
		    					</tr>
		    					{infosPretsUser}
		    				</tbody>
		    			</table>
		    			<h4>Réservations</h4>
		    			<table>
		    				<tbody>
		    					<tr>
		    						<td>Date de début</td>
		    						<td>Date de fin</td>
		    						<td>Nom du prêteur</td>
		    						<td>Bureau</td>
		    						<td>Bâtiment</td>
		    						<td>Lieu</td>
		    					</tr>
		    					{infosReservationsUser}
		    				</tbody>
		    			</table>
	    			</div>
	    		)
	    	}
	    	let modificationLieu = []
	    	const { open } = this.state;
	    	let i
	    	let periode = []
	    	let batimentsInput = []
	    	if (this.state.period === "Depuis le début"){
	    		periode.push(<h4 className="titre_periode">Depuis le début</h4>)
	    	} else if (this.state.period === "Ce mois ci"){
	    		periode.push(<h4 className="titre_periode">Ce mois ci</h4>)
	    	} else if (this.state.period === "Le mois dernier"){
	    		periode.push(<h4 className="titre_periode">Le mois dernier</h4>)
	    	} else if (this.state.period === "Personnaliser période" && !this.state.waitingTaux){
	    		periode.push(<h4 className="titre_periode">Du <b>{moment(this.state.startDateSearch).format("ddd D MMM YYYY")}</b> au <b>{moment(this.state.endDateSearch).format("ddd D MMM YYYY")}</b></h4>)
	    	}
	    	for (i = 1; i <= this.state.nbBatiments; i++){
	    		let id = i - 1
	    		batimentsInput.push(
	    			<tr>
						<td></td>
						<td>
							<table>
								<tbody>
									<tr>
										<td>Bâtiment/Aile {i}</td>
										<td className="inputBatiment"><input className={this.state.styleInputNameBat} placeHolder="Nom" value={this.state.currentArray[i-1]} onFocus={() => this.changeCurrentId(id)} onChange={this.nomBatimentChange}/></td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
	    		)
	    	}
			if (this.state.users !== ''){
				let pageUsers = []
				let pageDashboard = []
				let prets = []
				let pageLieux = []
				if (this.state.pageUsers){
					let i
					let detailsUser = []
					let users = []
					let a
					let nomComplet
					for (i = 0; i < this.state.nbUsers; i++){
						nomComplet = this.state.users[i].prenom + ' ' + this.state.users[i].nom
						let currentAdmin
						let currentI = i
			        	if (this.state.users[i].admin === '1'){
			        		currentAdmin = true
			        	} else {
			        		currentAdmin = false
			        	}
				        if (
				        	this.state.users[i].prenom.toUpperCase().indexOf(this.state.search.toUpperCase()) > -1 ||
				        	this.state.users[i].nom.toUpperCase().indexOf(this.state.search.toUpperCase()) > -1 ||
				        	nomComplet.toUpperCase().indexOf(this.state.search.toUpperCase()) > -1
				        ) {
				        	let usernameUser = this.state.users[i].username
				        	if (this.state.users[i].bureau !== null){
					            users.push(
									<tr>
										<td>{this.state.users[i].id}</td>
										<td>{this.state.users[i].prenom}</td>
										<td>{this.state.users[i].nom}</td>
										<td>{this.state.users[i].service}</td>
										<td>{this.state.users[i].nomLieu}</td>
										<td>{this.state.users[i].bureau}</td>
										<td>
											<label>
							                	<Toggle
								                    checked={currentAdmin}
								                    onChange={() => this.handleChangeAdminStatus(this.state.users[currentI].id, currentI)} />
							                </label>
							            </td>
										<td><FontAwesome className='iconDetails' name='bar-chart' onClick={() => this.getInfosUser(usernameUser)}/></td>
									</tr>
								)
							} else {
								users.push(
									<tr>
										<td>{this.state.users[i].id}</td>
										<td>{this.state.users[i].prenom}</td>
										<td>{this.state.users[i].nom}</td>
										<td>{this.state.users[i].service}</td>
										<td className="null">Non renseigné</td>
										<td className="null">Non renseigné</td>
										<td>
											<label>
							                	<Toggle
								                    checked={currentAdmin}
								                    onChange={() => this.handleChangeAdminStatus(this.state.users[currentI].id, currentI)} />
							                </label>
							            </td>
										<td><FontAwesome className='iconDetails' name='bar-chart' onClick={() => this.getInfosUser(usernameUser)}/></td>
									</tr>
								)
							}
				        } else if (this.state.users[i].bureau !== null){
				        	if (this.state.users[i].bureau.toUpperCase().indexOf(this.state.search.toUpperCase()) > -1){
				        		users.push(
									<tr>
										<td>{this.state.users[i].id}</td>
										<td>{this.state.users[i].prenom}</td>
										<td>{this.state.users[i].nom}</td>
										<td>{this.state.users[i].service}</td>
										<td>{this.state.users[i].nomLieu}</td>
										<td>{this.state.users[i].bureau}</td>
										<td>{this.state.users[i].admin}</td>
										<td>
											<label>
							                	<Toggle
								                    checked={currentAdmin}
								                    onChange={() => this.handleChangeAdminStatus(this.state.users[currentI].id, currentI)} />
							                </label>
							            </td>
										<td><a href="#"><FontAwesome className='check' name='bar-chart'/></a></td>
									</tr>
								)
				        	}
				        }
					}
					pageUsers.push(
						<div>
							<div className="searchBar"><FontAwesome className='check' name='search'/><input type="text" value={this.state.search} onChange={this.searchChange}/></div>
							<table>
								<tr>
									<td>id</td>
					    			<td>Prénom</td>
					    			<td>Nom</td>
					    			<td>Service</td>
					    			<td>Lieu</td>
					    			<td>Bureau</td>
					    			<td>Admin</td>
					    			<td>Activité</td>
								</tr>
								{users}
							</table>
						</div>
					)
				} else if (this.state.pageDashboard){
					let periods = ['Depuis le début','Ce mois ci','Le mois dernier','Personnaliser période']
					let datas = []
					let datasPrets = []
					let ownDate= []
					if (!this.state.waitingTaux){
						let i
						for (i = 0; i < this.state.nbPrets; i++){
							datasPrets.push(
								<tr>
									<td>{this.state.infosPrets[i].idPret}</td>
					    			<td>{moment(this.state.infosPrets[i].dateDebut).format("DD/MM/YYYY")} à {moment(this.state.infosPrets[i].heureDebut, "h:mm:ss A").format("HH:00")}</td>
					    			<td>{moment(this.state.infosPrets[i].dateFin).format("DD/MM/YYYY")} à {moment(this.state.infosPrets[i].heureFin, "h:mm:ss A").format("HH:00")}</td>
					    			<td>{this.state.infosPrets[i].nom} {this.state.infosPrets[i].prenom}</td>
					    			<td>{this.state.infosPrets[i].nbResa}</td>
					    			<td>{this.state.infosPrets[i].bureau}</td>
					    			<td>{this.state.infosPrets[i].nomLieu}</td>
								</tr>
							)
						}
						datas.push(
							<div className="datasDashboard">
							{periode}
								<div className="dataDashboard"><FontAwesome className='check' name='plus'/><p>{this.state.nbPrets}</p><p>Prêts</p></div>
								<div className="dataDashboard"><FontAwesome className='check' name='clock-o'/><p>{this.state.nbHoursPrets}h</p><p>de prêts</p></div>
								<div className="dataDashboard"><FontAwesome className='check' name='lock'/><p>{this.state.nbReservations}</p><p>Réservations</p></div>
								<div className="dataDashboard"><FontAwesome className='check' name='clock-o'/><p>{this.state.nbHoursReservations}h</p><p>de réservations</p></div>
								<div className="dataDashboard">
									<div className={"c100 p"+Math.round(100 * this.state.nbHoursReservations / this.state.nbHoursPrets)+" small"}>
					                    <span>{Math.round(100 * this.state.nbHoursReservations / this.state.nbHoursPrets)}%</span>
					                    <div class="slice">
					                        <div class="bar"></div>
					                        <div class="fill"></div>
					                    </div>
					                </div>
					                <span></span>
					                <p>Taux de réservations</p>
					            </div>
							</div>
						)
					}
					console.log(this.state.infosPrets.sort(this.compare))
					pageDashboard.push(
						<div>
							<div className="selectPeriod">
								<div className="inputPeriod">
									<DropdownList
									    data={periods}
									    textField='name'
										onChange={this.periodChange}
										defaultValue={periods[0]}
									/>
								</div>
								{ownDate}
							</div>
							{datas}
						</div>
					)
					prets.push(
						<div>
							<table className="allPretsAdmin">
								<tr>
									<td className={this.state.undderline1} onClick={this.sortById}>id<FontAwesome className='chevron-down' name='chevron-down'/><FontAwesome className='chevron-up' name='chevron-up'/></td>
					    			<td className={this.state.undderline2} onClick={this.sortByStartDate}>Début<FontAwesome className='chevron-down' name='chevron-down'/><FontAwesome className='chevron-up' name='chevron-up'/></td>
					    			<td className={this.state.undderline3} onClick={this.sortByEndDate}>Fin<FontAwesome className='chevron-down' name='chevron-down'/><FontAwesome className='chevron-up' name='chevron-up'/></td>
					    			<td className={this.state.undderline4} onClick={this.sortByPreteur}>Prêteur<FontAwesome className='chevron-down' name='chevron-down'/><FontAwesome className='chevron-up' name='chevron-up'/></td>
					    			<td className={this.state.undderline5} onClick={this.sortByNb}>Nombre d'heures de réservations<FontAwesome className='chevron-down' name='chevron-down'/><FontAwesome className='chevron-up' name='chevron-up'/></td>
					    			<td className={this.state.undderline6} onClick={this.sortByBureau}>Bureau<FontAwesome className='chevron-down' name='chevron-down'/><FontAwesome className='chevron-up' name='chevron-up'/></td>
					    			<td className={this.state.undderline7} onClick={this.sortByLieu}>Lieu<FontAwesome className='chevron-down' name='chevron-down'/><FontAwesome className='chevron-up' name='chevron-up'/></td>
								</tr>
								{datasPrets}
							</table>
						</div>
					)
					console.log(this.state.ownDate)
					if (this.state.ownDate){
						ownDate.push(
							<div className="ownDate">
								<span>Du</span>
								<div className="inputDateDebut">
									<DatePicker
										maxDate={moment()}
						        		minDate="2018-05-01"
						        		className="inputDate"
								        selected={this.state.startDate}
								        onChange={this.startDateChange}
								        dateFormat="ddd DD MMM"
								        spellCheck="false"
								    />
								</div>
								<span>au</span>
								<div className="inputDateFin">
									<DatePicker
						        		maxDate={moment()}
						        		minDate={this.state.startDate}
						        		className="inputDate"
								        selected={this.state.endDate}
								        onChange={this.endDateChange}
								        dateFormat="ddd DD MMM"
								        spellCheck="false"
								    />
								</div>
							</div>
						)
					}
				} else if (this.state.pageLieux){
					if (typeof this.state.currentModifylieu != "undefined" ){
						let addBatiment = []
						if (this.state.addBatiment){
							addBatiment.push(
								<tr>
									<td></td>
									<td>
										<table className="addBatiment">
											<tbody>
												<tr>
													<td>Bâtiment/Aile </td>
													<td className="inputBatiment">
														<input placeHolder="Nom" value={this.state.addedBatiment} onChange={this.addBatimentChange}/>
													</td>
												</tr>
												<tr>
													<td colspan={2}>
														<p className="cancelModif" onClick={() => this.cancelAddBatiment()}>Annuler</p>
														<p className="saveModif" onClick={() => this.saveBatiment()}>Ajouter</p>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							)
						}
						let batimentsModif = []
						for (i = 1; i <= this.state.currentModifylieu.length; i++){
							let idBatiment = this.state.currentModifylieu[i-1].idBatiment
							batimentsModif.push(
								<tr>
									<td></td>
									<td>
										<table>
											<tbody>
												<tr>
													<td>Bâtiment/Aile {i}</td>
													<td className="inputBatiment">
														<input disabled="disabled" placeHolder="Nom" value={this.state.currentModifylieu[i-1].name} onFocus={() => this.changeCurrentId()} onChange={this.nomBatimentChange}/><FontAwesome onClick={() => this.deleteBatiment(idBatiment)} className='trash-alt' name='trash'/>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							)
						}
						modificationLieu.push(
							<div>
								<table className="addLieu">
									<tbody>
										<tr>
											<td>Nom du lieu</td>
											<td>
												<input className={this.state.styleInputNomLieu} placeHolder="(ex: Hôtel du département, ...)" value={this.state.newNomLieu} onChange={this.changeModifyNomLieu}/>
												<div className={"buttonsSave" + this.state.modifyInputNomLieuStatus}>
													<p className="cancelModif" onClick={() => this.cancelModifyNomLieu()}>Annuler</p>
													<p className="saveModif" onClick={() => this.saveModif('nomLieu')}>Sauvegarder</p>
												</div>
												<p className={"modifSaved " + this.state.modifyInputNomLieuStatus}><FontAwesome className='check' name='check'/>Sauvegardé</p>
											</td>
										</tr>
										<tr>
											<td>Longitude</td>
											<td>
												<input className={this.state.styleInputLong} placeHolder="(ex: 5.733129233121872, ...)" value={this.state.newLongitude} onChange={this.changeModifyLongitude}/>
												<div className={"buttonsSave" + this.state.modifyInputLongitudeStatus}>
													<p className="cancelModif" onClick={() => this.cancelModifyLongitude()}>Annuler</p>
													<p className="saveModif" onClick={() => this.saveModif('longitude')}>Sauvegarder</p>
												</div>
												<p className={"modifSaved " + this.state.modifyInputLongitudeStatus}><FontAwesome className='check' name='check'/>Sauvegardé</p>
											</td>
										</tr>
										<tr>
											<td>Latitude</td>
											<td>
												<input className={this.state.styleInputLat} placeHolder="(ex: 45.18719219568093, ...)" value={this.state.newLatitude} onChange={this.changeModifyLatitude}/>
												<div className={"buttonsSave" + this.state.modifyInputLatitudeStatus}>
													<p className="cancelModif" onClick={() => this.cancelModifyLatitude()}>Annuler</p>
													<p className="saveModif" onClick={() => this.saveModif('latitude')}>Sauvegarder</p>
												</div>
												<p className={"modifSaved " + this.state.modifyInputLatitudeStatus}><FontAwesome className='check' name='check'/>Sauvegardé</p>
											</td>
										</tr>
										<tr>
											<td>Code postal</td>
											<td>
												<input className={this.state.styleInputCP} placeHolder="(ex: 38000, ...)" value={this.state.newCodePostal} onChange={this.changeModifyCodePostal}/>
												<div className={"buttonsSave" + this.state.modifyInputCPStatus}>
													<p className="cancelModif" onClick={() => this.cancelModifyCodePostal()}>Annuler</p>
													<p className="saveModif" onClick={() => this.saveModif('codePostal')}>Sauvegarder</p>
												</div>
												<p className={"modifSaved " + this.state.modifyInputCPStatus}><FontAwesome className='check' name='check'/>Sauvegardé</p>
											</td>
										</tr>
										<tr>
											<td>Commune</td>
											<td>
												<input className={this.state.styleInputCommune} placeHolder="(ex: Grenoble, ...)" value={this.state.newCommune} onChange={ this.changeModifyCommune}/>
												<div className={"buttonsSave" + this.state.modifyInputCommuneStatus}>
													<p className="cancelModif" onClick={() => this.cancelModifyCommune()}>Annuler</p>
													<p className="saveModif" onClick={() => this.saveModif('commune')}>Sauvegarder</p>
												</div>
												<p className={"modifSaved " + this.state.modifyInputCommuneStatus}><FontAwesome className='check' name='check'/>Sauvegardé</p>
											</td>
										</tr>
										{batimentsModif}
										{addBatiment}
									</tbody>
								</table>
								<p className="addItem" onClick={() => this.addBatiment()}>+ Ajouter un champs</p>
							</div>
						)
					}
					let lieux = []
					let i
					for (i = 0; i < this.state.nbLieux; i++){
						let idLieu = this.state.lieux[i].idLieu
						lieux.push(
							<tr>
								<td>{this.state.lieux[i].idLieu}</td>
				    			<td>{this.state.lieux[i].nomLieu}</td>
				    			<td>{this.state.lieux[i].nomCommune}</td>
				    			<td>{this.state.lieux[i].codePostal}</td>
				    			<td>{this.state.lieux[i].longitude}</td>
				    			<td>{this.state.lieux[i].lattitude}</td>
				    			<td><Button onClick={() => this.ShowDeleteLieu(idLieu)} className="supprimerLieu">Supprimer</Button><Button onClick={() => this.showModifyLieu(idLieu)} className="modifierLieu">Modifier</Button></td>
							</tr>
						)
					}
					pageLieux.push(
						<div>
							<table className="tableLieux">
								<tr>
									<td>id</td>
					    			<td>Nom</td>
					    			<td>Code postal</td>
					    			<td>Commune</td>
					    			<td>longitude</td>
					    			<td>lattiude</td>
					    			<td>Actions</td>
								</tr>
								{lieux}
							</table>
							<div className="ajoutLieux" onClick={() => this.showCreateLieu()}><FontAwesome className='check' name='plus-circle'/> Ajouter un lieu</div>
						</div>
					)
				}

				return (
					<div className="admin">
						<ul className="menuAdmin">
							<li onClick={this.goToDashborad} className={this.state.statusPageDashboard}><FontAwesome className='check' name='tachometer'/><span>Tableau de bord</span></li>
							<li onClick={this.goToUsers} className={this.state.statusPageUsers}><FontAwesome className='check' name='users'/><span>Utilisateurs</span></li>
							<li onClick={this.goToLieux} className={this.state.statusPageLieux}><FontAwesome className='check' name='map-marker'/><span>Gestion des lieux</span></li>
						</ul>
						<div className="containerAdmin">
							{pageUsers}
							{pageDashboard}
							{prets}
							{pageLieux}

						</div>
						<Modal open={this.state.showCreateLieu} closeOnOverlayClick={false} onClose={() => this.closeCreateLieu()}>
				          	<h1>Ajout de lieu</h1>
							<table className="addLieu">
								<tbody>
									<tr>
										<td>Nom du lieu</td>
										<td><input className={this.state.styleInputNomLieu} placeHolder="(ex: Hôtel du département, ...)" value={this.state.nomLieu} onChange={this.changeNomLieu}/></td>
									</tr>
									<tr>
										<td>Longitude</td>
										<td><input className={this.state.styleInputLong} placeHolder="(ex: 5.733129233121872, ...)" value={this.state.longitude} onChange={this.changeLongitude}/></td>
									</tr>
									<tr>
										<td>Latitude</td>
										<td><input className={this.state.styleInputLat} placeHolder="(ex: 45.18719219568093, ...)" value={this.state.latitude} onChange={this.changeLatitude}/></td>
									</tr>
									<tr>
										<td>Code postal</td>
										<td><input className={this.state.styleInputCP} placeHolder="(ex: 38000, ...)" value={this.state.codePostal} onChange={this.changeCodePostal}/></td>
									</tr>
									<tr>
										<td>Commune</td>
										<td><input className={this.state.styleInputCommune} placeHolder="(ex: Grenoble, ...)" value={this.state.commune} onChange={ this.changeCommune}/></td>
									</tr>
									<tr>
										<td>Nombre de bâtiments/ailes</td>
										<td><input className={this.state.styleInputNbBat} placeHolder="(ex: 6, ...)" value={this.state.valueNbBatiments} onChange={this.nbBatimentChange}/></td>
									</tr>
									{batimentsInput}
								</tbody>
							</table>
							
							<Button className="buttonRight buttonBlue" onClick={() => this.createLieu()}>
								Valider l'ajout
							</Button>
				        </Modal>
				        <Modal open={this.state.showModifyLieu} closeOnOverlayClick={false} onClose={() => this.closeModifyLieu()}>
				          	<h1>Modification du lieu</h1>
							{modificationLieu}
							<Button className="buttonRight buttonBlue" onClick={() => this.closeModifyLieu()}>Fermer</Button>
				        </Modal>
				        <Modal open={this.state.showErrLieu} onClose={() => this.closeErrLieu()} center>
				          	<h3>Impossible de supprimer le lieu</h3>
							<p>Vous ne pouvez pas supprimer cet item, vous devez au moins avoir un lieu défini.</p>
							<Button className="buttonRight" onClick={() => this.closeErrLieu()}>OK</Button>
				        </Modal>
				        <Modal open={this.state.showAvertLieu} onClose={() => this.closeAvertLieu()} center>
							<div>
								<h1>Avertissement</h1>
								<p>Cette action supprimera également tous les bureaux qui sont rattachés à ce lieux, ainsi que tous les prêts et réservations liés à ce dernier. Les propriétaires devront les recréer.</p>
								<p>Etes-vous sûr(e) ?</p>
								<Button className="buttonRight buttonRed" onClick={() => this.confirmDeleteLieu()}>
									Oui, je confirme la suppression
								</Button>
								<Button className="buttonRight" onClick={() => this.closeAvertLieu()}>
									Non
								</Button>
							</div>
						</Modal>
				        <Modal open={this.state.showErrBatiment} onClose={() => this.closeErrBatiment()} center>
				          	<h3>Impossible de supprimer le bâtiment</h3>
							<p>Vous ne pouvez pas supprimer cet item, vous devez au moins avoir un bâtiment défini par lieu.</p>
							<Button className="buttonRight" onClick={() => this.closeErrBatiment()}>OK</Button>
				        </Modal>
				        <Modal open={this.state.showAvertBatiment} onClose={() => this.closeAvertBatiment()} center>
				        	<h3>Avertissement</h3>
				        	<p>Cette action supprimera également tous les bureaux qui sont rattachés à ce bâtiment, ainsi que tous les prêts et réservations liés à ce dernier. Les propriétaires devront les recréer.</p>
				        	<p>Etes-vous sûr(e) ?</p>
				        	<Button className="buttonRight buttonRed" onClick={() => this.confirmDeleteBatiment()}>Oui, je confirme la supression</Button>
				        	<Button className="buttonRight" onClick={() => this.closeAvertBatiment()}>Non</Button>
				        </Modal>
				        <Modal open={this.state.detailsUser} onClose={() => this.closeDetailsUser()}>
				        	<div className="bigModal">
				        		{detailsUser}
				        	</div>
				        </Modal>
					</div>
				)
			} else {
				return(
					<h1>Chargement</h1>
				)
			}
		}
	}
}