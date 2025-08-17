import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EligibilityCheck from '../../components/DonationFormComponents/EligibilityCheck';
import PersonalInfoForm from '../../components/DonationFormComponents/PersonalInfoForm';
import DonationHistoryForm from '../../components/DonationFormComponents/DonationHistoryForm';
import MedicalScreenForm from '../../components/DonationFormComponents/MedicalScreenForm';
import ConsentForm from '../../components/DonationFormComponents/ConsentForm';
import SuccessPage from '../../components/DonationFormComponents/SuccessPage';
//import "./DonationForm.css"

export default function DonationForm() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EligibilityCheck />} />
        <Route path="personal-info" element={<PersonalInfoForm />} />
        <Route path="donation-history" element={<DonationHistoryForm />} />
        <Route path="medical" element={<MedicalScreenForm />} />
        <Route path="consent" element={<ConsentForm />} />
        <Route path="success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}
