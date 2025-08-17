import React, { useEffect, useState, useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LeftSlideBar from "../../components/LeftSlideBar/LeftSlideBar";
import NaviBar from "../../components/Navibar/NaviBar";
import MyCalender from "../../components/MyCalender/MyCalender";
import "./Dashboard.css";
import districts from "../../SharedData/districts";
import { LoadingContext } from "../../context/LoadingContext";
import { toast } from "react-toastify";
import verifyAccess from "../../SharedData/verifyFunction";

const Dashboard = ({ theme, setTheme }) => {
  const { loading, setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();
  const location = useLocation();

  const userId = sessionStorage.getItem("userId");
  const userType = sessionStorage.getItem("userType");

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // ✅ Use the hook properly
  const verified = verifyAccess("dashboard");

  // Redirect if userId or userType missing
  useEffect(() => {
    if (!userId || !userType) {
      navigate("/login", { replace: true });
    }
  }, [userId, userType, navigate]);

  // Fetch dashboard data only if verified
  useEffect(() => {
    if (!userId || !userType || verified !== true) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:9191/dashboard?user_id=${userId}&user_type=${userType}`,
          { method: "GET", credentials: "include" }
        );

        if (!res.ok) throw new Error("Fetch failed");

        const data = await res.json();
        setUserData(data);
        console.log(data);
        
        sessionStorage.setItem("userData", JSON.stringify(data));

        if (data?.District) setSelectedDistrict(data.District);
      } catch (err) {
        console.error("Error fetching dashboard data:", err.message);
        toast.error("Failed to load dashboard data.");
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userId, userType, verified, setLoading]);

  // Handle back button redirect
  useEffect(() => {
    const handleBackButton = () => {
      if (!userId || !userType) navigate("/login", { replace: true });
    };
    window.addEventListener("popstate", handleBackButton);
    return () => window.removeEventListener("popstate", handleBackButton);
  }, [navigate, userId, userType]);

  const handleSelectedDistrict = (e) => setSelectedDistrict(e.target.value);
  const isOnDashboard = location.pathname === "/dashboard";

  // Early returns
  if (verified === null || loading) return <p>Loading...</p>;
  if (!userId || !userType) return null;
  if (verified === false) return null; // user redirected in hook
  if (error) return <p>{error}</p>;
  if (!userData) return <p>Loading dashboard data...</p>;

  return (
    <div className="dashboard-layout">
      <NaviBar theme={theme} setTheme={setTheme} />
      <div className={`main-layout ${theme}`}>
        <LeftSlideBar
          theme={theme}
          userType={userType}
          username={userData.userName || userData.Name}
        />
        <div className={`content-area ${theme}`}>
          {isOnDashboard ? (
            <div className="dashboard-content">
              <div className="calender-container">
                <h3 className="header">
                  Welcome <i>{userData?.userName || userData?.Name}</i>
                </h3>
                <div className="district-sort-label-select">
                  <span className="district-sort-label">
                    Sort the campaigns by district:
                  </span>
                  <select
                    className="form-select-sm custom-width"
                    name="district"
                    value={selectedDistrict}
                    onChange={handleSelectedDistrict}
                    required
                  >
                    {districts.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <MyCalender selectedDistrict={selectedDistrict} />
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
