import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
export default function EligibilityCheck() {

  const donor_id = sessionStorage.getItem("userId");
  const [messages, setMessages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSubmitCases, setAutoSubmitCases] = useState(false);
  const [isalredy,setIsalready] = useState(false);

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
        const response = await axios.get(`http://localhost:9191/dashboard/donor?donor_id=${donor_id}`);

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
          await new Promise(resolve => setTimeout(resolve, 5000));

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
          if(error.response.data.message === "Duplicate entry found"){
            setMessages(prev => [...prev,"You've already registered for the campaign and currently not eligible to donate"]);
            setIsalready(true);
            await new Promise(resolve => setTimeout(resolve, 3000));
            navigate('/dashboard');

          }
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
        if(error.response.data.message === "Duplicate entry found"){
            sessionStorage.setItem("submitID", response.data?.SubmitID)
            sessionStorage.setItem("campaignId", campaignId);
            setIsalready(true);
            // navigate('/dashboard');
        }
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
        await new Promise(resolve => setTimeout(resolve, 3000));
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
   <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 px-6 py-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Eligibility Check</h2>
            <p className="text-red-100">Complete the form below to check your donation eligibility</p>
          </div>
          
          <div className="p-8">
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="flex flex-col text-sm font-medium text-gray-700 dark:text-gray-300">
                  Age (yrs): 
                  <input 
                    name="age" 
                    value={form.age} 
                    readOnly
                    className="mt-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors cursor-not-allowed"
                  />
                </label>
              </div>

              <div className="space-y-2">
                <label className="flex flex-col text-sm font-medium text-gray-700 dark:text-gray-300">
                  Weight (kg): 
                  <input 
                    name="weight" 
                    type="number" 
                    min="0" 
                    onBlur={(e) => {
                      const value = parseFloat(e.target.value);
                      if (!isNaN(value)) {
                      setForm(prev => ({ ...prev, weight: value }));
                      }
                    }} 
                    required
                    className="mt-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    placeholder="Enter your weight"
                  />
                </label>
              </div>

              <div className="space-y-2">
                <label className="flex flex-col text-sm font-medium text-gray-700 dark:text-gray-300">
                  Months since last donation: 
                  <input 
                    name="lastDonation" 
                    value={form.lastDonation} 
                    readOnly
                    className="mt-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors cursor-not-allowed"
                  />
                </label>
              </div>

              <div className="space-y-2">
                <label className="flex flex-col text-sm font-medium text-gray-700 dark:text-gray-300">
                  Months since foreign travel: 
                  <input 
                    name="foreignTravel" 
                    type="number" 
                    min="0"  
                    onBlur={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value)) {
                      setForm(prev => ({ ...prev, foreignTravel: value }));
                      }
                    }}
                    className="mt-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    placeholder="Enter months since travel"
                  />
                </label>
              </div>

              <div className="space-y-2">
                <label className="flex flex-col text-sm font-medium text-gray-700 dark:text-gray-300">
                  Any risk behavior? 
                  <select 
                    name="risk" 
                    onChange={handleChange}
                    className="mt-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                  >
                    <option value="">--Select--</option>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </label>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  disabled={form.eligible === '' || (form.eligible === false && autoSubmitCases)}
                  onClick={handleNext}
                  className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    "Proceed"
                  )}
                </button>
              </div>
              
              {messages.length > 0 && (
                <div className="space-y-3 pt-4">
                  {messages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-lg border-l-4 ${
                        msg.includes("eligible to donate") || msg.includes("Redirecting")
                          ? "bg-green-50 dark:bg-green-900/20 border-green-400 text-green-700 dark:text-green-400"
                          : msg.includes("Error") || msg.includes("Failed") || msg.includes("ineligible")
                          ? "bg-red-50 dark:bg-red-900/20 border-red-400 text-red-700 dark:text-red-400"
                          : "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400 text-yellow-700 dark:text-yellow-400"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {msg.includes("eligible to donate") || msg.includes("Redirecting") ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          ) : msg.includes("Error") || msg.includes("Failed") || msg.includes("ineligible") ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <p className="text-sm font-medium">{msg}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {isalredy && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {!form.eligible? ("Already Registered ineligible donor"):(
          "Already Registered eliginle donor"
        )} 
        
      </h3>
      {/*}
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        You've already registered for this campaign. What would you like to do?
      </p> */}

      <div className="flex justify-end space-x-3">
        <button
          onClick={() => {
            setIsalready(false);
            sessionStorage.removeitem("submitID");
            sessionStorage.removeitem("campaignId");
            navigate('/dashboard');
          }}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Return to Dashboard
        </button>
        <button
          onClick={() => {
            setIsalready(false);
            navigate("profileInfo", {state:{from:"DonationForm"}});
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Proceed
        </button>
      </div>
    </div>
  </div>
)}
    </div>
    
    
  );



}
