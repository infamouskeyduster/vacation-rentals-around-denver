import React, { Component } from 'react';
import Listings from './Listings';
import ListingDetails from './ListingDetails';
import './Listings-container.css';
import { fetchAllListingsData } from '../App/apiCalls';

class ListingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listingsInfo: [],
      foundSingleListing: [],
      favorites: {}
    }
  }

  iterateOverListingInfo =  () => {
    console.log(this.props);
    const listingData =  this.props.areaListings.map( listing => {
      let result = fetchAllListingsData(listing);
      return result;
    })

    return listingData;
  }

 findSingleListingById = (id) => {
    const foundSingleListingById = this.state.listingsInfo.find(listing => listing.listing_id === id);
    this.setState({foundSingleListing: [foundSingleListingById]})

    return foundSingleListingById;
  }

  toggleFavorite = (id, isFavorite) => {
    isFavorite = !isFavorite;
    if(!isFavorite){
      this.removeListingFromFavorites(id);
      return;
    }

    this.addListingToFavorite(id);
  }

  addListingToFavorite = (id) => {
    const foundListingById = this.findSingleListingById(id);
    let favorites = this.state.favorites;
    favorites[foundListingById.listing_id] = true;
    this.setState({favorites});
    this.props.setFavoriteOnParent(this.state.favorites)
  }

  removeListingFromFavorites = (id) => {
    let favorites = this.state.favorites;
    delete favorites[id];
    this.setState({favorites});
    this.props.removeFavoriteOnParent(id)
  }

  componentDidMount() {
    let allPromises = this.iterateOverListingInfo();
    Promise.all(allPromises).then(allPromises => {this.setState({listingsInfo: allPromises})})
  }

  render() {
    if (this.state.listingsInfo.length === 0) {
      return null;
    } else if (this.state.foundSingleListing.length === 1) {
      return (
        <ListingDetails
        listing={this.state.foundSingleListing[0]}
        toggleFavorite={this.toggleFavorite}
        isFavorite={this.state.favorites[this.state.foundSingleListing[0].listing_id] === true}
        />
      )
    } else if (this.state.listingsInfo.length > 0) {
      const listings = this.state.listingsInfo.map(listing => {
        return(
          <Listings
            key={listing.listing_id}
            id={listing.listing_id}
            name={listing.name}
            areaId={listing.area_id}
            findSingleListingById={this.findSingleListingById}
          />
        );
      })

    return(
        <section className="listings-container">
          {listings}
        </section>
        );
    }
  }
}

 export default ListingsContainer
