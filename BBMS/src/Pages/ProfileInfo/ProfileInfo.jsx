import { useState, useRef, useEffect } from 'react';
{/*import NaviBar from '../../components/Navibar/NaviBar';*/}
import districts from '../../SharedData/Districts';
import { FaUserCircle } from 'react-icons/fa';
import "./ProfileInfo.css"
{/*import { use } from 'react';*/}

function ProfileInfo({theme,setTheme}){

  const [doner, setDoner] = useState({
    doner_id: '',
    username: '',
    name: '',
    email: '',
    gender: '',
    blood_group: '',
    nic_no: '',
    dob: '',
    tele: '',
    address_line1: '',
    address_line2: '',
    address_line3: '',
    District: '',
    password: ''
  });

  const [hospital, setHospital] = useState({
    hospital_id: '',
    username: '',
    name: '',
    email: '',
    contact_no: '',
    address_line1: '',
    address_line2: '',
    address_line3: '',
    District: '',
    password: ''
  });

  const [password, setPassword] = useState({
    current_password: "",
    new_password: "",
    conf_password: "",
  });

  const [message, setMessage] = useState("");
  const [userType, setUserType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  {/*const fileInputRef = useRef(null);*/}

useEffect(() => {

  const userData = JSON.parse(localStorage.getItem("userData"));
  const user_Type = localStorage.getItem("userType");
  setUserType(user_Type);

  const fetchUserData = async () => {
    try {
      const user_id = userData?.userId; 
      const response = await fetch(`http://localhost:9191/dashboard?user_id=${user_id}&user_type=${user_Type}`);

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      
      const data = await response.json();

      if (user_Type==="Doner"){
        setDoner({
          doner_id: data.userId,
          username: data.userName,
          name: data.Name,
          email: data.Email,
          gender: data.gender,
          blood_group: data.bloodGroup,
          nic_no: data.NicNo,
          dob: data.Dob,
          tele: data.Telephone,
          address_line1: data.AddressLine1,
          address_line2: data.AddressLine2,
          address_line3: data.AddressLine3,
          District: data.District
        });

      }else if (user_Type==="Hospital"){
        setHospital({
          hospital_id: data.userId,
          username: data.userName,
          name:data.Name,
          email: data.Email,
          contact_no: data.Telephone,
          address_line1: data.AddressLine1,
          address_line2: data.AddressLine2,
          address_line3: data.AddressLine3,
          District: data.District,
        });
      }

    } catch (err) {
      console.error("Error fetching user:", err);
      setMessage("⚠️ Failed to load profile data.");

    } finally {
        setIsLoading(false);

    }
  }


  if (userData && user_Type) {
    fetchUserData();
  }
}, []);


{/*localStorage.setItem("userData", JSON.stringify(res.user_id));
localStorage.setItem("userType", res.user_type);*/}


  const handlepasswordChange = (e) => {const {name,value} = e.target;
  setPassword(prevPassword => ({...prevPassword,[name]:value}));

  };


  {/*const handleImageChange = (e) => {const file = e.target.files[0];
    if (file) {
      setDoner(prevDoner => ({ ...prevDoner, ProfileImage:file}));
    }
  };

  const handleRemoveImage = () => {
    setDoner(prevDoner => ({
      ...prevDoner,ProfileImage: null}));
  };*/}

  const handleChange = (e) => {

    const {name,value} = e.target;
      if(userType === "Doner") {
        setDoner(prev => ({...prev, [name]: value}));
    } else {
        setHospital(prev => ({...prev, [name]: value}));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    {/*if(doner.Password !== password.current_password){
      setMessage("⚠️ Current password is incorrect");
      return;
    }*/}

    if(password.new_password && password.current_password === password.new_password){
      setMessage("⚠️ Enter new password");
      return;
    }

    else if (password.new_password && password.new_password !== password.conf_password){
      setMessage("⚠️ Password doesn't match");
      return;
    }

    const userData = userType === "Doner" ? doner : hospital;
    const userID = userType === "Doner" ? doner.doner_id : hospital.hospital_id;
    setMessage("Saved Changes Successfully");
    console.log(userType === "Doner" ? doner : hospital);
    console.log("Sending data: ", JSON.stringify(userType === "Doner" ? { doner: userData } : { hospital: userData }));


    fetch(`http://localhost:9191/dashboard?user_id=${userID}&user_type=${userType}`, 
    { method: 'PUT',
     headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userType === "Doner" ? {doner:userData} : {hospital:userData})
  })

  .then(response => response.json())
  .then(data => {setMessage(data.message || "Saved Changes Successfully")})

  .catch(error => 
    {console.error('Error:', error);
    setMessage("⚠️ Failed to save changes");
  });
  };

  return(
    <>
    <div>

      <div className={theme === "light" ? "profile-info" : "profile-info dark"}>

        <form onSubmit={handleSubmit}>

          <h1> {userType} Profile</h1>

          {/*<div className='profile-img-section'>

            {doner.ProfileImage ?  ( 
              <div>

              <div className='profile-img-container'> <img src={URL.createObjectURL(doner.ProfileImage)} alt="Profile" className='profile-img'/> </div>
              
              <div className='btn-container'>

                <button type="button" onClick={()=>fileInputRef.current.click()}>Change Image</button>
                <button type="button" onClick={handleRemoveImage}>Remove Image</button>

              </div>

              </div>

            ) : (
            <>
            <div className='default-profile-icon'> <FaUserCircle size={150}/>  </div>

                  <div className='btn-container'>

                  <button type="button" onClick={() => fileInputRef.current.click()}> Add profile Image </button>
                </div>
            </>
            )}

            <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={{display:'none'}}/>
            </div>*/}


          <label htmlFor="name">{userType} Name:</label>
          <input type="text" name="name" defaultValue={userType === "Doner" ? doner.name : hospital.name} onChange={handleChange} required/>

          <label htmlFor="username">Username: </label>
          <input type="text" name="username" defaultValue={userType === "Doner" ? doner.username : hospital.username} readOnly title="This field cannot be changed"/>
          <br />  
          
          {userType === "Doner" && (
          <>
          <label>Gender:</label>

          <input type="radio" name="gender" value="Male" onChange={handleChange} checked={doner.gender==="Male"} required />{" "}  Male
          <input type="radio" name="gender" value="Female" onChange={handleChange} checked={doner.gender==="Female"} />{" "} Female
          <br/>

          <label>Blood Group: </label>
          <input type="text" defaultValue={doner.blood_group} readOnly title="This field cannot be changed"/>
          
          <label htmlFor="nic_no">NIC Number:</label>
          <input type="text" name="nic_no" defaultValue={doner.nic_no} onChange={handleChange} required/>

          <label> Date of Birth: </label>
          <input type="date" value={doner.dob} readOnly title="This field cannot be changed"/>
          </>
          )}

          <label htmlFor="email">Email: </label>
          <input type="email" name="email" defaultValue={userType === "Doner" ? doner.email : hospital.email} onChange={handleChange} required />
          <br />

          <label htmlFor = {userType === "Doner" ? "tele" : "contact_no"}>{userType === "Doner" ? "Telephone:" : "Contact Number:"}</label>
          <input type="tel" name={userType === "Doner" ? "tele" : "contact_no"} defaultValue={userType === "Doner" ? doner.tele : hospital.contact_no}  onChange={handleChange} required />

          <label>Address:</label>
          <input type="text" name="address_line1" defaultValue={userType === "Doner" ? doner.address_line1 : hospital.address_line1} onChange={handleChange} required />
          <div className='address-lines'>
          <input type="text" name="address_line2" value={userType === "Doner" ? doner.address_line2 || "" : hospital.address_line2 || ""}  placeholder="Line 2" onChange={handleChange}/>
          <input type="text" name="address_line3" value={userType === "Doner" ? doner.address_line3 || "" : hospital.address_line3 || ""}  placeholder="Line 3" onChange={handleChange} />
          </div>
          <br/>

          <label>District:</label>
          <select name="District" value={userType === "Doner" ? doner.District || "" : hospital.District || ""} onChange={handleChange} required>
            <option value=""> -- Select -- </option> 
            {districts.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}

            </select>

          <label>Current Password:</label>
          <input type="password" name="current_password" onChange={handlepasswordChange}/>

          <label>New Password:</label>
          <input type="password" name="new_password" onChange={handlepasswordChange}/>

          <label>Confirm New Password:</label>
          <input type="password" name="conf_password" onChange={handlepasswordChange} required={password.new_password.trim() !== ""} disabled={password.new_password.trim() === ""}/>

          <br/>
          <input type="submit" value="Save Changes"/>
          
          <br/>
          <br/>
          {message && <p>{message}</p>}

        </form>

      </div>
      </div>
      </>

  );

}
export default ProfileInfo

