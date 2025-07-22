import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import DonorReg from "./Pages/DonorReg/DonorReg";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import CampReg from "./Pages/CampReg/CampReg";
import HospitalReg from "./Pages/HospitalReg/HospitalReg";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ProfileInfo from "./Pages/ProfileInfo/ProfileInfo";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme || "light");

  const [userType] = useState("Doner"); // ✅ NOTE: spelling here matches Doner
  const [username] = useState("Guest");

  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]);

  return (
    <div className={theme === "light" ? "container" : "container dark"}>
      <Router>
        <Routes>
          <Route path="/" element={<Home theme={theme} setTheme={setTheme} />} />
          <Route path="/donorReg" element={<DonorReg theme={theme} setTheme={setTheme} />} />
          <Route path="/login" element={<Login theme={theme} setTheme={setTheme} />} />
          <Route path="/campReg" element={<CampReg theme={theme} setTheme={setTheme} />} />
          <Route path="/hospitalReg" element={<HospitalReg theme={theme} setTheme={setTheme} />} />

          {/* NESTED ROUTE for /dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard theme={theme} setTheme={setTheme} />}
          >
            <Route index element={<h1>Welcome to Dashboard Page</h1>} />
            <Route path="profileInfo" element={<ProfileInfo theme={theme} setTheme={setTheme} />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
