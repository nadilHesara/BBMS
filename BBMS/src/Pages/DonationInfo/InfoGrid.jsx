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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
            Donation History
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-1/3">
                Had Issues Before:
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium">
                {donatioInfo.hadIssuesBefore}
              </span>
            </div>
            {donatioInfo.hadIssuesBefore === 'Yes' && donatioInfo.issueDetails !== "" && (
              <div className="flex flex-col sm:flex-row">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-1/3">
                  Issue Details:
                </span>
                <span className="text-sm text-gray-900 dark:text-white font-medium">
                  {donatioInfo.issueDetails}
                </span>
              </div>
            )}
            <div className="flex flex-col sm:flex-row">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-1/3">
                Advised not to Donate:
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium">
                {donatioInfo.advisedNotToDonate}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-1/3">
                Read Info Leaflet:
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium">
                {donatioInfo.readInfoLeaflet}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-1/3">
                Medical Conditions:
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium">
                {donatioInfo.medicalConditions}
              </span>
            </div>
          </div>
        </div>

        {/* Medical & Risk Screening Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8 w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
            Medical & Risk Screening
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-1/2">
                Has donor ever had jaundice/hepatitis?:
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium">
                {donatioInfo.jaundice}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-1/2">
                Had TB or typhoid in the past 2 years?:
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium">
                {donatioInfo.tbTyphoid}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-1/2">
                Received vaccinations in past 12 months?:
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium">
                {donatioInfo.vaccinations}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-1/2">
                Any tattoos, piercings or acupuncture in past year?:
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium">
                {donatioInfo.tattoos}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-1/2">
                Ever imprisoned?:
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium">
                {donatioInfo.imprisoned}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-1/2">
                Used aspirin, antibiotics, or medications recently?:
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium">
                {donatioInfo.foreignTravel}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-1/2">
                Does donor have symptoms like unexplained fever, weight loss, or swollen lymph nodes?:
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium">
                {donatioInfo.bloodTransfusion}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-1/2">
                Donor or his/her partner traveled abroad in the last 3 months?:
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium">
                {donatioInfo.malaria}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-1/2">
                Donor or his/her received blood products?:
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium">
                {donatioInfo.dengue}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-1/2">
                Had malaria or treatment for it?:
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium">
                {donatioInfo.recentIllness}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-1/2">
                Dengue in the last 6 months?:
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium">
                {donatioInfo.dentalWork}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-1/2">
                Fever, measles, diarrhea, or long illness in the past month?:
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium">
                {donatioInfo.recentMeds}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-1/2">
                Dental extraction in the last week?:
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium">
                {donatioInfo.riskyCategoriesAwareness}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-1/2">
                Is donor aware of disqualifying categories (HIV, Hep B/C, risky behavior)?:
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium">
                {donatioInfo.riskSymptoms}
              </span>
            </div>
          </div>
        </div>

        {/* Consent Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8 w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
            Consent
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-2/3">
                Donor consent to testing my blood for HIV, Hepatitis B/C, Syphilis, Malaria:
              </span>
              <div className="flex items-center">
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
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-2/3">
                Donor agreed to follow all instructions from NBTS.:
              </span>
              <div className="flex items-center">
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
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-2/3">
                Donor agreed to be informed of my test results and follow guidance.:
              </span>
              <div className="flex items-center">
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
            <div className="flex flex-col sm:flex-row">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-full sm:w-2/3">
                How often donor wants to donate?:
              </span>
              <span className="text-sm text-gray-900 dark:text-white font-medium">
                {donatioInfo.frequency}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}