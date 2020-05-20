import React from 'react';

const Listing = ({listing, toggleFavorite, isFavorite}) => {
  const listingFeatures = listing.details.features.map((feature, i) => {
    return <p key={i}>{`❤︎  ${feature}`}</p>
  })

  return(
    <div className="listings-container">
      <div className="listing-detail-card">
        <h1>{listing.name}</h1>
        <hr></hr>
        <ul>
          <li>Address:</li>
            <p>{listing.address.street}, {listing.address.zip}</p>
          <li>Bedrooms:</li>
            <p>{listing.details.beds}</p>
          <li>Bathrooms:</li>
            <p>{listing.details.baths}</p>
          <li>Cost Per Night:</li>
            <p>${listing.details.cost_per_night}</p>
          <li>Features: </li>
            {listingFeatures}
        </ul>
        <button onClick={() => {toggleFavorite(listing.listing_id, isFavorite)}}>
        {isFavorite ? 'Unfavorite' : 'Favorite'}</button>
      </div>
      <div className="images-container">
        <img alt={`${listing.name}`} className="listing-detail-images" src={`${process.env.PUBLIC_URL}/Images/${listing.listing_id}_a.jpg`} />
        <img alt={`${listing.name}`} className="listing-detail-images" src={`${process.env.PUBLIC_URL}/Images/${listing.listing_id}_b.jpg`} />
        <img alt={`${listing.name}`} className="listing-detail-images" src={`${process.env.PUBLIC_URL}/Images/${listing.listing_id}_c.jpg`} />
      </div>
    </div>
  )
}


export default Listing;
