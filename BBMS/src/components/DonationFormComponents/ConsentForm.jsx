import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DonationForm.css';

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

  return (
    <div className="form-container">
      <h2>Step 5: Consent & Submission</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="checkbox"
            name="testConsent"
            checked={form.testConsent}
            onChange={handleChange}
            required
          />
          I consent to testing my blood for HIV, Hepatitis B/C, Syphilis, Malaria.
        </label>
        <br/>

        <label>
          <input
            type="checkbox"
            name="instructionConsent"
            checked={form.instructionConsent}
            onChange={handleChange}
            required
          />
          I agree to follow all instructions from NBTS.
        </label>
        <br/>

        <label>
          <input
            type="checkbox"
            name="notifyConsent"
            checked={form.notifyConsent}
            onChange={handleChange}
            required
          />
          I agree to be informed of my test results and follow guidance.
        </label>
        <br/>

        <label>How often do you want to donate?
          <select name="frequency" onChange={handleChange}>
            <option value="">--Select--</option>
            <option>Once in 4 months</option>
            <option>Once in 6 months</option>
            <option>Once a year</option>
          </select>
        </label>
        <br/>

        <button type="submit" disabled={isSubmitting}>Submit Declaration</button>
        <br/>
        <p>{message}</p>
      </form>

      {showPopup && (
        <div className="popup">
          {successMessage}
      </div>
      )}

    </div>
  );
}
