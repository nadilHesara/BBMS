import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";



export default function EligibilityCheck() {
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
    campaign_id: location.state?.campaign_Id || '',
    donor_id: location.state?.donorId || '',
    camp_date: location.state?.cdate || '',
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
      const {campaign_Id, donorId, date } = location.state || {};
          setInfo(prev => ({
              ...prev,
              campaign_id: campaign_Id,
              donor_id: donorId,
              camp_date: date,
          }));    
  }, [location.state]);

  useEffect(() => {

        const fetchdonorData = async () => {
        try {
            const response =await axios.get(`http://localhost:9191/dashboard/donor?donor_id=${info.donor_id}`);

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
            console.error("Error fetching donor data:", error);
        }

    };

    if (info.donor_id) {
        fetchdonorData();
  }  

}, [info.donor_id]);

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
    <div className="form-container">
      <h2>Eligibility Check</h2>
      <form>
        <label>Age (yrs): <input name="age"  value={form.age} readOnly/></label><br />
        <label>Weight (kg): <input name="weight" type="number" onChange={handleChange} /></label><br />
        <label>Months since last donation: <input name="lastDonation" value={form.lastDonation} readOnly/></label><br />
        {/* <label>Hemoglobin (g/dL): <input name="hemoglobin" type="number" step="0.1" onChange={handleChange} /></label><br /> */}
        <label>Months since foreign travel: <input name="foreignTravel" type="number" onChange={handleChange} /></label><br />
        <label>Any risk behavior? 
          <select name="risk" onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </label><br />
        <button
          type="button"
          disabled={!isEligible()}
          onClick={() => navigate('personal-info')}
        >
          Proceed to Declaration
        </button>
      </form>
    </div>
  );
}