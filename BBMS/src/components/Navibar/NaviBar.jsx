import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoSunnySharp, IoMoonSharp } from "react-icons/io5";
import "./NaviBar.css"; // Import CSS file

const NaviBar = ({ theme, setTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userType = sessionStorage.getItem("userType");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className={`navbar ${theme === "dark" ? "dark" : "light"}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src="/images/Blood Bank logo 2022-03.png" alt="Logo" />
          <span>LifeLine</span>
        </Link>

        {/* Desktop Links */}
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          {userType && <li><Link to="/dashboard">Dashboard</Link></li>}
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/donorReg">Become Donor</Link></li>
          <li><Link to="/campaignRequest">Organize Campaign</Link></li>
        </ul>

        {/* Icons & Mobile Menu */}
        <div className="navbar-icons">
          <button onClick={toggleTheme} className="theme-btn">
            {theme === "dark" ? <IoMoonSharp size={35} /> : <IoSunnySharp size={35} />}
          </button>

          <Link to={userType ? "/dashboard" : "/login"} className="user-btn">
            <FaRegCircleUser size={35} />
          </Link>

          <button
            className="mobile-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <ul className="mobile-menu">
          <li><Link to="/">Home</Link></li>
          {userType && <li><Link to="/dashboard">Dashboard</Link></li>}
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/donorReg">Become Donor</Link></li>
          <li><Link to="/campaignRequest">Organize Campaign</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default NaviBar;
