import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRegisterStaff, apiGoogleRegister } from '../../services/auth';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const MEDICAL_SPECIALTIES = [
  'Doctor',
  'Nurse',
  'Dentist',
  'Dietician',
  'Specialist',
  'Pharmacist',
  'Dermatologist',
  'Cardiologist',
  'Anesthesiologist',
  'Gynecologist',
  'Midwife',
  'Speech-Language Therapist',
  'Thereapist',
  'Radiologist',
  'Surgeon',
  'Optometrist (eyes)',
  'Psychologist',
  'Psychiatrist',
  'Audiologist (ear)',
  'Others'
];

const StaffRegister = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      setLoading(true);
      const formData = new FormData(e.target);
    
    const firstName = formData.get("firstName");
    const lastName= formData.get("lastName");
    const email= formData.get("email");
    const password= formData.get("password");
    const contact= formData.get("contact");
    // const location= formData.get("location");
    const specialty= formData.get("specialty");
    const lincenceNumber= formData.get("lincenceNumber");
    const facility= formData.get("facility");
    const department= formData.get("department");
    const role= "staff";
    
    const payload = { firstName, lastName, email, password, contact, specialty, lincenceNumber, facility, department, role};

      const response = await apiRegisterStaff(payload);
        
      
      console.log('response', response);

      if (response.status == 201) {
        Swal.fire({
          icon: "Success",
          title: "Staff Registered Successfully",
          text: "You have successfully created an account",
          confirmButtonText: " OK"
        });
        navigate('/login');
      }
    } catch (error) {
      console.error(error);

      if (error.status == 409) { 
      Swal.fire({
        icon: "Warning",
        title: "Registration failed.",
        text: "Staff already exists.",
        confirmButtonText: " OK"
      });

      return;
    }

    
    Swal.fire({
      icon: "error",
      title: "Registration failed.",
      text: "Please try again.",
      confirmButtonText: " OK"
    });
    }
     finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async (credentialResponse) => {
    try {
      const response = await apiGoogleRegister({
        credential: credentialResponse.credential,
        userType: 'staff' // Specify that this is staff registration
      });

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Staff Registration Successful",
          text: "You have successfully registered with Google",
          confirmButtonText: "OK"
        });
        navigate('/login');
      }
    } catch (error) {
      console.error('Google registration error:', error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Unable to register with Google. Please try again.",
        confirmButtonText: "OK"
      });
    }
  };

  return (
    <div className="">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Staff Registration</h2>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className=" space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="First Name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
                <input
                  id="contact"
                  name="contact"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Contact"
                />
              </div>
              <div>
                <label htmlFor="licenceNumber" className="block text-sm font-medium text-gray-700">Licence Number</label>
                <input
                  id="licenceNumber"
                  name="lincenceNumber"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Licence Number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">
                  Specialty
                </label>
                <select
                  id="specialty"
                  name="specialty"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a specialty</option>
                  {MEDICAL_SPECIALTIES.map((specialty, index) => (
                    <option key={index} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="facility" className="block text-sm font-medium text-gray-700">
                  Facility
                </label>
                <input
                  id="facility"
                  name="facility"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Facility"
                />
              </div>
            </div>

            <div className="">
              
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                <input
                  id="department"
                  name="department"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Department"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
              loading ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {loading ? 'Registering...' : 'Register as a Staff'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <GoogleLogin
              onSuccess={handleGoogleSignup}
              onError={() => {
                toast.error('Google Sign-In failed');
              }}
              useOneTap
              shape="rectangular"
              theme="filled_blue"
              text="continue_with"
              width="100%"
            />
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default StaffRegister;
