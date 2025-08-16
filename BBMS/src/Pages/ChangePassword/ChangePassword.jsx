import React, { useState , useContext } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import "./ChangePassword.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { filledInputClasses } from "@mui/material/FilledInput";

function ChangePassword() {
  const navigate = useNavigate();
  const userType = sessionStorage.getItem("userType");
  const [userData,setUserData] = useState(JSON.parse(sessionStorage.getItem("userData")));
  const { loading, setLoading } = useContext(LoadingContext);
  
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    userType: userType,
    userName: userData.userName
    
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const CheckNewPassword = () => {
    if(confirmPassword == formData.newPassword){
      SendPasswordData();
    }
    else{
      alert("Password is not matching.")      
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    CheckNewPassword();
  };

  const SendPasswordData = async () =>{
    try{        
      setLoading(true);
        const response = await fetch(`http://localhost:9191/dashboard/ChangePassword` ,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          },
        body: JSON.stringify(formData)
        })

        const result = await response.json();

        if (response.ok){
          alert("Password Changed successfully!")
          navigate("/dashboard")
        }
        else{
          alert(result.message)
        }
    } catch(error){
      alert(error.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="doner-reg-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="curpwd">Current Password: </label>
        <input
          type="password"
          id="curpwd"
          name="currentPassword"
          // value={formData.current_password}
          onChange={handleChange}
          // required
        />
      </div>

      <div>
        <label htmlFor="newpwd">New Password: </label>
        <input
          type="password"
          id="newpwd"
          name="newPassword"
          // value={formData.new_password}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="cfmnewpwd">Confirm New Password: </label>
        <input
          type="password"
          id="cfmnewpwd"
          name="conf_password"
          // value={formData.conf_password}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <div className="button-row">
        <button type="submit" className="save-btn">
          Save Password
        </button>
        <button type="button" className="close-btn">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ChangePassword;
