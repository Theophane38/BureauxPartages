import React, { Component } from 'react';
import '../App.css';
import DatePicker from 'react-datepicker'
import moment from 'moment'
import AddBureau from './addBureau'
import 'react-datepicker/dist/react-datepicker.css'
import 'moment/locale/fr'
import {Button} from 'react-bootstrap'
import Modal from 'react-responsive-modal'
import {Link, Redirect} from 'react-router-dom'

class Pret extends Component {

	constructor(props){
		super(props)
		this.state = {
			nbStartDateSearch: moment().format('YYYYMMDD'), 
			nbEndDateSearch: moment().format('YYYYMMDD'), 
			error: false, 
			showEditBureau: false,
			inputWhere: '', 
			idBureau: 3, 
			errorDate: '',
			endHour: '',
			currentHour: parseInt(moment().format('HH'), 10),
			currentDate: moment().format('YYYY-MM-DD'),
			showAddBureau: false,
			confirmation: 0,
			confirmationAccepted: true,
			recurrence: false,
			startHourRecurrence: '8:00',
			endHourRecurrence: '9:00',
			dureeRecurrence: 0,
			dayRecurrence: 'Mon'
		}
		this.confirmationChange = this.confirmationChange.bind(this)
		this.startDateChange = this.startDateChange.bind(this)
		this.endDateChange = this.endDateChange.bind(this)
		this.startHourChange = this.startHourChange.bind(this)
		this.endHourChange = this.endHourChange.bind(this)
		this.deleteAllPrets = this.deleteAllPrets.bind(this)
		this.startHourRecurrenceChange = this.startHourRecurrenceChange.bind(this)
		this.endHourRecurrenceChange = this.endHourRecurrenceChange.bind(this)
		this.dureeRecurrenceChange = this.dureeRecurrenceChange.bind(this)
		this.addRecurrence = this.addRecurrence.bind(this)
		this.dayRecurrenceChange = this.dayRecurrenceChange.bind(this)
		this.changeOngletPonctuel = this.changeOngletPonctuel.bind(this)
		this.changeOngletRecurrent = this.changeOngletRecurrent.bind(this)
	}

	confirmationChange(confirmation){
	    if (confirmation.target.checked){
		    this.setState({
		      	confirmation: 1,
		      	confirmationAccepted: true,
		    })
		} else {
			this.setState({
		      	confirmation: 0
		    })
		}
	}

	componentDidMount(){
		this.checkExistBureau()
		if (parseInt(moment().format('HH'), 10) >= 18){
			this.setState({
				nbHeureDebut: 8, 
				nbHeureFin: 9,
				startHour: '8:00',
				endHour: '9:00',
  				startDate: moment().add(1, 'days'),
  				endDate: moment().add(1, 'days'),
  				startDateSearch: moment().add(1, 'days').format('YYYY-MM-DD'),
  				endDateSearch: moment().add(1, 'days').format('YYYY-MM-DD'), 
			})
		} else {
			this.setState({
				nbHeureDebut: parseInt(moment().format('HH'), 10), 
				nbHeureFin: parseInt(moment().add(1, 'hours').format('HH'), 10),
				startHour: parseInt(moment().format('HH'), 10) + ':00', 
				endHour: parseInt(moment().add(1, 'hours').format('HH'), 10) + ':00',
				startDate: moment(),
				endDate: moment(),
				startDateSearch: moment().format('YYYY-MM-DD'),
				endDateSearch: moment().format('YYYY-MM-DD')
			})
		}
	}

	changeOngletPonctuel(){
		this.setState({
			recurrence: false, confirmation: 0, confirmationAccepted: true
		})
	}

	changeOngletRecurrent(){
		this.setState({
			recurrence: true, confirmation: 0, confirmationAccepted: true
		})
	}

	checkExistBureau(){
		fetch('http://localhost/phpawesomeproject/checkExistBureau.php', {
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
            this.setState({existBureau: res.existBureau})
            console.log(res.existBureau)
        })
        .catch((error) => console.error(error))
	}

	errorClose(){
    	this.setState({ error: false });
  	}

  	successClose(){
    	this.setState({ success: false });
  	}


	getBureaux(){
		console.log('test', this.state.confirmation)
  		if (this.state.confirmation === 1){
			if ((this.state.nbStartDateSearch === this.state.nbEndDateSearch && this.state.nbHeureDebut >= this.state.nbHeureFin) || this.state.nbStartDateSearch > this.state.nbEndDateSearch){
		        this.setState({errorDate: 'La date de début doit se situer avant celle de fin'})
		    } else {
		    	fetch('http://localhost/phpawesomeproject/addPret.php', {
		            method: 'POST',
		            headers: {
		                'Accept': 'application/json',
		                'Content-Type': 'application/json',
		            },
		            body: JSON.stringify({
		                search: this.state.inputWhere,
		                username: this.props.username,
		                dateDebut: this.state.startDateSearch,
		                dateFin: this.state.endDateSearch,
		                nbDateDebut: parseInt(this.state.nbStartDateSearch, 10),
		                nbDateFin: parseInt(this.state.nbEndDateSearch, 10),
		                heureDebut: this.state.startHour,
		                heureFin: this.state.endHour,
		                nbHeureDebut: this.state.nbHeureDebut,
		                nbHeureFin: this.state.nbHeureFin,
		                completeDateDebbut: moment(this.state.startDateSearch).format('dddd DD MMMM'),
		                completeDateFin: moment(this.state.endDateSearch).format('dddd DD MMMM')
		            })
		        })    
		        .then((response) => response.json())
		        .then((res) => {
		            this.setState({error: res.message, success: res.success})
		            this.setState({errorDate: ''})
		            console.log(res.success)
		        })
		        .catch((error) => console.error(error))
		    }
		} else {
			this.setState({
				confirmationAccepted: false
			})
		}
    }

    addRecurrence(){
    	if (this.state.dureeRecurrence !== 0){
    		if (this.state.confirmation === 1){
		    	fetch('http://localhost/phpawesomeproject/testRecu.php', {
		            method: 'POST',
		            headers: {
		                'Accept': 'application/json',
		                'Content-Type': 'application/json',
		            },
		            body: JSON.stringify({
		                username: this.props.username,
		                dateDebutRecurrence: moment().format('YYYYMMDD'),
		                duree: this.state.dureeRecurrence,
		                day: this.state.dayRecurrence,
		                heureDebutRecurrence: this.state.startHourRecurrence,
		                heureFinRecurrence: this.state.endHourRecurrence,
		            })
		        })    
		        .then((response) => response.json())
		        .then((res) => {
		           this.setState({
		           	success: res.success
		           })
		           console.log(this.state.success)
		        })
		        .catch((error) => console.error(error))
		    } else {
				this.setState({
					confirmationAccepted: false
				})
			}
	    } else {
	    	this.setState({
	    		errorDureeRecurrence: true
	    	})
	    }
    }

    deleteAllPrets(){
    	fetch('http://localhost/phpawesomeproject/deleteAllPrets.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                search: this.state.inputWhere,
                username: this.props.username,

                dateDebut: this.state.startDateSearch,
                dateFin: this.state.endDateSearch,
                nbDateDebut: parseInt(this.state.nbStartDateSearch, 10),
                nbDateFin: parseInt(this.state.nbEndDateSearch, 10),
                heureDebut: this.state.startHour,
                heureFin: this.state.endHour,
                nbHeureDebut: this.state.nbHeureDebut,
                nbHeureFin: this.state.nbHeureFin
            })
        })    
        .then((response) => response.json())
        .then((res) => {
            console.log(res.success)
            if (res.success){
            	this.setState({error: !res.success, success: res.success})
            }
        })
        .catch((error) => console.error(error))
    }

    dayRecurrenceChange(dayRecurrence){
    	let day = dayRecurrence.target.value
    	this.setState({
    		dayRecurrence: day,
    	})
    }

    dureeRecurrenceChange(dureeRecurrence){
    	let duree = dureeRecurrence.target.value
		this.setState({
			dureeRecurrence: duree, errorDureeRecurrence: false
	    })
    }

    startHourRecurrenceChange(startHourRecurrence){
    	let heureDebutRecurrence = startHourRecurrence.target.value
		this.setState({
			startHourRecurrence: heureDebutRecurrence,
	    })
    }

    endHourRecurrenceChange(endHourRecurrence){
    	let heureFinRecurrence = endHourRecurrence.target.value
		this.setState({
			endHourRecurrence: heureFinRecurrence,
	    })
    }

	startHourChange(startHour){
		let heureDebut = startHour.target.value
		this.setState({
			startHour: heureDebut,
			nbHeureDebut: parseFloat(heureDebut.substring(0,heureDebut.length-3))
	    })
	}

	endHourChange(endHour){
		let heureFin = endHour.target.value
		this.setState({
			endHour: heureFin,
			nbHeureFin: parseFloat(heureFin.substring(0,heureFin.length-3))
	    })
	}

	startDateChange(startDate){
		this.setState({
	      	startDate: startDate, startDateSearch: moment(startDate).format('YYYY-MM-DD'), nbStartDateSearch: moment(startDate).format('YYYYMMDD')
	    })
	}

	endDateChange(endDate){
		this.setState({
	      	endDate: endDate, endDateSearch: moment(endDate).format('YYYY-MM-DD'), nbEndDateSearch: moment(endDate).format('YYYYMMDD')
	    })
	}

	isWeekday = (date) => {
	    const day = date.day()
	    return day !== 0 && day !== 6
	}

	addBureauOpen(){
		this.setState({showAddBureau: true})
	}

  	render() {
  		if (typeof this.props.username === "undefined" ){
      		return(
        		<Redirect to="/"/>
      		)
	    } else if (this.state.existBureau){
	    	var errorConfirmation = []	
	    	if (!this.state.confirmationAccepted){
	    		errorConfirmation.push(<p className="errorConfirmation">Vous devez confirmer avoir l'accord de votre hiérarchie et de vos collègues</p>)
	    	}
	  		if (this.state.endHour !== ''){
	  			var plageHoraireDebut = []
	  			var plageHoraireFin = []
	  			var i = 0
	  			if (this.state.currentDate === this.state.startDateSearch){
	  				for (i = this.state.currentHour; i <= 17; i++ ){
		  				plageHoraireDebut.push(
		  					<option key={'optionStart' + i} value={i+":00"}>{i}h00</option>
		  				)
		  			}
	  			} else {
	  				for (i = 8; i <= 17; i++ ){
		  				plageHoraireDebut.push(
		  					<option key={'optionStart' + i} value={i+":00"}>{i}h00</option>
		  				)
		  			}
	  			}
	  			if (this.state.currentDate === this.state.endDateSearch){
		  			for (i = this.state.currentHour; i <= 17; i++ ){
		  				plageHoraireFin.push(
		  					<option key={'optionEnd' + i} value={i+1+":00"}>{i+1}h00</option>
		  				)
		  			}
		  		} else {
		  			for (i = 8; i <= 17; i++ ){
		  				plageHoraireFin.push(
		  					<option key={'optionEnd' + i} value={i+1+":00"}>{i+1}h00</option>
		  				)
		  			}
		  		}
		  		if (this.state.recurrence){
		  			let errorDureeRecurrence = []
		  			if (this.state.errorDureeRecurrence){
		  				errorDureeRecurrence.push(
		  					<p className="errorDureeRecurrence">Vous devez sélectionner une durée pour laquelle la récurrence sera effective.</p>
		  				)
		  			}
		  			return (
		  				<div className="pret">
		  					<h5>Quel jour de la semaine souhaitez vous créer un prêt récurrent ?</h5>
		  					<div>
		  						<div className="ongletPret" onClick={this.changeOngletPonctuel}>Prêt ponctuel</div>
		  						<div className="ongletPret active">Prêt récurrent</div>
		  					</div>
		  					<form>
		  						<div className="left recurrence_left">
			  						<p>Tous les</p>
			  						<select value={this.state.dayRecurrence} onChange={this.dayRecurrenceChange} className="inputStartHour">
			  							<option value='Mon'>Lundi</option>
			  							<option value='Tue'>Mardi</option>
			  							<option value='Wed'>Mercredi</option>
			  							<option value='Thu'>Jeudi</option>
			  							<option value='Fri'>Vendredi</option>
			  						</select>
			  					</div>
			  					<div className="right">
			  						<p>A partir de </p>
			  						<select value={this.state.startHourRecurrence} onChange={this.startHourRecurrenceChange} className="inputStartHour">
			  							<option value='08:00'>8h00</option>
			  							<option value='09:00'>9h00</option>
			  							<option value='10:00'>10h00</option>
			  							<option value='11:00'>11h00</option>
			  							<option value='12:00'>12h00</option>
			  							<option value='13:00'>13h00</option>
			  							<option value='14:00'>14h00</option>
			  							<option value='15:00'>15h00</option>
			  							<option value='16:00'>16h00</option>
			  							<option value='17:00'>17h00</option>
			  						</select>
			  						<p>Jusqu'à</p>
			  						<select value={this.state.endHourRecurrence} onChange={this.endHourRecurrenceChange} className="inputStartHour">
			  							<option value='09:00'>9h00</option>
			  							<option value='10:00'>10h00</option>
			  							<option value='11:00'>11h00</option>
			  							<option value='12:00'>12h00</option>
			  							<option value='13:00'>13h00</option>
			  							<option value='14:00'>14h00</option>
			  							<option value='15:00'>15h00</option>
			  							<option value='16:00'>16h00</option>
			  							<option value='17:00'>17h00</option>
			  							<option value='18:00'>18h00</option>
			  						</select>
			  					</div>
		  						<p>Durée de la récurrence</p>
		  						<div className="radio">
		  							<input type="radio" id="contactChoice1" name="duree" value="13" onChange={this.dureeRecurrenceChange}/>
    								<label for="contactChoice1">3 Mois</label>
    							</div>
    							<div className="radio">
	    							<input type="radio" id="contactChoice1" name="duree" value="26" onChange={this.dureeRecurrenceChange}/>
	    							<label for="contactChoice1">6 Mois</label>
    							</div>
    							<div className="radio">
	    							<input type="radio" id="contactChoice1" name="duree" value="52" onChange={this.dureeRecurrenceChange}/>
	    							<label for="contactChoice1">12 Mois</label>
    							</div>
    							<p>{errorDureeRecurrence}</p>
    							<div>
					                <input className="inputCheckConfirmation" type="checkbox" defaultChecked={false} name="microOnde" value="microOnde" onChange={this.confirmationChange}/>
					                <label className="labelCheckConfirmation" width="300px">Je confirme avoir l'accord de mon supérieur hiérarchique et des potentiels collègues avec qui je partage mon bureau.</label>
					            </div>
					            {errorConfirmation}
    							<div className="submit">
					        		<div onClick={() => this.addRecurrence()} className="inputSubmit">CONFIRMER</div>
					        	</div>
		  					</form>
		  					<Modal open={this.state.success} showCloseIcon={false} center>
			      				<div className="bigModal">
			      					<h1>Félicitations !</h1>
			      					<p>Votre proposition de bureau a bien été enregistrée ! !</p>
			        				<Link to="/Accueil">
			        					<Button style={closeButton} onClick={() => this.successClose()}>
									      	Revenir à la page d'accueil
									    </Button>
									</Link>
									<Link to="/Pret">
			        					<Button style={otherButton} onClick={() => this.successClose()}>
									      	Proposer un autre prêt
									    </Button>
									</Link>
			     	 			</div>
			    			</Modal>
		  				</div>
		  			)
		  		} else {
				    return (
				      	<div className="pret">
					        <h5>Quand souhaitez vous mettre votre bureau à disposition ?</h5>
				        	<div>
		  						<div className="ongletPret active">Prêt ponctuel</div>
		  						<div className="ongletPret" onClick={this.changeOngletRecurrent}>Prêt récurrent</div>
		  					</div>
				        	<form>
					        	<div className="left">
					        		<div className="column">
					        			<p>Date de début</p>
								        <DatePicker
								        	minDate={moment()}
								        	filterDate={this.isWeekday}
								          	selected={this.state.startDate}
								          	selectsStart
								          	className="inputDate"
								          	startDate={this.state.startDate}
								          	endDate={this.state.endDate}
								          	onChange={this.startDateChange}
								          	dateFormat="ddd DD MMM"
								        />
								    	<p>Date de fin</p>
								        <DatePicker
								        	minDate={moment()}
								        	filterDate={this.isWeekday}
								          	selected={this.state.endDate}
								          	selectsEnd
								          	className="inputDate"
								          	startDate={this.state.startDate}
								          	endDate={this.state.endDate}
								          	onChange={this.endDateChange} 
								          	dateFormat="ddd DD MMM"
								        />
								     </div>
					        	</div>
					        	<div className="right">
					        		<p>A partir de</p>
				    				<select value={this.state.startHour} onChange={this.startHourChange} className="inputStartHour">
									  {plageHoraireDebut}
									</select>
				    				<p>Jusqu'à</p>
				    				<select value={this.state.endHour} onChange={this.endHourChange} className="inputEndHour">
									  {plageHoraireFin}
									</select>
								</div>
								<p className="error">{this.state.errorDate}</p>
								<div>
					                <input className="inputCheckConfirmation" type="checkbox" defaultChecked={false} name="microOnde" value="microOnde" onChange={this.confirmationChange}/>
					                <label className="labelCheckConfirmation" width="300px">Je confirme avoir l'accord de mon supérieur hiérarchique et des potentiels collègues avec qui je partage mon bureau.</label>
					            </div>
					            {errorConfirmation}
				        		<div className="submit">
					        		<div onClick={() => this.getBureaux()} className="inputSubmit">CONFIRMER</div>
					        	</div>
					        </form>
				        	<Modal open={this.state.error} onClose={() => this.errorClose()} center>
			      				<div >
			      					<h1>Erreur</h1>
			      					<p>Vous avez déjà un ou plusieurs prêts enregistrés sur ce créneau !</p>
			      					<p>Si vous souhaitez le(s) remplacer par le nouveau cliquez sur "TOUT SUPPRIMER"</p>
			        				<Button style={closeButton} onClick={() => this.errorClose()}>
								      	Annuler
								    </Button>
								    <Button style={cancelButton} onClick={() => this.deleteAllPrets()}>
								      	TOUT SUPPRIMER
								    </Button>
			     	 			</div>
			    			</Modal>
			    			<Modal open={this.state.success} showCloseIcon={false} center>
			      				<div className="bigModal">
			      					<h1>Félicitations !</h1>
			      					<p>Votre proposition de bureau a bien été enregistrée ! !</p>
			        				<Link to="/Accueil">
			        					<Button style={closeButton} onClick={() => this.successClose()}>
									      	Revenir à la page d'accueil
									    </Button>
									</Link>
									<Link to="/Pret">
			        					<Button style={otherButton} onClick={() => this.successClose()}>
									      	Proposer un autre prêt
									    </Button>
									</Link>
			     	 			</div>
			    			</Modal>
				      	</div>
				    )
				}
			} else {
				return (<div></div>)
			}
		} else {
			return(
				<div className="pret">
					<h2>Avant de pouvoir prêter votre bureau vous devez l'enregistrer.</h2>
					<h3 className="clickHere" onClick={() => this.addBureauOpen()}>Cliquez ici</h3>
					<Modal open={this.state.showAddBureau} showCloseIcon={false}>
	      				<div className="mediumModal">
	      					<AddBureau username={this.props.username}/>
	     	 			</div>
	    			</Modal>
				</div>
			)
		}
  	}
}

export default Pret;


const otherButton = {
	float: 'left',
	backgroundColor: '#0060aa',
	color: '#fff'
}
const closeButton = {
	float: 'right',
}
const cancelButton = {
	float: 'left',
	backgroundColor:'red',
	color: '#fff',
	fontWeight: 'bold'
}
