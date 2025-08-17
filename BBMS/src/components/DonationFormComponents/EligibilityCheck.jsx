import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";



export default function EligibilityCheck() {

  const donor_id = sessionStorage.getItem("userId");
  const [form, setForm] = useState({
    age: '',
    weight: '',
    lastDonation: '',
    // hemoglobin: '',
    foreignTravel: '',
    risk: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  const[info, setInfo] = useState({
    campaign_id: location.state?.campaignId || '',
    camp_date: location.state?.campdate || '',
  });

  const parseDate = (dateString) => {
    if (!dateString) return null;
    try{
      const dateParts = dateString.split('-');
      if (dateParts.length !== 3) return null;
      const [yearStr, monthStr, dayStr] = dateParts;
      return {
        year: parseInt(yearStr, 10),
        month: parseInt(monthStr, 10),
        day: parseInt(dayStr, 10)
      };
    }catch (error) {
      console.error("Error parsing date:", error);
      return null;
    }
  };

    const durationCalculator = (last_m, last_yr, currentMonth, currentYear) => {
      let duration_yr = currentYear - last_yr;
      let duration_m = currentMonth - last_m;

      if (duration_m < 0) {
          duration_yr--;
          duration_m += 12;
      }
      return duration_yr * 12 + duration_m;
    };

    const ageCalculator = (b_m,b_yr, currentMonth, currentYear) => {
      let ageYears = currentYear - b_yr;
      if (currentMonth < b_m) {
          ageYears--;
      }

      return ageYears;
    };



  useEffect(() => {
      const {campaign_Id, date } = location.state || {};
          setInfo(prev => ({
              ...prev,
              campaign_id: campaign_Id,
              camp_date: date,
          }));



  }, [location.state]);

  useEffect(() => {
        
        const fetchdonorData = async () => {
        try {
            const response =await axios.get(`http://localhost:9191/dashboard/donor?donor_id=${donor_id}`);

            const data = response.data;
  
            const campdate = parseDate(info.camp_date);
            if (!campdate) {
              console.error("Invalid campaign date format");
              return;
            }

            const currentYear = campdate.year;
            const currentMonth = campdate.month;


            const b_yr = data.BYear;
            const b_m = data.BMonth;
            const DAge = ageCalculator(b_m, b_yr, currentMonth, currentYear);

            const lastDonation_yr = data.LastDonationYR;
            const lastDonation_m = data.LastDonationMonth;
            let duration = 0;
            if (lastDonation_m != " " && lastDonation_yr != " "){
              duration = durationCalculator(lastDonation_m, lastDonation_yr, currentMonth, currentYear);
            }else{
              duration = "No Previous Donations";
            }

            setForm(prev => ({
                ...prev,
                age: DAge,
                lastDonation: duration,
            }));

        } catch (error) {
            console.error("Error fetching Donor data:", error);
        }

    };

    if (donor_id) {
        fetchdonorData();
  }  

}, [donor_id]);

  useEffect (()=> {
  
      if (form.age && form.age < 18){
        alert("You are too yong to donate blood");
      }else if (form.age > 60){
        alert("Thank you great citizen. You are now beyond the eligible limit for blood donation");               
      }
  },[form.age]);


  useEffect (()=> {
  
      if (form.lastDonation && form.lastDonation !== "No Previous Donations" && form.lastDonation < 4 || form.lastDonation === 0){
          alert("You are temporarily ineligible due to recent donations. Thank you for your support!");
      }
  },[form.lastDonation]);

  useEffect (()=> {
  
      if (form.risk && form.risk === "yes"){
        alert("You’re temporarily ineligible to donate due to risky behavior");
      }
  },[form.risk]);


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });


  const isEligible = () => {
    return (
      form.age >= 18 &&
      form.age <= 60 &&
      form.weight >= 50 &&
      (form.lastDonation >= 4 || form.lastDonation === "No Previous Donations") &&
      // form.hemoglobin >= 12.5 &&
      form.foreignTravel >= 3 &&
      form.risk === 'no'
    );
  };

  return (
    // <div className="form-container">
    //   <h2>Eligibility Check</h2>
    //   <form>
    //     <label>Age (yrs): <input name="age"  value={form.age} yrs readOnly/></label><br />
    //     <label>Weight (kg): <input name="weight" type="number" onChange={handleChange} 
    //        onBlur={() => {if (form.weight && form.weight < 50) {alert("Sorry, you must meet the minimum weight to donate safely");}}} /></label><br />

    //     <label>Months since last donation: <input name="lastDonation" value={form.lastDonation} readOnly/></label><br />
    //     {/* <label>Hemoglobin (g/dL): <input name="hemoglobin" type="number" step="0.1" onChange={handleChange} /></label><br /> */}

    //     <label>Months since foreign travel: <input name="foreignTravel" type="number" onChange={handleChange} 
    //       onBlur={() => {if (form.foreignTravel && form.foreignTravel < 3) {alert("Sorry, Foreign travels within the last 3 months makes you temporarily ineligible to donate");}}} /></label><br />

    //     <label>Any risk behavior? 
    //       <select name="risk" onChange={handleChange}>
    //         <option value="">--Select--</option>
    //         <option value="no">No</option>
    //         <option value="yes">Yes</option>
    //       </select>
    //     </label><br />
    //     <button
    //       type="button"
    //       disabled={!isEligible()}
    //       onClick={() => navigate("profileInfo", {state:{from:"DonationForm"}})}
    //     >
    //       Proceed to Declaration
    //     </button>
    //   </form>
    // </div>
    
      <div className=" max-w-md mx-auto mt-5">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Eligibility Check
          </h2>
          
          <div className="space-y-6">
            {/* Age Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Age (yrs)
              </label>
              <input
                name="age"
                value={form.age}
                
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white 
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Weight Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Weight (kg)
              </label>
              <input
                name="weight"
                type="number"
                value={form.weight}
                onChange={handleChange}
                onBlur={() => {
                  if (form.weight && form.weight < 50) {
                    alert("Sorry, you must meet the minimum weight to donate safely");
                  }
                }}
                placeholder="Enter weight in kg"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                         placeholder-gray-400 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Last Donation Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Months since last donation
              </label>
              <input
                name="lastDonation"
                value={form.lastDonation}
               
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white 
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Foreign Travel Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Months since foreign travel
              </label>
              <input
                name="foreignTravel"
                type="number"
                value={form.foreignTravel}
                onChange={handleChange}
                onBlur={() => {
                  if (form.foreignTravel && form.foreignTravel < 3) {
                    alert("Sorry, Foreign travels within the last 3 months makes you temporarily ineligible to donate");
                  }
                }}
                placeholder="Enter number of months"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                         placeholder-gray-400 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Risk Behavior Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Any risk behavior?
              </label>
              <select
                name="risk"
                value={form.risk}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
                         appearance-none cursor-pointer"
              >
                <option value="">--Select--</option>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="button"
                disabled={!isEligible()}
                onClick={() => navigate("profileInfo", {state:{from:"DonationForm"}})}
                className={`w-full py-3 px-4 rounded-md text-white font-medium text-sm transition-colors duration-200 
                          ${isEligible() 
                            ? 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800' 
                            : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                          }`}
              >
                Proceed to Declaration
              </button>
            </div>
          </div>

          {/* Eligibility Status Indicator */}
          <div className="mt-4 text-center">
            <span className={`text-sm font-medium ${
              isEligible() 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              {isEligible() ? '✓ Eligible to proceed' : 'Please complete all requirements'}
            </span>
          </div>
        </div>
      </div>
    
  );
}