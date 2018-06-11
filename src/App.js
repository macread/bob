import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to 15-10-2</h1>
        </header>
          <p>User Name:</p>
          <input type='' className=''/>
          <p>Password</p>
          <input type='' className=''/>
          <p>Login With Google</p>
          <p>Login With Facebook</p>
      </div>
    );
  }
}

export default App;
