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
        const data = response.data;

        setForm(prev => ({
            ...prev,
            donatedBefore:data.Status,
            timesDonated:data.Count,
            lastDonationDate: data.LastDonation,                              
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
        navigate('../medical');
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
    <div className="form-container">
      <h2>Step 3: Donation History</h2>
      <form onSubmit={handleSubmit}>
        <label>Have you donated blood before?
        <input name="donatedBefore" type="text" value={form.donatedBefore} readOnly/>
        </label>
        <br/>

        {form.donatedBefore === 'Yes' && (
          <>
            <label>How many times?
              <input name="timesDonated" type="number" value={form.timesDonated} readOnly/>
            </label><br/>

            <label>Date of last donation:
              <input name="lastDonationDate" type="date" value={form.lastDonationDate} readOnly/>
            </label><br/>
          </>
        )}

        <label>Did you experience issues during previous donation? <span className="required">*</span>
          <select name="hadIssuesBefore" value={form.hadIssuesBefore} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label><br/>

        {form.hadIssuesBefore === 'yes' && (
          <label>What was the difficulty?
            <textarea name="issueDetails" onChange={handleChange}></textarea>
          </label>
        )}<br/>

        <label>Have you been advised not to donate? <span className="required">*</span>
          <select name="advisedNotToDonate" value={form.advisedNotToDonate} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label><br/>

        <label>Have you read the information leaflet? <span className="required">*</span>
          <select name="readInfoLeaflet" value={form.readInfoLeaflet} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label><br/>

        <fieldset>
          <legend>Any of these medical conditions?</legend>
          <label><input type="checkbox" value="Heart Disease" onChange={handleCheckbox} checked={form.medicalConditions.includes("Heart Disease")}/> Heart Disease</label>
          <label><input type="checkbox" value="Diabetes" onChange={handleCheckbox} checked={form.medicalConditions.includes("Diabetes")}/> Diabetes</label>
          <label><input type="checkbox" value="Fits" onChange={handleCheckbox} checked={form.medicalConditions.includes("Fits")}/> Fits</label>
          <label><input type="checkbox" value="Stroke" onChange={handleCheckbox} checked={form.medicalConditions.includes("Stroke")}/> Stroke</label>
          <label><input type="checkbox" value="Asthma/Lung" onChange={handleCheckbox} checked={form.medicalConditions.includes("Asthma/Lung")}/> Asthma/Lung</label>
          <label><input type="checkbox" value="Liver Disease" onChange={handleCheckbox} checked={form.medicalConditions.includes("Liver Disease")}/> Liver Disease</label>
          <label><input type="checkbox" value="Kidney Disease" onChange={handleCheckbox} checked={form.medicalConditions.includes("Kidney Disease")}/> Kidney Disease</label>
          <label><input type="checkbox" value="Blood Disorder" onChange={handleCheckbox} checked={form.medicalConditions.includes("Blood Disorder")}/> Blood Disorder</label>
        </fieldset><br/>

        <button type="submit" disabled={isSubmitting}> Next </button>
        <br/>
        <p>{message}</p>
      </form>
    </div>
  );
}
