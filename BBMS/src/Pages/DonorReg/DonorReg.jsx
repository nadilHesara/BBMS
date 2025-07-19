import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NaviBar from "../../components/Navibar/NaviBar";
import "./DonorReg.css";

function DonorReg({ theme, setTheme }) {

  const [doner, setDoner] = useState({
    doner_id: "D001",
    name: "",
    gender: "",
    blood_group: "",
    nic_no: "",
    dob: "",
    tele: "",
    address_line1: "",
    address_line2: "",
    address_line3: "",
    District: "",
  });

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
        setMessage("Your Username is  : " + (doner.nic_no));
        alert("Donor added successfully!");

      } else if (result.message.match(/Duplicate entry '.*?'/)) {
        const errorMsg = "NIC number already registered.";
        setMessage("Error: " + errorMsg);
        alert(errorMsg); // Optional: show an alert too
        console.error("Duplicate NIC error:", result);

      } else {
        setMessage("Error: " + (result.message || JSON.stringify(result)));
        console.error("Error response:", result);
      }

    } catch (error) {
      console.error("Error submitting form:", error.message);
      alert("Submission failed. Check server and data.");
      setMessage("Submission failed. Check server and data.");
    }

  };

  const districts = [
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy",
    "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa",
    "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya",];

  return (
    <div>
      <NaviBar theme={theme} setTheme={setTheme} />
      <div className={theme === "light" ? "donor-reg" : "donor-reg dark"}>
        <form onSubmit={handleSubmit}>
          <h1>Donor Registration</h1>
          <label htmlFor="name">Donor Name:</label>
          <input type="text" name="name" onChange={handleChange} required />
          <label>Gender:</label>

          <input type="radio" name="gender" value="Male" onChange={handleChange} required />{" "}  Male
          <input type="radio" name="gender" value="Female" onChange={handleChange} />{" "} Female
          <br />

          <label>Blood Group:</label>
          <select name="blood_group" onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="O+">O+</option>
            <option value="AB+">AB+</option>
            <option value="A-">A-</option>
            <option value="B-">B-</option>
            <option value="O-">O-</option>
            <option value="AB-">AB-</option>
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
          <input type="submit" value="Register" />

          < p > {message}</p>  <br />
          <p>{message == "Username is  : " + (doner.nic_no) && "Default Password is phone number" }</p>

        </form>
      </div>
    </div >
  );
}

export default DonorReg;
