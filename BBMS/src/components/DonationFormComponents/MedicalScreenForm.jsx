import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DonationForm.css'
import { HiArrowCircleLeft } from "react-icons/hi";


export default function MedicalScreenForm() {
  const navigate = useNavigate();
  const submitID = sessionStorage.getItem("submitID");
  const [message, setMessage] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    jaundice: '',
    tbTyphoid: '',
    vaccinations: '',
    tattoos: '',
    imprisoned: '',
    foreignTravel: '',
    bloodTransfusion: '',
    malaria: '',
    dengue: '',
    recentIllness: '',
    dentalWork: '',
    recentMeds: '',
    riskyCategoriesAwareness: '',
    riskSymptoms: '',
  });

  const [errors, setErrors] = useState({
    jaundice:false,
    tbTyphoid: false,
    vaccinations: false,
    tattoos:false,
    imprisoned:false,
    foreignTravel:false,
    bloodTransfusion:false,
    malaria:false,
    dengue:false,
    recentIllness:false,
    dentalWork:false,
    recentMeds:false,
    riskyCategoriesAwareness:false,
    riskSymptoms:false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      jaundice: !form.jaundice,
      tbTyphoid: !form.tbTyphoid,
      vaccinations: !form.vaccinations,
      tattoos: !form.tattoos,
      imprisoned: !form.imprisoned,
      foreignTravel: !form.foreignTravel,
      bloodTransfusion: !form.bloodTransfusion,
      malaria: !form.malaria,
      dengue: !form.dengue,
      recentIllness: !form.recentIllness,
      dentalWork: !form.dentalWork,
      recentMeds: !form.recentMeds,
      riskyCategoriesAwareness: !form.riskyCategoriesAwareness,
      riskSymptoms: !form.riskSymptoms

    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      setMessage(<span> Please complete all <span className="required">*</span> fields </span>);
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    try{
      const response = await axios.post("http://localhost:9191/medicalRisk", {
        submitID:submitID,
        jaundice: form.jaundice,
        tbTyphoid: form.tbTyphoid,
        vaccinations: form.vaccinations,
        tattoos: form.tattoos,
        imprisoned: form.imprisoned,
        foreignTravel: form.foreignTravel,
        bloodTransfusion: form.bloodTransfusion,
        malaria: form.malaria,
        dengue: form.dengue,
        recentIllness: form.recentIllness,
        dentalWork: form.dentalWork,
        recentMeds: form.recentMeds,
        riskyCategoriesAwareness: form.riskyCategoriesAwareness,
        riskSymptoms: form.riskSymptoms
      });

      if (response.status === 201){
        setMessage("Redirecting...");
        navigate('../consent');      

      }else {
          setMessage([response.data?.message || "Medical Risk updating failed"]); 
          console.error(message);

        }

    }catch(error){
        setMessage(["Error submitting form. Please try again."]);
        console.error("Error submitting form:", error.message);

    }finally{
      setIsSubmitting(false);
    }   

  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate("../donation-history");
  }

  return (
    <div className="max-w-6xl mx-auto mt-5 bg-white rounded-xl p-5">
        <div className='flex justify-left flex-row align-baseline gap-2'>
          <button
                      onClick={handleBack}
                      className="mb-4 pl-0 pt-2 pb-2 justify-left text-red-600  hover:text-gray-900 dark:hover:text-white 
                              transition-colors duration-200
                             focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      <HiArrowCircleLeft size={40} />
                    </button>
          <div className='flex w-full flex-row justify-center'>
            <h2 className="text-2xl p-2 mt-1 font-bold text-gray-900 dark:text-white mb-4  ">
              Step 4: Medical & Risk Screening
            </h2>
          </div>
        </div > 
        
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Medical History */}
          <div className="bg-gray-200 dark:bg-red-500 rounded-lg shadow-3xl p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-black mb-4 text-center">
              Medical History
            </h3>
            <div className="  text-gray-700 dark:text-black space-y-6">
              {/* Jaundice/Hepatitis */}
              <div >
                <label className="block text-sm font-medium  dark:text-black mb-2">
                  <div className='flex flex-row'>Have you ever had jaundice/hepatitis? <span className='text-red-500'>*</span></div>
                </label>
                <select 
                  name="jaundice" 
                  onChange={handleChange}
                  value={form.jaundice}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">--Select--</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* TB/Typhoid */}
              <div>
                <label className="block text-sm font-medium dark:text-black mb-2">
                  <div className='flex flex-row'>Had TB or typhoid in the past 2 years? <span className='text-red-500'>*</span></div>
                </label>
                <select 
                  name="tbTyphoid" 
                  onChange={handleChange}
                  value={form.tbTyphoid}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">--Select--</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Vaccinations */}
              <div>
                <label className="block text-sm font-medium">
                  <div className='flex flex-row'>Received vaccinations in past 12 months?  <span className='text-red-500'>*</span></div>
                </label>
                <select 
                  name="vaccinations" 
                  onChange={handleChange}
                  value={form.vaccinations}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">--Select--</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Tattoos/Piercings */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Any tattoos, piercings or acupuncture in past year? <span className='text-red-500'>*</span>
                </label>
                <select 
                  name="tattoos" 
                  onChange={handleChange}
                  value={form.tattoos}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">--Select--</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Imprisonment */}
              <div>
                <label className="block text-sm font-medium  mb-2">
                  Ever imprisoned? <span className='text-red-500'>*</span>
                </label>
                <select 
                  name="imprisoned" 
                  onChange={handleChange}
                  value={form.imprisoned}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">--Select--</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Recent Medications */}
              <div>
                <label className="block text-sm font-medium  mb-2">
                  Used aspirin, antibiotics, or medications recently? <span className='text-red-500'>*</span>
                </label>
                <select 
                  name="recentMeds" 
                  onChange={handleChange}
                  value={form.recentMeds}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">--Select--</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Risk Symptoms */}
              <div>
                <label className="block text-sm font-medium  mb-2">
                  Do you have symptoms like unexplained fever, weight loss, or swollen lymph nodes? <span className='text-red-500'>*</span>
                </label>
                <select 
                  name="riskSymptoms" 
                  onChange={handleChange}
                  value={form.riskSymptoms}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">--Select--</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Column - Risk Assessment */}
          <div className="bg-gray-200 dark:bg-red-400 rounded-lg shadow-md p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-black dark:text-gray-900 mb-4 text-center">
              Risk Assessment
            </h3>
            <div className="space-y-6  text-gray-700 dark:text-black">
              {/* Foreign Travel */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  You or your partner traveled abroad in the last 3 months? <span className='text-red-500'>*</span>
                </label>
                <select 
                  name="foreignTravel" 
                  onChange={handleChange}
                  value={form.foreignTravel}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">--Select--</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Blood Transfusion */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  You or your partner received blood products? <span className='text-red-500'>*</span>
                </label>
                <select 
                  name="bloodTransfusion" 
                  onChange={handleChange}
                  value={form.bloodTransfusion}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">--Select--</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Malaria */}
              <div>
                <label className="block text-sm font-medium  mb-2">
                  Had malaria or treatment for it? <span className='text-red-500'>*</span>
                </label>
                <select 
                  name="malaria" 
                  onChange={handleChange}
                  value={form.malaria}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">--Select--</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Dengue */}
              <div>
                <label className="block text-sm font-medium  mb-2">
                  Dengue in the last 6 months? <span className='text-red-500'>*</span>
                </label>
                <select 
                  name="dengue" 
                  onChange={handleChange}
                  value={form.dengue}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">--Select--</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Recent Illness */}
              <div>
                <label className="block text-sm font-medium  mb-2">
                  Fever, measles, diarrhea, or long illness in the past month? <span className='text-red-500'>*</span>
                </label>
                <select 
                  name="recentIllness" 
                  onChange={handleChange}
                  value={form.recentIllness}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">--Select--</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Dental Work */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Dental extraction in the last week? <span className='text-red-500'>*</span>
                </label>
                <select 
                  name="dentalWork" 
                  onChange={handleChange}
                  value={form.dentalWork}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">--Select--</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Risk Categories Awareness */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Are you aware of disqualifying categories (HIV, Hep B/C, risky behavior)? <span className='text-red-500'>*</span>
                </label>
                <select 
                  name="riskyCategoriesAwareness" 
                  onChange={handleChange}
                  value={form.riskyCategoriesAwareness}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">--Select--</option>
                  <option value="yes">Yes, I'm aware</option>
                  <option value="no">No, not sure</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button - Full Width Below Both Columns */}
        <div className="mt-6 max-w-md mx-auto">
          <button 
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 
                     focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
                     text-white font-medium text-sm rounded-md transition-colors duration-200"
          >
            Next
          </button>
        </div>
        <br/>
        <p>{message}</p>
      </div>
  );
}
