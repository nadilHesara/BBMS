import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MedicalScreenForm() {
  const navigate = useNavigate();
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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleNext = (e) => {
    e.preventDefault();
    localStorage.setItem('medicalScreen', JSON.stringify(form));
    navigate('../consent');
  };

  return (
    <div className="form-container">
      <h2>Step 4: Medical & Risk Screening</h2>
      <form onSubmit={handleNext}>
        <label>Have you ever had jaundice/hepatitis?
          <select name="jaundice" required onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>Had TB or typhoid in the past 2 years?
          <select name="tbTyphoid" required onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>Received vaccinations in past 12 months?
          <select name="vaccinations" onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>Any tattoos, piercings or acupuncture in past year?
          <select name="tattoos" onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>Ever imprisoned?
          <select name="imprisoned" onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>You or your partner traveled abroad in the last 3 months?
          <select name="foreignTravel" onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>You or your partner received blood products?
          <select name="bloodTransfusion" onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>Had malaria or treatment for it?
          <select name="malaria" onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>Dengue in the last 6 months?
          <select name="dengue" onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>Fever, measles, diarrhea, or long illness in the past month?
          <select name="recentIllness" onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>Dental extraction in the last week?
          <select name="dentalWork" onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>Used aspirin, antibiotics, or medications recently?
          <select name="recentMeds" onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>Are you aware of disqualifying categories (HIV, Hep B/C, risky behavior)?
          <select name="riskyCategoriesAwareness" onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes, I’m aware</option>
            <option value="no">No, not sure</option>
          </select>
        </label>

        <label>Do you have symptoms like unexplained fever, weight loss, or swollen lymph nodes?
          <select name="riskSymptoms" onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <button type="submit">Next</button>
      </form>
    </div>
  );
}
