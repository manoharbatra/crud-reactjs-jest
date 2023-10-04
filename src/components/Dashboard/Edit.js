import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../../styles/Edit.css';

import {
  ERROR_ICON, ERROR_TITLE, 
  VALIDATION_ALL_FIELDS, VALIDATION_PHONE_NO,
  LABEL_FIRST_NAME, LABEL_LAST_NAME, LABEL_EMAIL, LABEL_PHONE_NO, LABEL_DOB
} from '../../utils/Constants';

const Edit = ({ employees, selectedEmployee, setEmployees, setIsEditing }) => {
  const id = selectedEmployee.id;

  const [firstName, setFirstName] = useState(selectedEmployee.firstName);
  const [lastName, setLastName] = useState(selectedEmployee.lastName);
  const [email, setEmail] = useState(selectedEmployee.email);
  const [phoneNo, setPhoneNo] = useState(selectedEmployee.phoneNo);
  const [date, setDate] = useState(selectedEmployee.date);

  const handleUpdate = e => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phoneNo || !date) {
      return Swal.fire({
        icon: ERROR_ICON,
        title: ERROR_TITLE,
        text: VALIDATION_ALL_FIELDS,
        showConfirmButton: true,
      });
    }

    if (!/^[89]\d{9}$/.test(phoneNo)) {
      return Swal.fire({
        icon: ERROR_ICON,
        title: ERROR_TITLE,
        text: VALIDATION_PHONE_NO,
        showConfirmButton: true,
      });
    }

    const employee = {
      id,
      firstName,
      lastName,
      email,
      phoneNo,
      date,
    };

    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id === id) {
        employees.splice(i, 1, employee);
        break;
      }
    }

    localStorage.setItem('employees_data', JSON.stringify(employees));
    setEmployees(employees);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${employee.firstName} ${employee.lastName}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Employee</h1>
        <label htmlFor="firstName">{LABEL_FIRST_NAME}</label>
        <input
          className='headers'
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">{LABEL_LAST_NAME}</label>
        <input
          className='headers'
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <label htmlFor="email">{LABEL_EMAIL}</label>
        <input
          className='headers'
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="phoneNo">{LABEL_PHONE_NO}</label>
        <input
          className='headers'
          id="phoneNo"
          type="number"
          name="phoneNo"
          value={phoneNo}
          onChange={e => setPhoneNo(e.target.value)}
        />
        <label htmlFor="date">{LABEL_DOB}</label>
        <input
          className='headers'
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <div className='edit-submit-box'>
          <input type="submit" value="Update" />
          <input
            className="muted-button cancel-btn headers"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
