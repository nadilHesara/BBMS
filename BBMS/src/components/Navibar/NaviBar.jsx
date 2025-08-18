import { useState } from "react"; 
import { Link } from "react-router-dom"; 
import { FaRegCircleUser } from "react-icons/fa6"; 
import { IoSunnySharp, IoMoonSharp } from "react-icons/io5"; 
import "./NaviBar.css"; // Import CSS file 
 
const NaviBar = ({ theme, setTheme }) => { 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 
  const userType = sessionStorage.getItem("userType") || null; 
 
  const toggleTheme = () => { 
    setTheme(theme === "light" ? "dark" : "light"); 
  }; 
 
  return ( 
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      theme === "dark" 
        ? "bg-gray-900/95 backdrop-blur-lg border-b border-gray-700/50" 
        : "bg-white/95 backdrop-blur-lg border-b border-gray-200/50"
    } shadow-lg`}> 
      <div className=" px-4 sm:px-6 lg:px-8"> 
        <div className="flex items-center justify-between h-20 lg:h-20">
          {/* Logo */} 
          <div className="transition-transform duration-300 group-hover:scale-110">
            <Link to="/" className="flex items-center space-x-3 group ">
              <div className="relative overflow-hidden rounded-full p-1 bg-gradient-to-r from-red-500 to-pink-600 transition-transform duration-300 group-hover:scale-110">
                <img
                  src="/images/Blood Bank logo 2022-03.png"
                  alt="Logo"
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover "
                />
              </div>
              <span className={`text-xl lg:text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110 ${
                theme === "dark" ? "group-hover:from-red-400 group-hover:to-pink-400" : ""
              } transition-all duration-300`}>
                LifeLine
              </span>
            </Link>
          </div>
 
          {/* Desktop Links */} 
          <ul className="hidden lg:flex items-center space-x-1"> 
            <li>
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                  theme === "dark" 
                    ? "text-gray-200 hover:text-white hover:bg-gray-800" 
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                Home
              </Link>
            </li> 
            {["admin", "doner", "hospital"].includes(userType?.toLowerCase()) && (
              <li>
                <Link 
                  to="/dashboard" 
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                    theme === "dark" 
                      ? "text-gray-200 hover:text-white hover:bg-gray-800" 
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  Dashboard
                </Link>
              </li>
            )} 
            <li>
              <Link 
                to="/login" 
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                  theme === "dark" 
                    ? "text-gray-200 hover:text-white hover:bg-gray-800" 
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                Login
              </Link>
            </li> 
            { ["admin", "doner", "hospital"].includes(userType?.toLowerCase()) || <li>
              <Link 
                to="/donorReg" 
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                    theme === "dark" 
                      ? "text-gray-200 hover:text-white hover:bg-gray-800" 
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
              >
                Become Donor
              </Link>
            </li>
            } 
            <li>
              <Link 
                to="/campaignRequest" 
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                    theme === "dark" 
                      ? "text-gray-200 hover:text-white hover:bg-gray-800" 
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
              >
                Organize Campaign
              </Link>
            </li> 
          </ul> 
 
          {/* Icons & Mobile Menu */} 
          <div className="m-3 flex items-center space-x-5"> 
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme} 
              className={`p-2 lg:p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
                theme === "dark" 
                  ? "bg-black text-white hover:bg-yellow-400/30" 
                  : "bg-yellow-100 text-yellow-600 hover:bg-gray-200"
              } shadow-md hover:shadow-lg`}
              aria-label="Toggle theme"
            > 
              {theme === "dark" ? (
                <IoMoonSharp size={35}  />
                
              ) : (
                <IoSunnySharp size={35} />
              )} 
            </button> 
 
            {/* User Button */}
            <Link 
              to={userType ? "/dashboard" : "/login"} 
              className={`p-2 lg:p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
                theme === "dark" 
                  ? "bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-white" 
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-900"
              } shadow-md hover:shadow-lg`}
              aria-label="User profile"
            > 
              <FaRegCircleUser size={35} /> 
            </Link> 
 
            {/* Mobile Menu Button */}
            <button 
              className={`lg:hidden p-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 ${
                theme === "dark" 
                  ? "text-gray-200 hover:bg-gray-700 focus:ring-gray-500" 
                  : "text-gray-600 hover:bg-gray-100 focus:ring-gray-300"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              aria-label="Toggle mobile menu"
            > 
              <div className="space-y-1">
                <span className={`block w-6 h-0.5 transition-all duration-300 ${
                  mobileMenuOpen 
                    ? `transform rotate-45 translate-y-1.5 ${theme === "dark" ? "bg-gray-200" : "bg-gray-600"}` 
                    : `${theme === "dark" ? "bg-gray-200" : "bg-gray-600"}`
                }`}></span>
                <span className={`block w-6 h-0.5 transition-all duration-300 ${
                  mobileMenuOpen 
                    ? "opacity-0" 
                    : `${theme === "dark" ? "bg-gray-200" : "bg-gray-600"}`
                }`}></span>
                <span className={`block w-6 h-0.5 transition-all duration-300 ${
                  mobileMenuOpen 
                    ? `transform -rotate-45 -translate-y-1.5 ${theme === "dark" ? "bg-gray-200" : "bg-gray-600"}` 
                    : `${theme === "dark" ? "bg-gray-200" : "bg-gray-600"}`
                }`}></span>
              </div>
            </button> 
          </div> 
        </div> 
      </div> 
 
      {/* Mobile Menu */} 
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${
        mobileMenuOpen 
          ? "max-h-96 opacity-100" 
          : "max-h-0 opacity-0 overflow-hidden"
      }`}>
        <div className={`px-4 py-3 space-y-1 ${
          theme === "dark" 
            ? "bg-gray-800/95 backdrop-blur-lg border-t border-gray-700/50" 
            : "bg-white/95 backdrop-blur-lg border-t border-gray-200/50"
        }`}>
          <Link 
            to="/" 
            className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              theme === "dark" 
                ? "text-gray-200 hover:text-white hover:bg-gray-700" 
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          {userType && (
            <Link 
              to="/dashboard" 
              className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                theme === "dark" 
                  ? "text-gray-200 hover:text-white hover:bg-gray-700" 
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
          <Link 
            to="/login" 
            className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              theme === "dark" 
                ? "text-gray-200 hover:text-white hover:bg-gray-700" 
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Login
          </Link>
          <Link 
            to="/donorReg" 
            className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              theme === "dark" 
                ? "text-gray-200 hover:text-white hover:bg-gray-700" 
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Become Donor
          </Link>
          <Link 
            to="/campaignRequest" 
            className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              theme === "dark" 
                ? "text-gray-200 hover:text-white hover:bg-gray-700" 
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Organize Campaign
          </Link>
        </div>
      </div> 
    </nav> 
  ); 
}; 
 
export default NaviBar;