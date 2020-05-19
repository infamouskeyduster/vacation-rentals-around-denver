import React, { Component } from 'react';
import {Link} from "react-router-dom";


const Listing = ({listing, addListingToFavorite, removeListingFromFavorites, isFavorite}) => {
  const listingFeatures = listing.details.features.map((feature, i) => {
    return <p key={i}>{feature}</p>
  })

  return(
    <div className="listings-container">
      <div className="listing-detail-card">
        <h1>{listing.name}</h1>
        <hr></hr>
        <ul>
          <li>Address:</li>
            <p>{listing.address.street}, {listing.address.zip}</p>
          <li>Number of Bedrooms: {listing.details.beds}</li>
          <li>Number of Bathrooms: {listing.details.baths}</li>
          <li>Cost Per Night: ${listing.details.cost_per_night}</li>
          <li>Features: </li>
            {listingFeatures}
        </ul>
        <button onClick={() => {addListingToFavorite(listing.listing_id, !isFavorite)}}>{isFavorite ? 'Unfavorite' : 'Favorite'}</button>
      </div>
      <div className="images-container">
        <img className="listing-detail-images" src={`${process.env.PUBLIC_URL}/Images/${listing.listing_id}_a.jpg`} />
        <img className="listing-detail-images" src={`${process.env.PUBLIC_URL}/Images/${listing.listing_id}_b.jpg`} />
        <img className="listing-detail-images" src={`${process.env.PUBLIC_URL}/Images/${listing.listing_id}_c.jpg`} />
      </div>
    </div>
  )
}

// listing: Array(1)
// 0: {listing_id: 3, area_id: 590, name: "Hip RiNo Party Spot", address: {street: "2250 Lawrence St", zip: "80205"}, details: {neighborhood_id: 5124122, superhost: true, seller_source: "91jss1", beds: 3, baths: 2.5, features: (2) ["hot tub", "espresso machine"], neighborhood_id: 5124122, seller_source: "91jss1", superhost: true}, …}


// Address - props.address
// Number of Bedrooms - props.details.
// Number of Bathrooms - props.details.
// Cost per Night
// All pictures of the listing
// Unique features of the listing
// A button to “Favorite” the listing

{/* <Link to={`/areas/${listing.area_id}/listings`}>
        <button>Go Back to All Listings</button>
        </Link> */}

export default Listing;