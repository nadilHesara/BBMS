import React, { useState } from 'react';
import { IoMdLogOut } from 'react-icons/io';
import { FaUserCircle, FaHistory, FaNotesMedical, FaHandsHelping, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './LeftSlideBar.css';

const LeftSlideBar = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <div className={`sidebar-toggle-btn ${theme}`} onClick={toggleSidebar}>
        <FaBars size={24} />
      </div>

      <div className={`left-slide-bar ${theme} ${isOpen ? 'open' : 'closed'}`}>

        <div className="profile-section">
          
          {isOpen && <><FaUserCircle size={80} />
          <h4>User Name</h4></>}
        </div>

        <div className="slide-bar-nav-links">
          <Link to="#">
            <FaUserCircle size={30}/>
            {isOpen && <span>Profile Info</span>}
          </Link>
          <Link to="#">
            <FaHistory size={30}/>
            {isOpen && <span>Donation History</span>}
          </Link>
          <Link to="#">
            <FaHandsHelping size={30}/>
            {isOpen && <span>Request Donation</span>}
          </Link>
          <Link to="#">
            <FaNotesMedical size={30}/>
            {isOpen && <span>Medical Records</span>}
          </Link>
          <Link to="#" className="logout-link">
            <IoMdLogOut size={30}/>
            {isOpen && <span>Log Out</span>}
          </Link>
        </div>
      </div>
    </>
  );
};

export default LeftSlideBar;
