import React from 'react';
import Nav from './Nav';
import { MemoryRouter as Router } from "react-router-dom";
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
const mockSubmitUserLogout = jest.fn();

const user = {"email": "franken_furter@gmail.com", "usePurpose": "vacation", "user": "Frank"}

 const renderNav = () => {
   return render(
  <Router>
    <Nav
    isLoggedIn={true}
    user={user}
    changeLoginStatus={mockSubmitUserLogout}
    favoriteCount={2}
    />
  </Router>
  )
}

describe('Nav', () => {
  it('should show a welcome message for the user upomn login', () => {
    const {getByText} = renderNav();

    expect(getByText('Welcome Back Frank!')).toBeInTheDocument();
    expect(getByText('Check out our listings for your vacation stay!')).toBeInTheDocument();
  });

  it('As a user if I click the "logout" button, I will be logged out', () => {
    const {getByText} = renderNav();

    const logoutButton = getByText('Sign Out');
    fireEvent.click(logoutButton)
    expect(mockSubmitUserLogout).toHaveBeenCalled();
  });

  it('As a user if I click the "See My 2 Favorites" button, I should see my favorites render', () => {
    const {getByText} = renderNav();

    expect(getByText('View My 2 Favorites!')).toBeInTheDocument();
  });
});
