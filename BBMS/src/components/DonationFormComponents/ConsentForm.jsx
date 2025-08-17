import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiArrowCircleLeft } from  "react-icons/hi";

export default function ConsentForm() {
  const navigate = useNavigate();
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

    const personalInfo = JSON.parse(localStorage.getItem('personalInfo') || '{}');
    const donationHistory = JSON.parse(localStorage.getItem('donationHistory') || '{}');
    const medicalScreen = JSON.parse(localStorage.getItem('medicalScreen') || '{}');

    const allData = {
      ...personalInfo,
      ...donationHistory,
      ...medicalScreen,
      ...form,
    };

    try {
      const res = await fetch('http://localhost:8080/api/donor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allData),
      });

      if (res.ok) {
        localStorage.clear();
        navigate('../success');
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      alert('Error connecting to server.');
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate("../medical");
  }


  return (
    // <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
    //   <div className="max-w-md mx-auto">
    //     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8">
    //   <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Step 5: Consent & Submission</h2>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       <input
    //         type="checkbox"
    //         name="testConsent"
    //         checked={form.testConsent}
    //         onChange={handleChange}
    //         // required
    //       />
    //       I consent to testing my blood for HIV, Hepatitis B/C, Syphilis, Malaria.
    //     </label>

    //     <label>
    //       <input
    //         type="checkbox"
    //         name="instructionConsent"
    //         checked={form.instructionConsent}
    //         onChange={handleChange}
    //         // required
    //       />
    //       I agree to follow all instructions from NBTS.
    //     </label>

    //     <label>
    //       <input
    //         type="checkbox"
    //         name="notifyConsent"
    //         checked={form.notifyConsent}
    //         onChange={handleChange}
    //         // required
    //       />
    //       I agree to be informed of my test results and follow guidance.
    //     </label>

    //     <label>How often do you want to donate?
    //       <select name="frequency" /*required*/ onChange={handleChange}>
    //         <option value="">--Select--</option>
    //         <option>Once in 4 months</option>
    //         <option>Once in 6 months</option>
    //         <option>Once a year</option>
    //       </select>
    //     </label>

    //     <button type="submit">Submit Declaration</button>
    //   </form>
    // </div>
    // </div>
    // </div>

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
              onClick={handleSubmit}
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 
                         focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
                         text-white font-medium text-sm rounded-md transition-colors duration-200"
            >
              Submit Declaration
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}
