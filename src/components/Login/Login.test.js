import React from 'react';
import Login from './Login';
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


describe('Login', () => {
  it('submits the correct user info', () => {
    const mockSubmitUserInfo = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <BrowserRouter>
        <Login
        setUserInfoOnParent={mockSubmitUserInfo} />
      </BrowserRouter>
    )

    fireEvent.change(getByPlaceholderText('username'), {target: {value: 'Frank'}});

    fireEvent.change(getByPlaceholderText('email'), {target: {value: 'franken_furter@gmail.com'}});
  });
});
