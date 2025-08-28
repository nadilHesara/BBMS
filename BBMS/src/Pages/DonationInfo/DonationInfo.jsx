import React, { useState, useEffect, useContext } from 'react'
import bloodgrp from '../../SharedData/bloodgrp';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import './DonationInfo.css';
import { LoadingContext } from '../../context/LoadingContext';
import { toast } from 'react-toastify';
import useVerifyAccess from '../../SharedData/verifyFunction';

import Cookies from 'js-cookie';

function DonationInfo({ theme, setTheme }) {
    useVerifyAccess("DonationInfo");
    const { loading, setLoading } = useContext(LoadingContext);
    const campaignName = Cookies.get('campName');
    const campaign_Id = Cookies.get('campaign_Id');
    const donorId = Cookies.get('donorId');
    const cdate = Cookies.get('cdate');
    const navigate = useNavigate();
    const [eligible, setEligible] = useState();
    const [filled, setFilled] = useState();

    const [donate, setDonate] = useState({
        donate_id: "M001",
        campaign_id: '',
        camp_date: '',
        doner_id: '',
        name: '',
        age: '',
        blood_group: '',
        donate_time: '',
        pressure: '',
        weight: 0,
        sugar: '',
        blood_quantity: 0,
        Telephone: ''
    });

    const parseDate = (dateString) => {
        if (!dateString) return null;

        try {
            const dateParts = dateString.split('-');
            if (dateParts.length !== 3) return null;
            const [yearStr, monthStr, dayStr] = dateParts;
            return {
                year: parseInt(yearStr, 10),
                month: parseInt(monthStr, 10),
                day: parseInt(dayStr, 10)
            };

        } catch (error) {
            console.error("Error parsing date:", error);
            return null;
        }
    };

    const ageCalculator = (b_m, b_yr, currentMonth, currentYear) => {
        let ageYears = currentYear - b_yr;

        if (currentMonth < b_m) {
            ageYears--;
        }

        return ageYears;
    };

    useEffect(() => {

        setDonate(prev => ({
            ...prev,
            campaign_id: campaign_Id,
            doner_id: donorId,
            camp_date: cdate,
        }));
    }, []);

    useEffect(() => {
        const fetch_eligibility = async () => {
            try {
                const response2 = await axios.get(`http://localhost:9191/dashboard/eligibility?donor_id=${donate.doner_id}&campaign_Id=${donate.campaign_id}`);
                const data = response2.data;
                setEligible(data.eligible);
                if(data.filled==="Yes"){
                    setFilled(true);
                }else{
                    setFilled(false);
                }
              
                
            } catch (error) {
                console.error("Error fetching eligibility data:", error);
            } 
        };

        if (donate.doner_id && donate.campaign_id) {
            fetch_eligibility();
        }
    }, [donate.doner_id,donate.campaign_id]);

    useEffect(() => {
        const fetchdonorData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:9191/dashboard/donor?donor_id=${donate.doner_id}`);
                const data = response.data;
                const campdate = parseDate(donate.camp_date);

                if (!campdate) {
                    console.error("Invalid campaign date format", campdate);
                    return;
                }
                const currentYear = campdate.year;
                const currentMonth = campdate.month;
                const b_yr = data.BYear;
                const b_m = data.BMonth;
                const DAge = ageCalculator(b_m, b_yr, currentMonth, currentYear);

                setDonate(prev => ({
                    ...prev,
                    name: data.Name,
                    age: DAge,
                    blood_group: data.BloodGroup,
                    Telephone: data.Telephone
                }));
            } catch (error) {
                console.error("Error fetching donor data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (donate.doner_id) {
            fetchdonorData();
        }
    }, [donate.doner_id]);

    const handleChange = (e) => {
        let value = e.target.value;

        if (e.target.name === 'blood_quantity') {
            value = parseInt(value);
        } else if (e.target.type === 'number') {
            value = parseFloat(value);
        } 
        setDonate({
            ...donate,
            [e.target.name]: value
        });
    };

    const handleUpdate = async (e) => {
        try {
            const response = await fetch("http://localhost:9191/donations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...donate,
                    weight: parseFloat(donate.weight),
                })
            });

            const result = await response.json();

            if (response.ok) {
                toast.success(result.message);
                navigate('/dashboard/donates', {
                    state: {
                        campaignId: donate.campaign_id,
                        campdate: donate.camp_date
                    }
                });

            } else if (result.message.match(/Duplicate entry '.*?'/)) {
                const errorMsg = "Donation is already added.";
                toast.warning(errorMsg);
            
            
            }else {
                toast.error("Update failed. Check server and data.");
                console.error("Error:", result);
                
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Update failed. Check server and data.");
        }
    }

    return (
        <div className='donerinfoForm'>
            <div className={eligible && filled ?'donerinfoCard':'donerinfoCard1'}>
                <label htmlFor="campaignId" className='campID'>Campaign Name: {campaignName || 'Loading...'}</label>
                <h1 className='full-width'>Donor's Information</h1>

                <div className='content-wrapper'>

                    <div className="label-value-pair">
                        <span className='label'>Name :</span>
                        <span className='valtext'>{donate.name}</span>
                    </div>

                    <div className="label-value-pair">
                        <span className='label'>Age :</span>
                        <span className='valtext'> {donate.age}+ yrs </span>
                    </div>

                    <div className="label-value-pair">
                        <span className='label'>Contact no. :</span>
                        <span className='valtext'> {donate.Telephone}</span>
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

                    {/* Status Badges Section */}
                    <div className="mt-6 space-y-3">
                        {/* Eligibility Status */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Eligibility Status:
                            </span>
                            <div className="flex items-center">
                                {eligible===true ? (
                                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Eligible
                                    </div>
                                ) : eligible === "Eligilbity Not Found" ?(
                                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                            Eligilbity Not Found
                                    </div>
                                ):(
                                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                        Not Eligible
                                    </div>

                                )}
                            </div>
                        </div>

                        {/* Form Status - Only show if eligible */}
                        {eligible && (
                            <div className="flex flex-col items-start">
                                <div className="flex items-center justify-between w-full mb-2">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Form Status:
                                    </span>
                                    <div className="flex items-center">
                                        {filled ? (                             
                                            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 dark:bg-blue-900 dark:text-blue-200">
                                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                                                    <path fillRule="evenodd" d="M6 10a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
                                                </svg>
                                                Completed
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-orange-800 dark:bg-yellow-900 dark:text-yellow-200">
                                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                </svg>
                                                Pending
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Form Details Button - Only show when form is completed */}
                                {filled && (
                                    <div className="w-full flex justify-center">
                                        <button 
                                            type="button" 
                                            className='updatebtn2' 
                                            onClick={() => navigate("/dashboard/InfoGrid")}
                                        >
                                            Form Details
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </div>

                {eligible && !filled? (
                <div>                
                    <button
                    className="navigatebtn" onClick={() => navigate('/dashboard/donates')}> Fill the Form                 
                    </button>
                </div>
                ):("")}
            </div>
                
                {eligible && filled ? (
                <div className='donationinputsection'>
                    <div className='donationinputgrouprow'>
                        <div className='inputblock'>
                            <label htmlFor="weight">Weight:</label>
                            <input type="number" step='0.01' min='50' id="weight" name="weight" placeholder='kgs' onChange={handleChange} required />
                        </div>
                        <div className='inputblock'>
                            <label htmlFor="bsugar">Blood Sugar:</label>
                            <input type='text' id="bsugar" name="sugar" placeholder='mg/dL' onChange={handleChange} required />
                        </div>
                        <div className='inputblock'>
                            <label htmlFor="pressure">Blood Pressure:</label>
                            <input type="text" id="pressure" name="pressure" placeholder='mmHg' onChange={handleChange} required />
                        </div>
                        <div className='inputblock'>
                            <label htmlFor="bquantity">Blood Quantity:</label>
                            <input type="int" step='1' min='0' id="bquantity" name="blood_quantity" placeholder='ml' onChange={handleChange} />
                        </div>
                    </div>
                    <label htmlFor="time">Donated Time:</label>
                    <input type="time" id="time" name="donate_time" onChange={handleChange} required />
                    <br />
                    <br/>
                    <div className='button-container'>
                    <button type="button" className='updatebtn' onClick={handleUpdate}>Update</button>
                    </div>
                </div>
                ):("")}
 
                


        </div>
    );
}

export default DonationInfo;