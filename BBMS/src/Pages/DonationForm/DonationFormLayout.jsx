import { Outlet } from "react-router-dom";
// import './DonationForm.css'
import useVerifyAccess from '../../SharedData/verifyFunction';

export default function DonationFormLayout() {
  useVerifyAccess("DonationForm");
  return (
    
    <div className="donation-form-layout">
      
      
      <Outlet />
    </div>
  );
}
