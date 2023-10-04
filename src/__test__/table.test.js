import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Table from '../components/Dashboard/Table';

const mockEmployees = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNo: '9876543210',
    date: '1990-01-01',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phoneNo: '8765432109',
    date: '1995-05-15',
  },
];

const mockHandleEdit = jest.fn();
const mockHandleDelete = jest.fn();

describe('Table Component', () => {
  it('renders the table with employee data', () => {
    const { getByText } = render(
      <Table employees={mockEmployees} handleEdit={mockHandleEdit} handleDelete={mockHandleDelete} />
    );

    expect(getByText('John')).toBeInTheDocument();
    expect(getByText('Doe')).toBeInTheDocument();
    expect(getByText('john.doe@example.com')).toBeInTheDocument();
    expect(getByText('9876543210')).toBeInTheDocument();
    expect(getByText('1990-01-01')).toBeInTheDocument();

    expect(getByText('Jane')).toBeInTheDocument();
    expect(getByText('Smith')).toBeInTheDocument();
    expect(getByText('jane.smith@example.com')).toBeInTheDocument();
    expect(getByText('8765432109')).toBeInTheDocument();
    expect(getByText('1995-05-15')).toBeInTheDocument();
  });

  it('calls handleEdit when "Edit" button is clicked', () => {
    const { getAllByText } = render(
      <Table employees={mockEmployees} handleEdit={mockHandleEdit} handleDelete={mockHandleDelete} />
    );

    const editButton = getAllByText('Edit');
    fireEvent.click(editButton[0]);

    expect(mockHandleEdit).toHaveBeenCalledWith(1); // Assuming you clicked the "Edit" button for the first employee
  });

  it('calls handleDelete when "Delete" button is clicked', () => {
    const { getAllByText } = render(
      <Table employees={mockEmployees} handleEdit={mockHandleEdit} handleDelete={mockHandleDelete} />
    );

    const deleteButton = getAllByText('Delete');
    fireEvent.click(deleteButton[0]);

    expect(mockHandleDelete).toHaveBeenCalledWith(1); // Assuming you clicked the "Delete" button for the first employee
  });

  it('displays "No Employees" when there are no employees', () => {
    const { getByText } = render(
      <Table employees={[]} handleEdit={mockHandleEdit} handleDelete={mockHandleDelete} />
    );

    expect(getByText('No Employees')).toBeInTheDocument();
  });

  // Add more test cases as needed for different scenarios, such as empty employee list, etc.
});
