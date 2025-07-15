import './NaviBar.css';
import { FaRegCircleUser } from "react-icons/fa6";
import { IoSunnySharp } from "react-icons/io5";
import { MdBloodtype } from "react-icons/md";
import { Link } from 'react-router-dom';


const NaviBar = ({theme, setTheme}) => {

  const toggle_mode = () => {
    theme == 'light' ? setTheme('dark') : setTheme('light');
  }

  return (
    <div className={theme == 'light' ? 'navibar' : 'navibar dark'}>
        <Link to='/'><MdBloodtype size='70' className='navibar-img'color={theme=='light'? 'white':'black'}/></Link>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/donorReg'>Register</Link></li>
        </ul>
        <div className="user-toggle-icons">
          <IoSunnySharp className='toggle-icon' size='50' color={theme=='light'? 'white':'black'} onClick={() => toggle_mode()}/>
          <Link to='/login'><FaRegCircleUser className='user-icon' size='50' color={theme=='light'? 'white':'black'}/></Link>
        </div>
    </div>
  )
}

export default NaviBar;