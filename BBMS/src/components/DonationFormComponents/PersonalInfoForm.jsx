import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PersonalInfoForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    nic: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    email: '',
    addressHome: '',
    addressOffice: '',
    phoneHome: '',
    phoneOffice: '',
    phoneMobile: '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleNext = (e) => {
    e.preventDefault();

    // Save to localStorage or context here if needed
    localStorage.setItem('personalInfo', JSON.stringify(form));
    navigate('../donation-history');
  };

  return (
    <div className="form-container">
      <h2>Step 2: Personal Information</h2>
      <form onSubmit={handleNext}>
        <label>Full Name:
          <input name="fullName" type="text" required onChange={handleChange} />
        </label>

        <label>NIC Number:
          <input name="nic" type="text" required onChange={handleChange} />
        </label>

        <label>Date of Birth:
          <input name="dob" type="date" required onChange={handleChange} />
        </label>

        <label>Gender:
          <select name="gender" required onChange={handleChange}>
            <option value="">--Select--</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </label>

        <label>Blood Group:
          <input name="bloodGroup" type="text" required onChange={handleChange} />
        </label>

        <label>Email:
          <input name="email" type="email" onChange={handleChange} />
        </label>

        <label>Home Address:
          <input name="addressHome" type="text" onChange={handleChange} />
        </label>

        <label>Office Address:
          <input name="addressOffice" type="text" onChange={handleChange} />
        </label>

        <label>Home Phone:
          <input name="phoneHome" type="text" onChange={handleChange} />
        </label>

        <label>Office Phone:
          <input name="phoneOffice" type="text" onChange={handleChange} />
        </label>

        <label>Mobile Phone:
          <input name="phoneMobile" type="text" required onChange={handleChange} />
        </label>

        <button type="submit">Next</button>
      </form>
    </div>
  );
}
