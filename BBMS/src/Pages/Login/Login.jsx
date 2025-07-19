import React, { useState, useEffect } from 'react'
import './Login.css';
import NaviBar from '../../components/Navibar/NaviBar';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from 'react-router-dom';



const Login = ({ theme, setTheme }) => {
  const login = localStorage.getItem("login");
  const [isLogin, setIsLogin] = useState(login === "true");
  useEffect(() => {
    localStorage.setItem("login", isLogin.toString())
  }, [isLogin]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [show, setShow] = useState(false)


  useEffect(() => {
    const savedUsername = localStorage.getItem("rememberedUsername");
    const savedPassword = localStorage.getItem("rememberedPassword");

    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);


  function toggleShow() {
    setShow(!show)
  }

  const [message, setMessage] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:9191/login", {
        mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      if (rememberMe) {
        localStorage.setItem("rememberedUsername", username);
        localStorage.setItem("rememberedPassword", password);

      } else {
        localStorage.removeItem("rememberedUsername");
        localStorage.removeItem("rememberedPassword");
      }

      const result = await response.json();
      if (response.ok) {
        setMessage("Login successful!");
        alert("Login successful to" + username + " !");
        setIsLogin(true);

      } else {
        setMessage("Error: " + (result.message || JSON.stringify(result)));
        console.error("Error response:", result);
      }
    } catch (error) {
      console.error("Error login form :", error.message);
      alert("Login failed. Check server and data.");
      setMessage("Login failed. Check server and data.");
    }
  }

  return (
    <div>
      <NaviBar theme={theme} setTheme={setTheme} />
      <form onSubmit={handleLoginSubmit}>
        <h1>Donor Login</h1>
        <label htmlFor="Username"> Username: </label>
        <input type="text" id="Username" name="Username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
        <br />

        <label htmlFor="pwd">Password:</label>
        <input type={show ? "text" : "password"} id="pwd" name="pwd" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        {show ? <AiFillEyeInvisible onClick={() => toggleShow()} size={20} /> : <AiFillEye onClick={() => toggleShow()} size={20} />}
        <br />


        <label>
          <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />Remember Me
        </label>
        <br />

        <div className="forgot-pw-link">
          <p>
            <Link to="/">Forgot Password?</Link>
          </p>
        </div>



        <input type="submit" value="Login"></input>
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