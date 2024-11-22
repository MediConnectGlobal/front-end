import React from 'react';
import heroImage from "../assets/images/hero7.jpg";
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import HealthCareSection from '../components/HealthCareSection';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please login or register to book an appointment',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#245294',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login',
        cancelButtonText: 'Register'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate('/register');
        }
      });
    } else {
      navigate('/user-dashboard');
    }
  };

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
            <button 
              onClick={handleBookAppointment}
              className="bg-[#245294] hover:bg-[#1F3656] text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Book an Appointment
            </button>
            <Link to='/staff' className="bg-transparent border-2 text-white hover:bg-[#245294] hover:text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
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
