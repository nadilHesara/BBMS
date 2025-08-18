import React, { useState, useEffect ,useContext } from 'react'
import './Login.css';
import NaviBar from '../../components/Navibar/NaviBar';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { LoadingContext } from "../../context/LoadingContext";


const Login = ({ theme, setTheme }) => {

  const { loading, setLoading } = useContext(LoadingContext);

  const navigate = useNavigate();

  const login = sessionStorage.getItem("userType");
  const [userType, setUserType] = useState(login ? login : null);



  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [show, setShow] = useState(false)


  useEffect(() => {
    const savedUsername = sessionStorage.getItem("rememberedUsername");
    const savedPassword = sessionStorage.getItem("rememberedPassword");

    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, [login]);


  function toggleShow() {
    setShow(!show)
  }

  const [message, setMessage] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:9191/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      if (rememberMe) {
        sessionStorage.setItem("rememberedUsername", username);
        sessionStorage.setItem("rememberedPassword", password);
        sessionStorage.setItem("userType", userType)

      } else {
        sessionStorage.removeItem("rememberedUsername");
        sessionStorage.removeItem("rememberedPassword");
      }

      const result = await response.json();
      if (response.ok) {
        toast.success("Login successful to " + result.user_type + " !");
        setUserType(result.user_type);
        sessionStorage.setItem("username", result.username);
        sessionStorage.setItem("userId", result.user_id);
        sessionStorage.setItem("userType", result.user_type);
        navigate("/dashboard");

      } else {
        setMessage("Error: " + (result.message || JSON.stringify(result)));
        console.error("Error response:", result);
      }
    } catch (error) {
      console.error("Error login form :", error.message);
      setMessage("Login failed. Check server and data.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <NaviBar theme={theme} setTheme={setTheme} />
      <form className='login-form' onSubmit={handleLoginSubmit} >
        <h1 className='login-header'>Login</h1>
        <label htmlFor="Username"> Username: </label>
        <input type="text" id="Username" name="Username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
        <br />

        <label htmlFor="pwd">Password:</label>
        
          <input type={show ? "text" : "password"} id="pwd" name="pwd" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <div className="password-toggle-icon">{show ?  <AiFillEyeInvisible onClick={() => toggleShow()} size={20}  /> : <AiFillEye onClick={() => toggleShow()} size={20} className="password-toggle-icon" />}
        </div>
        <br />


        <div className='forget-pwd-container'>
          <div className='remeber-me-check'>
            <label >
              <input  type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />Remember Me
            </label>
          </div>
          <br />
          
            <p className="forgot-pw-link">
              <Link to={"/forgotpassword"}>Forgot Password?</Link>
            </p>
          
        </div>

        <input className='login-btn' type="submit" value="Login"></input>
        <div className="register-link">
          <p>
            Don't have an account? <Link to="/donorReg">Register now</Link>
          </p>
        </div>
        <p>{message}</p>
      </form>
    </div >
  )
}

export default Login