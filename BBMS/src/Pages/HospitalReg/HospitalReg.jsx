import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NaviBar from "../../components/Navibar/NaviBar";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { LoadingContext } from "../../context/LoadingContext";
import districts from '../../SharedData/districts';
import LeftSlideBar from "../../components/LeftSlideBar/LeftSlideBar";
import "./HospitalReg.css";
import { toast } from "react-toastify";

function HospitalReg({ theme, setTheme }) {

    const { loading, setLoading } = useContext(LoadingContext);
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
        isCampaign: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name + "  :  " + value);
        
        setHospital(prev => ({
            ...prev,
            [name]: name === "isCampaign" ? parseInt(value, 10) : value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            const response = await fetch("http://localhost:9191/hospitalReg", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(hospital)
            });
            
            const result = await response.json();
            if (response.ok) {
                toast.success("Hospital Registration Successful! \n Your password was send to your email!");
                navigate("/dashboard");

            } else {
                toast.error((result.message || JSON.stringify(result)));
                console.error("Error response:", result);
            }
        } catch (error) {
            console.error("Error submitting form:", error.message);
            toast.error("Submission failed. Check server and data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <NaviBar theme={theme} setTheme={setTheme} />
            <div className={theme === "light" ? "hospital-reg" : "hospital-reg dark"}>
                <form className="doner-reg-form" onSubmit={handleSubmit}>
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

                    <label htmlFor="contact_no">Telephone:</label>
                    <input type="text" name="contact_no" onChange={handleChange} required />

                    <br />

                    <lable htmlFor="isCampaign">Campaign in this hospital</lable>
                    <select name="isCampaign" onChange={handleChange} required>
                        <option>-- select -- </option>
                        <option value={1}> Yes </option>
                        <option value={0}> No </option>
                    </select>

                    <input type="submit" value="Register" />

                </form>
            </div>
        </div>
    );
}

export default HospitalReg;
