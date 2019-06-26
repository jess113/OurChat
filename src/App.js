import React from 'react';
import './App.css';
import logo from './RedStar.png';
import TextInput from './TextInput';

function App() {
  return (
    <div className="App">
      <header className="header">
        <img src={logo} class="logo" alt="logo" />
        OurChat
      </header>
      <TextInput />
    </div>
  );
}

export default App;
