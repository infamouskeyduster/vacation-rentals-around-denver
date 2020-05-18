import React, { Component } from 'react';
import Listings from './Listings';
import './Listings-container.css';

class ListingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listingsInfo: [],
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

  componentDidMount() {
    let allPromises = this.iterateOverListingInfo();
    Promise.all(allPromises).then(allPromises => {this.setState({listingsInfo: allPromises})})
  }

  render() {
    if (this.state.listingsInfo.length === 0) {
      return null;
    } else {

      const listings = this.state.listingsInfo.map(listing => {
        return(
          <Listings
            key={listing.listing_id}
            id={listing.listing_id}
            name={listing.name}
          />
        );
      })

      console.log('state', this.state);
        return(
            <section className="listings-container">
              {listings}
            </section>
        );

    }
  }
}

 export default ListingsContainer
