import DonorReg from "./Pages/DonorReg/DonorReg";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import CampReg from "./Pages/CampReg/CampReg";
import HospitalReg from "./Pages/HospitalReg/HospitalReg";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./Pages/Dashboard/Dashboard";
import ProfileInfo from "./Pages/ProfileInfo/ProfileInfo"

import "./App.css";

function App() {
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");

  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]);

  return (
    <div className={theme === "light" ? "container" : "container dark"}>
      <Router>
        <Routes>
            <Route path="/" element={<Home theme={theme} setTheme={setTheme} />} />
            <Route path='/donorReg' element={<DonorReg theme={theme} setTheme={setTheme} />} />
            <Route path='/login' element={<Login theme={theme} setTheme={setTheme} />} />
            <Route path="/campReg" element={<CampReg theme={theme} setTheme={setTheme} />}  />
            <Route path="/hospitalReg" element={<HospitalReg theme={theme} setTheme={setTheme} />}  />
            <Route path="/dashboard" element={<Dashboard theme={theme} setTheme={setTheme} />} />
            <Route path="/profileInfo" element={<ProfileInfo theme={theme} setTheme={setTheme}/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
