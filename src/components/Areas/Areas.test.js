import React from 'react';
import Areas from './Areas';
import { render } from '@testing-library/react';
import { MemoryRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';

describe('Areas', () => {
let area
  beforeEach(() => {
    area = {
      area: "RiNo",
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
  })

  it('should display the short name, long name and description of the area it is given data for', () => {

    const {getByText} = render(
      <Router>
        <Areas
          key={area.details.id}
          id={area.details.id}
          shortName={area.area}
          longName={area.details.name}
          description={area.details.about}
        />
      </Router>
    )

    expect(getByText('RiNo')).toBeInTheDocument();
    expect(getByText('River North')).toBeInTheDocument();
    expect(getByText('RiNo is a burgeoning area with new bars, restaurants and event spaces popping up all the time. Explore this thriving area of Denver today!')).toBeInTheDocument();
  });
});
