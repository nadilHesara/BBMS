import React, { useState } from "react";
import "./ChangePassword.css";

function ChangePassword({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    conf_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="curpwd">Current Password: </label>
        <input
          type="password"
          id="curpwd"
          name="current_password"
          value={formData.current_password}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="newpwd">New Password: </label>
        <input
          type="password"
          id="newpwd"
          name="new_password"
          value={formData.new_password}
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
          value={formData.conf_password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="button-row">
        <button type="submit" className="save-btn">
          Save Password
        </button>
        <button type="button" onClick={onCancel} className="close-btn">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ChangePassword;
