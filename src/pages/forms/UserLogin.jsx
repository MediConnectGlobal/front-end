import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiLoginUser, apiGoogleLogin } from '../../services/auth';
import Swal from 'sweetalert2';
import { GoogleLogin } from '@react-oauth/google';

const UserLogin = () => {
      const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
e.preventDefault();

const formData = new FormData(e.target); 
const email = formData.get("email");
const password = formData.get("password");



try{
setIsLoading(true);
    const response = await apiLoginUser({ email, password});
    console.log("response", response)
    if (response.status == 200) {

        localStorage.setItem("token", response.data.accessToken); 
        console.log("token", response.data.accessToken)
        localStorage.setItem("userType", "user");
        localStorage.setItem("user", JSON.stringify({
          userType: "user",
          avatar: response.data.user?.avatar,
          name: response.data.user?.firstName,
          name: response.data.user?.lastName,
          contact: response.data.user?.contact,
          email: response.data.user?.email,
         
          // Add any other user data you need
        }));

        Swal.fire({
            icon: "success",
            title: "User Login Successful",
            text: "You have successfully logged into your account",
            confirmButtonText: " OK"
          }).then(() => {
            navigate('/user-dashboard');
          });
    }
}
catch (error) {  
    console.log(error);
    if (error.status == 401) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Unauthorized: Invalid credentials or session expired.',
        confirmButtonText: 'OK',
      });
    }
    else {
        Swal.fire({
          icon: "error",
          title: "Error.",
          text: "An unexpected error occurred. Please try again later.",
          confirmButtonText: " OK"
        }); 
      }        
}finally {
    setIsLoading(false);
  }
 };

  

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await apiGoogleLogin({
        credential: credentialResponse.credential,
        userType: 'user'
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have successfully logged in with Google",
          confirmButtonText: "OK"
        });
        navigate('/user-dashboard');
      }
    } catch (error) {
      console.error('Google login error:', error);
      setErrors({ 
        submit: error.message || 'Google login failed. Please try again.' 
      });
    }
  };

  return (
    <div className="">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Log in as a User
          </h2>
        </div>

        {errors.submit && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{errors.submit}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              // value={formData.email}
              // onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              // value={formData.password}
              // onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                setErrors({ submit: 'Google Sign-In failed' });
              }}
              useOneTap
              shape="rectangular"
              theme="filled_blue"
              text="continue_with"
              width="100%"
            />
          </div>
        </form>

        <div className="text-center">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <Link to="/register" className="text-sm text-blue-600 hover:text-blue-500">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
