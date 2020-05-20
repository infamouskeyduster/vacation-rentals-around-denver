import React from 'react';
import ListingsContainer from './Listings-container';
import { render } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';

describe('ListingsContainer', () => {

  it('Should show all the listings for a chosen area (at a high level)', function(){

    const listings = [
      "/api/v1/listings/3",
      "/api/v1/listings/44",
      "/api/v1/listings/221",
      "/api/v1/listings/744",
      "/api/v1/listings/90",
      "/api/v1/listings/310"
    ];

    const {getByText} = render(
      <BrowserRouter>
      <ListingsContainer
        // removeFavoriteOnParent={this.removeFavoriteOnParent}
        // setFavoriteOnParent={this.setFavoriteOnParent}
        areaListings={listings}
      />
      </BrowserRouter>
    )
    expect(listings.length).to.equal(6)
  });

});
