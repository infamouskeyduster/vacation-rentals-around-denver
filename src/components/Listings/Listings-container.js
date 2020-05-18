import React, { Component } from 'react';
import Listings from './Listings';

class ListingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listingsInfo: [],
    }
    // console.log('props in ListingsContainer', this.props);
    // this.listingInfo();
  }

  iterateOverListingInfo =  () => {
    const listingData =  this.props.areaListings.map( listing => {
      let result =  this.fetchAllListingsData(listing);
      return result;
    })

    //console.log('listingData', listingData);
    return listingData;
  }

  fetchAllListingsData = async (listing) => {
      // console.log('fetch URL', `'https://vrad-api.herokuapp.com${listing}'`);
      let allResponses = [];
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
    }
    console.log('state', this.state)
    return(
      <section>
      <h1>{this.state.test}</h1>
      <Listings  listings={this.state.listingsInfo}/>
      </section>
    );
  }
}

 export default ListingsContainer
