import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import './DonationForm.css'

export default function DonationHistoryForm() {
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const donor_id = sessionStorage.getItem("userId");
  const submitID = sessionStorage.getItem("submitID");

  const [form, setForm] = useState({
    donatedBefore: '',
    timesDonated: '',
    lastDonationDate: '',
    hadIssuesBefore: '',
    issueDetails: '',
    advisedNotToDonate: '',
    readInfoLeaflet: '',
    medicalConditions: [],
  });

  const [errors, setErrors] = useState({
    hadIssuesBefore:false,
    advisedNotToDonate: false,
    readInfoLeaflet: false
});

  useEffect(() => {
    
    const fetchdonorData = async () => {
    try {
        const response =await axios.get(`http://localhost:9191/dashboard/donor?donor_id=${donor_id}`);
        setForm(prev => ({
            ...prev,
            donatedBefore:response.data.Status,
            timesDonated:response.data.Count,
            lastDonationDate: response.data.LastDonation,                           
        }));

    }catch (error) {
        console.error("Error fetching Donor data:", error);
    }
    };

    if (donor_id) {
      fetchdonorData();
    }  

  }, [donor_id]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    const newList = checked
      ? [...form.medicalConditions, value]
      : form.medicalConditions.filter((item) => item !== value);
    setForm({ ...form, medicalConditions: newList });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      hadIssuesBefore: !form.hadIssuesBefore,
      advisedNotToDonate: !form.advisedNotToDonate,
      readInfoLeaflet: !form.readInfoLeaflet
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      setMessage(<span> Please complete all <span className="required">*</span> fields </span>);
      return;
    }

    const conditionsString = form.medicalConditions.join(',');
    if (isSubmitting) return;

    setIsSubmitting(true);
    try{
      const response = await axios.post("http://localhost:9191/donationHis", {
        submitID:submitID,
        hadIssuesBefore: form.hadIssuesBefore,
        issueDetails: form.issueDetails,
        advisedNotToDonate: form.advisedNotToDonate,
        readInfoLeaflet: form.readInfoLeaflet,
        medicalConditions: conditionsString || ''
      });

      if (response.status === 201){
        setMessage("Redirecting...");
        navigate('../medical',{state : {from:'/donationhistory'}});
      }

      else {
          console.log(response);
          setMessage([response.data?.message || "History updating failed"]); 
        }

    }catch(error){
        setMessage(["Error submitting form. Please try again."]);
        console.error("Error submitting form:", error.message);

    }finally{
      setIsSubmitting(false);
    }    
  };

  return (
    <div className="max-w-md mx-auto mt-5">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Step 3: Donation History
          </h2>
          
          <div className="space-y-6">
            {/* Have you donated before */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Have you donated blood before?
              </label>
                <input
                value={form.donatedBefore}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
                         appearance-none cursor-pointer"
                ></input>
              
            </div>

            {/* Conditional fields for previous donors */}
            {form.donatedBefore === 'Yes' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    How many times?
                  </label>
                  <input 
                    name="timesDonated" 
                    type="number" 
                    
                    value={form.timesDonated}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                             placeholder-gray-400 dark:placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date of last donation:
                  </label>
                  <input 
                    name="lastDonationDate" 
                    type="date" 
                    readOnly
                    value={form.lastDonationDate}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                             focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </>
            )}

            {/* Issues during donation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Did you experience issues during donation? <span className='text-red-500'>*</span>
              </label>
              <select 
                name="hadIssuesBefore" 
                onChange={handleChange}
                value={form.hadIssuesBefore}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
                         appearance-none cursor-pointer"
              >
                <option value="">--Select--</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Issue details */}
            {form.hadIssuesBefore === 'yes' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What was the difficulty?
                </label>
                <textarea 
                  name="issueDetails" 
                  onChange={handleChange}
                  value={form.issueDetails}
                  rows="3"
                  placeholder="Please describe the issues you experienced..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                           placeholder-gray-400 dark:placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                />
              </div>
            )}

            {/* Advised not to donate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Have you been advised not to donate? <span className='text-red-500'>*</span>
              </label>
              <select 
                name="advisedNotToDonate" 
                onChange={handleChange}
                value={form.advisedNotToDonate}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
                         appearance-none cursor-pointer"
              >
                <option value="">--Select--</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Read info leaflet */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Have you read the information leaflet? <span className='text-red-500'>*</span>
              </label>
              <select 
                name="readInfoLeaflet" 
                onChange={handleChange}
                value={form.readInfoLeaflet}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
                         appearance-none cursor-pointer"
              >
                <option value="">--Select--</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Medical conditions fieldset */}
            <div>
              <fieldset className="border border-gray-300 dark:border-gray-600 rounded-md p-4">
                <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 px-2">
                  Any of these medical conditions? 
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  {[
                    { value: 'heart', label: 'Heart Disease' },
                    { value: 'diabetes', label: 'Diabetes' },
                    { value: 'fits', label: 'Fits' },
                    { value: 'stroke', label: 'Stroke' },
                    { value: 'asthma', label: 'Asthma/Lung' },
                    { value: 'liver', label: 'Liver Disease' },
                    { value: 'kidney', label: 'Kidney Disease' },
                    { value: 'blood', label: 'Blood Disorder' }
                  ].map((condition) => (
                    <label key={condition.value} className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        value={condition.label} 
                        onChange={handleCheckbox}
                        checked={form.medicalConditions.includes(condition.label)}
                        className="h-4 w-4 text-red-600 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 
                                 rounded focus:ring-red-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {condition.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
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
            <p>{message}</p>
          </div>
        </div>
      </div>
  );
}
