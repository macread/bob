import React, { Component } from 'react';
import './App.css';
import route from './routes';

import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline /> 
        {route}
      </div>
    );
  }
}

export default App;
