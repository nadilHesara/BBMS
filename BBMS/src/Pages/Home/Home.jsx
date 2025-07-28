import React from 'react'
import './Home.css';
import NaviBar from '../../components/Navibar/NaviBar';
import { Link } from 'react-router-dom';
import LeftSlideBar from '../../components/LeftSlideBar/LeftSlideBar';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

const Home = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('.campReg')
  }
  return (
    <div className='app-container'>
      <NaviBar theme={theme} setTheme={setTheme} />

      <div className='main-layout'>
        <div className='content-area'>
          <h1>Welcome to the Blood Bank Management System</h1>
          <div>
            Planning on organizing a blood donation campaign....
            <button onClick={handleClick} className='btn btn-primary' style={{ marginLeft: "50px" }}>Register</button>
            <br /><br />
            <p>Be someone's hope. Donate blood</p>
          </div>
          <Loader/>
        </div>

      </div>
    </div>
  )
}

export default Home