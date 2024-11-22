import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRegisterAdmin, apiGoogleRegister } from '../../services/auth';
import { GoogleLogin } from '@react-oauth/google';

const AdminRegister = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData(e.target);

      const firstName = formData.get("firstName");
      const lastName = formData.get("lastName");
      const email = formData.get("email");
      const password = formData.get("password");
      const contact = formData.get("contact");
      const facility = formData.get("facility");
      const role = formData.get("role");

      const payload = { firstName, lastName, email, password, contact, facility, role };

      const response = await apiRegisterAdmin(payload);

      if (response.status == 201) {
        Swal.fire({
          icon: "Success",
          title: "Admin Registered Successfully",
          text: "You have successfully created an account",
          confirmButtonText: "OK"
        });
        navigate('/login');
      }
    } catch (error) {
      console.error(error);

      if (error.status == 409) {
        Swal.fire({
          icon: "Warning",
          title: "Registration failed.",
          text: "Admin already exists.",
          confirmButtonText: "OK"
        });

        return;
      }

      Swal.fire({
        icon: "error",
        title: "Registration failed.",
        text: "Please try again.",
        confirmButtonText: "OK"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async (credentialResponse) => {
    try {
      const response = await apiGoogleRegister({
        credential: credentialResponse.credential,
        userType: 'admin'
      });

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Admin Registration Successful",
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
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Admin Registration</h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className=" space-y-4">
            {/* First Name and Last Name */}
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

            {/* Email and Password */}
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

            {/* Contact and Facility */}
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
                <label htmlFor="facility" className="block text-sm font-medium text-gray-700">Facility</label>
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
              loading ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {loading ? 'Registering...' : 'Register as an Admin'}
          </button>
        </form>

        {/* Google Signup */}
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

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminRegister;
