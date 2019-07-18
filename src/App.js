import React from 'react';
import './App.css';
import logomark from './giphy.gif';
import TextInput from './TextInput';
import NamePicker from './NamePicker';
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import Camera from 'react-snap-pic';
import Div100vh from 'react-div-100vh'
//import { FiChevronUp } from "react-icons/fi";

class App extends React.Component {
  
  state={
    messages:[],
    name:'',
    editName: false,
    showCamera:false,
  }
  
  componentWillMount(){
    var name =localStorage.getItem('name')
    if(name){
      this.setState({name})
    }
    firebase.initializeApp({
      apiKey: "AIzaSyAmXtr1nXNQzvpiyeJ9Niq021I00D14aDw",
      authDomain: "ourchat-hcde.firebaseapp.com",
      projectId: "ourchat-hcde",
      storageBucket: "ourchat-hcde.appspot.com",
    });
    this.db = firebase.firestore();
    this.db.collection("messages").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          //console.log(change.doc.data())
          this.receive({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
        if (change.type==='removed'){
          this.remove(change.doc.id)
        }
      })
    })
  } // end componentWillMount

  receive = (m) => {
    const messages = [m, ...this.state.messages]
    messages.sort((a,b)=>b.ts-a.ts)
    this.setState({messages})
  }

  send = (m) => {
    this.db.collection("messages").add({
      ...m,
      from: this.state.name || 'No name',
      ts: Date.now()
    })
  }

  gotMessage = (text) => {
    var message = {
      text,
      from: this.state.name
    }
    var newMessagesArray = [message, ...this.state.messages]
    this.setState({messages: newMessagesArray})
  }

  setEditName = (editName) => {
    if(!editName){
      localStorage.setItem('name', this.state.name)
    }
      this.setState({editName})
  }

  takePicture = async (img) => {
    this.setState({showCamera:false})
    const imgID = Math.random().toString(36).substring(7);
    var storageRef = firebase.storage().ref();
    var ref = storageRef.child(imgID+'.jpg');
    await ref.putString(img, 'data_url')
    this.send({img: imgID})
  }

  remove = (id) => {
    var msgs = [...this.state.messages]
    var messages = msgs.filter(m=> m.id!==id)
    this.setState({messages})
  }

  deleteMessage = (m) => {
    var {name} = this.state
    if (name===m.from || name=== 'Jesse') {
      this.db.collection('messages').doc(m.id).delete()
    }
  }

  render() {
    var {messages, name, editName} = this.state
    //console.log(messages)
    return (
      <Div100vh className="App">
        <header className="header">
          <div className="combination-mark">
            <img src={logomark} class="logomark" alt="logomark" />
            OurChat
          </div>
          <NamePicker name={name}
            editName={editName}
            changeName={newName=> this.setState({name: newName})}
            setEditName={this.setEditName}
          />
        </header>
        <main className="messages">
          {messages.map((m,i)=>{
            return (<Message key={i} m={m} name={name}
              onClick={()=> this.deleteMessage(m)}
            />)
          })}
        </main>
        <TextInput sendMessage={text=> this.send({text})} 
          showCamera={()=> this.setState({showCamera: true})}/>
        {this.state.showCamera && <Camera takePicture={this.takePicture} />}
      </Div100vh>
    );
  }
}

export default App;

const bucket = 'https://firebasestorage.googleapis.com/v0/b/ourchat-hcde.appspot.com/o/'
const suffix = '.jpg?alt=media'
function Message(props) {
  var {m, name, onClick} = props
  return (<div className="bubble-wrap"
    from={m.from===name ? "me" : "you"}
    onClick={onClick}
  >  
  {m.from!==name && <div className="bubble-name">
    {m.from}
  </div>}
  <div className="bubble">
    <span>{m.text}</span>
    {m.img && <img alt="pic" src={bucket+m.img+suffix} />}
  </div>
</div>)
}