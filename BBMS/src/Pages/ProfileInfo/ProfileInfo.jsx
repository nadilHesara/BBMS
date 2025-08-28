import { useState, useEffect, useContext } from 'react';
import districts from '../../SharedData/districts';
import { useLocation, useNavigate } from 'react-router-dom';
import "./ProfileInfo.css"
import { LoadingContext } from '../../context/LoadingContext';
import useVerifyAccess from '../../SharedData/verifyFunction';
import { toast } from 'react-toastify';
{/*import { use } from 'react';*/ }

function ProfileInfo({ theme, setTheme }) {
  useVerifyAccess("profileInfo")
  const { loading, setLoading } = useContext(LoadingContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from;
  const [isChanged, setIsChange] = useState(false);
  console.log("from-", from);
  console.log("isChanged-", isChanged);

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
    isCampaign : null,
  });

  const [userType, setUserType] = useState("");
  {/*const fileInputRef = useRef(null);*/ }

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const user_Type = sessionStorage.getItem("userType");
    setUserType(user_Type);

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const user_id = userData?.userId;
        const response = await fetch(`http://localhost:9191/dashboard?user_id=${user_id}&user_type=${user_Type}`);

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();

        if (user_Type === "Doner") {
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
            District: data.District,
          });

        } else if (user_Type === "Hospital") {
          setHospital({
            hospital_id: data.userId,
            username: data.userName,
            name: data.Name,
            email: data.Email,
            contact_no: data.Telephone,
            address_line1: data.AddressLine1,
            address_line2: data.AddressLine2,
            address_line3: data.AddressLine3,
            District: data.District,
            
          });
        }

      } catch (err) {
        toast.error("⚠️ Failed to load profile data.");

      } finally {
        setLoading(false);

      }
    }


    if (userData && user_Type) {
      fetchUserData();
    }
  }, []);

  const handleChange = (e) => {

    const { name, value } = e.target;
    if (userType === "Doner") {
      setDoner(prev => ({ ...prev, [name]: value }));
      setIsChange(true);
    } else {
      setHospital(prev => ({ ...prev, [name]: value }));
      setIsChange(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = userType === "Doner" ? doner : hospital;
    const userID = userType === "Doner" ? doner.doner_id : hospital.hospital_id;

    try {
      setLoading(true);
      fetch(`http://localhost:9191/dashboard?user_id=${userID}&user_type=${userType}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userType === "Doner" ? { doner: userData } : { hospital: userData })
        })

        .then(data => {
          if (isChanged) {
            toast.success("Saved Changes Successfully");
            setIsChange(false);
          }
          if (from === "DonationForm") {
            navigate('../donationhistory');
          }

        })

    } catch (error) {
      toast.error("⚠️ Failed to save changes");
    } finally {
      setLoading(false);
    }

  };

  return (
    <>
      <div className='mt-10 flex justify-center '>
        <div className="rounded-3xl justify-center mt-30 w-[1000px]  shadow-2xl bg-[rgba(255, 255, 255, 0.79)] dark:!bg-gray-500 dark:!text-white">

          <form className="space-y-4 " onSubmit={handleSubmit} >
            <div className='w-full h-[100px] flex items-center justify-center shadow-xl rounded-t-3xl'>
              <h1 className="text-[40px] font-bold text-black dark:!text-white ">{userType} Profile Information</h1>
            </div>

            <div className="p-5 grid grid-cols-1- md:grid-cols-2 gap-5">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Basic Information</h2>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">{userType} Name:</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={userType === "Doner" ? doner.name : hospital.name}
                    onChange={handleChange}
                    required
                    className="input-field w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:!bg-gray-500"
                  />
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium mb-1">Username:</label>
                  <input
                    type="text"
                    name="username"
                    defaultValue={userType === "Doner" ? doner.username : hospital.username}
                    readOnly
                    className="input-field w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                  />
                </div>

                {userType === "Doner" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">Gender:</label>
                      <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value="Male"
                            onChange={handleChange}
                            checked={doner.gender === "Male"}
                            required
                            className="input-field  h-4 w-4 text-blue-600"
                          />
                          <span className="ml-2">Male</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value="Female"
                            onChange={handleChange}
                            checked={doner.gender === "Female"}
                            className="input-field  h-4 w-4 text-blue-600"
                          />
                          <span className="ml-2">Female</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Blood Group:</label>
                      <input
                        type="text"
                        defaultValue={doner.blood_group}
                        readOnly
                        className="input-field  w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label htmlFor="nic_no" className="block text-sm font-medium mb-1">NIC Number:</label>
                      <input
                        type="text"
                        name="nic_no"
                        defaultValue={doner.nic_no}
                        readOnly
                        className="input-field  w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Date of Birth:</label>
                      <input
                        type="date"
                        value={doner.dob}
                        readOnly
                        className="input-field  w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Contact Information Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Contact Information</h2>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email:</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={userType === "Doner" ? doner.email : hospital.email}
                    onChange={handleChange}
                    required
                    className="input-field  w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor={userType === "Doner" ? "tele" : "contact_no"} className="block text-sm font-medium mb-1">
                    {userType === "Doner" ? "Telephone:" : "Contact Number:"}
                  </label>
                  <input
                    type="tel"
                    name={userType === "Doner" ? "tele" : "contact_no"}
                    defaultValue={userType === "Doner" ? doner.tele : hospital.contact_no}
                    onChange={handleChange}
                    required
                    className="input-field  w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="address_line1" className="block text-sm font-medium mb-1">Address:</label>
                  <input
                    type="text"
                    name="address_line1"
                    defaultValue={userType === "Doner" ? doner.address_line1 : hospital.address_line1}
                    onChange={handleChange}
                    required
                    className="input-field  w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="mt-2 space-y-2">
                    <input
                      type="text"
                      name="address_line2"
                      value={userType === "Doner" ? doner.address_line2 || "" : hospital.address_line2 || ""}
                      placeholder="Address Line 2"
                      onChange={handleChange}
                      className="input-field  w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="address_line3"
                      value={userType === "Doner" ? doner.address_line3 || "" : hospital.address_line3 || ""}
                      placeholder="Address Line 3"
                      onChange={handleChange}
                      className="input-field  w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="District" className="block text-sm font-medium mb-1">District:</label>
                  <select
                    name="District"
                    value={userType === "Doner" ? doner.District || "" : hospital.District || ""}
                    onChange={handleChange}
                    required
                    className="input-field  w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Select District --</option>
                    {districts.map((d, i) => (
                      <option key={i} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-center item-center mb-5">
              {from === "LeftSideBar" ? (
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-800 dark:!bg-rose-600 text-white rounded-md hover:bg-rose-950 hover:scale-110 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
              ) : from === "DonationForm" ? (
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Next
                </button>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </>

  );

}
export default ProfileInfo

