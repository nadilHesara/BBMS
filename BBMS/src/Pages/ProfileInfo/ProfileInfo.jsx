import { useState, useRef, useEffect } from "react";
import NaviBar from "../../components/Navibar/NaviBar";
import districts from "../../SharedData/Districts";
import { FaUserCircle } from "react-icons/fa";
import "./ProfileInfo.css";
import { use } from "react";

function ProfileInfo({ theme, setTheme }) {
  const userData = localStorage.getItem("userData");
  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("userId");

  const [hospital,setHospital] = useState({
    hospital_id: "",
    name: "",
    District: "",
    contact_no: "",
    address_line1: "",
    address_line2: "",
    address_line3: "",
    username: "",
    password: "", 
    email: "",
    profileImage: ''
  });

  const [doner, setDoner] = useState({
    doner_id: "D001",
    name: "",
    gender: "",
    blood_group: "",
    nic_no: "",
    dob: "",
    tele: "",
    address_line1: "",
    address_line2: "",
    address_line3: "",
    District: "",
    username:",",
    password:"",
    email:"",
    profileImage: ''
  });

  useEffect(()=>{
    console.log(userType);
    if (userType=="Doner"){
      setDoner(userType);
    }
    else if (userType=="Hospital"){
      setHospital(userData);
    }
    console.log(hospital? hospital:doner);
    
  },[userData])

  const[password,setPassword] = useState({
    current_password: "",
    new_password: "",
    conf_password: "",
  })

  fetch(`http://localhost:9191/dashboard/profileInfo?user_id=${userId}&user_type=${userType}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },

    body: userType === "Doner" ? JSON.stringify(doner) : JSON.stringify(hospital)
    
  })
  .then(res => {
    if (!res.ok) throw new Error("Failed to update user info");
    return res.json();
  })
  .then(data => {
    console.log("Update success response:");
    alert(data.message);
  })
  .catch(error => {
    console.error("Update failed:", error);
  });

  const [message, setMessage] = useState("");

  const fileInputRef = useRef(null);

  const handlepasswordChange = (e) => {
    const { name, value } = e.target;
    {
      setPassword((prevPassword) => ({ ...prevPassword, [name]: value }));
    }
  const handlepasswordChange = (e) => {const {name,value} = e.target;
    {setPassword(prevPassword => ({...prevPassword,[name]:value}))}
  };

  const handleImageChange = (e) => {const file = e.target.files[0];
    if (file) {
      setDoner(prevDoner => ({ ...prevDoner, ProfileImage:file}));
    }
  };

  const handleRemoveImage = () => {
    setDoner((prevDoner) => ({
      ...prevDoner,
      ProfileImage: null,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoner((prevDoner) => ({
      ...prevDoner,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (doner.Password !== password.current_password) {
      setMessage("⚠️ Current password is incorrect");
      return;
    }

    if (password.current_password === password.new_password) {
      setMessage("⚠️ Enter new password");
      return;
    } else if (
      password.new_password &&
      password.new_password !== password.conf_password
    ) {
      setMessage("⚠️ Password doesn't match");
      return;
    }

    setMessage("Saved Changes Successfully");
    console.log(doner);
  };

  return (
    <div>

      <NaviBar theme={theme} setTheme={setTheme} />

      <div className={theme === "light" ? "profile-info" : "profile-info dark"}>
        <form onSubmit={handleSubmit}>
          <h1> My Profile</h1>
          {/* <div className="profile-img-section">
            {doner.ProfileImage ? (
              <div>
                <div className="profile-img-container">
                  {" "}
                  <img
                    src={URL.createObjectURL()}
                    alt="Profile"
                    className="profile-img"
                  />{" "}
                </div>

                <div className="btn-container">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                  >
                    Change Image
                  </button>
                  <button type="button" onClick={handleRemoveImage}>
                    Remove Image
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="default-profile-icon">
                  {" "}
                  <FaUserCircle size={150} />{" "}
                </div>

                <div className="btn-container">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                  >
                    {" "}
                    Add profile Image{" "}
                  </button>
                </div>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
          </div> */}
          <label htmlFor="name">
            {userType == "Doner" ? "Doner " : "Hospital "}Name:
          </label>
          <input
            type="text"
            name="name"
            defaultValue={userData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="username">Username: </label>
          <input type="text" name="username"defaultValue={userData.userName} onChange={handleChange} required />
          <br />
          <label>Gender:</label>
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={handleChange}
            checked={userData.gender === "Male"}
            required
          />{" "}
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={handleChange}
            checked={userData.gender === "Female"}
          />{" "}
          Female
          <br />
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" defaultValue={userData.Email} onChange={handleChange} required />
          <br />
          <label>Blood Group: </label>
          <input
            type="text"
            value={userData.bloodGroup}
            readOnly
            title="This field cannot be changed"
          />
          <label htmlFor="nic_no">NIC Number:</label>
          <input
            type="text"
            name="nic_no"
            defaultValue={userData.NicNo}
            onChange={handleChange}
            required
          />
          <label> Date of Birth: </label>
          <input
            type="date"
            value={userData.Dob}
            readOnly
            title="This field cannot be changed"
          />
          <label htmlFor="tele">Telephone:</label>
          <input
            type="tel"
            name="tele"
            defaultValue={userData.Telephone}
            onChange={handleChange}
            required
          />
          <label>Address:</label>
          <input
            type="text"
            name="address_line1"
            defaultValue={userData.AddressLine1}
            onChange={handleChange}
            required
          />
          <div className="address-lines">
            <input
              type="text"
              name="address_line2"
              value={userData.AddressLine2 || ""}
              placeholder={!userData.AddressLine2 ? "Line 2" : ""}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address_line3"
              value={userData.AddressLine3 || ""}
              placeholder={!userData.AddressLine3 ? "Line 3" : ""}
              onChange={handleChange}
            />
          </div>
          <br />
          <label>District:</label>
          <select
            name="District"
            value={userData.District || ""}
            onChange={handleChange}
            required
          >
            <option value=""> -- Select -- </option>
            {districts.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
          <label>Current Password:</label>
          <input
            type="password"
            name="current_password"
            onChange={handlepasswordChange}
          />
          <label>New Password:</label>
          <input
            type="password"
            name="new_password"
            onChange={handlepasswordChange}
          />
          <label>Confirm New Password:</label>
          <input
            type="password"
            name="conf_password"
            onChange={handlepasswordChange}
            required={password.new_password.trim() !== ""}
            disabled={password.new_password.trim() === ""}
          />
          <br />
          <input type="submit" value="Save Changes" />
          <br />
          <br />
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
}
}

export default ProfileInfo;
