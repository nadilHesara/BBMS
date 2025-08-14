import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        navigate('/success');
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      alert('Error connecting to server.');
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
            /*required*/
          />
          I consent to testing my blood for HIV, Hepatitis B/C, Syphilis, Malaria.
        </label>

        <label>
          <input
            type="checkbox"
            name="instructionConsent"
            checked={form.instructionConsent}
            onChange={handleChange}
            /*required*/
          />
          I agree to follow all instructions from NBTS.
        </label>

        <label>
          <input
            type="checkbox"
            name="notifyConsent"
            checked={form.notifyConsent}
            onChange={handleChange}
            /*required*/
          />
          I agree to be informed of my test results and follow guidance.
        </label>

        <label>How often do you want to donate?
          <select name="frequency" /*required*/ onChange={handleChange}>
            <option value="">--Select--</option>
            <option>Once in 4 months</option>
            <option>Once in 6 months</option>
            <option>Once a year</option>
          </select>
        </label>

        <button type="submit">Submit Declaration</button>
      </form>
    </div>
  );
}
