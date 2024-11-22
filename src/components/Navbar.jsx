import { Menu, X, User } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/images/logo2.png'

const Navbar = ({ isLoggedIn, userType, userProfile }) => {
  const [isMenuOpen, setIsOpen] = useState(false);

  // Helper function to get dashboard link based on user type
  const getDashboardLink = () => {
    switch(userType) {
      case 'admin': return '/admin-dashboard';
      case 'staff': return '/staff-dashboard';
      default: return '/user-dashboard';
    }
  };

  // Modified getNavLinks function
  const getNavLinks = () => {
    return (
      <>
        <Link to="/" className="text-[#0891B2] font-semibold hover:text-blue-600">
          HOME
        </Link>
        <Link to="/services" className="text-[#0891B2] font-semibold hover:text-blue-600">
          SERVICES
        </Link>
        <Link to="/staff" className="text-[#0891B2] font-semibold hover:text-blue-600">
          STAFF
        </Link>
        <Link to="/contact" className="text-[#0891B2] font-semibold hover:text-blue-600">
          ABOUT
        </Link>
      </>
    );
  };

  const AuthButtons = () => (
    <>
      <Link
        to="/register"
        className="bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white px-3 py-2"
      >
        Register
      </Link>
      <Link
        to="/login"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Login
      </Link>
    </>
  );

  const UserProfile = () => (
    <div className="flex items-center space-x-4">
      {/* <Link to="/profile" className="flex items-center space-x-2">
        {userProfile?.image ? (
          <img 
            src={userProfile.image} 
            alt="Profile" 
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <User className="w-8 h-8 p-1 rounded-full bg-gray-200" />
        )}
        <span className="text-[#0891B2]">{userProfile?.name || 'My Profile'}</span>
      </Link> */}
      <Link
        to={getDashboardLink()}
        className="text-[#0891B2] font-semibold hover:text-blue-600"
      >
        My Dashboard
      </Link>
    </div>
  );

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                className="h-20 w-56"
                src={image}
                alt="Logo"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Modified */}
          <div className="hidden md:flex">
            <div className="ml-10 flex items-center space-x-8">
              {getNavLinks()}
            </div>
          </div>

          {/* Auth Buttons or User Profile - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? <UserProfile /> : <AuthButtons />}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Modified */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-4 pb-6">
          {getNavLinks()}
          <div className="pt-4 space-y-2 border-t border-gray-200 mt-4">
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                  My Profile
                </Link>
                <Link to={getDashboardLink()} className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                  Dashboard
                </Link>
              </>
            ) : (
              <div className="space-y-2">
                <Link to="/register" className="block w-full text-left px-3 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md">
                  Register
                </Link>
                <Link to="/login" className="block w-full text-left px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
