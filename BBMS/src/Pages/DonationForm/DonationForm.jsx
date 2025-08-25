import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EligibilityCheck from '../../components/DonationFormComponents/EligibilityCheck';
import DonationHistoryForm from '../../components/DonationFormComponents/DonationHistoryForm';
import MedicalScreenForm from '../../components/DonationFormComponents/MedicalScreenForm';
import ConsentForm from '../../components/DonationFormComponents/ConsentForm';


export default function DonationForm() {
  return (
    <>
      <Routes>
        <Route path="/" element={<EligibilityCheck />} />
        <Route path="donationhistory" element={<DonationHistoryForm />} />
        <Route path="medical" element={<MedicalScreenForm />} />
        <Route path="consent" element={<ConsentForm />} />
      </Routes>
    </>
  );
}
