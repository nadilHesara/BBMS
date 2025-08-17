import React, { use, useState, useContext } from 'react'
import "./Donates.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { LoadingContext } from "../../context/LoadingContext";

function Donates({ theme, setTheme }) {
    const [username_email, setUsername_email] = useState('');
    const [nic, setNic] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const campaign_id = location.state?.campaignId;
    const campdate = location.state?.campdate;
    const { loading, setLoading } = useContext(LoadingContext);

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            // setLoading(true);
            const response = await fetch("http://localhost:9191/donates", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username_email, nic })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error:", errorData);
                setShowPopup(true);
                return;
            }

            else {
                const data = await response.json();
                console.log(data);
                navigate("/dashboard/DonationInfo", {
                    state: {
                        campaign_Id: campaign_id,
                        donorId: data.user_id,
                        cdate: campdate
                    }
                });

            }

        } catch (error) {
            console.error("Error:", error);
            setShowPopup(true);
        } finally {
            setLoading(false);
        }
    }


    const handleRegister = () => {
        setShowPopup(false);
        navigate("/donorReg"); // Route to doner registration page
    };

    const handleIgnore = () => {
        setShowPopup(false);
        navigate("/dashboard/Donates"); // Or wherever you want to go if ignored
    };


    return (
        <div className="search_container">
            <form className="doner-reg-form" onSubmit={handleSearchSubmit}>
                <h1>Campaign {campaign_id}</h1>
                <div className="field_container">
                    <label className='Label' htmlFor="username_email">Username or Email</label>
                    <input type="text" id="username_email" name="username_email" value={username_email} onChange={(e) => setUsername_email(e.target.value)}></input>
                    <br />
                    <label className='Label' htmlFor="nic">NIC No</label>
                    <input type="text" id="nic" name="nic" value={nic} onChange={(e) => setNic(e.target.value)}></input>
                    <br />
                    <input type="submit" value="Search" />

                </div>
            </form>


            {showPopup && (
                <div className="popup-backdrop">
                    <div className="popup-box">
                        <p>No registered doner. Please Check Your Username or Email</p>
                        <button onClick={handleRegister}>Register Doner</button>
                        <button onClick={handleIgnore}>Ignore</button>
                    </div>
                </div>
            )}

        </div>

    );
}


export default Donates