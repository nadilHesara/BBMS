import React, { useEffect, useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import {
  FaUserCircle,
  FaHistory,
  FaNotesMedical,
  FaHandsHelping,
  FaBars,
} from "react-icons/fa";

import { Link , useNavigate} from "react-router-dom";
import "./LeftSlideBar.css";

const LeftSlideBar = ({ theme, userType, username }) => {

  const navigate = useNavigate();
  const currunt_possition = localStorage.getItem("currunt_possition");

  const [isOpen, setIsOpen] = useState(
    currunt_possition === "true" ? true : false
  );

  useEffect(() => {
    localStorage.setItem("currunt_possition", isOpen.toString());
  }, [isOpen]);

  const LoggingOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    localStorage.removeItem("userData");
    navigate("/login", { replace: true });
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  function SelectUser(userType) {
    if (userType == "Doner") {

      return (
        <>
          <div className="slide-bar-nav-links">
            <Link to="profileInfo">
              <FaUserCircle size={30} />
              {isOpen && <span>Profile Info</span>}
            </Link>

            <Link to="#">
              <FaHistory size={30} />
              {isOpen && <span>Donation History</span>}
            </Link>

            <Link to="#">
              <FaHandsHelping size={30} />
              {isOpen && <span>Request Donation</span>}
            </Link>

            <Link to="#">
              <FaNotesMedical size={30} />
              {isOpen && <span>Medical Records</span>}
            </Link>

            <Link
              to="/login"
              className="logout-link"
              onClick={() => LoggingOut()}
            >
              <IoMdLogOut size={30} />
              {isOpen && <span>Log Out</span>}
            </Link>
          </div>
        </>
      );

    } else if (userType == "Hospital") {
      return (
        <>
          <div className="slide-bar-nav-links">
            <Link to="profileInfo">
              <FaUserCircle size={30} />
              {isOpen && <span>Profile Info</span>}
            </Link>

            <Link to="AvailableBloodStocks">
              <FaHistory size={30} />
              {isOpen && <span>Available Blood Stock</span>}
            </Link>

            <Link to="#">
              <FaHandsHelping size={30} />
              {isOpen && <span>Add Campaign</span>}
            </Link>

            <Link to="#">
              <FaNotesMedical size={30} />
              {isOpen && <span>Ongoing Campaign</span>}
            </Link>

            <Link to="#">
              <FaNotesMedical size={30} />
              {isOpen && <span>Campaign History</span>}
            </Link>

            <Link to="#">
              <FaNotesMedical size={30} />
              {isOpen && <span>Donor Register</span>}
            </Link>

            <Link
              to="/login"
              className="logout-link"
              onClick={() => LoggingOut()}
            >
              <IoMdLogOut size={30} />
              {isOpen && <span>Log Out</span>}
            </Link>
          </div>
        </>
      );

    } else if(userType == "Admin") {
      return (
        <>
          <div className="slide-bar-nav-links">
            <Link to="/ProfileInfo">
              <FaUserCircle size={30} />
              {isOpen && <span>Available Blood Stock</span>}
            </Link>

            <Link to="#">
              <FaHistory size={30} />
              {isOpen && <span>Add Campaign</span>}
            </Link>

            <Link to="#">
              <FaHandsHelping size={30} />
              {isOpen && <span>Ongoing Campaign</span>}
            </Link>

            <Link to="#">
              <FaNotesMedical size={30} />
              {isOpen && <span>Campaign History</span>}
            </Link>

            <Link to="#">
              <FaNotesMedical size={30} />
              {isOpen && <span>Donor Register</span>}
            </Link>

            <Link to="#">
              <FaNotesMedical size={30} />
              {isOpen && <span>Hospital Register</span>}
            </Link>

            <Link
              to="/login"
              className="logout-link"
              onClick={() => LoggingOut()}
            >
              <IoMdLogOut size={30} />
              {isOpen && <span>Log Out</span>}
            </Link>
          </div>
        </>
      );
    } else{
      navigate("/login");
    }
  }

  return (
    <>
      <div className={`sidebar-toggle-btn ${theme}`} onClick={toggleSidebar}>
        <FaBars size={24} />
      </div>

      <div className={`left-slide-bar ${theme} ${isOpen ? "open" : "closed"}`}>
        <div className="profile-section">
          {isOpen && (
            <>
              <FaUserCircle size={80} />
              <h4>{username}</h4>
            </>
          )}
        </div>
        {SelectUser(userType)}
      </div>
    </>
  );
};

export default LeftSlideBar;
