import React, { Component } from 'react';
// import Image1 from '../../../public/Images/3_a.jpg';
// import VRADLogo from '../../assets/vrad_logo_v1.svg';

// import './Listings.css';

const Listings = (props) => {
  console.log('props in listing card', props);
  console.log('process.env.PUBLIC_URL', process.env.PUBLIC_URL);
  return (
    <div className='listings-card'>
      <img
      src={`${process.env.PUBLIC_URL}/Images/${props.id}_a.jpg`}
      className="listings-card-img"
      alt={props.name}
      />
      <h1>{props.name}</h1>
      <button>Show me the DEETS</button>
    </div>
  );
}

export default Listings;
