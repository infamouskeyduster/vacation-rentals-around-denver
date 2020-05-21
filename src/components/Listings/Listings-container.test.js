import React from 'react';
import ListingsContainer from './Listings-container';
import { render } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';



describe('ListingsContainer', () => {

let listingData = [
  {
    listing_id: 3,
    area_id: 590,
    name: "Hip RiNo Party Spot",
    address: {
      street: "2250 Lawrence St",
      zip: "80205"
    },
    details: {
      neighborhood_id: 5124122,
      superhost: true,
      seller_source: "91jss1",
      beds: 3,
      baths: 2.5,
      cost_per_night: 420,
      features: [
        "hot tub",
        "espresso machine"
      ]
    },
    dev_id: "u4gh2j",
    area: "rino",
    db_connect: 834470
  }];

  const renderListingContainer = render(
      <BrowserRouter>
        <ListingsContainer areaListings={listingData} />
      </BrowserRouter>
    );

  it.skip('Should show all the listings for a chosen area (at a high level)', () => {
    const { getByText, debug } = renderListingContainer;
    debug()
    expect(getByText("Hip RiNo Party Spot")).toBeInTheDocument();
  });

});
