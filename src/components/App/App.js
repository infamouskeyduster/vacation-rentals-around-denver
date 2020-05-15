import React, { Component } from 'react';
import './App.css';
import Login from '../Login/Login';
import Nav from '../Nav.js'
import AreasContainer from '../Areas/AreasContainer.js'
import {
  BrowserRouter, Route, Switch
} from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      areas: [],
      isLoggedIn: false
    };
  }
  
  setUserInfoOnParent = (user) => {
  this.setState({user})
  };

  fetchAreas = async () => {
    const response = await fetch('https://vrad-api.herokuapp.com/api/v1/areas')
    const data = await response.json()
  
    const areaInfo = data.areas.map(async areaData => {
          return {
            area: areaData.area,
            details: await this.fetchDetails(areaData.details)
            
          }
      })
    Promise.all(areaInfo)
    .then(areaInfo => this.setState({areas: areaInfo}))
  }
  // fetch(`https://vrad-api.herokuapp.com${area.details}`)

  fetchDetails = async (details) => {
    const response = await fetch(`https://vrad-api.herokuapp.com${details}`)
    const data = await response.json()
    return await data
  }

  componentDidMount() {
     this.fetchAreas()
  }

  changeLoginStatus = () => {
    console.log(this.state)
    this.setState({isLoggedIn: (!this.state.isLoggedIn)})
  }

  render() {
    return (
      <main className="App">
      <Nav 
        isLoggedIn={this.state.isLoggedIn} 
        user={this.state.user}
        changeLoginStatus={this.changeLoginStatus}
      />
        <Switch>
          <Route exact path="/" render={() => 
          <Login
            changeLoginStatus={this.changeLoginStatus}
            setUserInfoOnParent={this.setUserInfoOnParent}
          />} />
          <Route path="/areas" render={() => <AreasContainer areaData={this.state.areas} name={this.state.user.user}/>} />
        </Switch>
      </main>
    );
  }

  
}

export default App;
