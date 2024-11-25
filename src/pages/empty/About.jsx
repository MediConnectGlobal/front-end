import React, { useState } from 'react';
import RootLayout from '../../layouts/RootLayout';
import { MapPin, Phone, Mail, Clock, Send, Heart, Users, Shield, Activity } from 'lucide-react';
import Swal from 'sweetalert2';
import aboutImage from '../../assets/images/about1.jpg';

const About = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: 'success',
      title: 'Message Sent!',
      text: 'We will get back to you soon.',
      confirmButtonColor: '#245294'
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <RootLayout>
      <div className="min-h-screen bg-gray-50 mt-20">
        {/* About Us Hero Section */}
        <div className="relative bg-[#0a8086] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 ml-28 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl font-bold mb-6">About Us</h1>
                <p className="text-lg mb-8">
                  We are dedicated to providing exceptional healthcare services that prioritize 
                  your well-being. Our team of experienced healthcare professionals is committed 
                  to delivering personalized care with compassion and excellence.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {/* <div className="text-center">
                    <h3 className="text-3xl font-bold">10+</h3>
                    <p>Years Experience</p>
                  </div> */}
                  <div className="text-center">
                    <h3 className="text-3xl font-bold">50+</h3>
                    <p>Expert Doctors</p>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
              <img 
  src={aboutImage} 
  alt="Healthcare professionals" 
  className="rounded-lg shadow-xl object-cover object-center w-[450px] h-[350px]"
  loading="lazy"
/>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-[#245294] mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-[#0b98a0] rounded-lg">
                <Heart className="w-12 h-12 text-[#245294] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Compassion</h3>
                <p className="text-gray-800">We care deeply about our patients' well-being</p>
              </div>
              <div className="text-center p-6 bg-[#0b98a0]  rounded-lg">
                <Shield className="w-12 h-12 text-[#245294] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-gray-800">We maintain the highest standards of healthcare</p>
              </div>
              <div className="text-center p-6 bg-[#0b98a0]  rounded-lg">
                <Users className="w-12 h-12 text-[#245294] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-gray-800">We build strong relationships with our community</p>
              </div>
              <div className="text-center p-6 bg-[#0b98a0]  rounded-lg">
                <Activity className="w-12 h-12 text-[#245294] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-800">We embrace modern healthcare solutions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-[#0b98a0]   p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-[#245294] mb-4">Our Mission</h3>
                <p className="text-gray-800">
                  To provide accessible, high-quality healthcare services that improve the 
                  well-being of our community through compassionate care, innovation, and 
                  excellence in medical practice.
                </p>
              </div>
              <div className="bg-[#0b98a0]  p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-[#245294] mb-4">Our Vision</h3>
                <p className="text-gray-800">
                  To be the leading healthcare provider, recognized for excellence in patient 
                  care, innovative medical solutions, and positive community impact.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-[#245294] mb-12">Contact Us</h2>
            
            {/* Contact Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-[#0b98a0] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <MapPin className="w-10 h-10 text-[#245294] mb-4" />
                <h3 className="text-lg font-semibold mb-2">Our Location</h3>
                <p className="text-gray-800">123 Healthcare Avenue, Accra, Ghana</p>
              </div>

              <div className="bg-[#0b98a0] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Phone className="w-10 h-10 text-[#245294] mb-4" />
                <h3 className="text-lg font-semibold mb-2">Phone Number</h3>
                <p className="text-gray-800">+233 24 123 4567</p>
                <p className="text-gray-800">+233 20 987 6543</p>
              </div>

              <div className="bg-[#0b98a0] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Mail className="w-10 h-10 text-[#245294] mb-4" />
                <h3 className="text-lg font-semibold mb-2">Email Address</h3>
                <p className="text-gray-800">info@healthcare.com</p>
                <p className="text-gray-800">support@healthcare.com</p>
              </div>

              <div className="bg-[#0b98a0] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Clock className="w-10 h-10 text-[#245294] mb-4" />
                <h3 className="text-lg font-semibold mb-2">Working Hours</h3>
                <p className="text-gray-800">Mon - Fri: 8:00 AM - 6:00 PM</p>
                <p className="text-gray-800">Sat: 9:00 AM - 3:00 PM</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="max-w-3xl mx-auto bg-[#46c5cc] rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-[#245294] mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#245294] focus:border-[#245294]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#245294] focus:border-[#245294]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#245294] focus:border-[#245294]"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#245294] focus:border-[#245294]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#245294] text-white py-3 px-6 rounded-md hover:bg-[#1F3656] transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Google Maps */}
            <div className="mt-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254507.6228176707!2d-0.2497173390905051!3d5.5912883736538025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1709669136705!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-md"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default About;