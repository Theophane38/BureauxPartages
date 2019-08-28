import React from 'react'
import ReactAvatarEditor from 'react-avatar-editor'
import FontAwesome from 'react-fontawesome'
import InputRange from 'react-input-range'
import {Button} from 'react-bootstrap'
import Toggle from 'react-toggle'

export default class ImageDrop extends React.Component {
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
    modifyLieu: false,
    modifyBatiment: false,
    modifyBureau: false,
    modifyEtage: false,
    modifyCollegues: false,
    modifyMateriel: false,
    modifyService: false,
    modifyImage: false,
    isLoadingBatiments: true,
  }

  constructor(props){
    super(props)
    this.lieuChange = this.lieuChange.bind(this)
    this.batimentChange = this.batimentChange.bind(this)
    this.bureauChange = this.bureauChange.bind(this)
    this.etageChange = this.etageChange.bind(this)
    this.colleguesChange = this.colleguesChange.bind(this)
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
    this.handleMailStatusChange = this.handleMailStatusChange.bind(this)
    /*this.materielChange = this.materielChange.bind(this)
    this.servicesChange = this.servicesChange.bind(this)*/
  }

  componentWillMount() {
    this.getInfos()
    this.getLieux()
  }

  getInfos(){
    fetch('http://localhost/phpawesomeproject/getInfos.php', {
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
        this.setState({
          infos: res.infos, 
          newLieu: res.infos.idLieu, 
          newBatiment: res.infos.idBatiment, 
          newBureau: res.infos.bureau, 
          newEtage: res.infos.etage,
          newCollegues: res.infos.partage,
          newPortable: res.infos.portable,
          newFixe: res.infos.fixe,
          newPhone: res.infos.phone,
          newEthernet: res.infos.ethernet,
          newReunion: res.infos.reunion,
          newImprimante: res.infos.imprimante,
          newCaftiere: res.infos.caftiere,
          newBouilloire: res.infos.bouilloire,
          newRefrigerateur: res.infos.refrigerateur,
          newMicroOnde: res.infos.microOnde,
          newAscenseur: res.infos.ascenseur,
        });
        console.log(res.infos.receiptMail)
        if (res.infos.receiptMail == 0){
          this.setState({
            mailStatus: true,
            isLoading: false, 
          })
        } else {
          this.setState({
            mailStatus: false,
            isLoading: false,   
          })
        }
        this.getBatiments()
    })
    .catch((error) => console.error(error))
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

  getBatiments(){
    fetch('http://localhost/phpawesomeproject/getBatiments.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: this.props.username,
            idLieu: this.state.newLieu
        })
    })    
    .then((response) => response.json())
    .then((res) => {
        this.setState({batiments: res.batiments, nbBatiments: res.nbBatiments, isLoadingBatiments: false});
    })
    .catch((error) => console.error(error))
  }

  handleMailStatusChange(){
    let newStatus
    if (this.state.mailStatus === true){
      newStatus = false
    } else {
      newStatus = true
    }
    fetch('http://localhost/phpawesomeproject/changeReceiptMail.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: this.props.username,
            mailStatus: newStatus
        })
    })    
    .then((response) => response.json())
    .then((res) => {
        if (res.success === true){
          this.setState({
            mailStatus: newStatus
          })
        }
    })
    .catch((error) => console.error(error))
  }

  modifyImage(img){
    fetch('http://localhost/phpawesomeproject/modifyImage.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: this.props.username,
            image: img
        })
    })    
    .then((response) => response.json())
    .then((res) => {
        this.setState({modifyImage: false})
        this.getInfos()
    })
    .catch((error) => console.error(error))
  }

  modifyInfos(lieu, batiment, bureau, etage, collegues, portable, fixe, phone, ethernet, reunion, imprimante, caftiere, bouilloire, refrigerateur, microOnde, ascenseur, name){
    fetch('http://localhost/phpawesomeproject/modifyInfos.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: this.props.username,
            lieu: lieu,
            batiment: batiment,
            bureau: bureau,
            etage: etage,
            collegues: collegues,
            portable: portable,
            fixe: fixe,
            phone: phone,
            ethernet: ethernet,
            reunion: reunion,
            imprimante: imprimante,
            caftiere: caftiere,
            bouilloire: bouilloire,
            refrigerateur: refrigerateur,
            microOnde: microOnde,
            ascenseur: ascenseur
        })
    })    
    .then((response) => response.json())
    .then((res) => {
        this.setState({infos: res.infos, [name]: false})
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
      newLieu: lieu.target.value
    })
  }

  batimentChange(batiment){
    this.setState({
      newBatiment: batiment.target.value
    })
  }

  bureauChange(bureau){
    this.setState({
      newBureau: bureau.target.value
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
      preview: {
        img,
        rect,
        scale: this.state.scale,
        width: this.state.width,
        height: this.state.height,
        borderRadius: this.state.borderRadius
      }
    })
    this.modifyImage(img)
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

  openModifyLieu(){
    this.setState({modifyLieu: true})
  }

  closeModifyLieu(){
    this.setState({modifyLieu: false})
  }

  saveModifyLieu(){
    let lieu = this.state.newLieu
    let batiment = ''
    let bureau = ''
    let etage = ''
    let collegues = ''
    let portable = ''
    let fixe = ''
    let phone = ''
    let ethernet = ''
    let reunion = ''
    let imprimante = ''
    let caftiere = ''
    let bouilloire = ''
    let refrigerateur = ''
    let microOnde = ''
    let ascenseur = ''
    let name = 'modifyLieu'
    this.modifyInfos(lieu, batiment, bureau, etage, collegues, portable, fixe, phone, ethernet, reunion, imprimante, caftiere, bouilloire, refrigerateur, microOnde, ascenseur, name)
  }

  openModifyBatiment(){
    this.setState({modifyBatiment: true})
  }

  closeModifyBatiment(){
    this.setState({modifyBatiment: false})
  }

  saveModifyBatiment(){
    let lieu = ''
    let batiment = this.state.newBatiment
    let bureau = ''
    let etage = ''
    let collegues = ''
    let portable = ''
    let fixe = ''
    let phone = ''
    let ethernet = ''
    let reunion = ''
    let imprimante = ''
    let caftiere = ''
    let bouilloire = ''
    let refrigerateur = ''
    let microOnde = ''
    let ascenseur = ''
    let name = 'modifyBatiment'
    this.modifyInfos(lieu, batiment, bureau, etage, collegues, portable, fixe, phone, ethernet, reunion, imprimante, caftiere, bouilloire, refrigerateur, microOnde, ascenseur, name)
  }

  openModifyBureau(){
    this.setState({modifyBureau: true})
  }

  closeModifyBureau(){
    this.setState({modifyBureau: false})
  }

  saveModifyBureau(){
    let lieu = ''
    let batiment = ''
    let bureau = this.state.newBureau
    let etage = ''
    let collegues = ''
    let portable = ''
    let fixe = ''
    let phone = ''
    let ethernet = ''
    let reunion = ''
    let imprimante = ''
    let caftiere = ''
    let bouilloire = ''
    let refrigerateur = ''
    let microOnde = ''
    let ascenseur = ''
    let name = 'modifyBureau'
    this.modifyInfos(lieu, batiment, bureau, etage, collegues, portable, fixe, phone, ethernet, reunion, imprimante, caftiere, bouilloire, refrigerateur, microOnde, ascenseur, name)
  }

  openModifyEtage(){
    this.setState({modifyEtage: true})
  }

  closeModifyEtage(){
    this.setState({modifyEtage: false})
  }

  saveModifyEtage(){
    let lieu = ''
    let batiment = ''
    let bureau = ''
    let etage = this.state.newEtage
    let collegues = ''
    let portable = ''
    let fixe = ''
    let phone = ''
    let ethernet = ''
    let reunion = ''
    let imprimante = ''
    let caftiere = ''
    let bouilloire = ''
    let refrigerateur = ''
    let microOnde = ''
    let ascenseur = ''
    let name = 'modifyEtage'
    this.modifyInfos(lieu, batiment, bureau, etage, collegues, portable, fixe, phone, ethernet, reunion, imprimante, caftiere, bouilloire, refrigerateur, microOnde, ascenseur, name)
  }

  openModifyCollegues(){
    this.setState({modifyCollegues: true})
  }

  closeModifyCollegues(){
    this.setState({modifyCollegues: false})
  }

  saveModifyCollegues(){
    let lieu = ''
    let batiment = ''
    let bureau = ''
    let etage = ''
    let collegues = this.state.newCollegues
    let portable = ''
    let fixe = ''
    let phone = ''
    let ethernet = ''
    let reunion = ''
    let imprimante = ''
    let caftiere = ''
    let bouilloire = ''
    let refrigerateur = ''
    let microOnde = ''
    let ascenseur = ''
    let name = 'modifyCollegues'
    this.modifyInfos(lieu, batiment, bureau, etage, collegues, portable, fixe, phone, ethernet, reunion, imprimante, caftiere, bouilloire, refrigerateur, microOnde, ascenseur, name)
  }

  openModifyMateriel(){
    this.setState({modifyMateriel: true})
  }

  closeModifyMateriel(){
    this.setState({modifyMateriel: false})
  }

  saveModifyMateriel(){
    let lieu = ''
    let batiment = ''
    let bureau = ''
    let etage = ''
    let collegues = ''
    let portable = this.state.newPortable
    let fixe = this.state.newFixe
    let phone = this.state.newPhone
    let ethernet = this.state.newEthernet
    let reunion = this.state.newReunion
    let imprimante = ''
    let caftiere = ''
    let bouilloire = ''
    let refrigerateur = ''
    let microOnde = ''
    let ascenseur = ''
    let name = 'modifyMateriel'
    this.modifyInfos(lieu, batiment, bureau, etage, collegues, portable, fixe, phone, ethernet, reunion, imprimante, caftiere, bouilloire, refrigerateur, microOnde, ascenseur, name)
  }

  openModifyService(){
    this.setState({modifyService: true})
  }

  closeModifyService(){
    this.setState({modifyService: false})
  }

  saveModifyService(){
    let lieu = ''
    let batiment = ''
    let bureau = ''
    let etage = ''
    let collegues = ''
    let portable = ''
    let fixe = ''
    let phone = ''
    let ethernet = ''
    let reunion = ''
    let imprimante = this.state.newImprimante
    let caftiere = this.state.newCaftiere
    let bouilloire = this.state.newBouilloire
    let refrigerateur = this.state.newRefrigerateur
    let microOnde = this.state.newMicroOnde
    let ascenseur = this.state.newAscenseur
    let name = 'modifyService'
    this.modifyInfos(lieu, batiment, bureau, etage, collegues, portable, fixe, phone, ethernet, reunion, imprimante, caftiere, bouilloire, refrigerateur, microOnde, ascenseur, name)
  }

  openModifyImage(){
    this.setState({modifyImage: true})
  }

  closeModifyImage(){
    this.setState({modifyImage: false})
  }


  render () {
    if (!this.state.isLoading){
      var lieux = []
      var batiments = []
      var lieu = []
      var batiment = []
      var bureau = []
      var etage = []
      var collegues = []
      var materiel = []
      var service = []
      var optionsImage = []
      var materiels = []
      var services = []
      var i = 0
      if (!this.state.modifyLieu){
        lieu.push(
          <div className="ligneInfos">
            <div>Lieu</div><div>{this.state.infos.nomLieu}</div><div onClick={() => this.openModifyLieu()}><FontAwesome name='pencil'/>Modifier</div>
          </div>
        )
      } else {
        for (i = 0; i < this.state.nbLieux; i++){
          lieux.push(<option key={'lieu' + i} value={this.state.lieux[i].idLieu}>{this.state.lieux[i].nomLieu}</option>)
        }
        lieu.push(
          <div className="ligneModify">
            <div className="titre">Lieu</div>
            <div className="inputContainer">
              <select value={this.state.newLieu} onChange={this.lieuChange}> 
                {lieux}
              </select><br/>
              <Button onClick={() => this.closeModifyLieu()} className="cancelButton">Annuler</Button>
              <Button onClick={() => this.saveModifyLieu()} className="saveButton">Sauvegarder</Button>
            </div>
          </div>
        )
      }
      if (!this.state.modifyBatiment){
        batiment.push(
          <div className="ligneInfos">
            <div>Bâtiment</div><div>{this.state.infos.name}</div><div onClick={() => this.openModifyBatiment()}><FontAwesome name='pencil'/>Modifier</div>
          </div>
        )
      } else {
        for (i = 0; i < this.state.nbBatiments; i++){
          batiments.push(<option key={'batiment' + i} value={this.state.batiments[i].idBatiment}>{this.state.batiments[i].name}</option>)
        }
        batiment.push(
          <div className="ligneModify">
            <div className="titre">Bâtiment</div>
            <div className="inputContainer">
              <select value={this.state.newBatiment} onChange={this.batimentChange}> 
                {batiments}
              </select><br/>
              <Button onClick={() => this.closeModifyBatiment()} className="cancelButton">Annuler</Button>
              <Button onClick={() => this.saveModifyBatiment()} className="saveButton">Sauvegarder</Button>
            </div>
          </div>
        )
      }
      if (!this.state.modifyBureau){
        bureau.push(
          <div className="ligneInfos">
            <div>Bureau</div><div>{this.state.infos.bureau}</div><div onClick={() => this.openModifyBureau()}><FontAwesome name='pencil'/>Modifier</div>
          </div>
        )
      } else {
        bureau.push(
          <div className="ligneModify">
            <div className="titre">Bureau</div>
            <div className="inputContainer">
              <input type="text" value={this.state.newBureau} onChange={this.bureauChange}/><br/>
              <Button onClick={() => this.closeModifyBureau()} className="cancelButton">Annuler</Button>
              <Button onClick={() => this.saveModifyBureau()} className="saveButton">Sauvegarder</Button>
            </div>
          </div>
        )
      }
      if (!this.state.modifyEtage){
        etage.push(
          <div className="ligneInfos">
            <div>Etage</div><div>{this.state.infos.etage}</div><div onClick={() => this.openModifyEtage()}><FontAwesome name='pencil'/>Modifier</div>
          </div>
        )
      } else {
        etage.push(
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
              </select><br/>
              <Button onClick={() => this.closeModifyEtage()} className="cancelButton">Annuler</Button>
              <Button onClick={() => this.saveModifyEtage()} className="saveButton">Sauvegarder</Button>
            </div>
          </div>
        )
      }
      if (!this.state.modifyCollegues){
        collegues.push(
          <div className="ligneInfos">
            <div>Collègues de bureau</div><div>{this.state.infos.partage}</div><div onClick={() => this.openModifyCollegues()}><FontAwesome name='pencil'/>Modifier</div>
          </div>
        )
      } else {
        collegues.push(
          <div className="ligneModify">
            <div className="titre">Collegues</div>
            <div className="inputContainer">
              <select value={this.state.newCollegues} onChange={this.colleguesChange}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select><br/>
              <Button onClick={() => this.closeModifyCollegues()} className="cancelButton">Annuler</Button>
              <Button onClick={() => this.saveModifyCollegues()} className="saveButton">Sauvegarder</Button>
            </div>
          </div>
        )
      }
      if (this.state.infos.portable === '1'){
        materiels.push(<p>Ordinateur portable</p>)
      }
      if (this.state.infos.fixe === '1'){
        materiels.push(<p>Ordinateur fixe</p>)
      }
      if (this.state.infos.phone === '1'){
        materiels.push(<p>Téléphone</p>)
      }
      if (this.state.infos.ethernet === '1'){
        materiels.push(<p>Cable ethernet</p>)
      }

      if (this.state.infos.reunion === '1'){
        materiels.push(<p>Table de réunion</p>)
      }

      if (this.state.infos.imprimante === '1'){
        services.push(<p>Imprimante</p>)
      }

      if (this.state.infos.caftiere === '1'){
        services.push(<p>Cafetière</p>)
      }

      if (this.state.infos.bouilloire === '1'){
        services.push(<p>Bouilloire</p>)
      }

      if (this.state.infos.refrigerateur === '1'){
        services.push(<p>Réfrigérateur</p>)
      }

      if (this.state.infos.microOnde === '1'){
        services.push(<p>Micro-ondes</p>)
      }

      if (this.state.infos.ascenseur === '1'){
        services.push(<p>Ascenseur</p>)
      }
      if (!this.state.modifyMateriel){
        materiel.push(
          <div className="ligneInfos">
            <div>Matériel disponnible</div><div>{materiels}</div><div onClick={() => this.openModifyMateriel()}><FontAwesome name='pencil'/>Modifier</div>
          </div>
        )
      } else {
        materiel.push(
          <div className="ligneModify">
            <div className="titre">Matériel disponnible</div>
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
                <label>Câble ethernet</label>
              </div>
              <div>
                <input type="checkbox" defaultChecked={parseInt(this.state.newReunion, 10)} name="reunion" value="reunion" onChange={this.reunionChange}/>
                <label>Table de réunion</label>
              </div>
              <Button onClick={() => this.closeModifyMateriel()} className="cancelButton">Annuler</Button>
              <Button onClick={() => this.saveModifyMateriel()} className="saveButton">Sauvegarder</Button>
            </div>
          </div>
        )
      }
      if (!this.state.modifyService){
        service.push(
          <div className="ligneInfos">
            <div>Services à proximité</div><div>{services}</div><div onClick={() => this.openModifyService()}><FontAwesome name='pencil'/>Modifier</div>
          </div>
        )
      } else {
        service.push(
          <div className="ligneModify">
            <div className="titre">Services à proximité</div>
            <div className="inputContainer inputMateriel">
              <div>
                <input type="checkbox" defaultChecked={parseInt(this.state.newImprimante, 10)} name="imprimante" value="imprimante" onChange={this.imprimanteChange}/>
                <label>Imprimante</label>
              </div>
              <div>
                <input type="checkbox" defaultChecked={parseInt(this.state.newCaftiere, 10)} name="caftiere" value="caftiere" onChange={this.caftiereChange}/>
                <label>Caftière</label>
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
                <label>Micro-ondes</label>
              </div>
              <div>
                <input type="checkbox" defaultChecked={parseInt(this.state.newAscenseur, 10)} name="ascenseur" value="ascenseur" onChange={this.ascenseurChange}/>
                <label>Ascenseur</label>
              </div>
              <Button onClick={() => this.closeModifyService()} className="cancelButton">Annuler</Button>
              <Button onClick={() => this.saveModifyService()} className="saveButton">Sauvegarder</Button>
            </div>
          </div>
        )
      }
      if (this.state.infos.image === '' || this.state.modifyImage){
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
                  />
                </div>
                <div className="zoom">X2</div>
                <div className="clear"></div>
                <Button onClick={() => this.cancelImage()} className="cancelButton">
                  Annuler
                </Button>
                <Button onClick={this.handleSave} className="saveButton">
                  Sauvegarder
                </Button>
              </div>
          )
        }
      } else {
        optionsImage.push(
          <div>
            <img src={this.state.infos.image} alt={'votre bureau'}/>
            <div  onClick={() => this.openModifyImage()} className="modifyImage"><FontAwesome name="pencil"/>Modifier</div>
          </div>
          )
      }
      return (
        <div className="editBureau">
          <div className="imageSelector">
            <h3>Photo de votre bureau</h3>
            {optionsImage}
          </div>
          <div className="infosSelector">
          <h3>Détails de votre bureau</h3>
            {lieu}
            {batiment}
            {bureau}
            {etage}
            {collegues}
            {materiel}
            {service}
            <div className="ligneInfos">
              <div>Je souhaite recevoir des emails de confirmation</div>
              <div></div>
              <div>
                <label>
                  <Toggle
                    checked={this.state.mailStatus}
                    onChange={this.handleMailStatusChange} />
                </label>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div></div>
      )
    }
  }
}