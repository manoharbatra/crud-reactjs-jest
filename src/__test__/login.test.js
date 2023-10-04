import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Swal from 'sweetalert2';
import Login from '../components/Login/Login';

// Mock the SweetAlert2 module since it's used within the Login component
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
}));

describe('Login Component', () => {
  it('logs in with correct admin credentials', () => {
    const setIsAuthenticated = jest.fn();
    const { getByLabelText, getByText } = render(
      <Login setIsAuthenticated={setIsAuthenticated} />
    );

    const emailInput = getByLabelText('Username / Email');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'admin' } });
    fireEvent.click(loginButton);

    // Expect setIsAuthenticated to be called with true
    expect(Swal.fire).toHaveBeenCalledWith({
        timer: 1500,
        showConfirmButton: false,
        willOpen: expect.any(Function),
        willClose: expect.any(Function),
      });
  
      // Simulate the success callback
      const successCallback = Swal.fire.mock.calls[0][0].willClose;
      successCallback();
  
      // Expect setIsAuthenticated to be called with true
      expect(setIsAuthenticated).toHaveBeenCalledWith(true);
    // });
  });

  it('displays an error message with incorrect credentials', () => {
    const setIsAuthenticated = jest.fn();
    
    const { getByLabelText, getByText } = render(
      <Login setIsAuthenticated={setIsAuthenticated} />
    );

    const emailInput = getByLabelText('Username / Email');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'incorrect' } });
    fireEvent.change(passwordInput, { target: { value: 'incorrect' } });
    fireEvent.click(loginButton);

    // Expect an error message to be displayed
    expect(Swal.fire).toHaveBeenCalledWith({
        timer: 1500,
        showConfirmButton: false,
        willOpen: expect.any(Function),
        willClose: expect.any(Function),
      });
  });
});
