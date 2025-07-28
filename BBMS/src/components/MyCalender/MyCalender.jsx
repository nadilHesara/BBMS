import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import 'react-calendar/dist/Calendar.css';


function CalendarComponent() {
  const [value, setValue] = useState(new Date());
  const [campaigns, setCampaigns] = useState([]);
  const [selectedDateDetails, setSelectedDateDetails] = useState([]);

  // Fetch data whenever month changes
  useEffect(() => {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    axios.get(`http://localhost:9191/dashboard/month?month=${year}-${month}`)
      .then(res => setCampaigns(res.data))
      .catch(err => console.error(err));
  }, [value]);

  // Highlight campaign dates
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      const isCampaign = campaigns.some(c => c.date === dateStr);
      return isCampaign ? 'highlight' : null;
    }
  };

  // Show details on date click
  const onDateClick = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const selected = campaigns.filter(c => c.date === dateStr);
    setSelectedDateDetails(selected);
  };

  return (
    <div>
      <Calendar
        onChange={setValue}
        value={value}
        tileClassName={tileClassName}
        onClickDay={onDateClick}
      />

      {selectedDateDetails.length > 0 && (
        <div className="details">
          <h3>Campaigns on {selectedDateDetails[0].date}</h3>
          <ul>
            {selectedDateDetails.map((c, index) => (
              <li key={index}>
                <strong>{c.campaign_name}</strong> at {c.venue} ({c.time})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CalendarComponent;
