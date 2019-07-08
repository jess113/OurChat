import React from 'react';
import './App.css';
import logomark from './giphy.gif';
import TextInput from './TextInput';
import NamePicker from './NamePicker';
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
//import { FiChevronUp } from "react-icons/fi";

class App extends React.Component {
  
  state={
    messages:[],
    name:'',
    editName: false,
  }
  
  componentWillMount(){
    var name =localStorage.getItem('name')
    if(name){
      this.setState({name})
    }
    firebase.initializeApp({
      apiKey: "AIzaSyBAJVwrP5J4AhVKd5ijYtcTF9XMV6tIcY4",
      authDomain: "msgr-2.firebaseapp.com",
      projectId: "msgr-2",
      storageBucket: "msgr-2.appspot.com",
    });
    this.db = firebase.firestore();
    this.db.collection("messages").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          //console.log(change.doc.data())
          this.receive(change.doc.data())
        }
      })
    })
  }

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

  render() {
    var {messages, name, editName} = this.state
    //console.log(messages)
    return (
      <div className="App">
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
            return (<div key={i} className="bubble-wrap" from={m.from===name ? "me" : "you"}>  
              {m.from!==name && <div className="bubble-name">
                {m.from}
              </div>}
              <div className="bubble">
                <span>{m.text}</span>
              </div>
            </div>)
          })}
        </main>
        <TextInput sendMessage={text=> this.send({text})} />
      </div>
    );
  }
}

export default App;
