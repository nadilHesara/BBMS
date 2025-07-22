import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NaviBar from '../../components/Navibar/NaviBar';
import LeftSlideBar from '../../components/LeftSlideBar/LeftSlideBar';
import './Dashboard.css';

const Dashboard = ({ theme, setTheme }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const userType = location.state?.userType;
    const userId = location.state?.userId;


    return (
        <div>
            <NaviBar theme={theme} setTheme={setTheme} />
            <LeftSlideBar theme={theme} setTheme={setTheme} userType={userType} userId={userId} />
            <h1>{userType}</h1>
        </div>
    );
};

export default Dashboard;
