import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DonationHistoryForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    donatedBefore: '',
    timesDonated: '',
    lastDonationDate: '',
    hadIssuesBefore: '',
    issueDetails: '',
    advisedNotToDonate: '',
    readInfoLeaflet: '',
    feelingWell: '',
    medicalConditions: [],
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    const newList = checked
      ? [...form.medicalConditions, value]
      : form.medicalConditions.filter((item) => item !== value);
    setForm({ ...form, medicalConditions: newList });
  };

  const handleNext = (e) => {
    e.preventDefault();
    localStorage.setItem('donationHistory', JSON.stringify(form));
    navigate('../medical');
  };

  return (
    // <div className="form-container">
    //   <h2>Step 3: Donation History</h2>
    //   <form onSubmit={handleNext}>
    //     <label>Have you donated blood before?
    //       <select name="donatedBefore" /*required*/ onChange={handleChange}>
    //         <option value="">--Select--</option>
    //         <option value="yes">Yes</option>
    //         <option value="no">No</option>
    //       </select>
    //     </label>

    //     {form.donatedBefore === 'yes' && (
    //       <>
    //         <label>How many times?
    //           <input name="timesDonated" type="number" onChange={handleChange} />
    //         </label>

    //         <label>Date of last donation:
    //           <input name="lastDonationDate" type="date" onChange={handleChange} />
    //         </label>
    //       </>
    //     )}

    //     <label>Did you experience issues during donation?
    //       <select name="hadIssuesBefore" onChange={handleChange}>
    //         <option value="">--Select--</option>
    //         <option value="yes">Yes</option>
    //         <option value="no">No</option>
    //       </select>
    //     </label>

    //     {form.hadIssuesBefore === 'yes' && (
    //       <label>What was the difficulty?
    //         <textarea name="issueDetails" onChange={handleChange}></textarea>
    //       </label>
    //     )}

    //     <label>Have you been advised not to donate?
    //       <select name="advisedNotToDonate" onChange={handleChange}>
    //         <option value="">--Select--</option>
    //         <option value="yes">Yes</option>
    //         <option value="no">No</option>
    //       </select>
    //     </label>

    //     <label>Have you read the information leaflet?
    //       <select name="readInfoLeaflet" onChange={handleChange}>
    //         <option value="">--Select--</option>
    //         <option value="yes">Yes</option>
    //         <option value="no">No</option>
    //       </select>
    //     </label>

    //     <label>Are you feeling well today?
    //       <select name="feelingWell" onChange={handleChange}>
    //         <option value="">--Select--</option>
    //         <option value="yes">Yes</option>
    //         <option value="no">No</option>
    //       </select>
    //     </label>

    //     <fieldset>
    //       <legend>Any of these medical conditions?</legend>
    //       <label><input type="checkbox" value="heart" onChange={handleCheckbox} /> Heart Disease</label>
    //       <label><input type="checkbox" value="diabetes" onChange={handleCheckbox} /> Diabetes</label>
    //       <label><input type="checkbox" value="fits" onChange={handleCheckbox} /> Fits</label>
    //       <label><input type="checkbox" value="stroke" onChange={handleCheckbox} /> Stroke</label>
    //       <label><input type="checkbox" value="asthma" onChange={handleCheckbox} /> Asthma/Lung</label>
    //       <label><input type="checkbox" value="liver" onChange={handleCheckbox} /> Liver Disease</label>
    //       <label><input type="checkbox" value="kidney" onChange={handleCheckbox} /> Kidney Disease</label>
    //       <label><input type="checkbox" value="blood" onChange={handleCheckbox} /> Blood Disorder</label>
    //     </fieldset>

    //     <button type="submit">Next</button>
    //   </form>
    // </div>
     
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
              <select 
                name="donatedBefore" 
                onChange={handleChange}
                value={form.donatedBefore}
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

            {/* Conditional fields for previous donors */}
            {form.donatedBefore === 'yes' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    How many times?
                  </label>
                  <input 
                    name="timesDonated" 
                    type="number" 
                    onChange={handleChange}
                    value={form.timesDonated}
                    placeholder="Enter number of donations"
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
                    onChange={handleChange}
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
                Did you experience issues during donation?
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
                Have you been advised not to donate?
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
                Have you read the information leaflet?
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

            {/* Feeling well today */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Are you feeling well today?
              </label>
              <select 
                name="feelingWell" 
                onChange={handleChange}
                value={form.feelingWell}
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
                        value={condition.value} 
                        onChange={handleCheckbox}
                        checked={form.medicalConditions.includes(condition.value)}
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
                onClick={handleNext}
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 
                         focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
                         text-white font-medium text-sm rounded-md transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
  
  );
}
