import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NaviBar from "../../components/Navibar/NaviBar";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import "./HospitalReg.css";

function HospitalReg({ theme, setTheme }) {

    const [hospital, setHospital] = useState({
        hospital_id: "H001",
        name: "",
        username: "",
        address_line1: "",
        address_line2: "",
        address_line3: "",
        District: "",
        contact_no: "",
        password: ""
    });

    const [show, setShow] = useState(false)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function toggleShow() {
        setShow(!show)
    }

    const handleChange = (e) => {
        setHospital({
            ...hospital,
            [e.target.name]: e.target.value
        });
    };

    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch("http://localhost:9191/hospitalReg", {

                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(hospital)
            });
            const result = await response.json();
            if (response.ok) {
                setMessage("Your Username is  : " + (hospital.name));

                alert("hospital added successfully!");

            } else {
                setMessage("Error: " + (result.message || JSON.stringify(result)));
                console.error("Error response:", result);
            }
        } catch (error) {
            console.error("Error submitting form:", error.message);
            alert("Submission failed. Check server and data.");
            setMessage("Submission failed. Check server and data.");
        }
    };

    const districts = [
        "Ampara",
        "Anuradhapura",
        "Badulla",
        "Batticaloa",
        "Colombo",
        "Galle",
        "Gampaha",
        "Hambantota",
        "Jaffna",
        "Kalutara",
        "Kandy",
        "Kegalle",
        "Kilinochchi",
        "Kurunegala",
        "Mannar",
        "Matale",
        "Matara",
        "Monaragala",
        "Mullaitivu",
        "Nuwara Eliya",
        "Polonnaruwa",
        "Puttalam",
        "Ratnapura",
        "Trincomalee",
        "Vavuniya",
    ];

    return (
        <div>
            <NaviBar theme={theme} setTheme={setTheme} />
            <div className={theme === "light" ? "hospital-reg" : "hospital-reg dark"}>
                <form onSubmit={handleSubmit}>
                    <h1>Hospital Registration</h1>
                    <label htmlFor="name">Hospital Name:</label>
                    <input type="text" name="name" onChange={handleChange} required />

                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" onChange={handleChange} required />
                    <br />

                    <label>Address:</label>

                    <input type="text" name="address_line1" placeholder="Line 1" onChange={handleChange} required />
                    <div className="address-lines">
                        <input type="text" name="address_line2" placeholder="Line 2" onChange={handleChange} />
                        <input type="text" name="address_line3" placeholder="Line 3" onChange={handleChange} />
                    </div>
                    <br />


                    <label>District:</label>
                    <select name="District" onChange={handleChange} required>
                        <option value="">-- Select --</option>
                        {districts.map((d, i) => (
                            <option key={i} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>

                    <br />


                    <label htmlFor="tele">Telephone:</label>
                    <input type="text" name="tele" onChange={handleChange} required />



                    <label htmlFor="pwd">Password: </label>
                    <input type={show ? "text" : "password"} id="pwd" name="pwd" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    {show ? <AiFillEyeInvisible onClick={() => toggleShow()} size={20} /> : <AiFillEye onClick={() => toggleShow()} size={20} />}
                    <br />


                    <label htmlFor="pwdconfirm">Confirm Password: </label>
                    <input type={show ? "text" : "password"} id="pwdconfirm" name="pwdconfirm" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    {show ? <AiFillEyeInvisible onClick={() => toggleShow()} size={20} /> : <AiFillEye onClick={() => toggleShow()} size={20} />}
                    <br />



                    <input type="submit" value="Register" />

                    <p>{message}</p>  <br />
                    {/* <p>{message == "Username is  : " + (hospital.hospital_id) && "Default Password is hospital phone number"}</p> */}

                </form>
            </div>
        </div>
    );
}

export default HospitalReg;
