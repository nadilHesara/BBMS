import NaviBar from "../../components/Navibar/NaviBar";
import "./CampReg.module.css";
import React,{ use, useState } from 'react';
import districts from '../../SharedData/districts';

function CampReg({ theme, setTheme }) {
  const [campaign, setCampaign] = useState({
    campain_id:'C001',
    district:'',
    org_name:'',
    add_line1:'',
    add_line2:'',
    add_line3:'',
    date:'',
    doner_count:'',
    start_time:'',
    end_time:'',
    org_tele:'',
    org_email:'',
    blood_quantity:0
  })

  const [message,setMessage] = useState("");
  const handleChange = (e) => {
    setCampaign({
      ...campaign,
      [e.target.name] : e.target.value
    });
  }

    const handleNumberChange = (e) => {
    setCampaign({
      ...campaign,
      [e.target.name] : Number(e.target.value)
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    console.log(campaign);

    try{
      const response = await fetch("http://localhost:9191/campReg",{
      method:"POST",
      headers: {  
          "Content-Type": "application/json"
        },
      body: JSON.stringify(campaign)
      })

      const result = await response.json();

      if (response.ok){
        alert("Successfully added the campaign");
        setMessage(`Successfully registered by ${campaign.org_name}`);
      }else{
        alert("Registration failed. Check server and data.");
        setMessage("Error : " + JSON.stringify(result));
      }
    }catch (error){
      //console.error(error.message);
      alert("Registration failed. Check server and data.");
      setMessage("Registration failed. Check server and data.");
    }


  }


  return (
    <>
      <NaviBar theme={theme} setTheme={setTheme} />
      <div className="campreg-container">
        <form  onSubmit={handleSubmit}>
          <h1 >Campaign Registration</h1>
          <label htmlFor="org_name"> Organizer Name: </label>
          <input type="text" id="org_name" name="org_name" onChange={handleChange} required></input>
          <br />

        <label> District: </label>
        <select name="district" onChange={handleChange} value={campaign.district} required>
          <option value="">---Select---</option>
          {districts.map((city,index)=>(
            <option key={index} value={city} >{city}</option>
          ))}
        </select>
        <br />

        

      <label> Address: </label>
        <input type="text" id="add_line1" name="add_line1"  onChange={handleChange}  placeholder="Line 1" required/>
      <div className="address-lines">
        <input type="text" id="add_line2" name="add_line2"  onChange={handleChange} placeholder="Line 2"/>
        <input type="text" id="add_line3" name="add_line3" onChange={handleChange} placeholder="Line 3"/>
      </div>
      
      <br />


      <label htmlFor="date">Expected Date : </label>
      <input type="date" id="date" name="date" onChange={handleChange} required></input>
      <br />

      <label htmlFor="doner_count"> Number of donations </label>
      <input type="number" id="doner_count" name="doner_count" placeholder="Enter the expected number of donars" onChange={handleNumberChange} required />

      <br />
      

          <label htmlFor="start_time" style={{width:'150px'}}> Starting Time : </label>
          <input type="time" id="start_time" name="start_time" onChange={handleChange} required ></input>
          <br />

          <label htmlFor="end_time"> Ending Time : </label>
          <input type="time" id="end_time" name="end_time" onChange={handleChange} required></input>
          <br />

          <label htmlFor="org_tele"> Contact Number: </label>
          <input type="tel" id="org_tele" name="org_tele" onChange={handleChange} required/>
          <br />
          <label htmlFor="org_email"> Email Address: </label>
          <input type="text" id="org_email" name="org_email" onChange={handleChange} required />
          <br />
          <input type="submit" value="Save"></input>
          {message &&
          <p className="message">{ message }</p>}
        </form>

        
      </div>
    </>
  );
}

export default CampReg;
