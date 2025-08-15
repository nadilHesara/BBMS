import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NaviBar from "../../components/Navibar/NaviBar";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import districts from '../../SharedData/districts';
import bloodgrp from '../../SharedData/bloodgrp';
import { LoadingContext } from "../../context/LoadingContext";
import "./DonorReg.css";

function DonorReg({ theme, setTheme }) {
  const navigate = useNavigate();
  const [userType, _] = useState(sessionStorage.getItem("userType") ? sessionStorage.getItem("userType") : undefined);
  const { loading, setLoading } = useContext(LoadingContext);

  const [doner, setDoner] = useState({
    doner_id: "D001",
    name: "",
    username: "",
    email: "",
    gender: "",
    blood_group: "",
    nic_no: "",
    dob: "",
    tele: "",
    address_line1: "",
    address_line2: "",
    address_line3: "",
    District: "",
    password: ""
  });

  const [show, setShow] = useState([false, false]);

  const [conformPassword, setConformPassword] = useState('');
  const [password, setPassword] = useState('');

  function toggleShow(n) {
    if (n == 1) {
      setShow([show[0], !show[1]]);
    } else {
      setShow([!show[0], show[1]]);
    }
  }

  const handleChange = (e) => {
    setDoner({
      ...doner,
      [e.target.name]: e.target.value
    });
  };

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    if (password != conformPassword) {
      setMessage("Password is miss match!");
      return;
    } else {
      setDoner({
        ...doner,
        ["password"]: password
      })
    }
    try {
      const response = await fetch("http://localhost:9191/donorReg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(doner)
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Donor Registration Successful!");
        alert("Donor added successfully!");
        navigate("/login");

      } else if (result.message.match(/Duplicate entry '.*?'/)) {
        const errorMsg = "Username already registered.";
        setMessage("Error: " + errorMsg);
        alert(errorMsg); // Optional: show an alert too
        console.error("Duplicate Username Error:", result);

      } else {
        setMessage("Error: " + (result.message || JSON.stringify(result)));
        console.error("Error response:", result);
      }

    } catch (error) {
      console.error("Error submitting form:", error.message);
      alert("Submission failed. Check server and data.");
      setMessage("Submission failed. Check server and data.");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div>
      <NaviBar theme={theme} setTheme={setTheme} />
      <div className={theme === "light" ? "doner-reg" : "doner-reg dark"}>
        <form className="doner-reg-form" onSubmit={handleSubmit}>
          <h1>Donor Registration</h1>
          <label htmlFor="name">Donor Name:</label>
          <input type="text" name="name" onChange={handleChange} required />
          <label>Gender:</label>


          <input type="radio" name="gender" value="Male" onChange={handleChange} required />{" "}  Male
          <input type="radio" name="gender" value="Female" onChange={handleChange} />{" "} Female
          <br />

          <label htmlFor="username">Username: </label>
          <input type="text" name="username" onChange={handleChange} required />
          <br />

          <label htmlFor="email">Email: </label>
          <input type="email" name="email" onChange={handleChange} required />
          <br />

          <label>Blood Group:</label>
          <select name="blood_group" onChange={handleChange}>
            <option value="">--Select--</option>
            {bloodgrp.map((b, i) => (
              <option key={i} value={b}>
                {b}
              </option>
            ))}
          </select>

          <label htmlFor="nic_no">NIC Number:</label>
          <input type="text" name="nic_no" onChange={handleChange} required />

          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" name="dob" onChange={handleChange} required />

          <label htmlFor="tele">Telephone:</label>
          <input type="text" name="tele" onChange={handleChange} required />

          <label>Address:</label>
          <input type="text" name="address_line1" placeholder="Line 1" onChange={handleChange} required />
          <div className="address-lines">
            <input type="text" name="address_line2" placeholder="Line 2" onChange={handleChange} />
            <input type="text" name="address_line3" placeholder="Line 3" onChange={handleChange} />
          </div>
          <br />

          <label>District:</label>
          <select name="District" onChange={handleChange} required>
            <option value="">-- Select --</option>
            {districts.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>

          <br />



          {userType == undefined &&
            <>
              <label htmlFor="pwd">Password: </label>
              <input type={show[0] ? "text" : "password"} id="pwd" name="pwd" onChange={(e) => setPassword(e.target.value)}></input>
              {show[0] ? <AiFillEyeInvisible onClick={() => toggleShow(0)} size={20} /> : <AiFillEye onClick={() => toggleShow(0)} size={20} />}
              <br />


              <label htmlFor="pwdconfirm">Confirm Password: </label>
              <input type={show[1] ? "text" : "password"} id="pwdconfirm" name="pwdconfirm" onChange={(e) => setConformPassword(e.target.value)}></input>
              {show[1] ? <AiFillEyeInvisible onClick={() => toggleShow(1)} size={20} /> : <AiFillEye onClick={() => toggleShow(1)} size={20} />}
              <br />

            </>}

          <input type="submit" value="Register" />
          <div className="message">
            <p style={message == "Password is miss match!" ? { color: "red" } : { color: "black" }}>{message}</p>
          </div>
        </form>

      </div >
    </div >
  );
}

export default DonorReg;
