import React from 'react';
import about3 from '../assets/images/about1.jpg'
import about2 from '../assets/images/about2.webp'
import { Link } from 'react-router-dom';

const HealthCareSection = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between p-10 max-w-4xl mx-auto gap-10">
      <div className="relative flex flex-col gap-5">
  <div className="relative">
    <img
      src={about2}
      alt="Doctor consulting patient"
      className="w-72 rounded-lg relative "
    />
    {/* <img
      src={about3}
      alt="Dentist performing a procedure"
      className="w-72 rounded-lg absolute top-10 left-10 opacity-90"
    /> */}
  </div>
</div>

      <div className="max-w-md">
      <p className=" text-cyan-500  text-lg font-semibold mb-2">Welcome to MediConnect</p>
        <h2 className="text-4xl font-bold text-cyan-500 mb-4">
          Comprehensive Care for Your Well-Being
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          At Mediconnect, we are dedicated to providing high-quality medical services to help you achieve optimal health. Our team of experienced doctors and specialists is here to support you every step of the way.
        </p>
        <ul className="list-none space-y-2 text-gray-700 text-lg mb-6">
          <li className="flex items-center">
            <span className="mr-2">✔</span> Personalized consultations with experienced doctors.
          </li>
          <li className="flex items-center">
            <span className="mr-2">✔</span> Conveniently book an appointment with a specialist anytime, anywhere.
          </li>
          <li className="flex items-center">
            <span className="mr-2">✔</span> Comprehensive health checkups and preventive care.
          </li>
        </ul>
        <Link to="/about">
        <button className="px-6 py-3 border-2 border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition">
          Learn More
        </button>
        </Link>
      </div>
    </section>
  );
};

export default HealthCareSection;
