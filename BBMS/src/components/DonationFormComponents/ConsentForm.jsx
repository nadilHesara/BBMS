import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DonationForm.css';
import { HiArrowCircleLeft } from "react-icons/hi";

export default function ConsentForm() {
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const donor_id = sessionStorage.getItem("userId");
  const submitID = sessionStorage.getItem("submitID");
  const campaignId = sessionStorage.getItem("campaignId");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [form, setForm] = useState({
    testConsent: false,
    instructionConsent: false,
    notifyConsent: false,
    frequency: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);


    try {
      const res = await axios.post("http://localhost:9191/consent", {
        submitID: submitID,
        testConsent: form.testConsent,
        instructionConsent: form.instructionConsent,
        notifyConsent:form.notifyConsent,
        frequency: form.frequency,
        DonerID: donor_id,
        campaignId: campaignId
      });

      if (res.status === 201){
        setSuccessMessage(  
        <>
        See you at {res.data?.Address} <br />
        on {res.data?.Date}
        </>
        );
        setShowPopup(true);

        setTimeout(() => {
          sessionStorage.removeItem("submitID");
          sessionStorage.removeItem("campaignId");
          setShowPopup(false);
          navigate('/dashboard');
      }, 8000);

      } else {
        console.log(res);
        setMessage([res.data?.message || "Submission failed. Please try again."]); 
      }

    } catch (error) {
      setMessage('Error connecting to server.');

    }finally{
      setIsSubmitting(false);
    }  
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate("../medical");
  }

  return (
    <div className="max-w-md mx-auto mt-5">
      <div className="bg-white w-[500px] dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8">
        <div className='flex justify-left flex-row align-baseline gap-2'>
          <button
            onClick={handleBack}
            className="mb-4 pl-0 pt-2 pb-2 justify-left text-red-600  hover:text-gray-900 dark:hover:text-white 
                    transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <HiArrowCircleLeft size={40} />
          </button>
          <h2 className="text-2xl p-2 mt-1 font-bold text-gray-900 dark:text-white mb-4 ">
            Step 5: Consent & Submission
          </h2>
        </div>


        <div className="space-y-6">
          {/* Test Consent */}
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="testConsent"
              checked={form.testConsent}
              onChange={handleChange}
              className="mt-1 h-4 w-4 text-red-600 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 
                         rounded focus:ring-red-500 focus:ring-2"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              I consent to testing my blood for HIV, Hepatitis B/C, Syphilis, Malaria.
            </span>
          </label>

          {/* Instruction Consent */}
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="instructionConsent"
              checked={form.instructionConsent}
              onChange={handleChange}
              className="mt-1 h-4 w-4 text-red-600 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 
                         rounded focus:ring-red-500 focus:ring-2"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              I agree to follow all instructions from NBTS.
            </span>
          </label>

          {/* Notify Consent */}
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="notifyConsent"
              checked={form.notifyConsent}
              onChange={handleChange}
              className="mt-1 h-4 w-4 text-red-600 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 
                         rounded focus:ring-red-500 focus:ring-2"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              I agree to be informed of my test results and follow guidance.
            </span>
          </label>

          {/* Frequency Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              How often do you want to donate?
            </label>
            <select
              name="frequency"
              onChange={handleChange}
              value={form.frequency}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
                         appearance-none cursor-pointer"
            >
              <option value="">--Select--</option>
              <option>Once in 4 months</option>
              <option>Once in 6 months</option>
              <option>Once a year</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 
                         focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
                         text-white font-medium text-sm rounded-md transition-colors duration-200"
            >
              Submit Declaration
            </button>
          </div>
          {showPopup && (
        <div className="popup">
          {successMessage}
      </div>
      )}
        </div>
      </div>
    </div>

      

    
  );
}
