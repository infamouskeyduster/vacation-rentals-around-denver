import React from 'react';
import Login from './Login';
import { MemoryRouter as Router } from "react-router-dom";
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const mockSubmitUserInfo = jest.fn();

const renderLogin = () => {
   return render(
    <Router>
      <Login
      setUserInfoOnParent={mockSubmitUserInfo} />
    </Router>
  )
}

describe('Login', () => {
  it.only('As a user, if I fill out the form incorrectly the "submit" button is disabled', () => {
    const { getByPlaceholderText, getByText, getByTestId } = renderLogin();
    const submitButton = getByText('Submit');
    fireEvent.change(getByPlaceholderText('username'), {target: {value: 'Frank'}});
    fireEvent.change(getByTestId('usePurpose'), {target: {value: 'vacation'}});
    fireEvent.click(submitButton);

    expect(mockSubmitUserInfo).not.toHaveBeenCalled();
    expect(submitButton).toHaveAttribute('disabled');
  });

  it('submits the correct user info', () => {
    const { getByPlaceholderText, getByText, getByTestId } = renderLogin();

    fireEvent.change(getByPlaceholderText('username'), {target: {value: 'Frank'}});
    fireEvent.change(getByPlaceholderText('email'), {target: {value: 'franken_furter@gmail.com'}});
    fireEvent.change(getByTestId('usePurpose'), {target: {value: 'vacation'}});
    fireEvent.click(getByText('Submit'))

    expect(mockSubmitUserInfo).toHaveBeenCalled();
    expect(mockSubmitUserInfo).toHaveBeenCalledWith({"email": "franken_furter@gmail.com", "usePurpose": "vacation", "user": "Frank"});
  });
});
