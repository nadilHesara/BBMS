import './NaviBar.css';
import { FaRegCircleUser } from "react-icons/fa6";
import { IoSunnySharp, IoMoonSharp } from "react-icons/io5";
import { MdBloodtype } from "react-icons/md";
import { Link } from 'react-router-dom';

const NaviBar = ({ theme, setTheme }) => {
  const toggle_mode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className={`navibar ${theme}`}>
      <Link to='/' className='logo-link'>
        <MdBloodtype size={45} className='navibar-img' color={theme === 'dark' ? 'white' : 'black'} />
        {theme === 'dark' ? <span className="logo-text">LifeLine</span> : <span className="logo-text dark-text">LifeLine</span>}
      </Link>

      <ul className="nav-links">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/donorReg'>Register</Link></li>
        <li><Link to='/hospitalReg'>Hospital Register</Link></li>
      </ul>

      <div className="user-toggle-icons">
        {theme === 'dark' 
          ? <IoMoonSharp className='toggle-icon' size={30} onClick={toggle_mode} color='white' />
          : <IoSunnySharp className='toggle-icon' size={30} onClick={toggle_mode} color='black' />}
        <Link to='/login'><FaRegCircleUser className='user-icon' size={35} color={theme === 'dark' ? 'white' : 'black'} /></Link>
      </div>
    </nav>
  );
};

export default NaviBar;
