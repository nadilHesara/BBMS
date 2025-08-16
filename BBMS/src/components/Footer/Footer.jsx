

import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Our Features</h3>
          <ul>
            <li className='text-white'>Efficiently track and manage donor information, scheduling, and eligibility</li>
            <li className='text-white'>Seamless blood request and distribution workflow</li>
            <li className='text-white'>Hospital to hospital blood transfusion</li>
            <li className='text-white'>Real-time blood stock monitoring</li>
            <li className='text-white'>Campaign management and donor registration</li>
          </ul>
        </div>
        
        <div className="footer-section ">
          <h3 >About Us</h3>
          <p className='text-white'>
            BBMS (Blood Bank Management System) is a comprehensive platform dedicated to 
            revolutionizing blood donation and distribution. We connect donors, hospitals, 
            and blood banks to ensure timely access to safe blood supplies. Our mission 
            is to save lives by creating an efficient, transparent, and reliable blood 
            management ecosystem.
          </p>
        </div>
        
        <div className="footer-section">
          <h3>Contact Details</h3>
          <div className="contact-info ">
            <p className='text-white'><strong>Address:</strong> National Blood Transfusion Services, Narahenpita, Elvitigala Mawatha, Colombo</p>
            <p className='text-white'><strong>Phone:</strong> +94 112 369 931</p>
            <p className='text-white'><strong>Email:</strong> thilokyabusiness@gmail.com</p>
            <p className='text-white'><strong>Emergency:</strong> +94 776 713 212</p>
            <p className='text-white'><strong>Hours:</strong> 24/7 Emergency Service</p>
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