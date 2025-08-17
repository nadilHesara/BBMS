import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";



export default function EligibilityCheck() {

  const donor_id = sessionStorage.getItem("userId");
  const [messages, setMessages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSubmitCases, setAutoSubmitCases] = useState(false);

  const [form, setForm] = useState({
    submitID: "S001",
    age: '',
    weight: '',
    lastDonation: '',
    foreignTravel: '',
    risk: '',
    eligible: '',    
  });

  const navigate = useNavigate();
  const location = useLocation();

  const [campaignId, setCampaignId] = useState(location.state?.campaignId || '');
  const [campDate, setCampDate] = useState(location.state?.campdate || '');


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
    if (location.state){
      setCampaignId(location.state.campaignId || '');
      setCampDate(location.state.campdate || '');
    }

  }, [location.state]);


  useEffect(() => {
        
        const fetchdonorData = async () => {
        try {
            const response =await axios.get(`http://localhost:9191/dashboard/donor?donor_id=${donor_id}`);

            const data = response.data;
  
            const campdate = parseDate(campDate);

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
       const newMessages = [];
       let isEligible = true;
       let isAutoSubmitCase = false;

      if (form.age){
        if (form.age < 18){
          isEligible = false;
          isAutoSubmitCase = true;
          newMessages.push("You are too yong to donate blood. Redirecting to dashboard");

        }else if (form.age > 60){
          isEligible = false;
          isAutoSubmitCase = true;
          newMessages.push("Thank you great citizen. You are now beyond the eligible limit for blood donation. Redirecting to dashboard");               
        }
      }

      if (form.lastDonation && form.lastDonation !== "No Previous Donations" && form.lastDonation < 4 || form.lastDonation === 0){
          isEligible = false;
          isAutoSubmitCase = true;
          newMessages.push("You are temporarily ineligible due to recent donations. Thank you for your support! Redirecting to dashboard");
      }

      if (form.risk && form.risk === "yes"){
        isEligible = false;
        newMessages.push("You’re temporarily ineligible to donate due to risky behavior");
      }

      if (form.weight && form.weight < 50) {
        isEligible = false;
        newMessages.push("Your weight is below the minimum requirement for donation");
      }

      if (form.foreignTravel && form.foreignTravel < 3) {
        isEligible = false;
        newMessages.push("Foreign travels within the last 3 months makes you temporarily ineligible to donate");
      }
      
      setForm(prev => ({...prev, eligible: isEligible}));
      setAutoSubmitCases(isAutoSubmitCase);
      setMessages(newMessages)

  }, [form.age, form.lastDonation, form.risk, form.weight, form.foreignTravel]);

  

  useEffect (() => {
    if (form.eligible === false && autoSubmitCases && campaignId){

        const autoSubmit = async () => {
        setIsSubmitting(true);

        try { 
          await new Promise(resolve => setTimeout(resolve, 8000));

          const response = await axios.post("http://localhost:9191/eligibility", {
            submitID: form.submitID,
            DonerID: donor_id,
            eligible: false,
            CampaignID: campaignId
          });

          if(response.status==201){
            navigate('/dashboard');
          }
          

        }catch(error){
          console.error("Auto submit failed:", error);
          setMessages(prev => [...prev, "Failed to submit. Please try again."]);
        }finally{
          setIsSubmitting(false);
        }
      };

      autoSubmit();
    }
  }, [form.eligible, autoSubmitCases, campaignId]);

  const validateForm = () => {
    const errors = [];
    
    if (!form.weight || form.weight < 50) {
      errors.push("Weight must be at least 50kg");
    }
    
    if (!form.risk) {
      errors.push("Please select risk behavior option");
    }
    
    return errors;
};

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });


  const handleNext = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if(form.eligible === true){

      const validationErrors = validateForm();
        if (validationErrors.length > 0) {
          setMessages(validationErrors);
          return;
        }

      setIsSubmitting(true);
      try {
        const response = await axios.post("http://localhost:9191/eligibility", {
          submitID: form.submitID,
          ...(Number.isInteger(parseInt(form.foreignTravel))
              ? { foreignTravel: parseInt(form.foreignTravel) }
              : {}),
          risk: form.risk,
          DonerID: donor_id,
          eligible: true,
          CampaignID: campaignId
        });


        if (response.status === 201) {
          setMessages(["You are eligible to donate. Redirecting..."]);
          await new Promise(resolve => setTimeout(resolve, 2000));
          sessionStorage.setItem("submitID", response.data?.SubmitID)
          sessionStorage.setItem("campaignId", campaignId);
          navigate("profileInfo", {state:{from:"DonationForm"}});

        }else {
          console.log(response);
          setMessages([response.data?.message || "Eligibility check failed"]); 
        }

      }catch(error){
        setMessages(["Error submitting form. Please try again."]);
        console.error("Error submitting form:", error.message);

      }finally{
        setIsSubmitting(false);
      }

  }else if(form.eligible === false && campaignId){

      setIsSubmitting(true);
      try { 
      const response = await axios.post("http://localhost:9191/eligibility", {
        submitID: form.submitID,
        DonerID: donor_id,
        eligible: form.eligible,
        CampaignID: campaignId
      });

      if(response.status==201){
        setMessages(["You are not eligible to donate. Redirecting to dashboard"]);
        await new Promise(resolve => setTimeout(resolve, 5000));
        navigate('/dashboard');
      }
      

    }catch(error){
      console.error("Auto submit failed:", error);
      setMessages(prev => [...prev, "Failed to submit. Please try again."]);
    }finally{
      setIsSubmitting(false);
    }
  }  
};

useEffect (() => {
    if (form.age !== '' && form.lastDonation !== '' && form.weight !== '' && form.foreignTravel !== '' && form.risk !== '') {
    const isEligible = (
        form.age >= 18 &&
        form.age <= 60 &&
        form.weight >= 50 &&
        (form.lastDonation >= 4 || form.lastDonation === "No Previous Donations") &&
        form.foreignTravel >= 3 &&
        form.risk === 'no'
  );
    setForm(prev => ({ ...prev, eligible:isEligible }));
  }
  }, [form.age, form.weight, form.lastDonation, form.foreignTravel, form.risk]);


return (
    <div className="form-container">
      <h2>Eligibility Check</h2>
      <form >
        <label>Age (yrs): <input name="age"  value={form.age} readOnly/></label><br />

        <label>Weight (kg): <input name="weight" type="number" min="0" 
         onBlur={(e) => {
          const value = parseFloat(e.target.value);
          if (!isNaN(value)) {
          setForm(prev => ({ ...prev, weight: value }));
          }}} required/></label><br />

        <label>Months since last donation: <input name="lastDonation" value={form.lastDonation} readOnly/></label><br />

        <label>Months since foreign travel: <input name="foreignTravel" type="number" min="0"  
          onBlur={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value)) {
            setForm(prev => ({ ...prev, foreignTravel: value }));
            }}}/></label><br />

        <label>Any risk behavior? 
          <select name="risk" onChange={handleChange} >
            <option value="">--Select--</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </label><br />

        <button
          type="button"
          disabled={form.eligible === '' || (form.eligible === false && autoSubmitCases)}
          onClick={handleNext}
        >
          {isSubmitting ? "Processing..." : "Proceed"}
        </button>
        
        {messages.length > 0 && (
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className="message">
                {msg}
              </div>
           ))}
          </div>
      )}

      </form>
    </div>
  );
}