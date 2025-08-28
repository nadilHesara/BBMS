import React, { useState, useContext } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ForgotPassword.css";
import NaviBar from "../../components/Navibar/NaviBar";

function ForgotPassword() {
  const { loading, setLoading } = useContext(LoadingContext);
  const [userType, setUserType] = useState("Donor");
  const [identifier, setIdentifier] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:9191/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userType: userType,
          userInfo: identifier
        })
      })
      const result = await response.json();
      if (response.ok) {
        navigate("/login")
        toast.success("Password Reset Successfully!");

      } else {
        toast.error("Please check your details and try again.");
      }
    } catch (error) {
      toast.error("Registration failed. Check server and data.");
    } finally {
      setLoading(false);
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
