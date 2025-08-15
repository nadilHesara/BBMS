import React, { useState } from "react";
import NaviBar from "../../Components/NaviBar/NaviBar";
import "./CampaignRequest.css";

export default function CampaignForm({ theme, setTheme }) {
  const [formData, setFormData] = useState({
    organizerName: "",
    email: "",
    phone: "",
    campaignName: "",
    location: "",
    date: "",
    details: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("http://localhost:8080/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus("✅ Campaign request sent successfully!");
        setFormData({
          organizerName: "",
          email: "",
          phone: "",
          campaignName: "",
          location: "",
          date: "",
          details: ""
        });
      } else {
        setStatus("❌ Failed to send request.");
      }
    } catch (err) {
      setStatus("❌ Error: " + err.message);
    }
  };

  return (
    <div data-theme={theme}>
      <NaviBar theme={theme} setTheme={setTheme} />
      <form className="campaign-form" onSubmit={handleSubmit}>
        <h2>Organize Blood Donation Campaign</h2>

        {/** Input Fields with Floating Labels */}
        <div className="input-group">
          <input type="text" name="organizerName" value={formData.organizerName} onChange={handleChange} required />
          <label>Organizer Name</label>
        </div>

        <div className="input-group">
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <label>Email Address</label>
        </div>

        <div className="input-group">
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} pattern="[0-9]{10}" required />
          <label>Phone Number</label>
        </div>

        <div className="input-group">
          <input type="text" name="campaignName" value={formData.campaignName} onChange={handleChange} required />
          <label>Campaign Name</label>
        </div>

        <div className="input-group">
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
          <label>Location</label>
        </div>

        <div className="input-group">
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          <label>Date</label>
        </div>

        <div className="input-group">
          <textarea name="details" value={formData.details} onChange={handleChange}></textarea>
          <label>Additional Details</label>
        </div>

        <button type="submit">Send Campaign Request</button>
        {status && <p className="status">{status}</p>}
      </form>
    </div>
  );
}
