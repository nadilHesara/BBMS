import React from 'react'
import LeftSlideBar from '../../components/LeftSlideBar/LeftSlideBar';
import NaviBar from '../../components/Navibar/NaviBar';
import { useLocation } from 'react-router-dom';
import './Dashboard.css';


const Dashboard = ({ theme, setTheme ,}) => {
    const location = useLocation();
    const userType = location.state?.userType;
    return (
        <div>
            <NaviBar theme={theme} setTheme={setTheme} />
            <LeftSlideBar theme={theme} setTheme={setTheme} userType={userType} />
            <h1>Welcome to Dashboard Page</h1><br /><br />
            <h1>Welcome {userType}</h1>


        </div>
    )
}

export default Dashboard