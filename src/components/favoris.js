import React, { Component } from 'react'
import '../App.css'
import {Redirect} from 'react-router-dom'
import moment from 'moment'
import FontAwesome from 'react-fontawesome'

class Favoris extends Component {

  constructor(props){
    super(props)
    this.state = {
      favorisAreLoading: true
    }
    this.deleteFavoris = this.deleteFavoris.bind(this)
  }

  componentWillMount() {
      this.getFavoris();
  }

  getFavoris(){
      fetch('http://localhost/phpawesomeproject/getFavoris.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.props.username
        })
      })    
      .then((response) => response.json())
      .then((res) => {
          this.setState({
            infosFavoris: res.infosFavoris,
            nbFavoris: res.nbFavoris,
            favorisAreLoading: false
          })
          console.log(res.infosFavoris)
      })
      .catch((error) => console.error(error))
  }

  deleteFavoris(idFavoris){
    console.log(idFavoris)
      fetch('http://localhost/phpawesomeproject/deleteFavoris.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idFavoris: idFavoris
        })
      })    
      .then((response) => response.json())
      .then((res) => {
          if (res.success){
            window.location.reload()
          }
      })
      .catch((error) => console.error(error))
  }


  render() {
  	if (typeof this.props.username === "undefined" ){
      return(
        <Redirect to="/"/>
      )
    } else {
      if (this.state.favorisAreLoading){
        return(
          <div className="favoris">
            <h1>En attente</h1>
          </div>
        )
      } else {
        let favoris = []
        if (this.state.nbFavoris === 0){
          favoris.push(
            <h4>Vous n'avez mis aucun bureau en favoris.</h4>
          )
        }
        let i
        for (i = 0; i < this.state.nbFavoris; i++){
          let portable = []
          let fixe = []
          let phone = []
          let ethernet = []
          let reunion = []
          let imprimante = []
          let caftiere = []
          let bouilloire = []
          let refrigerateur = []
          let microOnde = []
          let ascenseur = []
          
          if (this.state.infosFavoris[i].fixe === '1'){
            fixe.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/ordinateur-fixe.svg')}/><p>Ordinateur fixe</p></div>)
          } else {
            fixe.push(<div key={'materiel' + moment()}></div>)
          }

          if (this.state.infosFavoris[i].portable === '1'){
            portable.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/ordinateur-portable.svg')}/><p>Ordinateur portable</p></div>)
          } else {
            portable.push(<div key={'materiel' + moment()}></div>)
          }


          if (this.state.infosFavoris[i].phone === '1'){
            phone.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/phone.svg')}/><p>Téléphone</p></div>)
          } else {
            phone.push(<div key={'materiel' + moment()}></div>)
          }

          if (this.state.infosFavoris[i].ethernet === '1'){
            ethernet.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/cable.svg')}/><p>Cable ethernet</p></div>)
          } else {
            ethernet.push(<div key={'materiel' + moment()}></div>)
          }

          if (this.state.infosFavoris[i].reunion === '1'){
            reunion.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/table.svg')}/><p>Table de réunion</p></div>)
          } else {
            reunion.push(<div key={'materiel' + moment()}></div>)
          }

          if (this.state.infosFavoris[i].imprimante === '1'){
            imprimante.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/imprimante.svg')}/><p>Imprimante</p></div>)
          } else {
            imprimante.push(<div key={'materiel' + moment()}></div>)
          }

          if (this.state.infosFavoris[i].caftiere === '1'){
            caftiere.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/cafetiere.svg')}/><p>Cafetière</p></div>)
          } else {
            caftiere.push(<div key={'materiel' + moment()}></div>)
          }

          if (this.state.infosFavoris[i].bouilloire === '1'){
            bouilloire.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/bouilloire.svg')}/><p>Bouilloire</p></div>)
          } else {
            bouilloire.push(<div key={'materiel' + moment()}></div>)
          }

          if (this.state.infosFavoris[i].refrigerateur === '1'){
            refrigerateur.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/frigo.svg')}/><p>Réfrigérateur</p></div>)
          } else {
            refrigerateur.push(<div key={'materiel' + moment()}></div>)
          }

          if (this.state.infosFavoris[i].microOnde === '1'){
            microOnde.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/micro-ondes.svg')}/><p>Micro-ondes</p></div>)
          } else {
            microOnde.push(<div key={'materiel' + moment()}></div>)
          }

          if (this.state.infosFavoris[i].ascenseur === '1'){
            ascenseur.push(<div key={'materiel' + moment()}><img width="20px" height="20px" src={require('../Images/ascenseur.svg')}/><p>Ascenseur</p></div>)
          } else {
            ascenseur.push(<div key={'materiel' + moment()}></div>)
          }

          let idFavoris = this.state.infosFavoris[i].idFavoris

          favoris.push(
            <div key="bureau" className="bureau">
              <div className="title">
                <p>Bureau de <span onClick={() => this.openInfos()}>{this.state.infosFavoris[i].prenom} {this.state.infosFavoris[i].nom.substring(1, -50)}</span><FontAwesome onClick={() => this.deleteFavoris(idFavoris)} className='iconsDetails' name='trash'/></p>
              </div>
              <div className="image">
                <img alt="bureau001" src={this.state.infosFavoris[i].image}/>
              </div>
              <div className="infos">
                <div className="details">
                  <h4>Informations</h4>
                  <div>
                    <FontAwesome className='iconsDetails' name='globe'/><p><a href={"https://maps.google.fr/maps?f=q&hl=fr&q=" + this.state.infosFavoris[i].lattitude + "," + this.state.infosFavoris[i].longitude} target="_blank">{this.state.infosFavoris[i].nomLieu}</a></p>
                  </div>
                  <div>
                    <FontAwesome className='iconsDetails' name='building'/><p>{this.state.infosFavoris[i].name}</p>
                  </div>
                  <div>
                    <FontAwesome className='iconsDetails' name='info-circle'/><p>étage {this.state.infosFavoris[i].etage}</p>
                  </div>
                  <div>
                    <FontAwesome className='iconsDetails' name='circle-o'/><p>{this.state.infosFavoris[i].bureau}</p>
                  </div>
                  <div>
                    <FontAwesome className='iconsDetails' name='users'/><p>{this.state.infosFavoris[i].partage} collègue(s)</p>
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
            </div>
          )
        }
        return (
          <div className="favoris">
            {favoris}
          </div>
        )
      }
	  }
  }
}

export default Favoris;
