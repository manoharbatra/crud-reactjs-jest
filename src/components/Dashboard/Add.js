import React, { useState } from 'react';
import Swal from 'sweetalert2';
import {
  ERROR_ICON, ERROR_TITLE, 
  VALIDATION_ALL_FIELDS, VALIDATION_PHONE_NO, 
  TITLE_ADD_EMPLOYEEE, 
  LABEL_FIRST_NAME, LABEL_LAST_NAME, LABEL_EMAIL, LABEL_PHONE_NO, LABEL_DOB
} from '../../utils/Constants'

const Add = ({ employees, setEmployees, setIsAdding }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [date, setDate] = useState('');

  const handleAdd = e => {
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

    const id = employees.length + 1;
    const newEmployee = {
      id,
      firstName,
      lastName,
      email,
      phoneNo,
      date,
    };

    employees.push(newEmployee);
    localStorage.setItem('employees_data', JSON.stringify(employees));
    setEmployees(employees);
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${firstName} ${lastName}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>{TITLE_ADD_EMPLOYEEE}</h1>
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
        <div className='submit-box'>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button cancel-btn headers"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
