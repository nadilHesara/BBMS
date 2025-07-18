import React from 'react'
import LeftSlideBar from '../../components/LeftSlideBar/LeftSlideBar';
import NaviBar from '../../components/Navibar/NaviBar';
import './Dashboard.css';


const Dashboard = ({ theme, setTheme }) => {
    return (
        <div>
            <NaviBar theme={theme} setTheme={setTheme} />
            <LeftSlideBar theme={theme} setTheme={setTheme} />
            <h1>Dashboard Page</h1>
        </div>
    )
}

export default Dashboard