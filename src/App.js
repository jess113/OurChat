import React from 'react';
import './App.css';
import logomark from './giphy.gif';
import TextInput from './TextInput';
import NamePicker from './NamePicker';
//import { FiChevronUp } from "react-icons/fi";

class App extends React.Component {
  
  state={
    messages:[],
    name:'',
    editName: false,
  }

  gotName = (name) => {
    var newName = name
    this.setState({name: newName})
  }

  gotMessage = (text) => {
    var newMessages = [...this.state.messages, text]
    this.setState({messages: newMessages})
  }

  render() {
    var {messages} = this.state
    //console.log(messages)
    return (
      <div className="App">
        <header className="header">
          <div className="combination-mark">
            <img src={logomark} class="logomark" alt="logomark" />
            OurChat
          </div>
          <NamePicker name={this.state.name}
            editName={this.state.editName}
            changeName={this.gotName}
            setEditName={()=> this.setState({editName: !this.state.editName})}
          />
        </header>
        <main className="messages">
          {messages.map((m,i)=>{
            return (<div key={i} className="bubble-wrap">
              <div className="message">
                <span className="sender-name">{this.state.name}</span>
                <div className="bubble">
                  <span>{m}</span>
                </div>
              </div>
            </div>)
          })}
        </main>
        <TextInput sendMessage={this.gotMessage} />
      </div>
    );
  }
}

export default App;
