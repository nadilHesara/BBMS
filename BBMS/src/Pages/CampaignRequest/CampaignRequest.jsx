import React, { useState, useContext } from "react";
import NaviBar from "../../components/Navibar/NaviBar";
import "./CampaignRequest.css";
import { LoadingContext } from "../../context/LoadingContext";
import { toast } from "react-toastify";
import MapPicker from "../../components/MapPicker/MapPicker";

export default function CampaignForm({ theme, setTheme }) {
  const { loading, setLoading } = useContext(LoadingContext);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [status, setStatus] = useState("");

  const [formData, setFormData] = useState({
    organizerName: "",
    email: "",
    phone: "",
    campaignName: "",
    locationAddress: "",
    locationLat: null,
    locationLng: null,
    locationLink: "",
    date: "",
    details: "",
  });

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = { ...formData };

    try {
      const res = await fetch("http://localhost:9191/campaignRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({
          organizerName: "",
          email: "",
          phone: "",
          campaignName: "",
          locationAddress: "",
          locationLat: null,
          locationLng: null,
          locationLink: "",
          date: "",
          details: "",
        });
        toast.success("Campaign request sent successfully!");
      } else {
        toast.error("Failed to send campaign request. Please try again.");
      }
    } catch (err) {
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-theme={theme}>
      <NaviBar theme={theme} setTheme={setTheme} />
      <form className="campaign-form" onSubmit={handleSubmit}>
        <h2>Organize Blood Donation Campaign</h2>

        {/** Input Fields with Floating Labels */}
        <div className="input-group">
          <input
            type="text"
            name="organizerName"
            value={formData.organizerName}
            onChange={handleChange}
            required
          />
          <label>Organizer Name</label>
        </div>

        <div className="input-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Email Address</label>
        </div>

        <div className="input-group">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
          />
          <label>Phone Number</label>
        </div>

        <div className="input-group">
          <input
            type="text"
            name="campaignName"
            value={formData.campaignName}
            onChange={handleChange}
            required
          />
          <label>Campaign Name</label>
        </div>

       <div
  className={`input-group location-group ${
    formData.locationLink ? "has-value" : ""
  }`}
>
  <input
    type="url"
    name="locationLink"
    value={formData.locationLink}
    onChange={handleChange}
    placeholder="Pick on map or paste a Google Maps link"
    required
    readOnly
  />
  <label>Location (Google Maps link)</label>

  <button
    type="button"
    className="map-icon-btn"
    aria-label="Pick location on map"
    onClick={() => setPickerOpen(true)}
  >
    📍
  </button>

  {formData.locationAddress && (
    <small className="address-hint">{formData.locationAddress}</small>
  )}
</div>

        <div className="input-group">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <label>Date</label>
        </div>

        <div className="input-group">
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
          ></textarea>
          <label>Additional Details</label>
        </div>

        <button type="submit">Send Campaign Request</button>
        {status && <p className="status">{status}</p>}
      </form>

      <MapPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={({ lat, lng, address, link }) => {
          setPickerOpen(false);
          setFormData((p) => ({
            ...p,
            locationLat: lat,
            locationLng: lng,
            locationAddress: address,
            locationLink: link,
          }));
        }}
      />
    </div>
  );
}
