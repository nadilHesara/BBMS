import React from 'react'
import './Home.css';
import NaviBar from '../../components/Navibar/NaviBar';
import { Link } from 'react-router-dom';
import LeftSlideBar from '../../components/LeftSlideBar/LeftSlideBar';


const Home = ({ theme, setTheme }) => {
  return (
    <div>
      <LeftSlideBar theme={theme} setTheme={setTheme}  />
      <NaviBar theme={theme} setTheme={setTheme} />
      
      <h1>Welcome to the Blood Bank Management System</h1>
      <div>
        Planning on organizing a blood donation campaign....
        <br />
        <Link to='/compReg'>Register</Link>

      </div>
    </div>
  )
}

export default Home