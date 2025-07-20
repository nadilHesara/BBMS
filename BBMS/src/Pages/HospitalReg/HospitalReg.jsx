import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NaviBar from "../../components/Navibar/NaviBar";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import "./HospitalReg.css";

function HospitalReg({ theme, setTheme }) {
    const navigate = useNavigate();

    const [hospital, setHospital] = useState({
        hospital_id: "H001",
        name: "",
        username: "",
        email: "",
        address_line1: "",
        address_line2: "",
        address_line3: "",
        District: "",
        contact_no: "",
        password: ""
    });

    const [show, setShow] = useState([false, false]);

    const [conformPassword, setConformPassword] = useState("");
    const [password, setPassword] = useState("");

    function toggleShow(n) {
        if (n == 1) {
            setShow([show[0], !show[1]]);
        } else {
            setShow([!show[0], show[1]]);
        }
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
        if (password != conformPassword) {
            setMessage("Password is miss match!");
            return;
        } else {
            setHospital({
                ...hospital,
                ["password"]: password
            })
        }
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
                setMessage("Hospital Registration Successful!");
                alert("Hospital added successfully!");
                navigate("/login");

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
        "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy",
        "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa",
        "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya",];

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

                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" onChange={handleChange} required />
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
                    <input type={show[0] ? "text" : "password"} id="pwd" name="pwd" onChange={(e) => setPassword(e.target.value)}></input>
                    {show[0] ? <AiFillEyeInvisible onClick={() => toggleShow(0)} size={20} /> : <AiFillEye onClick={() => toggleShow(0)} size={20} />}
                    <br />

                    <label htmlFor="pwdconfirm">Confirm Password: </label>
                    <input type={show[1] ? "text" : "password"} id="pwdconfirm" name="pwdconfirm" onChange={(e) => setConformPassword(e.target.value)}></input>
                    {show[1] ? <AiFillEyeInvisible onClick={() => toggleShow(1)} size={20} /> : <AiFillEye onClick={() => toggleShow(1)} size={20} />}
                    <br />

                    <input type="submit" value="Register" />
                    <div className="message">
                        <p style={message == "Password is miss match!" ? { color: "red" } : { color: "black" }}>{message}</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default HospitalReg;
