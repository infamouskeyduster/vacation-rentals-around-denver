import React, { Component } from 'react';
import Listings from './Listings';
import ListingDetails from './ListingDetails';
import './Listings-container.css';

class ListingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listingsInfo: [] || props.favorites,
      foundSingleListing: [],
      favorites: {}
    }
  }

  iterateOverListingInfo =  () => {
    const listingData =  this.props.areaListings.map( listing => {
      let result =  this.fetchAllListingsData(listing);
      return result;
    })

    return listingData;
  }

  fetchAllListingsData = async (listing) => {
    const response = await fetch(`https://vrad-api.herokuapp.com${listing}`)
    const data = await response.json();

    return data;
  }

 findSingleListingById = (id) => {
    const foundSingleListingById = this.state.listingsInfo.find(listing => listing.listing_id === id);
     this.setState({foundSingleListing: [foundSingleListingById]})

     return foundSingleListingById;
  }

  addListingToFavorite = (id, isFavorite) => {
    if(!isFavorite){
      this.removeListingFromFavorites(id);
      return;
    }
    const foundListingById = this.findSingleListingById(id);
    let favorites = this.state.favorites;
    favorites[foundListingById.listing_id] = true;
    this.setState({favorites});
    this.props.setFavoriteOnParent(this.state.favorites)

  }

  toggleFavorite(isFavorite){
    
  }

  removeListingFromFavorites = (id) => {
    const foundListingById = this.findSingleListingById(id);
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
        addListingToFavorite={this.addListingToFavorite}
        removeListingFromFavorites={this.removeListingFromFavorites}
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
