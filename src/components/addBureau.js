import React from 'react'
import ReactAvatarEditor from 'react-avatar-editor'
import FontAwesome from 'react-fontawesome'
import InputRange from 'react-input-range'
import {Button} from 'react-bootstrap'
import {Link, Redirect} from 'react-router-dom'

export default class AddBureau extends React.Component {
  state = {
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5 },
    preview: null,
    rotate: 0,
    scale: 1,
    width: 200,
    height: 200,
    image: require('../Images/drop.PNG'),
    imageSelected: false,
    value: 1,
    isLoading: true,
    newLieu: 0,
    newBatiment: '',
    newBureau: '',
    newEtage: '0',
    newCollegues: '0',
    newPortable: 0,
    newFixe: 0,
    newPhone: 0,
    newEthernet: 0,
    newReunion: 0,
    newImprimante: 0,
    newCaftiere: 0,
    newBouilloire: 0,
    newRefrigerateur: 0,
    newMicroOnde: 0,
    newAscenseur: 0,
    modifyImage: true,
    styleNewLieu: 'normal',
    styleNewBatiment: 'normal',
    styleNewBureau: 'normal',
    error: false,
    isLoadingBatiments: true
  }

  constructor(props){
    super(props)
    this.lieuChange = this.lieuChange.bind(this)
    this.batimentChange = this.batimentChange.bind(this)
    this.bureauChange = this.bureauChange.bind(this)
    this.etageChange = this.etageChange.bind(this)
    this.portableChange = this.portableChange.bind(this)
    this.fixeChange = this.fixeChange.bind(this)
    this.phoneChange = this.phoneChange.bind(this)
    this.ethernetChange = this.ethernetChange.bind(this)
    this.reunionChange = this.reunionChange.bind(this)

    this.imprimanteChange = this.imprimanteChange.bind(this)
    this.caftiereChange = this.caftiereChange.bind(this)
    this.bouilloireChange = this.bouilloireChange.bind(this)
    this.refrigerateurChange = this.refrigerateurChange.bind(this)
    this.microOndeChange = this.microOndeChange.bind(this)
    this.ascenseurChange = this.ascenseurChange.bind(this)
    this.colleguesChange = this.colleguesChange.bind(this)
    /*this.materielChange = this.materielChange.bind(this)
    this.servicesChange = this.servicesChange.bind(this)*/
  }

  componentWillMount() {
    this.getLieux()
  }



  getLieux(){
    fetch('http://localhost/phpawesomeproject/getLieux.php', {
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
        this.setState({lieux: res.lieux, nbLieux: res.nbLieux});
    })
    .catch((error) => console.error(error))
  }

  getBatiments(idLieu){
    fetch('http://localhost/phpawesomeproject/getBatiments.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: this.props.username,
            idLieu: idLieu
        })
    })    
    .then((response) => response.json())
    .then((res) => {
        this.setState({batiments: res.batiments, nbBatiments: res.nbBatiments, newBatiment: res.batiments[0].idBatiment, isLoadingBatiments: false});
        console.log(res.batiments)
    })
    .catch((error) => console.error(error))
  }

  cancelImage(){
    this.setState({
      image: require('../Images/drop.PNG'), 
      imageSelected: false, 
      rotate: 0,
      scale: 1,
    })
  }

  lieuChange(lieu){
    this.setState({
      newLieu: lieu.target.value,
      styleNewLieu: 'normal',
    })
    this.getBatiments(lieu.target.value)
  }

  batimentChange(batiment){
    this.setState({
      newBatiment: batiment.target.value,
      styleNewBatiment: 'normal',
    })
  }

  bureauChange(bureau){
    this.setState({
      newBureau: bureau.target.value,
      styleNewBureau: 'normal',
    })
  }

  etageChange(etage){
    this.setState({
      newEtage: etage.target.value
    })
  }

  colleguesChange(collegues){
    this.setState({
      newCollegues: collegues.target.value
    })
  }

  portableChange(portable){
    let value
    if (portable.target.checked){
      value = '1'
    } else {
      value = '0'
    }
    this.setState({
      newPortable: value
    })
  }

  fixeChange(fixe){
    let value
    if (fixe.target.checked){
      value = '1'
    } else {
      value = '0'
    }
    this.setState({
      newFixe: value
    })
  }

  phoneChange(phone){
    let value
    if (phone.target.checked){
      value = '1'
    } else {
      value = '0'
    }
    this.setState({
      newPhone: value
    })
  }

  ethernetChange(ethernet){
    let value
    if (ethernet.target.checked){
      value = '1'
    } else {
      value = '0'
    }
    this.setState({
      newEthernet: value
    })
  }

  reunionChange(reunion){
    let value
    if (reunion.target.checked){
      value = '1'
    } else {
      value = '0'
    }
    this.setState({
      newReunion: value
    })
  }

  imprimanteChange(imprimante){
    let value
    if (imprimante.target.checked){
      value = '1'
    } else {
      value = '0'
    }
    this.setState({
      newImprimante: value
    })
  }

  caftiereChange(caftiere){
    let value
    if (caftiere.target.checked){
      value = '1'
    } else {
      value = '0'
    }
    this.setState({
      newCaftiere: value
    })
  }

  bouilloireChange(bouilloire){
    let value
    if (bouilloire.target.checked){
      value = '1'
    } else {
      value = '0'
    }
    this.setState({
      newBouilloire: value
    })
  }

  refrigerateurChange(refrigerateur){
    let value
    if (refrigerateur.target.checked){
      value = '1'
    } else {
      value = '0'
    }
    this.setState({
      newRefrigerateur: value
    })
  }

  microOndeChange(microOnde){
    let value
    if (microOnde.target.checked){
      value = '1'
    } else {
      value = '0'
    }
    this.setState({
      newMicroOnde: value
    })
  }

  ascenseurChange(ascenseur){
    let value
    if (ascenseur.target.checked){
      value = '1'
    } else {
      value = '0'
    }
    this.setState({
      newAscenseur: value
    })
  }

  handleNewImage = e => {
    this.setState({ image: e.target.files[0], imageSelected: true })
  }

  handleSave = data => {
    const img = this.editor.getImageScaledToCanvas().toDataURL()
    const rect = this.editor.getCroppingRect()
    this.setState({
      modifyImage: false,
      preview: {
        img,
        rect,
        scale: this.state.scale,
        width: this.state.width,
        height: this.state.height,
        borderRadius: this.state.borderRadius
      }
    })
  }

  handlePositionChange = position => {
    this.setState({ position })
  }

  setEditorRef = editor => {
    if (editor) this.editor = editor
  }

  handleScale = e => {
    const scale = parseFloat(e.target.value)
    this.setState({ scale })
  }

  rotateLeft = e => {
    e.preventDefault()

    this.setState({
      rotate: this.state.rotate - 90
    })
  }
  rotateRight = e => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate + 90
    })
  }

  logCallback (e) {
    if (e === "onDropFile"){
      this.setState({ imageSelected: true })
    }
    console.log('callback', e)
  }

  saveBureaux(){
    console.log(this.state.newCollegues)
    var img = ''
    if (this.state.preview === null){
      img = 'data:image/jpeg;base64,/9j/4QkARXhpZgAATU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAMAAAExAAIAAAAeAAAAcgEyAAIAAAAUAAAAkIdpAAQAAAABAAAApAAAANAABFNJAAAnEAAEU0kAACcQQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykAMjAxODowMzowMSAwOTo0NDo0NAAAA6ABAAMAAAAB//8AAKACAAQAAAABAAAAyKADAAQAAAABAAAAyAAAAAAAAAAGAQMAAwAAAAEABgAAARoABQAAAAEAAAEeARsABQAAAAEAAAEmASgAAwAAAAEAAgAAAgEABAAAAAEAAAEuAgIABAAAAAEAAAfKAAAAAAAAAEgAAAABAAAASAAAAAH/2P/tAAxBZG9iZV9DTQAC/+4ADkFkb2JlAGSAAAAAAf/bAIQADAgICAkIDAkJDBELCgsRFQ8MDA8VGBMTFRMTGBEMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAENCwsNDg0QDg4QFA4ODhQUDg4ODhQRDAwMDAwREQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAoACgAwEiAAIRAQMRAf/dAAQACv/EAT8AAAEFAQEBAQEBAAAAAAAAAAMAAQIEBQYHCAkKCwEAAQUBAQEBAQEAAAAAAAAAAQACAwQFBgcICQoLEAABBAEDAgQCBQcGCAUDDDMBAAIRAwQhEjEFQVFhEyJxgTIGFJGhsUIjJBVSwWIzNHKC0UMHJZJT8OHxY3M1FqKygyZEk1RkRcKjdDYX0lXiZfKzhMPTdePzRieUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9jdHV2d3h5ent8fX5/cRAAICAQIEBAMEBQYHBwYFNQEAAhEDITESBEFRYXEiEwUygZEUobFCI8FS0fAzJGLhcoKSQ1MVY3M08SUGFqKygwcmNcLSRJNUoxdkRVU2dGXi8rOEw9N14/NGlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW5vYnN0dXZ3eHl6e3x//aAAwDAQACEQMRAD8A71JJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJT//0O9SSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSU//9HvUkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklP//S71JJEbQ51BtniYb3IH0nJKRpJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSn6Y9A2yZD9sdoiUlMEkkklKSSAJIA5JgfEp3NLXFp5boUlLJJJJKf/0+9AJIA1J0HxKuena29jWsJqY3YTpBB+k7lVqXtrsD3Au28AeKGRJJdqTqT5lJTYpqDcsVOEgEjXuI9qhiAOvYHCQZ0PwTm/9JXaAd7BD54KlXbj12CxrH99CRAn9z/zJJTCsNbU65zQ8hwa1p4nnc5PU/1Lqw5rfpdgBOndRrsa1rq3t3Vu1MaEEfnNS31se11QdLTJL418vakpekA5LQRI3HTt3Uq9gGQXNDg3gH4lO23HZaLWsfMyQSIE87ENtjQ20Qf0nHlrOqSmYIspsLmtDq4c1zRHyUvTLK2bBXueNznPI78BrXILHhrLGkGXgAfepCypzGtta6WaNeyJj9125JSr2tBa5u0FwlzWmQD5J8YNLrN43AMJj+5DcWE+xu1vmZJ8yi4ph1hImK3aHukpVLm2vFTmNDXDQtEFpA/eSY4NxCS0OIs0niYGv8pM2yqv3VNd6hEAuIIbP7sfS/tKIeBR6UGd+6e0RCSmT4fji3aA9r9hLREiNye0il/pMa07Y3OcJJKhvHoGqDJfuntEbVJ1lVkOtDt4EFzI1j97ckplo2ymxjQBbEtIkA7gHbUrJtyvSMAb4kAAx8UN9pc5paNra42N8I1T2WsNgtrDmvncd0RP8mElLm5ocQK2emDG2NSP637yjfWK7nMHA4+BUi/GLt5Y/cTJYCNk/wDVob3ue8vdy7lJT//U71JJJJSkkkQ49oBkCQJLQQXAf1UlI0lNlVj272iWgwTMRpuTPrewAuAh3DgZBSUxSUzRYBJAAiZJ576fykm02OaHAAA6NLiBP9WUlMEk/pv3+ntO+Y2ogxriYABPeCDH9ZJSJO17mTt/OBafgVJps9B0R6e4bvGeyTaLXAEADd9GSAT/AFQkpgki10b6nvJAIjbLojXXeotpsfu2AO2kAwfHwSUwSIIiQROonuFIVPNmwAPPJAMiP6ye1ts+o+CHGAWmR/VSUwSU20WuAIAAd9HcQJ/qqBBBIIgjQgpKUkkkkp//1e9SSSSUlxS0ZDN3EmPjGidj2sukUu9VpMjeSdefzUFTN9xbtL3FvgkpkD+pujQG3jygFL/tGfKzT/NQ9ztuyfbMx5pbnbdk+0mSPNJSTK1cweFbYU8g1AtLqy5paAx24gR+7wgOc5xBcZIED4BOy61ghjy0eH+9JSdji+18NLLPS2tBMn/yW5Qwmu9eWgw0EO/uKG3c5879rudzjGv9ZHbZYw+pdaHFoIYwEGSf6qSkTP6G/wDrt/gpNLLnMqsaW2QGtePD83ewoIc4MLJ9p1I8wp+vcG7Q923iP9v0klMmCKclvJG0GPIlKr+j3x/J/EobHvYZYS08SEt74cJPv1d5pKS0bfRuG3efaS0GCW/JRNjPRe1lRDXRLtxcAR8QoNc5p3NJaR3Cd9tj/puLo4lJSbKNXqy6ouDgNjg4gER+aAEK55faXFuw6AtOp0CTbrWDa15A8FAkkydSeSUlKSSSSU//1u9SSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSU//9fvUkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklP//Q71JJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJT//2f/tERZQaG90b3Nob3AgMy4wADhCSU0EJQAAAAAAEAAAAAAAAAAAAAAAAAAAAAA4QklNBDoAAAAAAO8AAAAQAAAAAQAAAAAAC3ByaW50T3V0cHV0AAAABQAAAABQc3RTYm9vbAEAAAAASW50ZWVudW0AAAAASW50ZQAAAABDbHJtAAAAD3ByaW50U2l4dGVlbkJpdGJvb2wAAAAAC3ByaW50ZXJOYW1lVEVYVAAAAAEAAAAAAA9wcmludFByb29mU2V0dXBPYmpjAAAAEQBGAG8AcgBtAGEAdAAgAGQAJwDpAHAAcgBlAHUAdgBlAAAAAAAKcHJvb2ZTZXR1cAAAAAEAAAAAQmx0bmVudW0AAAAMYnVpbHRpblByb29mAAAACXByb29mQ01ZSwA4QklNBDsAAAAAAi0AAAAQAAAAAQAAAAAAEnByaW50T3V0cHV0T3B0aW9ucwAAABcAAAAAQ3B0bmJvb2wAAAAAAENsYnJib29sAAAAAABSZ3NNYm9vbAAAAAAAQ3JuQ2Jvb2wAAAAAAENudENib29sAAAAAABMYmxzYm9vbAAAAAAATmd0dmJvb2wAAAAAAEVtbERib29sAAAAAABJbnRyYm9vbAAAAAAAQmNrZ09iamMAAAABAAAAAAAAUkdCQwAAAAMAAAAAUmQgIGRvdWJAb+AAAAAAAAAAAABHcm4gZG91YkBv4AAAAAAAAAAAAEJsICBkb3ViQG/gAAAAAAAAAAAAQnJkVFVudEYjUmx0AAAAAAAAAAAAAAAAQmxkIFVudEYjUmx0AAAAAAAAAAAAAAAAUnNsdFVudEYjUmx0QLQ//7gAAAAAAAAKdmVjdG9yRGF0YWJvb2wBAAAAAFBnUHNlbnVtAAAAAFBnUHMAAAAAUGdQQwAAAABMZWZ0VW50RiNSbHQAAAAAAAAAAAAAAABUb3AgVW50RiNSbHQAAAAAAAAAAAAAAABTY2wgVW50RiNQcmNAWQAAAAAAAAAAABBjcm9wV2hlblByaW50aW5nYm9vbAAAAAAOY3JvcFJlY3RCb3R0b21sb25nAAAAAAAAAAxjcm9wUmVjdExlZnRsb25nAAAAAAAAAA1jcm9wUmVjdFJpZ2h0bG9uZwAAAAAAAAALY3JvcFJlY3RUb3Bsb25nAAAAAAA4QklNA+0AAAAAABAAR///AAIAAgBH//8AAgACOEJJTQQmAAAAAAAOAAAAAAAAAAAAAD+AAAA4QklNBA0AAAAAAAQAAAB4OEJJTQQZAAAAAAAEAAAAHjhCSU0D8wAAAAAACQAAAAAAAAAAAQA4QklNJxAAAAAAAAoAAQAAAAAAAAACOEJJTQP1AAAAAABIAC9mZgABAGxmZgAGAAAAAAABAC9mZgABAKGZmgAGAAAAAAABADIAAAABAFoAAAAGAAAAAAABADUAAAABAC0AAAAGAAAAAAABOEJJTQP4AAAAAABwAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAADhCSU0EAAAAAAAAAgABOEJJTQQCAAAAAAAEAAAAADhCSU0EMAAAAAAAAgEBOEJJTQQtAAAAAAAGAAEAAAACOEJJTQQIAAAAAAAQAAAAAQAAAkAAAAJA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b2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMDMtMDFUMDk6NDQ6NDQrMDE6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMDMtMDFUMDk6NDQ6NDQrMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTAzLTAxVDA5OjQ0OjQ0KzAxOjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE5M0I1N0NBMkMxREU4MTFBNjg0QjY0REE2NzBDMTU1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE4M0I1N0NBMkMxREU4MTFBNjg0QjY0REE2NzBDMTU1IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MTgzQjU3Q0EyQzFERTgxMUE2ODRCNjREQTY3MEMxNTUiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MTgzQjU3Q0EyQzFERTgxMUE2ODRCNjREQTY3MEMxNTUiIHN0RXZ0OndoZW49IjIwMTgtMDMtMDFUMDk6NDQ6NDQrMDE6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxOTNCNTdDQTJDMURFODExQTY4NEI2NERBNjcwQzE1NSIgc3RFdnQ6d2hlbj0iMjAxOC0wMy0wMVQwOTo0NDo0NCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz7/7gAOQWRvYmUAZAAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYGCAsMCgoLCgoMEAwMDAwMDBAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAQcHBw0MDRgQEBgUDg4OFBQODg4OFBEMDAwMDBERDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCADIAMgDAREAAhEBAxEB/90ABAAZ/8QBogAAAAcBAQEBAQAAAAAAAAAABAUDAgYBAAcICQoLAQACAgMBAQEBAQAAAAAAAAABAAIDBAUGBwgJCgsQAAIBAwMCBAIGBwMEAgYCcwECAxEEAAUhEjFBUQYTYSJxgRQykaEHFbFCI8FS0eEzFmLwJHKC8SVDNFOSorJjc8I1RCeTo7M2F1RkdMPS4ggmgwkKGBmElEVGpLRW01UoGvLj88TU5PRldYWVpbXF1eX1ZnaGlqa2xtbm9jdHV2d3h5ent8fX5/c4SFhoeIiYqLjI2Oj4KTlJWWl5iZmpucnZ6fkqOkpaanqKmqq6ytrq+hEAAgIBAgMFBQQFBgQIAwNtAQACEQMEIRIxQQVRE2EiBnGBkTKhsfAUwdHhI0IVUmJy8TMkNEOCFpJTJaJjssIHc9I14kSDF1STCAkKGBkmNkUaJ2R0VTfyo7PDKCnT4/OElKS0xNTk9GV1hZWltcXV5fVGVmZ2hpamtsbW5vZHV2d3h5ent8fX5/c4SFhoeIiYqLjI2Oj4OUlZaXmJmam5ydnp+So6SlpqeoqaqrrK2ur6/9oADAMBAAIRAxEAPwDvOKux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'
    } else {
      img = this.state.preview.img
    }
    if ((this.state.newLieu !== 0 || this.state.newLieu !== '0')  && this.state.newBatiment !== '' && this.state.newBureau !== ''){
      fetch('http://localhost/phpawesomeproject/addBureau.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: this.props.username,
            lieu: this.state.newLieu,
            batiment: this.state.newBatiment,
            bureau: this.state.newBureau,
            etage: this.state.newEtage,
            collegues: this.state.newCollegues,
            portable: this.state.newPortable,
            fixe: this.state.newFixe,
            phone: this.state.newPhone,
            ethernet: this.state.newEthernet,
            reunion: this.state.newReunion,
            imprimante: this.state.newImprimante,
            caftiere: this.state.newCaftiere,
            bouilloire: this.state.newBouilloire,
            refrigerateur: this.state.newRefrigerateur,
            microOnde: this.state.newMicroOnde,
            ascenseur: this.state.newAscenseur,
            image: img,
        })
      })    
      .then((response) => response.json())
      .then((res) => {
          
      })
      .catch((error) => console.error(error))
    } else {
      this.setState({error: true})
      if (this.state.newLieu !== 0 || this.state.newLieu !== '0'){
        this.setState({styleNewLieu: 'error'})
      }
      if (this.state.newBatiment === ''){
        this.setState({styleNewBatiment: 'error'})
      }
      if (this.state.newBureau === ''){
        this.setState({styleNewBureau: 'error'})
      }
    }
  }

  openModifyImage(){
    this.setState({modifyImage: true})
  }

  closeModifyImage(){
    this.setState({modifyImage: false})
  }


  render () {
    console.log(this.state.error)
      var lieux = []
      var batiments = []
      var optionsImage = []
      var i = 0
      var error = []

      if (this.state.error){
        error.push(<p style={{color: 'red', textAlign: 'right'}}>Tous les champs doivent être renseignés</p>)
      } else {
        error.push(<div></div>)
      }
        for (i = 0; i < this.state.nbLieux; i++){
          lieux.push(<option key={this.state.lieux[i].idLieu} value={this.state.lieux[i].idLieu}>{this.state.lieux[i].nomLieu}</option>)
        }
        if (!this.state.isLoadingBatiments){
          for (i = 0; i < this.state.nbBatiments; i++){
            batiments.push(<option key={this.state.batiments[i].idBatiment} value={this.state.batiments[i].idBatiment}>{this.state.batiments[i].name}</option>)
          }
        }
        if (this.state.modifyImage){
        optionsImage.push(
            <div>
            <ReactAvatarEditor
              ref={this.setEditorRef}
              scale={this.state.scale}
              width={250}
              height={250}
              position={this.state.position}
              onPositionChange={this.handlePositionChange}
              rotate={parseFloat(this.state.rotate)}
              onSave={this.handleSave}
              color={[255, 255, 255, 0.6]} // RGBA
              onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
              onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
              onImageReady={this.logCallback.bind(this, 'onImageReady')}
              onImageLoad={this.logCallback.bind(this, 'onImageLoad')}
              onDropFile={this.logCallback.bind(this, 'onDropFile')}
              image={this.state.image || 'avatar.jpg'}
              onChange={this.handleNewImage}
            />
            </div>
            )
        if (!this.state.imageSelected){
          optionsImage.push(
            <div>
            <p>OU</p>
            <div className="upload-btn-wrapper">
              <button className="btn">Choisir une image</button>
              <input name='newImage' type='file' onChange={this.handleNewImage} />
            </div>
            </div>
          )
        } else {
          optionsImage.push(
              <div>
                <p>Pivoter</p>
                <FontAwesome className='rotate1' name='rotate-left' onClick={this.rotateLeft}/>
                <FontAwesome className='rotate2' name='rotate-right' onClick={this.rotateRight}/>
                <br />
                <p>Zoomer</p>
                <div className="zoom">X1</div>
                <div className="inputRangeContainer">
                  <InputRange
                    maxValue={2}
                    minValue={1}
                    value={this.state.scale}
                    step={0.01}
                    onChange={value => this.setState({ scale: value })}
                    onChangeComplete={value => console.log(value)} 
                  />
                </div>
                <div className="zoom">X2</div>
                <div className="clear"></div>
                <Button onClick={() => this.cancelImage()} className="cancelButtonImage">
                  Annuler
                </Button>
                <Button onClick={this.handleSave} className="saveButtonImage">
                  Sauvegarder
                </Button>
              </div>
          )
        }
      } else {
        optionsImage.push(
          <div>
            <img src={this.state.preview.img} alt={'bureau'}/>
            <div  onClick={() => this.openModifyImage()} className="modifyImage"><FontAwesome name="pencil"/>Modifier</div>
          </div>
          )
      }
      return (
        <div className="editBureau addBureau">
          <div className="imageSelector">
            <h3>Photo de votre bureau</h3>
            {optionsImage}
          </div>
          <div className="infosSelector">
          <h3>Détails de votre bureau</h3>
          <div className={"ligneModify " + this.state.styleNewLieu}>
            <div className="titre">Lieu</div>
            <div className="inputContainer">
              <select value={this.state.newLieu} onChange={this.lieuChange}>
                <option key={0} value={0}>-- Choisir un lieu --</option>
                {lieux}
              </select>
            </div>
          </div>
          <div className={"ligneModify " + this.state.styleNewBatiment}>
            <div className="titre">Bâtiment/Aile</div>
            <div className="inputContainer">
              <select value={this.state.newBatiment} onChange={this.batimentChange}>
                {batiments}
              </select>
            </div>
          </div>
          <div className={"ligneModify " + this.state.styleNewBureau}>
            <div className="titre">Bureau</div>
            <div className="inputContainer">
              <input type="text" value={this.state.newBureau} onChange={this.bureauChange}/><br/>
            </div>
          </div>
          <div className="ligneModify">
            <div className="titre">Etage</div>
            <div className="inputContainer">
              <select value={this.state.newEtage} onChange={this.etageChange}>
                <option value="0">RDC</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </div>
          </div>
          <div className="ligneModify">
            <div className="titre">Collègues de bureau</div>
            <div className="inputContainer">
              <select value={this.state.newCollegues} onChange={this.colleguesChange}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div className="ligneModify">
            <div className="titre">Matériel disponible</div>
            <div className="inputContainer inputMateriel">
              <div>
                <input type="checkbox" defaultChecked={parseInt(this.state.newPortable, 10)} name="portable" value="portable" onChange={this.portableChange}/>
                <label>Ordinateur portable</label>
              </div>
              <div>
                <input type="checkbox" defaultChecked={parseInt(this.state.newFixe, 10)} name="fixe" value="fixe" onChange={this.fixeChange}/>
                <label>Ordinateur fixe</label>
              </div>
              <div>
                <input type="checkbox" defaultChecked={parseInt(this.state.newPhone, 10)} name="phone" value="phone" onChange={this.phoneChange}/>
                <label>Téléphone</label>
              </div>
              <div>
                <input type="checkbox" defaultChecked={parseInt(this.state.newEthernet, 10)} name="ethernet" value="ethernet" onChange={this.ethernetChange}/>
                <label>Câble Ethernet</label>
              </div>
              <div>
                <input type="checkbox" defaultChecked={parseInt(this.state.newReunion, 10)} name="reunion" value="reunion" onChange={this.reunionChange}/>
                <label>Table de réunion</label>
              </div>
            </div>
          </div>
          <div className="ligneModify">
            <div className="titre">Services à proximité</div>
            <div className="inputContainer inputMateriel">
              <div>
                <input type="checkbox" defaultChecked={parseInt(this.state.newImprimante, 10)} name="imprimante" value="imprimante" onChange={this.imprimanteChange}/>
                <label>Imprimante</label>
              </div>
              <div>
                <input type="checkbox" defaultChecked={parseInt(this.state.newCaftiere, 10)} name="caftiere" value="caftiere" onChange={this.caftiereChange}/>
                <label>Cafetière</label>
              </div>
              <div>
                <input type="checkbox" defaultChecked={parseInt(this.state.newBouilloire, 10)} name="bouilloire" value="bouilloire" onChange={this.bouilloireChange}/>
                <label>Bouilloire</label>
              </div>
              <div>
                <input type="checkbox" defaultChecked={parseInt(this.state.newRefrigerateur, 10)} name="refrigerateur" value="refrigerateur" onChange={this.refrigerateurChange}/>
                <label>Réfrigérateur</label>
              </div>
              <div>
                <input type="checkbox" defaultChecked={parseInt(this.state.newMicroOnde, 10)} name="microOnde" value="microOnde" onChange={this.microOndeChange}/>
                <label>Micro-onde</label>
              </div>
              <div>
                <input type="checkbox" defaultChecked={parseInt(this.state.newAscenseur, 10)} name="ascenseur" value="ascenseur" onChange={this.ascenseurChange}/>
                <label>Ascenseur</label>
              </div>
            </div>
          </div>
          </div>
          {error}
          <Link to="/Accueil">
            <Button className="cancelButton">Annuler</Button>
          </Link>
          <Link to="/Accueil">
            <Button onClick={() => this.saveBureaux()} className="saveButton">Sauvegarder</Button>
          </Link>
        </div>
      )
  }
}