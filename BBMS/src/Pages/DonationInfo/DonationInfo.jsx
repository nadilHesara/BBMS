import React, { useState, useEffect} from 'react'
import bloodgrp from '../../SharedData/bloodgrp';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import './DonationInfo.css';


function DonationInfo({ theme, setTheme }) {

    const location = useLocation();
    const navigate = useNavigate();

    const [donate, setDonate] = useState({
        donate_id: "M001",
        campaign_id: '',
        doner_id: '',
        name: '',
        age: '',
        blood_group: '',
        donate_time: '',
        pressure: '',
        weight: 0,
        sugar: '',
        blood_quantity: 0
    });

    const ageCalculator = (b_m,b_yr) => {
        const today = new Date();
        const currentYear = today.getFullYear();  
        const currentMonth = today.getMonth() + 1; 
        let ageYears = currentYear - b_yr;
        if (currentMonth < b_m) {
            ageYears--;
        }

        return ageYears;
    };

    useEffect(() => {
        const {campaign_Id, donorId} = location.state || {};
            setDonate(prev => ({
                ...prev,
                campaign_id: campaign_Id,
                doner_id: donorId
            }));
        
    }, [location.state]);

    useEffect(() => {

        const fetchdonorData = async () => {
        try {
            const response =await axios.get(`http://localhost:9191/dashboard/donor?donor_id=${donate.doner_id}&campaign=${donate.campaign_id}`);

            const data = response.data;

            const b_yr = data.BYear;
            const b_m = data.BMonth;
            const DAge = ageCalculator(b_m, b_yr);

            setDonate(prev => ({
                ...prev,
                name: data.Name,
                age: DAge,
                blood_group: data.BloodGroup,
            }));

        } catch (error) {
            console.error("Error fetching donor data:", error);
        }

    };

    if (donate.doner_id && donate.campaign_id) {
        fetchdonorData();
  }  

}, [donate.doner_id, donate.campaign_id]);


    const handleChange = (e) => {

        let value = e.target.value;
    
        if (e.target.name === 'blood_quantity') {
            value = parseInt(value);

        }else if (e.target.type === 'number') {
            value = parseFloat(value);
        }setDonate({
            ...donate,
            [e.target.name]: value
        });
        
    };   

    const handleUpdate = async (e) => {
        console.log(donate);
        try {
            const response = await fetch("http://localhost:9191/donations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...donate, 
                    weight: parseFloat(donate.weight),})
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                navigate('/dashboard/Donates',{
                    state: {
                        campaignId: donate.campaign_id,
                    }
                }
                );

            } else {
                alert("Update failed. Check server and data.");
                console.error("Error:", result);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Update failed. Check server and data.");
        }
    }

    return (

        <div className='donerinfoForm'>
            <div className='donerinfoCard'>

            <label htmlFor="campaignId" className='campID'>Campaign ID: {donate.campaign_id || 'Loading...'}</label>

            <h1 className='full-width'>Donor's Information </h1> 

            <div className='content-wrapper'>

                <div className="label-value-pair">
                    <span className='label'>Donor ID :</span>
                    <span className='valtext'>{donate.doner_id}</span>
                </div>

                <div className="label-value-pair">
                    <span className='label'>Name :</span>
                    <span className='valtext'>{donate.name}</span>
                </div>

                <div className="label-value-pair">
                    <span className='label'>Age :</span>
                    <span className='valtext'> {donate.age}+  yrs </span>
                </div>

                <div className="blood-group-container">
                    <span className='label'>Blood Group :</span>
                    <select name="blood_group" value={donate.blood_group} onChange={(e) => setDonate(prev => ({ ...prev, blood_group: e.target.value }))}>
                        <option value="">--Select--</option>
                            {bloodgrp.map((b, i) => (
                        <option key={i} value={b}>
                            {b}
                        </option>
                            ))}
                    </select>
                </div>

            </div>
            
            </div>
            <div className='donationinputsection'>
                <div className='donationinputgrouprow'>
                    
                    <div className='inputblock'>
                        <label htmlFor="weight">Weight:</label>
                        <input type="number" step='0.01' min='50' id="weight" name="weight" placeholder='kgs' onChange={handleChange} required/>
                    </div>
                    <div className='inputblock'>
                        <label htmlFor="bsugar">Blood Sugar:</label>
                        <input type='text' id="bsugar" name="sugar" placeholder='mg/dL' onChange={handleChange} required/>
                    </div>
                    <div className='inputblock'>
                        <label htmlFor="pressure">Blood Pressure:</label>
                        <input type="text" id="pressure" name="pressure" placeholder='mmHg' onChange={handleChange} required/>
                    </div>
                    <div className='inputblock'>
                        <label htmlFor="bquantity">Blood Quantity:</label>
                        <input type="int" step='1' min='0' id="bquantity" name="blood_quantity" placeholder='ml' onChange={handleChange}/>
                    </div>

                </div>
               <label htmlFor="time">Donated Time:</label>
                <input type="time" id="time" name="donate_time" onChange={handleChange} required/>
                <br/>
                <button type="button" className='updatebtn' onClick={handleUpdate}>Update</button>

            </div>
        </div>
 
    );
}

export default DonationInfo;