import { Outlet } from "react-router-dom";
// import './DonationForm.css'
import useVerifyAccess from '../../SharedData/verifyFunction';

export default function DonationFormLayout() {
  useVerifyAccess("donates");
  return (
    
    <div className="donation-form-layout">
      
      
      <Outlet />
    </div>
  );
}
