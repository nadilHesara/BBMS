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
    <div className="form-container">
      <h2>Step 3: Donation History</h2>
      <form onSubmit={handleNext}>
        <label>Have you donated blood before?
          <select name="donatedBefore" required onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        {form.donatedBefore === 'yes' && (
          <>
            <label>How many times?
              <input name="timesDonated" type="number" onChange={handleChange} />
            </label>

            <label>Date of last donation:
              <input name="lastDonationDate" type="date" onChange={handleChange} />
            </label>
          </>
        )}

        <label>Did you experience issues during donation?
          <select name="hadIssuesBefore" onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        {form.hadIssuesBefore === 'yes' && (
          <label>What was the difficulty?
            <textarea name="issueDetails" onChange={handleChange}></textarea>
          </label>
        )}

        <label>Have you been advised not to donate?
          <select name="advisedNotToDonate" onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>Have you read the information leaflet?
          <select name="readInfoLeaflet" onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>Are you feeling well today?
          <select name="feelingWell" onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <fieldset>
          <legend>Any of these medical conditions?</legend>
          <label><input type="checkbox" value="heart" onChange={handleCheckbox} /> Heart Disease</label>
          <label><input type="checkbox" value="diabetes" onChange={handleCheckbox} /> Diabetes</label>
          <label><input type="checkbox" value="fits" onChange={handleCheckbox} /> Fits</label>
          <label><input type="checkbox" value="stroke" onChange={handleCheckbox} /> Stroke</label>
          <label><input type="checkbox" value="asthma" onChange={handleCheckbox} /> Asthma/Lung</label>
          <label><input type="checkbox" value="liver" onChange={handleCheckbox} /> Liver Disease</label>
          <label><input type="checkbox" value="kidney" onChange={handleCheckbox} /> Kidney Disease</label>
          <label><input type="checkbox" value="blood" onChange={handleCheckbox} /> Blood Disorder</label>
        </fieldset>

        <button type="submit">Next</button>
      </form>
    </div>
  );
}
