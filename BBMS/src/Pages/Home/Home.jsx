import React from 'react'
import './Home.css';
import NaviBar from '../../components/Navibar/NaviBar';
import LeftSlideBar from '../../components/LeftSlideBar/LeftSlideBar';

const Home = ({ theme, setTheme }) => {
  return (
    <div>
      <LeftSlideBar theme={theme} setTheme={setTheme}  />
      {/* <NaviBar theme={theme} setTheme={setTheme} /> */}
      
      <h1>Welcome to the Blood Bank Management System</h1>
    </div>
  )
}

export default Home