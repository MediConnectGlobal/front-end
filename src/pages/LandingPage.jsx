import React from 'react';
import heroImage from "../assets/images/hero7.jpg";
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import HealthCareSection from '../components/HealthCareSection';
import Footer from '../components/Footer';


const LandingPage = () => {
  return (
    <div>
      {/* Fixed Navbar */}
      <div className="bg-transparent fixed top-0 left-0 w-full z-10">
        <Navbar />
      </div>

      {/* Background Section */}
      <div className="relative w-full h-[120vh] bg-cover " style={{ backgroundImage: `url(${heroImage})` }}>
        
        
        {/* Overlay with Skewed Text */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-end justify-center text-right text-white p-6 md:p-16">
          <div className="transform -skew-x-6 max-w-lg">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Bringing Healthcare to Your Doorstep</h1>
            <p className="text-lg md:text-xl mb-8">We provide top-notch healthcare services delivered right to your home for convenience and comfort.</p>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 justify-end">
            <Link to='/booking' className="bg-[#245294] hover:bg-[#1F3656] text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
              Book an Appointment
            </Link>
            <Link to='/staff' className="bg-transparent border-2  text-white hover:bg-[#245294] hover:text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
              View Doctors
            </Link>
          </div>
        </div>
      </div>
      <div className='mt-24'>
        <HealthCareSection/>
      </div>
      <div className='mt-24 mb-24'>
      </div>
      <Footer/>
    </div>
  );
}

export default LandingPage;
