import React, { Component } from 'react'
import {Button, Modal} from 'react-bootstrap'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'


class Header extends Component {

	render(){
		return(
			<div className="header">
          <ul className="menu">
            <li><Link to="/Accueil"><h1>Bureau mobile</h1></Link></li>
            <li><Link to="/Pret">Je souhaite prêter</Link></li>
            <li><Link to="/Emprunt">Je souhaite réserver</Link></li>
            <li><Link to="/Activity">Vue d'ensemble</Link></li>
            <li><Link to="/Favoris">Mes favoris</Link></li>
            <li onClick={() => this.open()}><FontAwesome className='iconsDetails' name='user'/></li>
          </ul>
        </div>
		)
	}

}