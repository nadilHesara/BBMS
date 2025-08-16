import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function PersonalInfoForm() {

  const location = useLocation();
  const from = location.state?.from;
  const donor_id = sessionStorage.getItem("userId");
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
    // localStorage.setItem('personalInfo', JSON.stringify(form));
    navigate('../donation-history');
  };

useEffect(() => {
        
      const fetchdonorData = async () => {
      try {
          const response =await axios.get(`http://localhost:9191/dashboard/donor?donor_id=${donor_id}`);

        const info = response.data;

        setForm(prev => ({
            ...prev,
            fullName: info.Name,
            bloodGroup: info.BloodGroup,
            dob: info.DOB,
            nic: info.NIC,
            gender: info.Gender,
            email: info.Email,
        }));

      } catch (error) {
          console.error("Error fetching Donor data:", error);
      }
    };

    if (donor_id) {
      fetchdonorData();
    }  

},[donor_id]);


  return (
    <div className={`form-container ${from}`}>
      <h2>Step 2: Personal Information</h2>
      <form onSubmit={handleNext}>
        <label>Full Name:
          <input name="fullName" type="text" value={form.fullName} readOnly /*required*/ /*onChange={handleChange}*/ />
        </label>

        <br/>

        <label>NIC Number:
          <input name="nic" type="text" value={form.nic} readOnly/*required*/ /*onChange={handleChange}*/ />
        </label>

        <label>Date of Birth:
          <input name="dob" type="date" value={form.dob} readOnly/*required*/ /*onChange={handleChange}*/ />
        </label>

        <label>Gender:
          <select name="gender" value={form.gender || " "} /*required*/ onChange={handleChange}>
            <option value="">--Select--</option> 
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </label>

        <label>Blood Group:
          <input name="bloodGroup" type="text" value={form.bloodGroup} /*required*/ onChange={handleChange} />
        </label>

        <label>Email:
          <input name="email" type="email" value={form.email} onChange={handleChange} />
        </label>

        <label>Home Address:
          <input name="addressHome" type="text" onChange={handleChange} />
        </label>

        {/* <label>Office Address:
          <input name="addressOffice" type="text" onChange={handleChange} />
        </label> */}

        {/* <label>Home Phone:
          <input name="phoneHome" type="text" onChange={handleChange} />
        </label>

        <label>Office Phone:
          <input name="phoneOffice" type="text" onChange={handleChange} />
        </label> */}

        <label>Mobile Phone:
          <input name="phoneMobile" type="text" /*required*/ onChange={handleChange} />
        </label>

        <button type="submit">Next</button>
      </form>
    </div>
  );
}
