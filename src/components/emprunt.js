import React, { Component } from 'react'
import '../App.css'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import 'moment/locale/fr'
import Bureau from './bureau'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader'
import FontAwesome from 'react-fontawesome'
import DropdownList from 'react-widgets/lib/DropdownList'
import 'react-widgets/dist/css/react-widgets.css'

class Emprunt extends Component {

	constructor(props){
		super(props)
		this.state = {
			inputWhere: '', 
			startDate: moment(), 
			startDateSearch: moment().format('YYYY-MM-DD'), 
			startHour: parseInt(moment().format('HH'), 10) + ':00',
			currentHour: parseInt(moment().format('HH'), 10),
			currentDate: moment().format('YYYY-MM-DD'),
			loadingBureaux: true
		}
		this.lieuChange = this.lieuChange.bind(this)
		this.startDateChange = this.startDateChange.bind(this)
		this.startHourChange = this.startHourChange.bind(this)
	}

	componentWillMount() {
		this.getLieux();
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
        })
        .catch((error) => console.error(error))
    }

    getBureaux(){
    	if (this.state.inputWhere !== ''){
    		this.setState({loadingBureaux: true});
	        fetch('http://localhost/phpawesomeproject/getBureaux.php', {
	            method: 'POST',
	            headers: {
	                'Accept': 'application/json',
	                'Content-Type': 'application/json',
	            },
	            body: JSON.stringify({
	            	username: this.props.username,
	                search: this.state.inputWhere,
	                day: this.state.startDateSearch,
	                hour: this.state.startHour,
	            })
	        })    
	        .then((response) => response.json())
	        .then((res) => {
	        	console.log(res.nbFavoris)
	            this.setState({infos: res.infos, nbBureaux: res.nbBureaux, loadingBureaux: false, infosFavoris: res.infosFavoris, nbFavoris: res.nbFavoris});
	            this.setState({emptyCase: ''})
	        })
	        .catch((error) => console.error(error))
	    } else {
	    	this.setState({emptyCase: 'Tous les champs doivent être renseignés'})
	    }
    }

	lieuChange(lieu){
		this.setState({
			inputWhere: lieu
	    })
	    console.log(lieu)
	}

	startHourChange(startHour){
		let hour = parseInt(startHour.substr(0, 2)) + ':00'
		this.setState({
			startHour: hour
	    })
	}

	startDateChange(date){
		if (moment(date).format('YYYY-MM-DD') === this.state.currentDate){
			this.setState({
		      	startHour: parseInt(moment().format('HH'), 10) + ':00',
		    })
		} else {
			this.setState({
		      	startHour: '8:00',
		    })
		}
		this.setState({
	      	startDate: date, startDateSearch: moment(date).format('YYYY-MM-DD')
	    })
	}

	isWeekday = (date) => {
	    const day = date.day()
	    return day !== 0 && day !== 6
	}

	bureau(props){
			return(<div>Salut</div>)
	}

 	render() {

 		var resultats = []
 		var plageHoraire = []
 		if (this.state.loadingBureaux){
        	console.log('test')
        	resultats.push(<Loader color="#0060aa" position="relative" lines={15} type="line-scale" active />)
        }
		if (typeof this.props.username === "undefined" ){
	      	return(
	        	<Redirect to="/"/>
	      	)
    	} else  if (typeof this.state.nbLieux === 'undefined') {
 			return(
 				<div></div>
 			)
 		} else {
 			let ValueLieu = ({ item }) => (
			  <span>
			    <FontAwesome className='check' name='map-marker'/>{' ' + item}
			  </span>
			);
			let ValueHour = ({ item }) => (
			  <span>
			    <FontAwesome className='check' name='clock-o'/>{' ' + item}
			  </span>
			);
 			var lieux = []
        	var i = 0;
    		for (i = 0; i < this.state.nbLieux; i++) {
        		lieux.push(
        			this.state.lieux[i].nomLieu
        		)
        	}
        	if (typeof this.state.infos === 'undefined') {
                resultats.push(
                	<div key="null"></div>
	            )
	        } else {
	        	console.log('nbBureaux', this.state.nbBureaux)
	        	var heureDebut = ''
	        	var heureDebutNb = 0
                var max = this.state.nbBureaux-1;
                var heureFin = ''
                var heureFinNb = 0
                console.log(this.state.infos)
	        	for (i = 0; i < this.state.nbBureaux; i++) {
	        		var before = i-1;
                	var after = i+1;
	                if (i === 0){
	                	if (this.state.infos[i].reserve === '0'){
	                		if (this.state.nbBureaux === 1){
	                			heureDebut = this.state.infos[i].heureDebutTranche
		                        heureDebutNb = heureDebut.substring(0,heureDebut.length-3)
		                        heureFin = this.state.infos[i].heureFinTranche;
		                        heureFinNb = heureFin.substring(0,heureFin.length-3)
		                        resultats.push(<Bureau key={'bureau' + i} username={this.props.username} infos={this.state.infos[i]} nbFavoris={this.state.nbFavoris} infosFavoris={this.state.infosFavoris} heureDebutNb={heureDebutNb} heureFinNb={heureFinNb}/>)
	                		} else if (this.state.infos[i].idPret !== this.state.infos[after].idPret || this.state.infos[after].idPret === '1'){
	                			heureDebut = this.state.infos[i].heureDebutTranche
		                        heureDebutNb = heureDebut.substring(0,heureDebut.length-3)
		                        heureFin = this.state.infos[i].heureFinTranche;
		                        heureFinNb = heureFin.substring(0,heureFin.length-3)
		                        resultats.push(<Bureau key={'bureau' + i} username={this.props.username} infos={this.state.infos[i]} nbFavoris={this.state.nbFavoris} infosFavoris={this.state.infosFavoris} heureDebutNb={heureDebutNb} heureFinNb={heureFinNb}/>)
		                	} else {
		                		heureDebut = this.state.infos[i].heureDebutTranche
		                        heureDebutNb = heureDebut.substring(0,heureDebut.length-3)
		                	}
		                }
	                } else if (i === max){
	                	if (this.state.infos[i].reserve === '0'){
	                		if (this.state.infos[i].idPret !== this.state.infos[before].idPret || this.state.infos[before].reserve === '1'){
	                			heureDebut = this.state.infos[i].heureDebutTranche
		                        heureDebutNb = heureDebut.substring(0,heureDebut.length-3)
		                        heureFin = this.state.infos[i].heureFinTranche;
		                        heureFinNb = heureFin.substring(0,heureFin.length-3)
		                        resultats.push(<Bureau key={'bureau' +i} username={this.props.username} infos={this.state.infos[i]} nbFavoris={this.state.nbFavoris} infosFavoris={this.state.infosFavoris} heureDebutNb={heureDebutNb} heureFinNb={heureFinNb}/>)
		                    } else {
		                    	heureFin = this.state.infos[i].heureFinTranche;
		                        heureFinNb = heureFin.substring(0,heureFin.length-3)
		                        resultats.push(<Bureau key={'bureau' + i} username={this.props.username} infos={this.state.infos[i]} nbFavoris={this.state.nbFavoris} infosFavoris={this.state.infosFavoris} heureDebutNb={heureDebutNb} heureFinNb={heureFinNb}/>)
		                    }
		                }
	                } else {
	                	if (this.state.infos[i].reserve === '0'){
		                	if (this.state.infos[before].reserve === '1' || this.state.infos[before].idPret !== this.state.infos[i].idPret){
		                		if (this.state.infos[after].reserve === '1' || this.state.infos[after].idPret !== this.state.infos[i].idPret){
		                			heureDebut = this.state.infos[i].heureDebutTranche;
			                        heureDebutNb = heureDebut.substring(0,heureDebut.length-3);
			                        heureFin = this.state.infos[i].heureFinTranche;
			                        heureFinNb = heureFin.substring(0,heureFin.length-3);
			                        resultats.push(<Bureau key={'bureau' + i} username={this.props.username} infos={this.state.infos[i]} nbFavoris={this.state.nbFavoris} infosFavoris={this.state.infosFavoris} heureDebutNb={heureDebutNb} heureFinNb={heureFinNb}/>)
		                		} else {
		                			heureDebut = this.state.infos[i].heureDebutTranche;
			                        heureDebutNb = heureDebut.substring(0,heureDebut.length-3)
		                		}
		                	} else {
		                		if (this.state.infos[after].reserve === '1' || this.state.infos[after].idPret !== this.state.infos[i].idPret){
		                			heureFin = this.state.infos[i].heureFinTranche;
			                        heureFinNb = heureFin.substring(0,heureFin.length-3);
			                        resultats.push(<Bureau key={'bureau' + i} username={this.props.username} infos={this.state.infos[i]} nbFavoris={this.state.nbFavoris} infosFavoris={this.state.infosFavoris} heureDebutNb={heureDebutNb} heureFinNb={heureFinNb}/>)
			            		}
		                	}
		                }
	                }
	            }
	            if (this.state.nbBureaux === 0 || heureDebutNb === 0){
	            	resultats.push(<p className="none">Aucun bureau n'est actuellement disponible sur ce créneau.</p>)
	            }
	        }
  			if (this.state.currentDate === this.state.startDateSearch){
  				for (i = this.state.currentHour; i <= 17; i++ ){
	  				plageHoraire.push(
	  					i + 'h00'
	  				)
	  			}
  			} else {
  				for (i = 8; i <= 17; i++ ){
	  				plageHoraire.push(
	  					i +'h00'
	  				)
	  			}
  			}
  			let results = []
  			if (!this.state.loadingBureaux){
  				results.push(
  					<div className="resultEmprunt">
				    	<h2>Résultats de la recherche</h2>
				    	{resultats}
				    </div>
  				)
  			} else {
  				results.push(
  					<h4 className="noSearch" key="message-results">Les résultats de votre recherche s'afficheront ici</h4>
  				)
  			}
        	return (
		      	<div className="emprunt">
		      		<div className="backSearchEmprunt">
				      	<div className="searchEmprunt">
					        <form>
					        	<div className="where">
					        		<DropdownList
									    data={lieux}
									    textField='name'
									    valueComponent={ValueLieu}
										onChange={this.lieuChange}
										defaultValue='Lieu'
									  />
					        	</div>
					        	<div className="date">
					        		<FontAwesome className='check' name='calendar'/>
						        	<div className="containerInputDate">
							        	<DatePicker
							        		minDate={moment()}
							        		filterDate={this.isWeekday}
							        		className="inputDate"
									        selected={this.state.startDate}
									        onChange={this.startDateChange}
									        dateFormat="ddd DD MMM"
									        spellCheck="false"
									    />
								    </div>
						        </div>
						        <div className="hour">
						        	<DropdownList
									    data={plageHoraire}
									    textField='name'
									    valueComponent={ValueHour}
										onChange={this.startHourChange}
										defaultValue={plageHoraire[0]}
									  />
					        	</div>
					        	<div className="submit">
					        		<div onClick={() => this.getBureaux()} className="inputSubmit">RECHERCHER</div>
					        	</div>
					        	<p className="error">{this.state.emptyCase}</p>
					        </form>
					    </div>
					</div>
				    {results}
		      	</div>
		    )
 			
  		}
  	}
}

export default Emprunt
