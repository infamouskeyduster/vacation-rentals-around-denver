import React from 'react';
import Nav from './Nav';
import { BrowserRouter } from "react-router-dom";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Nav', () => {
  it('should show a welcome message for the user', () => {
    let user = {
        user:'Frank',
        usePurpose:'Business'
    }
    const {getByText} = render(
      <BrowserRouter>
        <Nav
          user={user}
          usePurpose='Business'
          isLoggedIn= {true}
        />
      </BrowserRouter>
    )

    expect(getByText('Welcome Back Frank!')).toBeInTheDocument();
  });
});
