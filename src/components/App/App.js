import React, { Component } from 'react';
import './App.css';
import Login from '../Login/Login';
import Areas from '../Areas/Areas.js';
import {
  BrowserRouter, Route, Switch
} from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      usePurpose: '',
    };
  }

  render() {
    return (
      <main className="App">
        <Switch>
          <Route exact path="/" render={() => 
          <Login
            usePurpose={this.state.usePurpose}
            email={this.state.email} 
            username={this.state.username} 
          />} />
          <Route path="/areas" render={() => <Areas />} />
        </Switch>
      </main>
    );
  }
}

export default App;
