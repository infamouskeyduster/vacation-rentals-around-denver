import React from 'react';
import { render, waitFor } from '@testing-library/react';
import App from './App';
import Nav from '../Nav/Nav';
import { MemoryRouter as Router } from "react-router-dom";
import { retrieveFavoritesData, getAreaData} from './apiCalls';
import '@testing-library/jest-dom';

const renderApp = () => {
  return render(
    <Router>
      <App />
    </Router>
  )
}

describe('App', function(){
  it.skip('When a user logs into the App they are able to see their name and purpose for visit…', () => {
    const { getByPlaceholderText, getByText, getByTestId } = renderLogin();
    const submitButton = getByText('Submit');
    fireEvent.change(getByPlaceholderText('username'), {target: {value: 'Frank'}});
    fireEvent.change(getByTestId('usePurpose'), {target: {value: 'vacation'}});
    fireEvent.click(submitButton);

    expect(mockSubmitUserInfo).not.toHaveBeenCalled();
    expect(submitButton).toHaveAttribute('disabled');
  });

  it('As a user if I click the "See My 0 Favorites" button, I should see an error message that I don\'t have any favs', () => {

  });

  it('As a user if I add favorites, I should see the number of favs refelected in the button', () => {

  });

  //TESTS:
  //getting the info that we expect
  //more async stuff

});
