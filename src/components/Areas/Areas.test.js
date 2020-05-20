import React from 'react';
import Areas from './Areas';
import { render } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';

describe('Areas', () => {
  it('should display the short name, long name and description of the 4 areas', () => {

    const {getByText} = render(
      <BrowserRouter>
        <Areas
          shortName='LoHi'
          longName='Lower Highlands'
          description='LoHi bordered by 38th Ave, I-25, Zuni Street St and Speer.'
        />
      </BrowserRouter>
    )

    expect(getByText('LoHi')).toBeInTheDocument();
    expect(getByText('Lower Highlands')).toBeInTheDocument();
    expect(getByText('LoHi bordered by 38th Ave, I-25, Zuni Street St and Speer.')).toBeInTheDocument();
  });
});
