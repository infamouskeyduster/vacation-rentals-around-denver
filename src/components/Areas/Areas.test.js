import React from 'react';
import Areas from './Areas';
import { render } from '@testing-library/react';
import { MemoryRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';

describe('Areas', () => {
  it('should display the short name, long name and description of the area it is given data for', () => {

    const {getByText} = render(
      <Router>
        <Areas
          key={2}
          id={2}
          shortName='LoHi'
          longName='Lower Highlands'
          description='LoHi bordered by 38th Ave, I-25, Zuni Street St and Speer.'
        />
      </Router>
    )

    expect(getByText('LoHi')).toBeInTheDocument();
    expect(getByText('Lower Highlands')).toBeInTheDocument();
    expect(getByText('LoHi bordered by 38th Ave, I-25, Zuni Street St and Speer.')).toBeInTheDocument();
  });
});
