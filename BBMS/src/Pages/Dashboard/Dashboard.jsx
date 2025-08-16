import React, { useEffect, useState, useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LeftSlideBar from "../../components/LeftSlideBar/LeftSlideBar";
import NaviBar from "../../components/Navibar/NaviBar";
import MyCalender from "../../components/MyCalender/MyCalender";
import "./Dashboard.css";
import districts from "../../SharedData/districts";
import { LoadingContext } from "../../context/LoadingContext";


const Dashboard = ({ theme, setTheme }) => {

  const { loading, setLoading } = useContext(LoadingContext);

  const navigate = useNavigate();
  const location = useLocation();

  const userId = sessionStorage.getItem("userId");
  const userType = sessionStorage.getItem("userType");

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(userId + "    " + userType);

    if (userId == undefined || userType == undefined) {
      navigate("/login", { replace: true });
    }
  }, [userId, userType, navigate]);


  useEffect(() => {
    if (!userId || !userType) return;

    try {
      setLoading(true);
      fetch(`http://localhost:9191/dashboard?user_id=${userId}&user_type=${userType}`)
        .then((res) => {
          if (!res.ok) throw new Error("Fetch failed");
          return res.json();
        })
        .then((data) => {
          console.log(data)
          setUserData(data);
          sessionStorage.setItem("userData", JSON.stringify(data));
        })
        .catch((err) => {
          console.error("Error fetching dashboard data:", err.message);
          setError("Failed to load dashboard data.");
        });
    } catch (error) {
      setError("Server Error");
    } finally {
      setLoading(false);
    }
  }, [userId, userType]);
  console.log("user: ", userData?.District);

  const [selectedDistrict, setSelectedDistrict] = useState(userData?.District);

  useEffect(() => {
    if (userData && userData?.District) {
      setSelectedDistrict(userData.District);
    }
  }, [userData]);

  const handleSelectedDistrict = (e) => {
    setSelectedDistrict(e.target.value);
  }

  const isOnDashboard = location.pathname === "/dashboard";

  useEffect(() => {
    const handleBackButton = () => {
      if (!userId || !userType) {
        navigate("/login", { replace: true });
      }
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate, userId, userType]);

  if (!userId || !userType) return null;
  if (error) return <p>{error}</p>;
  if (!userData) return <p>Loading...</p>;


  return (
    <div className="dashboard-layout">
      <NaviBar theme={theme} setTheme={setTheme} />
      <div className={`main-layout ${theme}`}>
        <LeftSlideBar theme={theme} userType={userType} username={userData.userName} />
        <div className={`content-area ${theme}`}>
          {isOnDashboard &&
            <div className="dashboard-content">
              <div className="calender-container">
                <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">
                        Welcome back, <span className="text-yellow-300">{userData?.Name}</span>
                      </h1>
                      <p className="text-red-100 text-lg">
                        Managing life-saving blood transfusions across our network
                      </p>
                      <div className="mt-4 flex items-center space-x-4 text-sm">
                        <span className="bg-white text-black bg-opacity-20 px-3 py-3 rounded-full">📍 {userData.District} District</span>

                      </div>
                    </div>
                    <div className="text-6xl ">
                      <div className="w-[120px] h-[120px] pt-2 pb-2 pl-2 pr-3 bg-white dark:bg-blue-400 rounded-full text-center shadow-2xl shadow-[0_10px_30px_rgba(0,0,0,0.7)] dark:shadow-[0_10px_30px_rgba(59,130,246,0.5)] mb-2 transform hover:scale-105 transition-transform duration-300">
                        <img
                          src="/images/Blood Bank logo 2022-03.png"
                          alt="Profile 1"
                          className="object-cover object-bottom"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 mt-5">
                  <label
                    htmlFor="district"
                    className="text-lg font-medium  text-gray-700 dark:text-gray-200"
                  >
                    Sort the campaigns by district:
                  </label>

                  <select
                    id="district"
                    name="district"
                    onChange={handleSelectedDistrict}
                    value={selectedDistrict}
                    required
                    className="w-60 p-2 rounded-xl border border-gray-300 dark:border-gray-600 
               bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 
               shadow-sm focus:outline-none focus:ring-2 
               focus:ring-red-500 focus:border-red-500 transition duration-200"
                  >
                    {districts.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                  {/* Left Column - Calendar Component */}
                  <div className="space-y-6">
                    <MyCalender selectedDistrict={selectedDistrict} />
                  </div>

                  
                                     {/* Right Column - Mission & Vision */}
                   <div className="relative">
                     {/* Timeline Layout */}
                     <div className="space-y-0">
                      {/* Photo Gallery Section */}
                       <div className="relative pb-8">
                         <div className="absolute left-8 top-0 w-0.5 h-full bg-gradient-to-b from-purple-400 to-transparent"></div>
                         <div className="relative flex items-start space-x-6">
                           <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                             📸
                           </div>
                           <div className="flex-1 min-w-0">
                             <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Blood Donation Gallery</h2>
                             <div className="grid grid-cols-2 gap-4">
                               <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                 <img 
                                   src="/images/IMG_6602.jpg" 
                                   alt="Blood Donation Infographic"
                                   className="w-full h-32 object-cover"
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                 
                               </div>
                               
                               <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                 <img 
                                   src="/images/Batticaloa_Blood_Donor_03.jpg" 
                                   alt="Blood Donation"
                                   className="w-full h-32 object-cover"
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                               
                               </div>
                               
                               <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                 <img 
                                   src="/images/ph_68160_265108.jpg" 
                                   alt="Blood Facts"
                                   className="w-full h-32 object-cover"
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                               </div>
                               
                               <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                 <img 
                                   src="/images/3.jpg" 
                                   alt="Blood Myths"
                                   className="w-full h-32 object-cover"
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                 
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                       {/* Mission Section */}
                       <div className="relative pb-8">
                         <div className="absolute left-8 top-0 w-0.5 h-full bg-gradient-to-b from-blue-400 to-transparent"></div>
                         <div className="relative flex items-start space-x-6">
                           <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                             🎯
                           </div>
                                                       <div className="flex-1 min-w-0">
                              <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-3 tracking-wide" style={{fontFamily: 'Georgia, serif'}}>Our Mission</h2>
                              <p className="text-black font-bold dark:text-white text-lg leading-relaxed" style={{fontFamily: 'Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif'}}>
                                To bridge the gap between blood donors and those in need, ensuring timely access to safe blood products 
                                while fostering a culture of voluntary blood donation across our communities.
                              </p>
                            </div>
                         </div>
                       </div>

                       {/* Vision Section */}
                       <div className="relative pb-8">
                         <div className="absolute left-8 top-0 w-0.5 h-full bg-gradient-to-b from-green-400 to-transparent"></div>
                         <div className="relative flex items-start space-x-6">
                           <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                             🔮
                           </div>
                                                       <div className="flex-1 min-w-0">
                              <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-3 tracking-wide" style={{fontFamily: 'Georgia, serif'}}>Our Vision</h2>
                              <p className="text-black font-bold dark:text-gray-300 text-lg leading-relaxed" style={{fontFamily: 'Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif'}}>
                                To become the leading blood bank management system that revolutionizes healthcare delivery, 
                                making blood donation accessible, efficient, and impactful for every community we serve.
                              </p>
                            </div>
                         </div>
                       </div>

                       
                     </div>
                   </div>
                </div>
              </div>
            </div>
          }
          {!isOnDashboard &&
            <Outlet />
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
