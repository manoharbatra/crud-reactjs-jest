import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Header from '../Dashboard/Header';

// Mock the Logout component since it's used within the Header
jest.mock('../Logout', () => ({ setIsAuthenticated }) => (
  <button onClick={() => setIsAuthenticated(false)}>Logout</button>
));

describe('Header Component', () => {
  it('renders the header text', () => {
    const { getByText } = render(<Header />);
    const headerText = getByText('Team Information');
    expect(headerText).toBeInTheDocument();
  });

  it('calls setIsAdding when "Add Employee" button is clicked', () => {
    const setIsAdding = jest.fn();
    const { getByText } = render(<Header setIsAdding={setIsAdding} />);
    const addButton = getByText('Add Employee');
    fireEvent.click(addButton);
    expect(setIsAdding).toHaveBeenCalledWith(true);
  });

  it('calls setIsAuthenticated when "Logout" button is clicked', () => {
    const setIsAuthenticated = jest.fn();
    const { getByText } = render(<Header setIsAuthenticated={setIsAuthenticated} />);
    const logoutButton = getByText('Logout');
    fireEvent.click(logoutButton);
    expect(setIsAuthenticated).toHaveBeenCalledWith(false);
  });
});
