import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import 'react-calendar/dist/Calendar.css';
import './MyCalender.css';
import {useNavigate } from "react-router-dom";



function CalendarComponent(props) {
  console.log("The selecteddistrict: ",props.selectedDistrict);
  const selectedDistrict = props.selectedDistrict;
  const [activeStartDate,setActiveStartDate] = useState(new Date());
  const [value, setValue] = useState(new Date());
  const [campaigns, setCampaigns] = useState([]);
  const [selectedDateDetails, setSelectedDateDetails] = useState([]);
  const [expandedCampaign, setExpandedCampaign] = useState(null);
  const navigate = useNavigate(); 


  // Helper function to format date in local timezone (YYYY-MM-DD)
  const formatDateLocal = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

 // console.log(activeStartDate.getMonth());
  // Fetch data whenever month changes

  useEffect(() => {
    if(!selectedDistrict) return;
    const year = activeStartDate.getFullYear();
    const month = String(activeStartDate.getMonth() + 1).padStart(2, '0');
   // console.log(month);
    axios.get(`http://localhost:9191/dashboard/campaigns?date=${year}-${month}&district=${selectedDistrict}`)
      .then(res => {
        setCampaigns(res.data);
        console.log(campaigns);
      })
      .catch(err => console.error(err));
  }, [activeStartDate,selectedDistrict]);

  // Highlight campaign dates
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = formatDateLocal(date);
      const isCampaign = campaigns.some(c => c.date === dateStr);
      return isCampaign ? 'highlight' : null;
    }
  };

  const formatTime = (timeString) => {
  // Split into parts (HH, MM, SS)
  const [hour, minute] = timeString.split(":");
  let h = parseInt(hour, 10);
  const m = minute;
  const ampm = h >= 12 ? "pm" : "am";

  // Convert to 12-hour format
  h = h % 12 || 12;

  return `${h}.${m} ${ampm}`;
}

  // Show details on date click
  const onDateClick = (date) => {
    console.log(formatDateLocal(date));
    const dateStr = formatDateLocal(date);
    const selected = campaigns.filter(c => c.date === dateStr);
    setSelectedDateDetails(selected);
    setExpandedCampaign(null); // Reset expanded view when new date is selected
  };

  // Handle expand/collapse campaign details
  const toggleExpandedView = (campaign) => {
    console.log("expand : " , expandedCampaign);
    if (expandedCampaign && expandedCampaign.campain_id === campaign.campain_id) {
      setExpandedCampaign(null);
    } else {
      setExpandedCampaign(campaign);
    }
  };

  // Handle donation request
  const handleDonationRequest = (campaign) => {
    const userID = sessionStorage.getItem("userId");
    const user_type = sessionStorage.getItem("userType")
    if (!userID) {
      alert("Please login to request a donation");
      return;
    }

    // You can implement the donation request logic here
    console.log("Requesting donation for campaign:", campaign);
    // alert(`Donation request sent for ${campaign.org_name} campaign!`);
    if(user_type === "Doner"){
      navigate("/dashboard/DonationForm",{state: { campaignId: campaign.campain_id, campdate: campaign.date,  campName: campaign.CampaignName}});
    }else if (user_type === "Hospital"){
      navigate('donates',{state: { campaignId: campaign.campain_id, campdate: campaign.date,  campName: campaign.CampaignName }});
     }

  };

  const tilecontent = ({ date, view }) => {
         
        if (view === 'month') {
          const dateStr = formatDateLocal(date);
          const hasCampaign = campaigns.some(c => c.date === dateStr);
          if (hasCampaign) {
            
            // return <div className="dot"/>;
            return <span className="dot" >🩸</span>; 
          }
        }
        return null;
      }

  return (
    <div>
      <Calendar
        onChange={setValue}
        value={value}
        tileClassName={tileClassName}
        onClickDay={onDateClick}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
        tileContent={tilecontent}
      />

      {selectedDateDetails.length > 0 && (
        <div className="campaigns-container">
          <h3 className="campaigns-title">Campaigns on {selectedDateDetails[0].date}</h3>
          
          {selectedDateDetails.map((campaign, index) => (
            <div key={campaign.campaign_id || index} className="campaign-details">
              <div className="campaign-basic-info">
                <strong className="org-name">{campaign.CampaignName}</strong>
                <div className="location-info">
                  {campaign.add_line1} {campaign.add_line2} {campaign.add_line3}
                </div>
                <div className="time-info">Starts at {formatTime(campaign.start_time)}</div>
                <button 
                  className={`expand-btn ${expandedCampaign && expandedCampaign.campain_id === campaign.campain_id ? 'expanded' : ''}`}
                  onClick={() => toggleExpandedView(campaign)}
                >
                  {expandedCampaign && expandedCampaign.campain_id === campaign.campain_id 
                    ? "Show Less" 
                    : "More Details"}
                </button>
                <button className="map-btn">See Location 📌 </button>
              </div>

              {/* Expanded View */}
              {expandedCampaign && expandedCampaign.campain_id === campaign.campain_id && (
                <div className="expanded-details">
                  <div className="details">
                    <div className="detail-item">
                      <span className="detail-label">Organization:</span>
                      <span className="detail-value">{campaign.CampaignName}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Date:</span>
                      <span className="detail-value">{campaign.date}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Start Time:</span>
                      <span className="detail-value">{formatTime(campaign.start_time)}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">End Time:</span>
                      <span className="detail-value">{formatTime(campaign.end_time) || "Not specified"}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">District:</span>
                      <span className="detail-value">{campaign.district}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Address:</span>
                      <span className="detail-value">
                        {campaign.add_line1} {campaign.add_line2} {campaign.add_line3}
                      </span>
                    </div>
                    {campaign.description && (
                      <div className="detail-item full-width">
                        <span className="detail-label">Description:</span>
                        <span className="detail-value">{campaign.description}</span>
                      </div>
                    )}
                    <div className="action-buttons">
                    <button
                      className="donation-request-btn"
                      onClick={() => handleDonationRequest(campaign)}
                    >Update Donation
                    </button>
                  </div>
                  </div>
                  
                  
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CalendarComponent;
