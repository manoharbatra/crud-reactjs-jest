import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Edit from '../components/Dashboard/Edit';
import Swal from 'sweetalert2';

// Mock the SweetAlert2 module since it's used within the Edit component
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const mockEmployees = [
  {
    id: 1,
    firstName: 'Manohar',
    lastName: 'Batra',
    email: 'mbatra@example.com',
    phoneNo: '9876543210',
    date: '1990-01-01',
  },
  {
    id: 2,
    firstName: 'Mani',
    lastName: 'Batra',
    email: 'mani@example.com',
    phoneNo: '8765432109',
    date: '1995-05-15',
  },
];

const mockSelectedEmployee = {
  id: 1,
  firstName: 'Manohar',
  lastName: 'Batra',
  email: 'mbatra@example.com',
  phoneNo: '9876543210',
  date: '1990-01-01',
};

describe('Edit Component', () => {
  it('renders the form with pre-filled data', () => {
    const { getByLabelText, getByText } = render(
      <Edit
        employees={mockEmployees}
        selectedEmployee={mockSelectedEmployee}
        setEmployees={jest.fn()}
        setIsEditing={jest.fn()}
      />
    );
    const firstNameInput = getByLabelText('First Name');
    const lastNameInput = getByLabelText('Last Name');
    const emailInput = getByLabelText('Email');
    const phoneNoInput = getByLabelText('Phone No');
    const dateInput = getByLabelText('Date of Birth');
    const updateButton = getByText('Update');
    const cancelButton = getByText('Cancel');

    expect(firstNameInput).toHaveValue('Manohar');
    expect(lastNameInput).toHaveValue('Batra');
    expect(emailInput).toHaveValue('mbatra@example.com');
    expect(phoneNoInput).toHaveValue(9876543210);
    expect(dateInput).toHaveValue('1990-01-01');
    expect(updateButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it('displays an error message when submitting the form with missing fields', () => {

    const mockSelectedEmployee = {
        id: 1,
        firstName: '',
        lastName: 'Batra',
        email: 'mbatra@example.com',
        phoneNo: '9876543210',
        date: '1990-01-01',
    };

    const { getByText } = render(
      <Edit
        employees={mockEmployees}
        selectedEmployee={mockSelectedEmployee}
        setEmployees={jest.fn()}
        setIsEditing={jest.fn()}
      />
    );
    const updateButton = getByText('Update');
    fireEvent.click(updateButton);

    expect(Swal.fire).toHaveBeenCalledWith({
      icon: 'error',
      title: 'Error!',
      text: 'All fields are required.',
      showConfirmButton: true,
    });
  });

  it('displays an error message when submitting the form with an invalid phone number', () => {
    const { getByLabelText, getByText } = render(
      <Edit
        employees={mockEmployees}
        selectedEmployee={mockSelectedEmployee}
        setEmployees={jest.fn()}
        setIsEditing={jest.fn()}
      />
    );
    const phoneNoInput = getByLabelText('Phone No');
    const updateButton = getByText('Update');

    fireEvent.change(phoneNoInput, { target: { value: '1234567890' } });
    fireEvent.click(updateButton);

    expect(Swal.fire).toHaveBeenCalledWith({
      icon: 'error',
      title: 'Error!',
      text: 'Phone number must be 10 digits and start with 8 or 9.',
      showConfirmButton: true,
    });
  });
});
