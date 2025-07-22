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
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
    const location = useLocation();
    const userId = location.state?.userId;
    const userType = location.state?.userType;
    console.log("User Id :" + userId+"      User Type :" + userType);
    

    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId || !userType) return;

        fetch(`http://localhost:9191/dashboard?user_id=${userId}&user_type=${userType}`)
            .then(res => {
                if (!res.ok) throw new Error("Fetch failed");
                return res.json();
            })
            .then(data => {
                console.log("Dashboard data:", data);
                setUserData(data);
            })
            .catch(err => {
                console.error("Error fetching dashboard data:", err.message);
            });
    }, [userId, userType]);


    if (error) return <p>Error: {error}</p>;
    if (!userData) return <p>Loading...</p>;

    return (
        <div>
            <h2>Welcome, {userData.name}</h2>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
    );
};

export default Dashboard;
