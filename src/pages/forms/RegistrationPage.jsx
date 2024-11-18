import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/bg1.jpg'; 
// import AdminRegister from '../../pages/forms/AdminRegister';
import StaffRegister from '../../pages/forms/StaffRegister';
import UserRegister from '../../pages/forms/UserRegister';
import RootLayout from '../../layouts/RootLayout';

const RegistrationPage = () => {
  const [selectedRole, setSelectedRole] = useState('user');
  const navigate = useNavigate();

  const renderForm = () => {
    switch (selectedRole) {
      // case 'admin':
      //   return <AdminRegister navigate={navigate} />;
      case 'staff':
        return <StaffRegister navigate={navigate} />;
      case 'user':
      default:
        return <UserRegister navigate={navigate} />;
    }
  };

  const getButtonStyles = (role) => 
    `px-4 py-2 rounded ${selectedRole === role ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`;

  const handleRoleSelection = (role) => setSelectedRole(role);

  return (
    <RootLayout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Role for Registration</h2>
      
      <div className="flex space-x-4 mb-8">
        <button 
          className={getButtonStyles('user')}
          onClick={() => handleRoleSelection('user')}
        >
          User
        </button>
        {/* <button 
          className={getButtonStyles('admin')}
          onClick={() => handleRoleSelection('admin')}
        >
          Admin
        </button> */}
        <button 
          className={getButtonStyles('staff')}
          onClick={() => handleRoleSelection('staff')}
        >
          Staff
        </button>
      </div>
      
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        {renderForm()}
      </div>
    </div>
    </RootLayout>
  );
};

export default RegistrationPage;
