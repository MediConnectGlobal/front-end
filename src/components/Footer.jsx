import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-500">Medi</span>
              <span className="text-2xl font-bold text-white">Connect</span>
            </div>
            <p className="text-sm">
              Making healthcare accessible and convenient for everyone.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+233 123 456 789</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@mediconnect.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>123 Healthcare Ave, Accra</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-blue-500 flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-500 flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Our Services
                </a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-blue-500 flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Our Doctors
                </a>
              </li>
              <li>
                <a href="#appointments" className="hover:text-blue-500 flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Book Appointment
                </a>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#general" className="hover:text-blue-500 flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  General Consultation
                </a>
              </li>
              <li>
                <a href="#specialist" className="hover:text-blue-500 flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Specialist Consultation
                </a>
              </li>
              <li>
                <a href="#emergency" className="hover:text-blue-500 flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Emergency Services
                </a>
              </li>
              <li>
                <a href="#online" className="hover:text-blue-500 flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Online Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Opening Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>8:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span>9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>10:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between text-red-400">
                <span>Emergency:</span>
                <span>24/7</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © 2024 MediConnect. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#terms" className="text-sm hover:text-blue-500">
                Terms of Service
              </a>
              <a href="#privacy" className="text-sm hover:text-blue-500">
                Privacy Policy
              </a>
              <a href="#cookies" className="text-sm hover:text-blue-500">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;