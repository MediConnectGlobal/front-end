// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const SignupForm = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//     fullName: '',
//     role: 'patient',
//     specialization: '', // For health specialists
//     licenseNumber: '', // For health specialists
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const validateForm = () => {
//     const newErrors = {};
    
//     // Full Name validation
//     if (!formData.fullName.trim()) {
//       newErrors.fullName = 'Full name is required';
//     } else if (formData.fullName.trim().length < 2) {
//       newErrors.fullName = 'Full name must be at least 2 characters';
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }

//     // Password validation
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters';
//     } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
//       newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
//     }

//     // Confirm Password validation
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     // Health specialist specific validations
//     if (formData.role === 'specialist') {
//       if (!formData.specialization) {
//         newErrors.specialization = 'Specialization is required';
//       }
//       if (!formData.licenseNumber) {
//         newErrors.licenseNumber = 'License number is required';
//       }
//     }

//     return newErrors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validateForm();

//     if (Object.keys(newErrors).length === 0) {
//       setIsSubmitting(true);
//       try {
//         // API call would go here
//         console.log('Form submitted:', formData);
//         // Redirect to login or dashboard would go here
//       } catch (error) {
//         setErrors({ submit: 'Registration failed. Please try again.' });
//       } finally {
//         setIsSubmitting(false);
//       }
//     } else {
//       setErrors(newErrors);
//     }
//   };

//   const handleGoogleSignup = async () => {
//     try {
//       // Google OAuth implementation would go here
//       console.log('Google signup clicked');
//     } catch (error) {
//       setErrors({ submit: 'Google signup failed. Please try again.' });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
//         <div>
//           <h2 className="text-center text-3xl font-extrabold text-gray-900">
//             Create your account
//           </h2>
//         </div>

//         {errors.submit && (
//           <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//             <span className="block sm:inline">{errors.submit}</span>
//           </div>
//         )}

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {/* Role Selection */}
//           <div className="flex justify-center space-x-4">
//             <label className="inline-flex items-center">
//               <input
//                 type="radio"
//                 name="role"
//                 value="patient"
//                 checked={formData.role === 'patient'}
//                 onChange={handleChange}
//                 className="form-radio h-4 w-4 text-blue-600"
//               />
//               <span className="ml-2">Patient</span>
//             </label>
//             <label className="inline-flex items-center">
//               <input
//                 type="radio"
//                 name="role"
//                 value="specialist"
//                 checked={formData.role === 'specialist'}
//                 onChange={handleChange}
//                 className="form-radio h-4 w-4 text-blue-600"
//               />
//               <span className="ml-2">Health Specialist</span>
//             </label>
//           </div>

//           {/* Full Name */}
//           <div>
//             <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
//               Full Name
//             </label>
//             <input
//               id="fullName"
//               name="fullName"
//               type="text"
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               value={formData.fullName}
//               onChange={handleChange}
//             />
//             {errors.fullName && (
//               <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email address
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               value={formData.email}
//               onChange={handleChange}
//             />
//             {errors.email && (
//               <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               value={formData.password}
//               onChange={handleChange}
//             />
//             {errors.password && (
//               <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//             )}
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//               Confirm Password
//             </label>
//             <input
//               id="confirmPassword"
//               name="confirmPassword"
//               type="password"
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//             />
//             {errors.confirmPassword && (
//               <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
//             )}
//           </div>

//           {/* Specialist Fields */}
//           {formData.role === 'specialist' && (
//             <>
//               <div>
//                 <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
//                   Specialization
//                 </label>
//                 <input
//                   id="specialization"
//                   name="specialization"
//                   type="text"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   value={formData.specialization}
//                   onChange={handleChange}
//                 />
//                 {errors.specialization && (
//                   <p className="mt-1 text-sm text-red-600">{errors.specialization}</p>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
//                   License Number
//                 </label>
//                 <input
//                   id="licenseNumber"
//                   name="licenseNumber"
//                   type="text"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   value={formData.licenseNumber}
//                   onChange={handleChange}
//                 />
//                 {errors.licenseNumber && (
//                   <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>
//                 )}
//               </div>
//             </>
//           )}

//           <div>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//             >
//               {isSubmitting ? 'Creating account...' : 'Sign up'}
//             </button>
//           </div>

//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300" />
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-gray-500">Or continue with</span>
//             </div>
//           </div>

//           <div>
//             <button
//               type="button"
//               onClick={handleGoogleSignup}
//               className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               <svg className="h-5 w-5" viewBox="0 0 24 24">
//                 <path
//                   d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                   fill="#4285F4"
//                 />
//                 <path
//                   d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                   fill="#34A853"
//                 />
//                 <path
//                   d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                   fill="#FBBC05"
//                 />
//                 <path
//                   d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                   fill="#EA4335"
//                 />
//               </svg>
//               Sign up with Google
//             </button>
//           </div>
//         </form>

//         <div className="text-center">
//           <span className="text-sm text-gray-600">Already have an account? </span>
//           <Link to="/login" className="text-sm text-blue-600 hover:text-blue-500">
//             Login here
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiRegister } from '../../services/auth';

const RegisterForm = () => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
       
  

  // const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
      const location = formData.get("location");
      const role = formData.get("role");
      const position = formData.get("position");
      const lincenceNumber = formData.get("lincenceNumber");
      const facility = formData.get("facility");
      const department = formData.get("department");


      // API call would go here

      const payload = { firstName, lastName, email, password, contact, location, role, position, lincenceNumber, facility, department };

      const response = await apiRegister(payload);

      if (response.status === 200) {

        console.log('Form submitted:', formData);
        toast.success('Registration successful!');
        navigate("/login");
      }

     
    } catch (error) {
      console.log(error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // Implement Google Sign-In logic here
    console.log('Google Sign-In clicked');
    toast.info('Google Sign-In feature coming soon!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Log in if you already have an account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="First Name"
                  value={FormData.firstName}
                  
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Last Name"
                  value={FormData.lastName}
                  
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
                value={FormData.email}
                
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
                value={FormData.password}
                
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
                <input
                  id="contact"
                  name="contact"
                  type="text"
                  required
                  className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Contact"
                  value={FormData.contact}
                
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Location"
                  value={FormData.location}
                  
                />
              </div>
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <select
                id="role"
                name="role"
                required
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={FormData.role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="patient">Patient</option>
                <option value="healthcare_provider">Healthcare Provider</option>
              </select>
            </div>
          </div>

          {FormData.role === 'healthcare_provider' && (
            <div className="rounded-md shadow-sm space-y-4 mt-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</label>
                  <input
                    id="position"
                    name="position"
                    type="text"
                    required
                    className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Position"
                    value={FormData.position}
                   
                  />
                </div>
                <div>
                  <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">License Number</label>
                  <input
                    id="licenseNumber"
                    name="licenseNumber"
                    type="text"
                    required
                    className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="License Number"
                    value={FormData.lincenceNumber}
                   
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="facility" className="block text-sm font-medium text-gray-700">Facility</label>
                  <input
                    id="facility"
                    name="facility"
                    type="text"
                    required
                    className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Facility"
                    value={FormData.facility}
                    
                  />
                </div>
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                  <input
                    id="department"
                    name="department"
                    type="text"
                    required
                    className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Department"
                    value={FormData.department}
                    
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
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
            <button
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
//                 <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Register with Google
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
