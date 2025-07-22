import { useState, useRef } from 'react';
import NaviBar from '../../components/Navibar/NaviBar';
import districts from '../../SharedData/Districts';
import { FaUserCircle } from 'react-icons/fa';
import "./ProfileInfo.css"

function ProfileInfo({theme,setTheme}){

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
    Password:"",
    ProfileImage: null
  });

  const[password,setPassword] = useState({
    current_password: "",
    new_password: "",
    conf_password: "",
    
  })

  
  const [message, setMessage] = useState("");

  const fileInputRef = useRef(null);

  const handlepasswordChange = (e) => {const {name,value} = e.target;
  {setPassword(prevPassword => ({...prevPassword,[name]:value}))}

  };


  const handleImageChange = (e) => {const file = e.target.files[0];
    if (file) {
      setDoner(prevDoner => ({ ...prevDoner, ProfileImage:file}));
    }
  };

  const handleRemoveImage = () => {
    setDoner(prevDoner => ({
      ...prevDoner,ProfileImage: null}));
  };

  const handleChange = (e) => {

    const {name,value} = e.target;
    setDoner((prevDoner) => ({
      ...prevDoner,
      [name] : value

    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if(doner.Password !== password.current_password){
      setMessage("⚠️ Current password is incorrect");
      return;
    }

    if(password.current_password === password.new_password){
      setMessage("⚠️ Enter new password");
      return;
    }

    else if (password.new_password && password.new_password !== password.conf_password){
      setMessage("⚠️ Password doesn't match");
      return;
    }

    setMessage("Saved Changes Successfully");
    console.log(doner);

  };

  return(
    <div>

      <NaviBar theme={theme} setTheme={setTheme} />

      <div className={theme === "light" ? "profile-info" : "profile-info dark"}>

        <form onSubmit={handleSubmit}>

          <h1> My Profile</h1>

          <div className='profile-img-section'>

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
            </div>


          <label htmlFor="name">Donor Name:</label>
          <input type="text" name="name" defaultValue={doner.name} onChange={handleChange} required/>  

          <label>Gender:</label>

          <input type="radio" name="gender" value="Male" onChange={handleChange} checked={doner.gender==="Male"} required />{" "}  Male
          <input type="radio" name="gender" value="Female" onChange={handleChange} checked={doner.gender==="Female"} />{" "} Female
          <br/>

          <label>Blood Group: </label>
          <input type="text" value={doner.blood_group} readOnly title="This field cannot be changed"/>

          <label htmlFor="nic_no">NIC Number:</label>
          <input type="text" name="nic_no" defaultValue={doner.nic_no} onChange={handleChange} required/>

          <label> Date of Birth: </label>
          <input type="date" value={doner.dob} readOnly title="This field cannot be changed"/>

          <label htmlFor="tele">Telephone:</label>
          <input type="tel" name="tele" defaultValue={doner.tele} onChange={handleChange} required />

          <label>Address:</label>
          <input type="text" name="address_line1" defaultValue={doner.address_line1} onChange={handleChange} required />
          <div className='address-lines'>
          <input type="text" name="address_line2" Value={doner.address_line2 || ""} placeholder={!doner.address_line2 ? "Line 2" : ""} onChange={handleChange}/>
          <input type="text" name="address_line3" Value={doner.address_line3 || ""} placeholder={!doner.address_line3 ? "Line 3" : ""} onChange={handleChange} />
          </div>
          <br/>

          <label>District:</label>
          <select name="District" value={doner.District || ""} onChange={handleChange} required>
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
          <input type="submit" value="Save Changes" />
          
          <br/>
          <br/>
          {message && <p>{message}</p>}

        </form>

      </div>

      </div>


  );
}



export default ProfileInfo

