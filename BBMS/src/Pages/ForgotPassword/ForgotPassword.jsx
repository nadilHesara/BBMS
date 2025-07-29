import React, { useState } from "react";
import "./ForgotPassword.css";

function ForgotPassword() {

  const [userType, setUserType] = useState("Donor");
  const [identifier, setIdentifier] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(userType);
    console.log(identifier);
    
    try{
      const response = await fetch("http://localhost:9191/forgotpassword",{
      method:"POST",
      headers: {
          "Content-Type": "application/json"
        },
      body: JSON.stringify({
        userType : userType,
        userInfo : identifier
      })
      })

      const result = await response.json();
      console.log(result);
      if (response.ok){
        alert("Successfully Reset Your Password!");
  
      }else{
        alert(result.message);
      }
    }catch (error){
      alert("Registration failed. Check server and data.");
    }
      };

return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="userType"
              value="Doner"
              checked={userType === "Doner"}
              onChange={() => setUserType("Doner")}
            />
            Donor
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="Hospital"
              checked={userType === "Hospital"}
              onChange={() => setUserType("Hospital")}
            />
            Hospital
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="identifier">Enter your Username/Email/Password:</label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="request-btn">Request</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
