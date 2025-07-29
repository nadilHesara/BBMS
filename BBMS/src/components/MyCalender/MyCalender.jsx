import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import 'react-calendar/dist/Calendar.css';
import './MyCalender.css';


function CalendarComponent(props) {
  console.log("The selecteddistrict: ",props.selectedDistrict);
  const selectedDistrict = props.selectedDistrict;
  const [activeStartDate,setActiveStartDate] = useState(new Date());
  const [value, setValue] = useState(new Date());
  const [campaigns, setCampaigns] = useState([]);
  const [selectedDateDetails, setSelectedDateDetails] = useState([]);

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
    axios.get(`http://localhost:9191/dashboard/campaigns?month=${year}-${month}&district=${selectedDistrict}`)
      .then(res => {
        setCampaigns(res.data);
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

  // Show details on date click
  const onDateClick = (date) => {
    console.log(formatDateLocal(date));
    const dateStr = formatDateLocal(date);
    const selected = campaigns.filter(c => c.date === dateStr);
    setSelectedDateDetails(selected);
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
        <div className="details">
          <h3>Campaigns on {selectedDateDetails[0].date}</h3>
          <ul>
            {selectedDateDetails.map((c, index) => (
              <li key={index}>
                <strong>{c.org_name}</strong> in {c.add_line1} {c.add_line2} {c.add_line3} starts at {c.start_time}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CalendarComponent;
