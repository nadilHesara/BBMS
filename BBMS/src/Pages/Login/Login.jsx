import React, { useState } from 'react'
import './Login.css';
import NaviBar from '../../components/Navibar/NaviBar';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"; 


const Login = ({ theme, setTheme }) => {

  const [show, setShow] = useState(false)

  function toggleShow(){
    setShow(!show)
  }

  return (
    <div>
      <NaviBar theme={theme} setTheme={setTheme} />
      <form>
        <h1>Donor Login</h1>
        <label for="Username"> Username: </label>
        <input type="text" id="Username" name="Username"></input>
        <br />

        <label for="pwd">Password:</label>
        <input type={show ? "text":"password"} id="pwd" name="pwd"></input>
        {show?<AiFillEyeInvisible onClick={() => toggleShow()}/> : <AiFillEye  onClick={() => toggleShow()}/>}
        <br/>

      </form>
    </div>
  )
}

export default Login