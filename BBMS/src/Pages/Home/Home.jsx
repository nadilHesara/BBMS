import React from 'react'
import './Home.css';
import NaviBar from '../../components/Navibar/NaviBar';
import { Link } from 'react-router-dom';
import LeftSlideBar from '../../components/LeftSlideBar/LeftSlideBar';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const Home = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/123')
  }
  return (
    <div className='dashboard-layout'>
      <NaviBar theme={theme} setTheme={setTheme} />

      <div className='main-layout'>
        <div className='content-area'>
          <div className='home-page'>
            <div className="hero-section">
              <h1 className="hero-title">Welcome to the Blood Bank Management System</h1>
              <p className="hero-subtitle">Saving Lives, One Drop at a Time</p>
            </div>
            <div className="blood-donation-info">
              <h2 className="section-title">Why Blood Donation Matters</h2>
            
              <div className="info-grid">
                <div className="info-card">
                  <div className="card-icon">🩸</div>
                  <h3>Emergency Situations</h3>
                  <p>Blood is needed every 2 seconds for emergency surgeries, trauma victims, and accident patients. Your donation can save up to 3 lives.</p>
                </div>
                <div className="info-card">
                  <div className="card-icon">🏥</div>
                  <h3>Medical Procedures</h3>
                  <p>Cancer patients, organ transplant recipients, and those with blood disorders rely on regular blood transfusions for survival.</p>
                </div>
                <div className="info-card">
                  <div className="card-icon">👶</div>
                  <h3>Mothers & Babies</h3>
                  <p>Pregnant women and newborns often need blood during childbirth complications. Your donation ensures safe deliveries.</p>
                </div>
                <div className="info-card">
                  <div className="card-icon">⚡</div>
                  <h3>Quick & Easy</h3>
                  <p>The donation process takes only 10-15 minutes. Your body replaces the donated blood within 24-48 hours.</p>
                </div>
              </div>
              <div className="stats-section">
                <h3>Did You Know?</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-number">1 in 7</span>
                    <span className="stat-label">hospital patients need blood</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">38,000</span>
                    <span className="stat-label">blood donations needed daily</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">56 days</span>
                    <span className="stat-label">between donations</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-us-section">
              <h2 className="section-title">About Us</h2>
              <div className="about-content">
                <div className="about-text">
                  <p>Founded with a mission to bridge the gap between blood donors and those in need, our Blood Bank Management System has been at the forefront of healthcare innovation since 2020. We believe that every drop of blood donated has the power to save lives and bring hope to families in crisis.</p>
                  <p>Our platform connects hospitals, donors, and blood banks in a seamless network, ensuring that life-saving blood is available when and where it's needed most. With cutting-edge technology and a dedicated team of healthcare professionals, we've facilitated over 50,000 successful blood donations and helped save countless lives.</p>
                </div>
                <div className="about-features">
                  <div className="feature-item">
                    <span className="feature-icon">🔒</span>
                    <h4>Secure & Safe</h4>
                    <p>HIPAA compliant with end-to-end encryption</p>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">⚡</span>
                    <h4>24/7 Availability</h4>
                    <p>Round-the-clock access to blood bank services</p>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🌍</span>
                    <h4>Nationwide Network</h4>
                    <p>Connected hospitals and blood banks across the country</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="feedback-section">
              <h2 className="section-title">What Our Donors Say</h2>
              <div className="feedback-grid">
                <div className="feedback-card">
                  <div className="feedback-avatar">👨‍⚕️</div>
                  <div className="feedback-content">
                    <p className="feedback-text">"The donation process was incredibly smooth and professional. The staff made me feel comfortable throughout, and knowing my blood could save lives gives me immense satisfaction."</p>
                    <div className="feedback-author">
                      <h4>Mr. Amal Perera</h4>
                      <span>Regular Donor, 15+ donations</span>
                    </div>
                  </div>
                </div>
                <div className="feedback-card">
                  <div className="feedback-avatar">👩‍💼</div>
                  <div className="feedback-content">
                    <p className="feedback-text">"I was nervous about donating for the first time, but the team here was amazing. They explained everything clearly and made the experience truly rewarding. I'll definitely be back!"</p>
                    <div className="feedback-author">
                      <h4>Nadil Kulathunge</h4>
                      <span>First-time Donor</span>
                    </div>
                  </div>
                </div>
                <div className="feedback-card">
                  <div className="feedback-avatar">👨‍🏫</div>
                  <div className="feedback-content">
                    <p className="feedback-text">"As a teacher, I believe in leading by example. Donating blood is one of the simplest ways to make a huge impact. The system here makes it so easy to schedule and track donations."</p>
                    <div className="feedback-author">
                      <h4>Prof. Karunarathna</h4>
                      <span>Monthly Donor, 8+ years</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="call-to-action">
              <h2>Ready to Make a Difference?</h2>
              <p>Your first donation could be the reason someone gets a second chance at life — register today and be a hero in someone’s story.</p>
              <div className="action-buttons">
                <Link to="/donorReg" className='btn btn-secondary'>Become a Donor</Link>
              </div>
              <p className="inspiration-text">"Be someone's hope. Donate blood today."</p>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  )
}

export default Home