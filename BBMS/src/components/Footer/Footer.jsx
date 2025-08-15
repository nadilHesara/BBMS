import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Our Features</h3>
          <ul>
            <li>Efficiently track and manage donor information, scheduling, and eligibility</li>
            <li>Seamless blood request and distribution workflow</li>
            <li>Hospital to hospital blood transfusion</li>
            <li>Real-time blood stock monitoring</li>
            <li>Campaign management and donor registration</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            BBMS (Blood Bank Management System) is a comprehensive platform dedicated to 
            revolutionizing blood donation and distribution. We connect donors, hospitals, 
            and blood banks to ensure timely access to safe blood supplies. Our mission 
            is to save lives by creating an efficient, transparent, and reliable blood 
            management ecosystem.
          </p>
        </div>
        
        <div className="footer-section">
          <h3>Contact Details</h3>
          <div className="contact-info">
            <p><strong>Address:</strong> 123 Medical Center Drive, Healthcare District</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Email:</strong> info@bbms.org</p>
            <p><strong>Emergency:</strong> +1 (555) 999-8888</p>
            <p><strong>Hours:</strong> 24/7 Emergency Service</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 BBMS - Blood Bank Management System. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer