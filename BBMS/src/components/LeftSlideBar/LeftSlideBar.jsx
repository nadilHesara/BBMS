import React from 'react'
import { IoMdLogIn } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import './LeftSlideBar.css';


const LeftSlideBar = ({theme, setTheme}) => {
  return (
    <div className="left-slide-bar">
        <div className='left-slide-bar-profile'>
            <FaRegCircleUser className='left-slide-bar-profile' size='80'/>
        </div>

        <div className='left-slide-bar-box'>
            <Link>Profile Info</Link>
        </div>

        <div className='left-slide-bar-box'>
            <Link>View my Donation History</Link>
        </div>

        <div className='left-slide-bar-box'>
            <Link>Request for Blood Donation</Link>
        </div>

        <div className='left-slide-bar-box'>
            <Link>Medical Recodes</Link>
        </div>

        <div className='left-slide-bar-box'>
            <Link className="left-slide-bar-logout-row">
                <IoMdLogIn className='left-slide-bar-log-out' size='30'/> 
                <p>Log out</p>
            </Link>
        </div>

    </div>
  )
}

export default LeftSlideBar