import React, { Component } from 'react';
import './App.css';
import Login from '../Login/Login';
import Nav from '../Nav/Nav.js';
import AreasContainer from '../Areas/AreasContainer.js';
import ListingsContainer from '../Listings/Listings-container.js';
import FavoritesContainer from './Favorites/FavoritesContainer';
import VRADLogo from '../../assets/vrad_logo_v1_outline.svg';
import VRADLogoType from '../../assets/VRAD_logo_type_outline.svg';
import { Route, Switch, Redirect } from "react-router-dom";
import { getAreaData } from './apiCalls';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      areas: [],
      isLoggedIn: false,
      favorites: {},
      favoriteCount: 0
    };
  }

  setFavoriteOnParent = (favoritesFromListingsContainer) => {
    this.setState({favorites: {...this.state.favorites, ...favoritesFromListingsContainer}})
    this.setState({favoriteCount: this.state.favoriteCount + 1})
  }

  removeFavoriteOnParent = (id) => {
    let favorites = this.state.favorites;
    delete favorites[id]
    this.setState({favoriteCount: this.state.favoriteCount - 1})
  }

  setUserInfoOnParent = (user) => {
  this.setState({user})
  };

  fetchAreas = async () => {
    //getAreaData being imported from apiCalls file
    const areaInfo = await getAreaData();
    Promise.all(areaInfo)
    .then(areaInfo => this.setState({areas: areaInfo}))
  }

  componentDidMount() {
    this.fetchAreas();
  }

  changeLoginStatus = () => {
    this.setState({isLoggedIn: (!this.state.isLoggedIn)})
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
            favoriteCount={this.state.favoriteCount}
          />
        </div>
        <Switch>

          <Route exact path="/" render={() =>
          <Login
            changeLoginStatus={this.changeLoginStatus}
            setUserInfoOnParent={this.setUserInfoOnParent}
          />
          }
          />
          {!this.state.isLoggedIn && <Redirect to="/" />}
              <Route
                path="/favorites"
                render={() => {
                  return (
                  <FavoritesContainer
                    favorites={this.state.favorites}
                    removeFavoriteOnParent={this.removeFavoriteOnParent}
                  />
                  )
                }}
              />
          <Route
              path="/areas/:area_id/listings"
              render={({ match }) => {
                const foundAreaListing = this.state.areas.find(area => (area.details.id === parseInt(match.params.area_id)));
                console.log('areaListings being fed to listings container', foundAreaListing.details.listings)
                return (
                  <ListingsContainer
                    removeFavoriteOnParent={this.removeFavoriteOnParent}
                    setFavoriteOnParent={this.setFavoriteOnParent}
                    areaListings={foundAreaListing.details.listings}
                  />
                );
              }}/>

              <Route exactpath="/areas" render={() =>
                <AreasContainer
                  areaData={this.state.areas}
                  name={this.state.user.user}
                />
              }/>

        </Switch>
      </main>
    );
  }


}

export default App;
