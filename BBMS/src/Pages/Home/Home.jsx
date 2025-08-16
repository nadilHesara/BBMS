import React from 'react'
import './Home.css';
import NaviBar from '../../components/Navibar/NaviBar';
import { Link } from 'react-router-dom';
import LeftSlideBar from '../../components/LeftSlideBar/LeftSlideBar';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';


const Home = ({ theme, setTheme }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-red-500 ">
      <NaviBar theme={theme} setTheme={setTheme} />
      {/* Hero Section with Blood Drop Visual */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-950 to-rose-600 opacity-10 "></div>
        <div className="max-w-7xl mx-auto text-center relative z-10 rounded-b-xl">
          <div className="mb-3">
            <div className=" w-[120px] h-[120px] inline-block pt-2 pb-2 pl-2 pr-3 bg-zinc-400  rounded-full  text-center shadow-2xl shadow-[0_10px_30px_rgba(0,0,0,0.7)] mb-2 transform hover:scale-105 transition-transform duration-300">
              <img
                    src="\images\Blood Bank logo 2022-03.png"
                    alt="Profile 1"
                    className=" object-cover object-bottom "
                  />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-zinc-400 bg-clip-text text-transparent mb-10">
            Blood Bank Management System
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
            Saving Lives, One Drop at a Time
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/donorReg"
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Become a Donor
            </Link>
            <Link to="/campaignRequest"
              className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-red-600 hover:text-white transition-all duration-300"
            >
              Organize Campaign
            </Link>
          </div>
        </div>
      </section>

      {/* Donor Statistics Section */}
      <section className="py-16 px-3 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Blood Donation Demographics
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Understanding our donor community helps us better serve those in need. Female donors currently make up the majority of our donor base, showing incredible compassion and commitment to saving lives.
              </p>
              <div className='grid grid-rows-2 gap-1'>
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center p-3 h-[100px] bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl">
                    <div className="text-3xl font-bold text-blue-600 mb-2">34%</div>
                    <div className="text-gray-600">Male Donors</div>
                  </div>
                  <div className="text-center p-3 h-[100px] bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl">
                    <div className="text-3xl font-bold text-pink-600 mb-2">66%</div>
                    <div className="text-gray-600">Female Donors</div>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <div className="bg-red-500 w-[200px] text-white py-2 px-4 rounded-lg font-semibold mx-auto">
                    BENEFITS
                  </div>
                  <div className="flex justify-around mt-4 text-xs text-gray-600">
                    <div className="text-center">
                      <div className="text-3xl mb-1">🙏</div>
                      <div className='text-sm'>gratitude</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-1">😊</div>
                      <div className='text-sm'>happiness</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-1">❤</div>
                      <div className='text-sm'>save lives</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center pl-10">
                {/* Image 1 */}
                <div className="flex-1">
                  <img
                    src="images\interesting-facts-of-blood-mob.jpg"
                    alt="Profile 1"
                    className="w-100 h-[490px] object-cover object-bottom rounded"
                  />
                </div>

                
                
              
            </div>
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Why Blood Donation Matters
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                🚨
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Emergency Situations</h3>
              <p className="text-gray-600">Blood is needed every 2 seconds for emergency surgeries, trauma victims, and accident patients. Your donation can save up to 3 lives.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                🏥
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Medical Procedures</h3>
              <p className="text-gray-600">Cancer patients, organ transplant recipients, and those with blood disorders rely on regular blood transfusions for survival.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                👶
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Mothers & Babies</h3>
              <p className="text-gray-600">Pregnant women and newborns often need blood during childbirth complications. Your donation ensures safe deliveries.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                ⚡
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Quick & Easy</h3>
              <p className="text-gray-600">The donation process takes only 10-15 minutes. Your body replaces the donated blood within 24-48 hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Process Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-red-600 mb-6 text-center">
                  BLOOD DONATION PROCESS
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-500 text-white rounded-lg flex items-center justify-center font-bold">01</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Registration</h4>
                      <p className="text-sm text-gray-600">Complete registration with required information</p>
                    </div>
                    <div className="text-2xl">📝</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-500 text-white rounded-lg flex items-center justify-center font-bold">02</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Quick Physical Exam</h4>
                      <p className="text-sm text-gray-600">Brief health checkup and screening</p>
                    </div>
                    <div className="text-2xl">🩺</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-500 text-white rounded-lg flex items-center justify-center font-bold">03</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">8-10 mins Donation</h4>
                      <p className="text-sm text-gray-600">Safe and comfortable blood collection</p>
                    </div>
                    <div className="text-2xl">🩸</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-500 text-white rounded-lg flex items-center justify-center font-bold">04</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Refreshments</h4>
                      <p className="text-sm text-gray-600">Rest and enjoy complimentary snacks</p>
                    </div>
                    <div className="text-2xl">🥤</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Simple 4-Step Process
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Donating blood is easier than you think. Our streamlined process ensures your comfort and safety while making the biggest impact possible. From registration to refreshments, we'll guide you through every step.
              </p>
              <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 rounded-2xl text-white">
                <h3 className="text-center text-xl font-semibold mb-3">Did You Know?</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">1 in 7</div>
                    <div className="text-sm opacity-90">hospital patients need blood</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">38,000</div>
                    <div className="text-sm opacity-90">donations needed daily</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">56 days</div>
                    <div className="text-sm opacity-90">between donations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connection & Unity Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-[350px]  rounded-full flex items-center justify-center">
                
                  <img src="\images\360_F_309786159_KFi1qWYvgsiqN100CLQaf8pw0vLOHSJR.jpg" className='w-full object-cover rounded-full shadow-[0_10px_50px_rgba(0,0,0,0.7)]'></img>
                </div> 
              </div>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Connecting Lives Through Generosity
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Every donation creates a bridge between a generous heart and someone fighting for their life. Your single act of kindness ripples through families, communities, and generations.
          </p>
        </div>
      </section>

      {/* Real Donation Experience */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-br from-pink-950 to-rose-300 rounded-3xl p-8 shadow-xl">
                  <div className="text-center">
                    <div className="w-[300px] h-full rounded-3xl mx-auto mb-4 flex items-center justify-center">
                      <img src="\images\d4CbziPfy4qWaBHSnt2sXP.jpg" className='w- h-full object-cover rounded-xl shadow-[0_10px_50px_rgba(0,0,0,0.7)]'></img>
                    </div>
                    
                  </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Safe & Professional Care
                  </h3>
                  <p className="text-white">
                    Our trained medical professionals ensure your donation experience is comfortable, safe, and meaningful. State-of-the-art facilities with a warm, welcoming atmosphere.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Your Comfort is Our Priority
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We understand that donating blood might feel intimidating at first. That's why we've created an environment where you can feel relaxed, supported, and proud of the difference you're making.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-950 to-rose-300 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Professional medical staff with years of experience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-950 to-rose-300 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Sterile, state-of-the-art equipment and facilities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-950 to-rose-300 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Comfortable seating and refreshment area</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-950 to-rose-300 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Post-donation care and monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">About Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Founded with a mission to bridge the gap between blood donors and those in need, our Blood Bank Management System has been at the forefront of healthcare innovation since 2020.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                🔒
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Secure & Safe</h3>
              <p className="text-gray-600">HIPAA compliant with end-to-end encryption protecting your personal information</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                ⚡
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">24/7 Availability</h3>
              <p className="text-gray-600">Round-the-clock access to blood bank services for emergency situations</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                🌍
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Nationwide Network</h3>
              <p className="text-gray-600">Connected hospitals and blood banks across the country</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-8">
              We've facilitated over <span className="font-bold text-red-600">50,000</span> successful blood donations and helped save countless lives through our innovative platform that connects hospitals, donors, and blood banks in a seamless network.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">What Our Donors Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-8 rounded-2xl shadow-lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                  👨‍⚕
                </div>
              </div>
              <p className="text-gray-700 mb-6 italic">
                "The donation process was incredibly smooth and professional. The staff made me feel comfortable throughout, and knowing my blood could save lives gives me immense satisfaction."
              </p>
              <div className="text-center">
                <h4 className="font-semibold text-gray-800">Mr. Amal Perera</h4>
                <p className="text-sm text-gray-600">Regular Donor, 15+ donations</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                  👩‍💼
                </div>
              </div>
              <p className="text-gray-700 mb-6 italic">
                "I was nervous about donating for the first time, but the team here was amazing. They explained everything clearly and made the experience truly rewarding. I'll definitely be back!"
              </p>
              <div className="text-center">
                <h4 className="font-semibold text-gray-800">Nadil Kulathunge</h4>
                <p className="text-sm text-gray-600">First-time Donor</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                  👨‍🏫
                </div>
              </div>
              <p className="text-gray-700 mb-6 italic">
                "As a teacher, I believe in leading by example. Donating blood is one of the simplest ways to make a huge impact. The system here makes it so easy to schedule and track donations."
              </p>
              <div className="text-center">
                <h4 className="font-semibold text-gray-800">Prof. Karunarathna</h4>
                <p className="text-sm text-gray-600">Monthly Donor, 8+ years</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 px-4 mb-[50px] bg-indigo-400 text-black ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90 text-white">
            Your first donation could be the reason someone gets a second chance at life — register today and be a hero in someone's story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/donorReg"
              className="px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Become a Donor
            </Link>
            <Link to="/campaignRequest"
              className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-red hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Organize a Campaign
            </Link>
          </div>
          <p className="text-3xl italic opacity-90 text-white font-bold">
            "Be someone's hope. Donate blood today."
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
