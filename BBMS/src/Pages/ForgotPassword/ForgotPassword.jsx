import React, { useState } from "react";
import "./ForgotPassword.css";

function ForgotPassword() {

  const [userType, setUserType] = useState("donor");
  const [identifier, setIdentifier] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try{
      const response = await fetch("http://localhost:9191/forgotpassword",{
      method:"POST",
      headers: {
          "Content-Type": "application/json"
        },
      body: JSON.stringify({
        userInfo : identifier,
      })
      })

      const result = await response.json({
        userInfo : identifier,
        userType: userType
      });

      if (response.ok){
        alert("Successfully added the campaign");
        setMessage(`Successfully registered by ${campaign.org_name}`);
      }else{
        alert("Registration failed. Check server and data.");
        setMessage("Error : "+JSON.stringify(result));
      }
    }catch (error){
      //console.error(error.message);
      alert("Registration failed. Check server and data.");
      setMessage("Registration failed. Check server and data.");
    }
    
    alert(`Request sent successfully.`);
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
              value="donor"
              checked={userType === "donor"}
              onChange={() => setUserType("donor")}
            />
            Donor
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="hospital"
              checked={userType === "hospital"}
              onChange={() => setUserType("hospital")}
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
