import React, { useState } from 'react'
import './NaviBar.css';
import { FaRegCircleUser } from "react-icons/fa6";
import { IoSunnySharp } from "react-icons/io5";
import { MdBloodtype } from "react-icons/md";


const NaviBar = ({theme, setTheme}) => {

  const toggle_mode = () => {
    theme == 'light' ? setTheme('dark') : setTheme('light');
  }

  return (
    <div className={theme == 'light' ? 'navibar' : 'navibar dark'}>
        <MdBloodtype size='70' className='navibar-img'color={theme=='light'? 'white':'black'}/>
        <ul>
          <li>Home</li>
          <li>Login</li>
        </ul>
        <div className="user-toggle-icons">
          <IoSunnySharp className='toggle-icon' size='50' color={theme=='light'? 'white':'black'} onClick={() => toggle_mode()}/>
          <FaRegCircleUser className='user-icon' size='50' color={theme=='light'? 'white':'black'}/>
        </div>
    </div>
  )
}

export default NaviBar;