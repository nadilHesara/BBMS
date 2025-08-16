import React, { useState, useContext } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import "./ChangePassword.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { filledInputClasses } from "@mui/material/FilledInput";


function validatePassword(pwd) {
  if (pwd.length < 8) return "Password must be at least 8 characters long.";
  if (!/[A-Z]/.test(pwd)) return "Password must contain at least one uppercase letter.";
  if (!/[a-z]/.test(pwd)) return "Password must contain at least one lowercase letter.";
  if (!/[0-9]/.test(pwd)) return "Password must contain at least one number.";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) return "Password must contain at least one special character.";
  return true;
};

function ChangePassword() {
  const navigate = useNavigate();
  const userType = sessionStorage.getItem("userType");
  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem("userData")));
  const { loading, setLoading } = useContext(LoadingContext);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    userType: userType,
    userName: userData.userName

  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const CheckNewPassword = () => {
    if (confirmPassword == formData.newPassword) {
      const validate = validatePassword(formData.newPassword);
      if (validate == true) {
        SendPasswordData();
      }
      toast.warning(validate)
    }
    else {
      toast.error("Password is not matching.")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    CheckNewPassword();
  };

  const SendPasswordData = async () => {

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:9191/dashboard/ChangePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json();

      if (response.ok) {
        toast.success("Password Changed successfully!")
        navigate("/dashboard")
      }
      if (result.message === "User type is different!") {
          toast.warning("User type does not match!");
      }
    } catch (error) {
      toast.error("Server not reachable. Try again later.")
      
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="doner-reg-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="curpwd">Current Password: </label>
        <input
          type="password"
          id="curpwd"
          name="currentPassword"
          // value={formData.current_password}
          onChange={handleChange}
        // required
        />
      </div>

      <div>
        <label htmlFor="newpwd">New Password: </label>
        <input
          type="password"
          id="newpwd"
          name="newPassword"
          // value={formData.new_password}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="cfmnewpwd">Confirm New Password: </label>
        <input
          type="password"
          id="cfmnewpwd"
          name="conf_password"
          // value={formData.conf_password}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <div className="button-row">
        <button type="submit" className="save-btn">
          Save Password
        </button>
        <button type="button" className="close-btn">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ChangePassword;
