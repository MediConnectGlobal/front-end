import { Menu, X } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-white shadow-md '>
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
            <Link to="/">
              <img className="h-20 w-56 " src="src\assets\images\logo2.png" alt="Logo" />
                    
                </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
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
                CONTACT
              </Link>
            </div>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/register" className="bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white  px-3 py-2">
              Register
            </Link>
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            >
              Home
            </Link>
            <Link
              to="/services"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            >
              Services
            </Link>
            <Link
              to="/doctors"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            >
              Staff
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            >
              Contact
            </Link>
            <div className="pt-4 space-y-2">
              <Link to="/register" className="w-full text-left px-3 py-2  bg-cyan-500 hover:bg-cyan-600 text-white rounded-md">
                Register
              </Link>
              <Link to="/login" className="w-full text-left px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
};

export default Navbar;