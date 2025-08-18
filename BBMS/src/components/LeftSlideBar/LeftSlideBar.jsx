import React, { useEffect, useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import {
  FaClinicMedical ,
  FaUserCircle,
  FaHistory,
  FaBars,
} from "react-icons/fa";
import { IoBagAddSharp } from "react-icons/io5";
import { CgPassword } from "react-icons/cg";
import { GrStorage } from "react-icons/gr";
import { MdAppRegistration } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "./LeftSlideBar.css";

const LeftSlideBar = ({ theme, userType }) => {
  const navigate = useNavigate();
  const [currentPos,setCurrentPos] = useState(true);
  const [isOpen, setIsOpen] = useState(currentPos);
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  useEffect(() => {
    setCurrentPos(isOpen);
  }, [isOpen]);

  const LoggingOut = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userType");

    // Clear JWT cookie if you store the token in a cookie
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to login page
    navigate("/login");
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  function SelectUser(userType , theme) {
    if (userType == "Doner") {
      return (
        <>
          <div className={theme === 'dark' ? "slide-bar-nav-links dark" :"slide-bar-nav-links"}>
            <Link to="profileInfo"
            state={{from:"LeftSideBar"}}>
              <FaUserCircle size={30} color={theme === 'dark' ? 'white' : 'black'} />
              {isOpen && <span>Profile Info</span>}
            </Link>

            <Link to="donation-history">
              <FaHistory size={30} color={theme === 'dark' ? 'white' : 'black'} />
              {isOpen && <span>Donation History</span>}
            </Link>

            <Link to="ChangePassword">
              <CgPassword size={30} color={theme === 'dark' ? 'white' : 'black'}/>
              {isOpen && <span>Change Password</span>}
            </Link>

            <Link
              to="/login"
              className="logout-link"
              onClick={() => LoggingOut()}
            >
              <IoMdLogOut size={30} color={'red'}/>
              {isOpen && <span>Log Out</span>}
            </Link>
          </div>
        </>
      );
    } else if (userType == "Hospital" || userType == "Admin") {
      return (
        <>
          <div className="slide-bar-nav-links">
            {userType == "Hospital" && <Link to="profileInfo"
            state={{from:"LeftSideBar"}}>
              <FaUserCircle size={30} color={theme === 'dark' ? 'white' : 'black'}/>
              {isOpen && <span>Profile Info</span>}
            </Link>}

            <Link to="AvailableBloodStocks">
              <GrStorage size={30} color={theme === 'dark' ? 'white' : 'black'}/>
              {isOpen && <span>Available Blood Stock</span>}
            </Link>

            {userType == "Hospital" && 
            <>
            <Link to="campReg">
              <IoBagAddSharp size={30} color={theme === 'dark' ? 'white' : 'black'}/>
              {isOpen && <span>Add Campaign</span>}
            </Link>

            <Link to="donates">
              <FaClinicMedical  size={30} color={theme === 'dark' ? 'white' : 'black'}/>
              {isOpen && <span>Campaign On Hospital</span>}
            </Link>
            </>
            }
            <Link to="CampaignHistory">
              <FaHistory size={30} color={theme === 'dark' ? 'white' : 'black'}/>
              {isOpen && <span>Campaign History</span>}
            </Link>

            {userType == "Hospital" && <Link to="/donorReg">
              <MdAppRegistration size={30} color={theme === 'dark' ? 'white' : 'black'}/>
              {isOpen && <span>Donor Register</span>}
            </Link>}

            {userType === "Admin" && (
              <Link to="hospitalReg">
              <MdAppRegistration size={30} color={theme === 'dark' ? 'white' : 'black'} />
              {isOpen && <span>Hospital Register</span>}
            </Link>) }

            <Link to="ChangePassword">
              <CgPassword size={30} color={theme === 'dark' ? 'white' : 'black'}/>
              {isOpen && <span>Change Password</span>}
            </Link>

            <Link
              to="/login"
              className="logout-link"
              onClick={() => LoggingOut()}
            >
              <IoMdLogOut size={30} color={"red"}/>
              {isOpen && <span>Log Out</span>}
            </Link>
          </div>
        </>
      );
    } else {
      navigate("/login");
    }
  }
  console.log();
  
  return (
   
    <aside className={`left-slide-bar ${theme} ${isOpen ? "open" : "closed"}`}>
      
      <div className={`sidebar-toggle-btn ${theme}`} onClick={toggleSidebar}>
        <FaBars size={24} />
      </div>

      
        <div className="profile-section">
          {isOpen && (
            <>
              <FaUserCircle size={80} color={theme === 'dark' ? 'rgba(181, 181, 181, 0.9)' : 'rgba(75, 75, 75, 0.9)'} />
              <h4 >{userData.Name}</h4>
            </>
          )}
        </div>
        {SelectUser(userType , theme)}
      </aside>
    
  );
};

export default LeftSlideBar;
