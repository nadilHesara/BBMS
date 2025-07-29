import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LeftSlideBar from "../../components/LeftSlideBar/LeftSlideBar";
import NaviBar from "../../components/Navibar/NaviBar";
import MyCalender from "../../components/MyCalender/MyCalender";
import "./Dashboard.css";
import districts from "../../SharedData/districts";

const Dashboard = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    console.log(userId + "    " + userType);

    if (userId==null || userType==null) {
      navigate("/login", { replace: true });
    }
  }, [userId, userType, navigate]);

  
  useEffect(() => {
    if (!userId || !userType) return;


    fetch(`http://localhost:9191/dashboard?user_id=${userId}&user_type=${userType}`)
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setUserData(data);
        localStorage.setItem("userData", JSON.stringify(data));
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err.message);
        setError("Failed to load dashboard data.");
      });
  }, [userId, userType]);
  console.log("user: ",userData?.District);
 
  const [selectedDistrict,setSelectedDistrict] = useState(userData?.District);

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
    <>
      <NaviBar theme={theme} setTheme={setTheme} />
      <div className="main-layout">
        <LeftSlideBar theme={theme} userType={userType} username={userData.userName} />
        <div className="content-area">
          {isOnDashboard && 
            <div className="calender-container">
              {userType === "Doner" && <h3 className="header">Welcome <i>{userData?.Name}</i></h3>}
              {userType === "Hospital" && <h3 className="header">Welcome <i>{userData?.userName}</i></h3>}
              


              <div className="district-sort-label-select">
                <span className="district-sort-label">Sort the campaigns by district:</span>
                <select className="form-select-sm custom-width" name="district" onChange={handleSelectedDistrict} value={selectedDistrict} required>
                  <option value="">---Select---</option>
                  {districts.map((city,index)=>(
                    <option key={index} value={city} >{city}</option>
                  ))}
                </select>
              </div>
              <MyCalender selectedDistrict={selectedDistrict}/>
            </div>
          }
          {!isOnDashboard && 
            <Outlet />
          }
          
          
          {/* <pre>{JSON.stringify(userData, null, 2)}</pre> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
