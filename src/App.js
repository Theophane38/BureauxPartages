import React, { Component } from 'react'
import './App.css';
import Accueil from './components/accueil'
import Pret from './components/pret'
import Emprunt from './components/emprunt'
import DetailsBureau from './components/detailsBureau'
import Activity from './components/activity'
import Favoris from './components/favoris'
import Profil from './components/profil'
import Login from './components/login'
import Admin from './components/admin'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import {Button} from 'react-bootstrap'
import Modal from 'react-responsive-modal'
import {Route, Link, HashRouter} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      connectionOk: false,
      isLoading: true,
      showCharte: true,
    }
    this.close = this.close.bind(this)
    this.sendUsername = this.sendUsername.bind(this)
    this.acceptCharte = this.acceptCharte.bind(this)
  }

  componentWillMount(){
    this.setState({
      isLoading: false,
    })
  }

  sendUsername(username, admin, charte, charteText, charteActive){
    this.setState({
      username: username,
      admin: admin,
      charte: charte,
      charteText: charteText,
      charteActive: charteActive
    })
  }

  close(){
    this.setState({ 
      showModal: false,
      showCharte: false
    })
  }

  acceptCharte(){
    fetch('http://localhost/phpawesomeproject/acceptCharte.php', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          username: this.state.username,
      })
    })    
    .then((response) => response.json())
    .then((res) => {
      this.setState({
        showCharte: false,
      })
    })
    .catch((error) => console.error(error))
  }

  open(){
    this.setState({ showModal: true })
  }

  render(){
    if (!this.state.isLoading){
      console.log(this.state.username)
      var modalcharte = []
      if (this.state.charte === "0" && this.state.charteActive){
        modalcharte.push(
          <Modal open={this.state.showCharte} closeOnOverlayClick={false} showCloseIcon={false}>
            <div className="bigModal">
              <div dangerouslySetInnerHTML={{__html: this.state.charteText}}>
              </div>
              <Button className='validateButton' onClick={() => this.acceptCharte()}>
                J'accepte la charte
              </Button>
            </div>
          </Modal>
        )
      }
      var admin = []
      if (this.state.admin === "1"){
        admin.push(
          <li>
            <Link to="/Admin">ADMIN</Link>
            <Link to="/Admin"><FontAwesome className='lien' name='plus-circle'/>ADMIN</Link>
          </li>
        )
      }
      var header = []
      header.push(
        <div className="header" key="header">
          <ul className="menu">
            <li>
              <Link to="/Accueil">
                <h1>Bureau mobile</h1>
              </Link>
            </li>
            <li>
              <Link to="/Pret">Je souhaite prêter</Link>
              <Link to="/Pret"><FontAwesome className='lien' name='plus-circle'/>Prêter</Link>
            </li>
            <li>
              <Link to="/Emprunt">Je souhaite réserver</Link>
              <Link to="/Emprunt"><FontAwesome className='lien' name='search'/>Réserver</Link>
            </li>
            <li>
              <Link to="/Activity">Vue d'ensemble</Link>
              <Link to="/Activity"><FontAwesome className='lien' name='clock-o'/>En direct</Link>
            </li>
            <li>
              <Link to="/Favoris">Mes favoris</Link>
              <Link to="/Favoris"><FontAwesome className='lien' name='star'/>Favoris</Link>
            </li>
            {admin}
            <li onClick={() => this.open()}>
              <FontAwesome className='iconsDetails' name='user'/>
            </li>
          </ul>
        </div>
      )
      return(
        <HashRouter>
            <div>
              <Route exact path="/" render={(props) =><Login {...props} sendUsername={this.sendUsername}/>}/>
              <Route path="/Accueil" render={(props) =><div>{header}<Accueil {...props} username={this.state.username}/></div>}/>
              <Route path="/Pret" render={(props) => <div>{header}<Pret {...props} username={this.state.username}/></div>}/>
              <Route path="/Emprunt" render={(props) => <div>{header}<Emprunt {...props} username={this.state.username}/></div>}/>
              <Route path="/DetailsBureau/:id/:date/:hourD/:hourF" render={(props) => <div>{header}<DetailsBureau {...props} username={this.state.username}/></div>}/>
              <Route path="/Activity" render={(props) => <div>{header}<Activity {...props} username={this.state.username}/></div>}/>
              <Route path="/Favoris" render={(props) => <div>{header}<Favoris {...props} username={this.state.username}/></div>}/>
              <Route path="/Admin" render={(props) => <div>{header}<Admin {...props} username={this.state.username}/></div>}/>
              <Modal open={this.state.showModal} onClose={() => this.close()}>
                <div className="bigModal">
                  <Profil close={this.close} username={this.state.username}/>
                  <Button className='closeButton' onClick={() => this.close()}>
                    Fermer
                  </Button>
                  <Link to="/"><Button className='disconnectButton' onClick={() => this.close()}>
                    Déconnexion  <FontAwesome className='iconsDetails' name='sign-out'/>
                  </Button></Link>
                </div>
              </Modal>
              {modalcharte}
            </div>
        </HashRouter>
      )
    } else {
      return(
        <div>waiting</div>
      )
    }
  }
}


export default App