import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import LeftSlideBar from "../../components/LeftSlideBar/LeftSlideBar";
import NaviBar from "../../components/Navibar/NaviBar";
import "./Dashboard.css";

const Dashboard = ({ theme, setTheme }) => {
  const location = useLocation();
  const userType = location.state?.userType || "Doner"; // Default fallback

  return (
    <>
      <NaviBar theme={theme} setTheme={setTheme} />
      <div className="main-layout">
        <LeftSlideBar theme={theme} userType={userType} username="Guest" />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
