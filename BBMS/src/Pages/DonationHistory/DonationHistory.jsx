import { useState, useEffect } from 'react';
import axios from 'axios';
import './DonationHistory.css';

function DonationHistory({ theme, setTheme }) {
    const [donations, setDonations] = useState([]);

    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const user_Type = sessionStorage.getItem("userType");
    const userID = sessionStorage.getItem("userId");

    useEffect(() => {
        if (userID) {
            axios.get(`http://localhost:9191/dashboard/donations?user_id=${userID}`)
                .then(res => {
                    setDonations(res.data);
                    console.log(res.data);
                })
                .catch(err => console.error(err));
        }
    }, [user_Type, userID]);

    return (
        <div className="donation-history">
            <h2>Donation History</h2>
            {donations.length === 0 ? (
                <div className="no-donations-message">
                    <p><strong>No donations yet.</strong></p>
                    <p>You haven’t donated blood through any campaigns so far.</p>
                    <p>Check out the <a href="/dashboard" style={{ color: "#007bff", textDecoration: "underline" }}>dashboard</a> to see upcoming blood donation campaigns and contribute to saving lives.</p>
                </div>

            ) : (
                <div className="donations-list">
                    {donations.map((donation, index) => (
                        <div key={donation.donate_id || index} className="donation-item">
                            <h3>Donation #{index + 1}</h3>
                            <div className="donation-details">
                                <p><strong>Campaign Name:</strong> {donation.org_name}</p>
                                <p><strong>Date:</strong> {new Date(donation.date).toISOString().slice(0, 10)}</p>
                                <p><strong>District:</strong> {donation.district} </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DonationHistory