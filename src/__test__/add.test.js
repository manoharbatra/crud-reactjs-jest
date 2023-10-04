import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Add from '../components/Dashboard/Add';
import Swal from 'sweetalert2';

// Mock the SweetAlert2 module since it's used within the Add component
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('Add Component', () => {
  it('renders the form elements', () => {
    const { getByLabelText, getByText } = render(<Add />);
    const firstNameInput = getByLabelText('First Name');
    const lastNameInput = getByLabelText('Last Name');
    const emailInput = getByLabelText('Email');
    const phoneNoInput = getByLabelText('Phone No (+91)');
    const dateInput = getByLabelText('Date of Birth');
    const addButton = getByText('Add');
    const cancelButton = getByText('Cancel');

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneNoInput).toBeInTheDocument();
    expect(dateInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it('displays an error message when submitting the form with missing fields', () => {
    const { getByText } = render(<Add />);
    const addButton = getByText('Add');
    fireEvent.click(addButton);

    expect(Swal.fire).toHaveBeenCalledWith({
      icon: 'error',
      title: 'Error!',
      text: 'All fields are required.',
      showConfirmButton: true,
    });
  });

  it('displays an error message when submitting the form with an invalid phone number', () => {
    const { getByLabelText, getByText } = render(<Add />);
    const firstNameInput = getByLabelText('First Name');
    const lastNameInput = getByLabelText('Last Name');
    const emailInput = getByLabelText('Email');
    const phoneNoInput = getByLabelText('Phone No (+91)');
    const dateInput = getByLabelText('Date of Birth');
    const addButton = getByText('Add');

    fireEvent.change(firstNameInput, { target: { value: 'Manohar' } });
    fireEvent.change(lastNameInput, { target: { value: 'Batra' } });
    fireEvent.change(emailInput, { target: { value: 'mbatra@example.com' } });
    fireEvent.change(phoneNoInput, { target: { value: '9234567890' } });
    fireEvent.change(dateInput, { target: { value: '1990-01-01' } });

    fireEvent.click(addButton);

    expect(Swal.fire).toHaveBeenCalledWith({
      icon: 'error',
      title: 'Error!',
      text: 'Phone number must be 10 digits and start with 8 or 9.',
      showConfirmButton: true,
    });
  });
});
