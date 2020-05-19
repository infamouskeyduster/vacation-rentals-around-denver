import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ListingDetails from './ListingDetails';

// import './Listings.css';


const Listings = (props, event) => {
  return (
    <div className='listings-card'>
      <img
      src={`${process.env.PUBLIC_URL}/Images/${props.id}_a.jpg`}
      className="listings-card-img"
      alt={props.name}
      />
      <h1>{props.name}</h1>
      <Link to={`/areas/${props.areaId}/listings/${props.id}`}>
        <button onClick={() => {props.findSingleListingById(props.id)}}>Show me the DEETS</button>
      </Link>
    </div>
  );
}

//  "listing_id": 8,\
// /areas/${area's id }/listings/${listing id}

{/* <Link to={`/areas/${areaID}/listings`}>
              <button>View Listings</button>
            </Link> */}

export default Listings;
