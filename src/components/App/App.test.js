import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver
import React from 'react';
import { render, waitFor, getByText, fireEvent, getByPlaceholderText, cleanup } from '@testing-library/react';
import App from './App';
// import Nav from '../Nav/Nav';
// import Login from '../Login/Login';
import { BrowserRouter as Router } from "react-router-dom";
import { retrieveFavoritesData, getAreaData, fetchAllListingsData } from './apiCalls';
import '@testing-library/jest-dom';

// const mockSubmitUserInfo = jest.fn();
jest.mock('./apiCalls');

describe('App', () => {

let areaData, listingData, renderApp;

beforeEach(() => {

  areaData =
  [
    {area: "RiNo",
      details:{
        about: "RiNo is a burgeoning area with new bars, restaurants and event spaces popping up all the time. Explore this thriving area of Denver today!",
        id: 590,
        listings: ["/api/v1/listings/3", "/api/v1/listings/44", "/api/v1/listings/221", "/api/v1/listings/744", "/api/v1/listings/90", "/api/v1/listings/310"],
        location: "North of Downtown Denver",
        name: "River North",
        quick_search: "o5kod9f5cqo0",
        region_code: 6356834,
      }
    }
  ]

  listingData =
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
  };

  getAreaData.mockResolvedValue(areaData);
  fetchAllListingsData.mockResolvedValue(listingData);

  renderApp = render(
      <Router>
        <App />
      </Router>
    )

});

afterEach(cleanup);

  it ('The App should fetch the Area Data', async () => {
    const { getByText, getByPlaceholderText, getByTestId, debug} = renderApp
    await waitFor(() => {
      fireEvent.change(getByPlaceholderText('username'), {target: {value: 'Frank'}});
      fireEvent.change(getByPlaceholderText('email'), {target: {value: 'franken_furter@gmail.com'}});
      fireEvent.change(getByTestId('usePurpose'), {target: {value: 'vacation'}});
    });

    fireEvent.click(getByText('Submit'))

    const area = await waitFor(() => getByText("River North"))
    expect(area).toBeInTheDocument()
  });
});
