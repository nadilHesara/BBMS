import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import DonorReg from "./Pages/DonorReg/DonorReg";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import CampReg from "./Pages/CampReg/CampReg";
import HospitalReg from "./Pages/HospitalReg/HospitalReg";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ProfileInfo from "./Pages/ProfileInfo/ProfileInfo";
import AvailableBloodStocks from "./Pages/AvailableBloodStocks/AvailableBloodStocks";
import CampaignHistory from "./Pages/CampaignHistory/CampaignHistory";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import DonationHistory from "./Pages/DonationHistory/DonationHistory";
import DonationInfo from "./Pages/DonationInfo/DonationInfo";
import CampaignRequest from "./Pages/CampaignRequest/CampaignRequest";
import GlobalLoading from "./components/GlobalLoading/GlobalLoading";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import DonationFormLayout from "./Pages/DonationForm/DonationFormLayout";
import EligibilityCheck from "./components/DonationFormComponents/EligibilityCheck";
import DonationHistoryForm from "./components/DonationFormComponents/DonationHistoryForm";
import MedicalScreenForm from "./components/DonationFormComponents/MedicalScreenForm";
import ConsentForm from "./components/DonationFormComponents/ConsentForm";
import Donates from "./Pages/Donates/Donates";
import InfoGrid from "./Pages/DonationInfo/InfoGrid";
import Footer from "./components/Footer/Footer";
import { LoadingProvider } from "./context/LoadingContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme || "light");
  const toastPosition = window.innerWidth <= 768 ? "top-center" : "top-right";

  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);


  // Initialize dark mode class on first load and handle theme changes
  useEffect(() => {
    // Set initial theme from localStorage
    const savedTheme = localStorage.getItem("current_theme") || "light";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("current_theme", theme);
    
    // For Tailwind dark mode, we need to add/remove 'dark' class from html element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      console.log('Added dark class to HTML');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('Removed dark class from HTML');
    }
    
    document.body.className = theme;
  }, [theme]);

  return (
    <LoadingProvider>
      <div className={`app-container ${theme}`} >
        <Router>
          <GlobalLoading />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home theme={theme} setTheme={setTheme} />} />
              <Route path="/donorReg" element={<DonorReg theme={theme} setTheme={setTheme} />} />
              <Route path="/login" element={<Login theme={theme} setTheme={setTheme} />} />
              <Route path="/forgotpassword" element={<ForgotPassword theme={theme} setTheme={setTheme} />} />
              <Route path="/campaignRequest" element={<CampaignRequest theme={theme} setTheme={setTheme} />} />
              <Route path="/dashboard" element={<Dashboard theme={theme} setTheme={setTheme} />}>
                <Route index element={<h1>Welcome to Dashboard Page</h1>} />
                <Route path="ProfileInfo" element={<ProfileInfo theme={theme} setTheme={setTheme} />} />
                <Route path="AvailableBloodStocks" element={<AvailableBloodStocks theme={theme} setTheme={setTheme} />} />
                <Route path="CampaignHistory" element={<CampaignHistory theme={theme} setTheme={setTheme} />} />
                <Route path="ChangePassword" element={<ChangePassword theme={theme} setTheme={setTheme} />} />
                <Route path="campReg" element={<CampReg theme={theme} setTheme={setTheme} />} />
                <Route path="hospitalReg" element={<HospitalReg theme={theme} setTheme={setTheme} />} />
                <Route path="donation-history" element={<DonationHistory theme={theme} setTheme={setTheme} />} />
                <Route path="donates" element={<Donates theme={theme} setTheme={setTheme} />} />
                <Route path="CampaignHistory" element={<CampaignHistory theme={theme} setTheme={setTheme} />} />
                <Route path="DonationInfo" element={<DonationInfo theme={theme} setTheme={setTheme} />} />
                <Route path="InfoGrid" element={<InfoGrid theme={theme} setTheme={setTheme} />} />

                <Route path="DonationForm" element={<DonationFormLayout />}>
                  <Route index element={<EligibilityCheck />} />
                  <Route path="ProfileInfo" element={<ProfileInfo theme={theme} setTheme={setTheme} />} />
                  <Route path="donation-history" element={<DonationHistoryForm />} />
                  <Route path="medical" element={<MedicalScreenForm />} />
                  <Route path="consent" element={<ConsentForm />} />
                </Route>
              </Route>

              <Route path="*" element={<PageNotFound theme={theme} setTheme={setTheme} />} />
            </Routes>
          </div>
          <Footer />
        </Router>
        <ToastContainer
          position={toastPosition}  // better for small screens
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </LoadingProvider>
  );
}

export default App;
