import { Menu, X } from 'lucide-react';
import React, { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-white shadow-md'>
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
            <a href="#">
              <img className="h-16 w-40 " src="src\assets\images\logo.png" alt="Logo" />
                    
                </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600">
                Home
              </a>
              <a href="#services" className="text-gray-700 hover:text-blue-600">
                Services
              </a>
              <a href="#doctors" className="text-gray-700 hover:text-blue-600">
                Doctors
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600">
                Contact
              </a>
            </div>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 px-3 py-2">
              Login
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Sign Up
            </button>
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
            <a
              href="#home"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            >
              Home
            </a>
            <a
              href="#services"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            >
              Services
            </a>
            <a
              href="#doctors"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            >
              Doctors
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            >
              Contact
            </a>
            <div className="pt-4 space-y-2">
              <button className="w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                Login
              </button>
              <button className="w-full text-left px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
};

export default Navbar;