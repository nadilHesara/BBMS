import { useState, useRef, useEffect } from 'react';
{/*import NaviBar from '../../components/Navibar/NaviBar';*/}
import districts from '../../SharedData/districts';
import { FaUserCircle } from 'react-icons/fa';
import "./ProfileInfo.css"
{/*import { use } from 'react';*/}

function ProfileInfo({theme,setTheme}){


  const userData = JSON.parse(localStorage.getItem("userData"));
  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("userId");

  const [user, setUser]  = useState( {
    userId : "",
    userName:"",
    Name : "",
    Email: "",
    gender: "",
    bloodGroup: "",
    NicNo: "",
    Dob: "",
    Telephone: "",
    AddressLine1: "",
    AddressLine2: "",
    AddressLine3: "",
    District: "",
    profileImage : ""
  });

  // const [doner, setDoner] = useState({
  //   doner_id: '',
  //   username: '',
  //   name: '',
  //   email: '',
  //   gender: '',
  //   blood_group: '',
  //   nic_no: '',
  //   dob: '',
  //   tele: '',
  //   address_line1: '',
  //   address_line2: '',
  //   address_line3: '',
  //   District: '',
  //   password: ''
  // });

  // const [hospital, setHospital] = useState({
  //   hospital_id: '',
  //   username: '',
  //   name: '',
  //   email: '',
  //   contact_no: '',
  //   address_line1: '',
  //   address_line2: '',
  //   address_line3: '',
  //   District: '',
  //   password: ''
  // });

  const [message, setMessage] = useState("");
  {/*const fileInputRef = useRef(null);*/}

useEffect(() => {


  const fetchUserData = async () => {
    try {
  
      const response = await fetch(`http://localhost:9191/dashboard?user_id=${userId}&user_type=${userType}`);

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      
      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error("Error fetching user:", err);
      setMessage("⚠️ Failed to load profile data.");

    }
  }

  if (userData && userType) {
    fetchUserData();
  }
}, [userData,userType]);


  {/*const handleImageChange = (e) => {const file = e.target.files[0];
    if (file) {
      setDoner(prevDoner => ({ ...prevDoner, ProfileImage:file}));
    }
  };

  const handleRemoveImage = () => {
    setDoner(prevDoner => ({
      ...prevDoner,ProfileImage: null}));
  };*/}

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user.Telephone);
    fetch(`http://localhost:9191/dashboard?user_id=${userId}&user_type=${userType}`, 
    { method: 'PUT',
     headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  })

  .then(response => response.json())
  .then(data => {setMessage(data.message || "Saved Changes Successfully")})

  .catch(error => 
    {console.error('Error:', error);
    setMessage("⚠️ Failed to save changes");
  });
  };

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
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


          <label htmlFor="Name">{userType} Name:</label>
          <input type="text" name="Name" defaultValue={user.Name} onChange={handleChange} required/>

          <label htmlFor="userName">Username: </label>
          <input type="text" name="userName" defaultValue={user.userName} readOnly title="This field cannot be changed"/>
          <br />  
          
          {userType === "Doner" && (
          <>
          <label>Gender:</label>

          <input type="radio" name="gender" value="Male" onChange={handleChange} checked={user.gender==="Male"} required />{" "}  Male
          <input type="radio" name="gender" value="Female" onChange={handleChange} checked={user.gender==="Female"} />{" "} Female
          <br/>

          <label>Blood Group: </label>
          <input type="text" defaultValue={user.bloodGroup} readOnly title="This field cannot be changed"/>
          
          <label htmlFor="NicNo">NIC Number:</label>
          <input type="text" name="NicNo" defaultValue={user.NicNo} readOnly required/>

          <label> Date of Birth: </label>
          <input type="date" defaultValue={user.Dob} readOnly title="This field cannot be changed"/>
          </> 
          )}

          <label htmlFor="Email">Email: </label>
          <input type="Email" name="Email" defaultValue={user.Email} onChange={handleChange} required />
          <br />

          <label htmlFor = "Telephone"> Contact Number: </label>
          <input type="tel" name="Telephone" defaultValue={user.Telephone}  onChange={handleChange} required />

          <label>Address:</label>
          <input type="text" name="address_line1" defaultValue={user.AddressLine1} onChange={handleChange} required />
          <div className='address-lines'>
          <input type="text" name="address_line2" defaultValue={user.AddressLine2}  placeholder="Line 2" onChange={handleChange}/>
          <input type="text" name="address_line3" defaultValue={user.AddressLine3}  placeholder="Line 3" onChange={handleChange} />
          </div>
          <br/>

          <label>District:</label>
          <select name="District" value={user.District} onChange={handleChange} required>
            <option value=""> -- Select -- </option> 
            {districts.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}

            </select>

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