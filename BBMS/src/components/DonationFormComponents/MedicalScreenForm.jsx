import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DonationForm.css'


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
          console.log(response);
          setMessage([response.data?.message || "Medical Risk updating failed"]); 
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
      <h2>Step 4: Medical & Risk Screening</h2>
      <form onSubmit={handleSubmit}>
        <label>Have you ever had jaundice/hepatitis? <span className="required">*</span>
          <select name="jaundice" value={form.jaundice} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <br/>

        <label>Had TB or typhoid in the past 2 years? <span className="required">*</span>
          <select name="tbTyphoid" value={form.tbTyphoid}  onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <br/>

        <label>Received vaccinations in past 12 months? <span className="required">*</span>
          <select name="vaccinations" value={form.vaccinations} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <br/>

        <label>Any tattoos, piercings or acupuncture in past year? <span className="required">*</span>
          <select name="tattoos" value={form.tattoos} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <br/>

        <label>Ever imprisoned? <span className="required">*</span>
          <select name="imprisoned" value={form.imprisoned} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <br/>

        <label>You or your partner traveled abroad in the last 3 months? <span className="required">*</span>
          <select name="foreignTravel" value={form.foreignTravel} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <br/>

        <label>You or your partner received blood products? <span className="required">*</span>
          <select name="bloodTransfusion" value={form.bloodTransfusion} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <br/>

        <label>Had malaria or treatment for it? <span className="required">*</span>
          <select name="malaria" value={form.malaria} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <br/>

        <label>Dengue in the last 6 months? <span className="required">*</span>
          <select name="dengue" value={form.dengue} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <br/>

        <label>Fever, measles, diarrhea, or long illness in the past month? <span className="required">*</span>
          <select name="recentIllness" value={form.recentIllness} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <br/>

        <label>Dental extraction in the last week? <span className="required">*</span>
          <select name="dentalWork" value={form.dentalWork} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <br/>

        <label>Used aspirin, antibiotics, or medications recently? <span className="required">*</span>
          <select name="recentMeds" value={form.recentMeds} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <br/>

        <label>Are you aware of disqualifying categories (HIV, Hep B/C, risky behavior)? <span className="required">*</span>
          <select name="riskyCategoriesAwareness" value={form.riskyCategoriesAwareness} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes, I'm aware</option>
            <option value="no">No, not sure</option>
          </select>
        </label>
        <br/>

        <label>Do you have symptoms like unexplained fever, weight loss, or swollen lymph nodes? <span className="required">*</span>
          <select name="riskSymptoms" value={form.riskSymptoms} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <br/>

        <button type="submit" disabled={isSubmitting}> Next </button>
        <br/>
        <p>{message}</p>
      </form>
    </div>
  );
}
