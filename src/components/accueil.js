import React, { Component } from 'react';
import '../App.css';
import {Link, Redirect} from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/fr'
import MyPrets from './myPrets'
import MyReservations from './myReservations'
import Loader from 'react-loader'

class Accueil extends Component {

  constructor(props){
    super(props)
    this.state = {
      currentDate: moment().format('YYYY-MM-DD'), 
      currentHour: moment().format('HH:mm:ss'),
      isLoading: false,
      showReservationsPret: false,
      username: this.props.username,
      nbPretsShow: 5
    }
    this.showMorePrets = this.showMorePrets.bind(this)
    this.refresh = this.refresh.bind(this)
  }

  componentWillMount() {
    this.getMyReservations();
    this.getMyPrets();
    this.getMyReservedPrets();
  }

  refresh(){
    this.getMyReservations();
    this.getMyPrets();
    this.getMyReservedPrets();
  }

  getMyPrets(){
    fetch('http://localhost/phpawesomeproject/getMyPrets.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          currentDate: this.state.currentDate,
          currentHour: this.state.currentHour,
        })
    })    
    .then((response) => response.json())
    .then((res) => {
        this.setState({infosPrets: res.infosPrets, nbPrets: res.nbPrets, isLoadingPrets: false});
        console.log(res)
    })
    .catch((error) => console.error(error))
  }

  getMyReservations(){
    fetch('http://localhost/phpawesomeproject/getMyReservations.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          currentDate: this.state.currentDate
        })
    })    
    .then((response) => response.json())
    .then((res) => {
        this.setState({infosReservations: res.infosReservations, nbReservations: res.nbReservations, isLoadingReservations: false});
    })
    .catch((error) => console.error(error))
  }

  getMyReservedPrets(){
    fetch('http://localhost/phpawesomeproject/getMyReservedPrets.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          currentDate: this.state.currentDate
        })
    })    
    .then((response) => response.json())
    .then((res) => {
        this.setState({infosReservedPrets: res.infosReservedPrets, infosReservateur: res.infosReservateur, nbReservedPrets: res.nbReservedPrets, isLoadinginfosReservedPrets: false,});
        console.log(res.infosReservateur)
    })
    .catch((error) => console.error(error))
  }

  disableNotification(idReservation){
    fetch('http://localhost/phpawesomeproject/disableNotification.php', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          idReservation: idReservation,
      })
    })    
    .then((response) => response.json())
    .then((res) => {
      window.location.reload()
    })
    .catch((error) => console.error(error))
  }

  showMorePrets(){
    let nbPretsShow = this.state.nbPretsShow
    nbPretsShow = nbPretsShow + 5
    this.setState({
      nbPretsShow: nbPretsShow
    })
  }


  render() {
    if (typeof this.props.username === "undefined" ){
      return(
        <Redirect to="/"/>
      )
    } else if (!this.state.isLoadingPrets && !this.state.isLoadingReservations && !this.state.isLoadinginfosReservedPrets){
      console.log(this.state.username)
      var prets = []
      var reservations = []
      var notification = []
      var i = 0
      var j = 0
      for (i = 0; i < this.state.nbPrets; i++) {
        if (i < this.state.nbPretsShow){
          if ((this.state.infosPrets[i].dateFin === this.state.currentDate && this.state.infosPrets[i].heureFin > this.state.currentHour) || this.state.infosPrets[i].dateFin > this.state.currentDate){
            let nbResa = 0
            let nbResasTotal = 0
            for (j = 0; j < this.state.nbReservedPrets; j++){
              if (this.state.infosReservedPrets[j].idPret === this.state.infosPrets[i].idPret){
                nbResa++;
              }
              nbResasTotal++
            }
            prets.push(<MyPrets key={'myPret' + i} nb={i} infos={this.state.infosPrets[i]} refresh={this.refresh} nbPrets={this.state.nbPrets} nbReservedPrets={nbResa} infosReservedPrets={this.state.infosReservedPrets} nbReservationsTotal={nbResasTotal} infosReservateur={this.state.infosReservateur}/>)
          }
        } else if (i === this.state.nbPretsShow){
          prets.push(<p className="showMore" onClick={this.showMorePrets}>Voir plus</p>)
        }
      }
      if (this.state.nbPrets === 0){
        prets.push(<p className="none">Vous n'avez aucun prêt en cours ou à venir</p>)
      }
      for (i = 0; i < this.state.nbReservations; i++) {
        reservations.push(<MyReservations key={'myReservation' + i} infos={this.state.infosReservations[i]} refresh={this.refresh} nbReservations={this.state.nbReservations}/>)
      }
      if (this.state.nbReservations === 0){
        reservations.push(<p className="none" key="noReservation">Vous n'avez aucune réservation en cours ou à venir</p>)
      }

      return (
        <div className="accueil">
          <div className="backButtons">
            {notification}
            <Link to="/Pret">
              <div className="button">Prêter mon bureau</div>
            </Link>
            <Link to="/Emprunt">
              <div className="button">Rechercher un bureau</div>
            </Link>
          </div>
          <div className="yourActivity">
            <div className="vosPrets">
              <h3>Vos prêts</h3>
              {prets}
            </div>
            <div className="vosReservations">
              <h3>Vos réservations</h3>
              {reservations}
            </div>
          </div>
        </div>
      )
    } else {
      return(
          <Loader color="#0060aa" type="line-scale" active position="relative" />
      )
    }
  }
}

export default Accueil;