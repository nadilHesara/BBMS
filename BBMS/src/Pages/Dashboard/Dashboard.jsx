import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LeftSlideBar from "../../components/LeftSlideBar/LeftSlideBar";
import NaviBar from "../../components/Navibar/NaviBar";
import "./Dashboard.css";

const Dashboard = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // ✅ Redirect to login if not logged in
  useEffect(() => {
    console.log(userId + "    " + userType);

    if (userId==null || userType==null) {
      navigate("/login", { replace: true });
    }
  }, [userId, userType, navigate]);

  // ✅ Fetch user data
  useEffect(() => {
    if (!userId || !userType) return;

    fetch(`http://localhost:9191/dashboard?user_id=${userId}&user_type=${userType}`)
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setUserData(data);
        localStorage.setItem("userData", JSON.stringify(data)); // ✅ Store it as a string
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err.message);
        setError("Failed to load dashboard data.");
      });
  }, [userId, userType]);

  // ✅ Prevent back button navigation to dashboard after logout
  useEffect(() => {
    const handleBackButton = () => {
      if (!userId || !userType) {
        navigate("/login", { replace: true });
      }
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate, userId, userType]);

  if (!userId || !userType) return null;
  if (error) return <p>{error}</p>;
  if (!userData) return <p>Loading...</p>;

  return (
    <>
      <NaviBar theme={theme} setTheme={setTheme} />
      <div className="main-layout">
        <LeftSlideBar theme={theme} userType={userType} username={userData.userName} />
        <div className="content-area">
          <Outlet />
          {/* <pre>{JSON.stringify(userData, null, 2)}</pre> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
