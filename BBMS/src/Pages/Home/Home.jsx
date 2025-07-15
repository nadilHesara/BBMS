import React from 'react'
import './Home.css';
import NaviBar from '../../components/Navibar/NaviBar';


const Home = ({ theme, setTheme }) => {
  return (
    <div>
      <NaviBar theme={theme} setTheme={setTheme} />
      <h1>Welcome to the Blood Bank Management System</h1>
    </div>
  )
}

export default Home