import React, { useState, useEffect, useContext } from 'react'
import './Login.css';
import NaviBar from '../../components/Navibar/NaviBar';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { LoadingContext } from "../../context/LoadingContext";
import { toast } from 'react-toastify';
import { Eye, EyeOff, User, Lock, Heart } from 'lucide-react';

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


  const toggleShow = () => {
    setShow(!show);
  };

  const [message, setMessage] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:9191/login", {
        method: "POST",
        credentials: "include",
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
        toast.success("Login successful to " + (result.user_type === "Doner" ? "Donor" : result.user_type) + " !");
        setUserType(result.user_type);
        sessionStorage.setItem("username", result.username);
        sessionStorage.setItem("userId", result.user_id);
        sessionStorage.setItem("userType", result.user_type);
        navigate("/dashboard");

      } else {
        setMessage("Error: " + (result.message || JSON.stringify(result)));
        toast.error("Login Failed. Check the username and password.");
        console.error("Error response:", result);
      }

    } catch (error) {
      console.error("Error login form :", error.message);
      toast.error("Login failed. Check server and data.");
      setMessage("Login failed. Check server and data.");
      
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex justify-center'>
      <NaviBar theme={theme} setTheme={setTheme} />

      <div className=" max-w-[900px] max-h-[700px] bg-[url('/images/bgpic.png')] mt-[120px] bg-cover bg-contain flex justify-center rounded-2xl shadow-2xl overflow-hidden">

        <div className="login-form grid grid-cols-2 lg:grid-cols-2 min-h-[400px] ">
          {/* Left Column - Image */}
          <div className="flex items-center m-4 w-[500px] rounded-3xl justify-center p-8 bg-white bg-opacity-10 shadow-white shadow-5xl">
            <div className="w-full max-w-md space-y-6">
              <div className="text-center dark:!text-black">
                <h1 className="text-3xl font-bold text-gray-200 mb-2 dark:!text-[rgba(21,29,64,1)]">Login</h1>
                <p className="text-white dark:!text-[rgba(21,29,64,1)]">Enter your credentials to access your account</p>
              </div>

              <div className="space-y-6">
                {/* Username Field */}
                <div className="space-y-2 ">
                  <label htmlFor="Username" className="block text-sm font-medium text-white">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="Username"
                      name="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                      className="input-fl block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-gray-50"
                      placeholder="Enter your username or email"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="pwd" className="block text-sm font-medium text-white">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={show ? "text" : "password"}
                      id="pwd"
                      name="pwd"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      className="input-fl block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-gray-50 "
                      placeholder="Enter your password"
                      required
                    />
                    <div className="absolute inset-y-5 right-0 pr-3 transition-colors z-10">
                      {show ? <AiFillEyeInvisible className='text-gray-400' onClick={() => toggleShow()} size={20} /> 
                      : <AiFillEye className='text-gray-400'  onClick={() => toggleShow()} size={20} />}
                    </div>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-white font-medium">
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-blue-300 hover:text-blue-400 font-medium transition-colors"
                    onClick={() => navigate("/forgotPassword")}
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
                  onClick={handleLoginSubmit}
                >
                  Login
                </button>

                {/* Register Link */}
                <div className="text-center">
                  <p className="text-sm text-white font-medium">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      className="text-blue-300 hover:text-blue-800 font-medium transition-colors"
                      onClick={() => navigate("/donorReg")}
                    >
                      Register now
                    </button>
                  </p>
                </div>

              </div>
            </div>


          </div>
          <div className="relative  flex items-top justify-center p-8">
            {/* Decorative elements */}




          </div>

          {/* Right Column - Form */}

        </div>
      </div>
    </div >
  )
}

export default Login