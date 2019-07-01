import React from 'react';
import './App.css';
import logo from './giphy.gif';
import TextInput from './TextInput';

class App extends React.Component {
  state={
    messages:[]
  }

  sendMessage = (m) => {
    var messages = [...this.state.messages, m]
    this.setState({messages})
  }

  render() {
    console.log(this.state.messages)
    return (
      <div className="App">
        <header className="header">
          <img src={logo} class="logo" alt="logo" />
          OurChat
      </header>
        <TextInput sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default App;
