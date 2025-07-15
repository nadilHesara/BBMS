import React from 'react'
import './Login.css';
import NaviBar from '../../components/Navibar/NaviBar';

const Login = ({ theme, setTheme }) => {
  return (
    <div>
      <NaviBar theme={theme} setTheme={setTheme} />
      <h1>Login</h1>
    </div>
  )
}

export default Login