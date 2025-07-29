import React, { useState } from "react";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [userType, setUserType] = useState("donor");
  const [identifier, setIdentifier] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to handle password recovery request here.
    alert(`Request sent successfully.`);
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">

        <div className="form-group">
          <label htmlFor="identifier">
            Enter your Username/Email/Password:
          </label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="request-btn">
          Request
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
