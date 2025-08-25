import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { HiArrowCircleLeft } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

export default function InfoGrid(){
  const [donatioInfo, setDonationInfo] = useState(null);
  const navigate = useNavigate();
  const campaign_Id = Cookies.get('campaign_Id');
  const donorId = Cookies.get('donorId');

 useEffect(() => {

    const fetchInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:9191/dashboard/donatioInfo?donorId=${donorId}&campaignId=${campaign_Id}`);

        setDonationInfo(response.data);

      }catch(error){
        console.log("Error : ", error);
      }
    };

    if (donorId && campaign_Id) {
      fetchInfo();
    }
 }, [donorId,campaign_Id]);

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1); // Go back to previous page
  }

  if (!donatioInfo) {
    return (
      <div className="max-w-4xl mx-auto mt-5">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8">
          <p className="text-center text-gray-600 dark:text-gray-300">Loading Form details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-5 px-4">
      {/* Header with Back Button */}
      <div className='flex justify-left flex-row align-baseline gap-2 mb-6'>
        <button
          onClick={handleBack}
          className="mb-4 pl-0 pt-2 pb-2 justify-left text-red-600 hover:text-gray-900 dark:hover:text-white 
                  transition-colors duration-200
                 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <HiArrowCircleLeft size={40} />
        </button>
        <h1 className="text-3xl p-2 mt-1 font-bold text-gray-900 dark:text-white mb-4">
          Donation Information
        </h1>
      </div>

      <div className="space-y-6">
        {/* Donation History Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8 w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3 text-center">
            Donation History
          </h2>
          <div className="space-y-4 flex flex-col items-center">
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-2xl text-justify">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-1/2 text-center sm:text-right sm:pr-4">
                Had Issues Before :
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium w-full sm:w-1/2 text-center sm:text-left sm:pl-4">
                {donatioInfo.hadIssuesBefore}
              </span>
            </div>
            {donatioInfo.hadIssuesBefore === 'Yes' && donatioInfo.issueDetails !== "" && (
              <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-2xl text-justify">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-1/2 text-center sm:text-right sm:pr-4">
                  Issue Details :
                </span>
                <span className="text-sm text-gray-900 dark:text-white font-medium w-full sm:w-1/2 text-center sm:text-left sm:pl-4">
                  {donatioInfo.issueDetails}
                </span>
              </div>
            )}
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-2xl text-justify">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-1/2 text-center sm:text-right sm:pr-4">
                Advised not to Donate :
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium w-full sm:w-1/2 text-center sm:text-left sm:pl-4">
                {donatioInfo.advisedNotToDonate}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-2xl text-justify">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-1/2 text-center sm:text-right sm:pr-4">
                Read Info Leaflet :
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium w-full sm:w-1/2 text-center sm:text-left sm:pl-4">
                {donatioInfo.readInfoLeaflet}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-2xl text-justify">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-1/2 text-center sm:text-right sm:pr-4">
                Medical Conditions :
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium w-full sm:w-1/2 text-center sm:text-left sm:pl-4">
                {donatioInfo.medicalConditions}
              </span>
            </div>
          </div>
        </div>

        {/* Medical & Risk Screening Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8 w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3 text-center">
            Medical & Risk Screening
          </h2>
          <div className="space-y-4 flex flex-col items-center">
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-3xl text-justify">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-3/5 text-center sm:text-right sm:pr-4">
                Has donor ever had jaundice/hepatitis :
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium w-full sm:w-2/5 text-center sm:text-left sm:pl-4">
                {donatioInfo.jaundice}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-3xl text-justify">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-3/5 text-center sm:text-right sm:pr-4">
                Had TB or typhoid in the past 2 years :
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium w-full sm:w-2/5 text-center sm:text-left sm:pl-4">
                {donatioInfo.tbTyphoid}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-3xl text-justify">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-3/5 text-center sm:text-right sm:pr-4">
                Received vaccinations in past 12 months :
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium w-full sm:w-2/5 text-center sm:text-left sm:pl-4">
                {donatioInfo.vaccinations}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-3xl text-justify">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-3/5 text-center sm:text-right sm:pr-4">
                Any tattoos, piercings or acupuncture in past year :
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium w-full sm:w-2/5 text-center sm:text-left sm:pl-4">
                {donatioInfo.tattoos}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-3xl text-justify">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-3/5 text-center sm:text-right sm:pr-4">
                Ever imprisoned :
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium w-full sm:w-2/5 text-center sm:text-left sm:pl-4">
                {donatioInfo.imprisoned}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-3xl text-justify">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-3/5 text-center sm:text-right sm:pr-4">
                Used aspirin, antibiotics, or medications recently :
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium w-full sm:w-2/5 text-center sm:text-left sm:pl-4">
                {donatioInfo.foreignTravel}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-3xl text-justify">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-3/5 text-center sm:text-right sm:pr-4">
                Does donor have symptoms like unexplained fever, weight loss, or swollen lymph nodes :
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium w-full sm:w-2/5 text-center sm:text-left sm:pl-4">
                {donatioInfo.bloodTransfusion}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-3xl text-justify">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-3/5 text-center sm:text-right sm:pr-4">
                Donor or his/her partner traveled abroad in the last 3 months :
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium w-full sm:w-2/5 text-center sm:text-left sm:pl-4">
                {donatioInfo.malaria}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-3xl text-justify">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-3/5 text-center sm:text-right sm:pr-4">
                Donor or his/her received blood products :
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium w-full sm:w-2/5 text-center sm:text-left sm:pl-4">
                {donatioInfo.dengue}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-3xl text-justify">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-3/5 text-center sm:text-right sm:pr-4">
                Had malaria or treatment for it :
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium w-full sm:w-2/5 text-center sm:text-left sm:pl-4">
                {donatioInfo.recentIllness}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-3xl text-justify">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-3/5 text-center sm:text-right sm:pr-4">
                Dengue in the last 6 months :
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium w-full sm:w-2/5 text-center sm:text-left sm:pl-4">
                {donatioInfo.dentalWork}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-3xl text-justify">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-3/5 text-center sm:text-right sm:pr-4">
                Fever, measles, diarrhea, or long illness in the past month :
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium w-full sm:w-2/5 text-center sm:text-left sm:pl-4">
                {donatioInfo.recentMeds}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-3xl text-justify">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-3/5 text-center sm:text-right sm:pr-4">
                Dental extraction in the last week :
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium w-full sm:w-2/5 text-center sm:text-left sm:pl-4">
                {donatioInfo.riskyCategoriesAwareness}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-3xl text-justify">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-3/5 text-center sm:text-right sm:pr-4">
                Is donor aware of disqualifying categories (HIV, Hep B/C, risky behavior) :
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium w-full sm:w-2/5 text-center sm:text-left sm:pl-4">
                {donatioInfo.riskSymptoms}
              </span>
            </div>
          </div>
        </div>

        {/* Consent Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8 w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3 text-center">
            Consent
          </h2>
          <div className="space-y-4 flex flex-col items-center">
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-3xl text-justify">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-3/5 text-center sm:text-right sm:pr-4">
                Donor consent to testing my blood for HIV, Hepatitis B/C, Syphilis, Malaria:
              </span>
              <div className="flex items-center justify-center sm:justify-center w-full sm:w-2/5 sm:pl-4">
                {donatioInfo.testConsent && (
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
                <span className="text-sm text-gray-900 dark:text-white font-medium">
                  {donatioInfo.testConsent}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-3xl text-justify">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-3/5 text-center sm:text-right sm:pr-4">
                Donor agreed to follow all instructions from NBTS.:
              </span>
              <div className="flex items-center justify-center sm:justify-center w-full sm:w-2/5 sm:pl-4">
                {donatioInfo.instructionConsent && (
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
                <span className="text-sm text-gray-900 dark:text-white font-medium">
                  {donatioInfo.instructionConsent}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-3xl text-justify">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-3/5 text-center sm:text-right sm:pr-4">
                Donor agreed to be informed of my test results and follow guidance.:
              </span>
              <div className="flex items-center justify-center sm:justify-center w-full sm:w-2/5 sm:pl-4">
                {donatioInfo.notifyConsent && (
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
                <span className="text-sm text-gray-900 dark:text-white font-medium">
                  {donatioInfo.notifyConsent}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-3xl text-justify">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-3/5 text-center sm:text-right sm:pr-4">
                How often donor wants to donate?:
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium w-full sm:w-2/5 text-center sm:text-left sm:pl-4">
                {donatioInfo.frequency}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}