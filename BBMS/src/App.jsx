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
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import DonationHistory from "./Pages/DonationHistory/DonationHistory";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import Donates from "./Pages/Donates/Donates";
import DonationInfo from "./Pages/DonationInfo/DonationInfo";

function App() {
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme || "light");



  useEffect(() => {
    localStorage.setItem("current_theme", theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={theme === "light" ? "container" : "container dark"}>
      <Router>
        <Routes>
          <Route path="/" element={<Home theme={theme} setTheme={setTheme} />} />
          <Route path="/donorReg" element={<DonorReg theme={theme} setTheme={setTheme} />} />
          <Route path="/login" element={<Login theme={theme} setTheme={setTheme} />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          <Route path="/dashboard" element={<Dashboard theme={theme} setTheme={setTheme} />}>
            <Route index element={<h1>Welcome to Dashboard Page</h1>} />
              <Route path="ProfileInfo" element={<ProfileInfo theme={theme} setTheme={setTheme} />} />
              <Route path="AvailableBloodStocks" element={<AvailableBloodStocks theme={theme} setTheme={setTheme}/>} />
              <Route path="ChangePassword" element={<ChangePassword theme={theme} setTheme={setTheme}/>}/>
              <Route path="campReg" element={<CampReg theme={theme} setTheme={setTheme} />} />
              <Route path="hospitalReg" element={<HospitalReg theme={theme} setTheme={setTheme} />} />
              <Route path="donation-history" element={<DonationHistory theme={theme} setTheme={setTheme} />} />
              <Route path="Donates" element={<Donates theme={theme} setTheme={setTheme} />} />
              <Route path="donationinfo" element={<DonationInfo theme={theme} setTheme={setTheme} />} />
          </Route>

          <Route path="*" element={<PageNotFound theme={theme} setTheme={setTheme} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
