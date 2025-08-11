import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EligibilityCheck() {
  const [form, setForm] = useState({
    age: '',
    weight: '',
    lastDonation: '',
    hemoglobin: '',
    foreignTravel: '',
    risk: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const isEligible = () => {
    return (
      form.age >= 18 &&
      form.age <= 60 &&
      form.weight >= 50 &&
      form.lastDonation >= 4 &&
      form.hemoglobin >= 12.5 &&
      form.foreignTravel >= 3 &&
      form.risk === 'no'
    );
  };

  return (
    <div className="form-container">
      <h2>Eligibility Check</h2>
      <form>
        <label>Age: <input name="age" type="number" onChange={handleChange} /></label><br />
        <label>Weight (kg): <input name="weight" type="number" onChange={handleChange} /></label><br />
        <label>Months since last donation: <input name="lastDonation" type="number" onChange={handleChange} /></label><br />
        {/* <label>Hemoglobin (g/dL): <input name="hemoglobin" type="number" step="0.1" onChange={handleChange} /></label><br /> */}
        <label>Months since foreign travel: <input name="foreignTravel" type="number" onChange={handleChange} /></label><br />
        <label>Any risk behavior? 
          <select name="risk" onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </label><br />
        <button
          type="button"
          disabled={!isEligible()}
          onClick={() => navigate('personal-info')}
        >
          Proceed to Declaration
        </button>
      </form>
    </div>
  );
}