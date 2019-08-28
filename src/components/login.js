import React, { Component } from 'react';
import '../App.css';
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader'

class Login extends Component {

  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      errorLogin: false,
    }
    this.usernameChange = this.usernameChange.bind(this)
    this.passwordChange = this.passwordChange.bind(this)
  }

  usernameChange(testUsername){
    let username = testUsername.target.value
    this.setState({
      username: username,
    })
  }

  passwordChange(testPassword){
    let password = testPassword.target.value
    this.setState({
      password: password,
    })
  }

  connect(){
    this.setState({
      isLoading: true,
      errorLogin: false
    })
    fetch('http://localhost/phpawesomeproject/login.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
        })
    })    
    .then((response) => response.json())
    .then((res) => {
      if (res.success){
        console.log(res.charte)
        this.props.sendUsername(res.username, res.admin, res.charte, res.charteText, res.charteActive)
        this.setState({
          username: res.username, 
          admin: res.admin,
          connectionOk: true,
        })
      } else {
        this.setState({
          errorLogin: true
        })
      }
      this.setState({
        isLoading: false,
      })
    })
    .catch((error) => console.error(error))
  } 


  render() {
    var errorMessage = []
    if (this.state.errorLogin){
      errorMessage.push(
        <p className="errorLogin">Mauvais identifiant/Mot de passe</p>
      )
    }
    var username = this.state.username
    if(!this.state.connectionOk){
      if (this.state.isLoading){
        return (
          <div style={{height: window.innerHeight + 'px', backgroundSize: 'cover',  paddingTop: window.innerHeight / 2 - 186.5 + 'px'}} className="backgroundLogin">
            <Loader color="#fff" type="line-scale" active />
          </div>
        )
      }
      return (
        <div style={{height: window.innerHeight + 'px', backgroundSize: 'cover',  paddingTop: window.innerHeight / 2 - 186.5 + 'px'}} className="backgroundLogin">
          <h1>BuroDispo</h1>
          <form>
            <input placeHolder="Matricule" value={this.state.username} onChange={this.usernameChange}/><br/>
            <input type="password" placeHolder="Mot de passe" value={this.state.password} onChange={this.passwordChange}/><br/>
            {errorMessage}
            <input type="submit" className="connectButton" onClick={() => this.connect()} value="CONNEXION"/>
          </form>
        </div>
      )
    } else { 
      return(
        <div>
          <Redirect to={{
            pathname: '/Accueil',
            state: {username: username}
          }}/>
        </div>
      )
    }
  }
}

export default Login;
