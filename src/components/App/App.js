import React, { Component } from 'react';
import './App.css';
import Login from '../Login/Login';
import Nav from '../Nav/Nav.js';
import AreasContainer from '../Areas/AreasContainer.js';
import ListingsContainer from '../Listings/Listings-container.js';
import FavoritesContainer from './Favorites/FavoritesContainer';
import VRADLogo from '../../assets/vrad_logo_v1_outline.svg';
import VRADLogoType from '../../assets/VRAD_logo_type_outline.svg';
import {
  BrowserRouter, Route, Switch, Redirect, Link
} from "react-router-dom";


class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      areas: [],
      isLoggedIn: false,
      favorites: {}
    };
  }
  
  setFavoriteOnParent = (favoritesFromListingsContainer) => {
    this.setState({favorites: {...this.state.favorites, ...favoritesFromListingsContainer}}, () => console.log(this.state.favorites))
  }

  removeFavoriteOnParent = (id) => {
    let favorites = this.state.favorites;
    delete favorites[id]
    console.log(this.state.favorites)
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

    this.setState({isLoggedIn: (!this.state.isLoggedIn)})
  }

  countFavorites = () => {
    const favoriteKeys = Object.keys(this.state.favorites)
    return favoriteKeys.length
  }

  render() {
    
    return (
      <main className="App">
        <div className="logo-container">
            <img 
            className="logo" 
            src={VRADLogo} 
            alt="VRAD-logo"
            />
            <img className="logo-type" src={VRADLogoType} alt="VRAD-logo-type" />
          <Nav
            isLoggedIn={this.state.isLoggedIn}
            user={this.state.user}
            changeLoginStatus={this.changeLoginStatus}
            numberOfFavorites={this.countFavorites}
          />
        </div>
        <Switch>

          <Route exact path="/" render={() =>
          <Login
            changeLoginStatus={this.changeLoginStatus}
            setUserInfoOnParent={this.setUserInfoOnParent}
          />} />
          {!this.state.isLoggedIn && <Redirect to="/" />}

          {/* <Route 
              path="/areas/:area_id/listings/:listing_id"
              render={({match}) => {
              return(
              <ListingsContainer />
              )
              }} /> */}

              <Route 
                path="/favorites"

                render={() => {
                  return (
                  <FavoritesContainer  favorites={this.state.favorites} 
                  removeFavoriteOnParent={this.removeFavoriteOnParent}
                  />
                  )
                }}
              />
          <Route
              path="/areas/:area_id/listings"
              render={({ match }) => {
                // How can you get the :id from the url?
                //now that we have the id, we can search our posts in state using
                //this console logged id above
                const foundAreaListing = this.state.areas.find(area => (area.details.id === parseInt(match.params.area_id)));
                // const postToRender = this.state.posts.find(
                //   post => post.id === parseInt(match.params.id)
                // );
                return (
                  <ListingsContainer 
                  removeFavoriteOnParent={this.removeFavoriteOnParent}
                  setFavoriteOnParent={this.setFavoriteOnParent} areaListings={foundAreaListing.details.listings}/>
                );
              }}/>

              <Route exactpath="/areas" render={() =>
                <AreasContainer areaData={this.state.areas}
                name={this.state.user.user}
                />}/>

        </Switch>
      </main>
    );
  }


}

export default App;
