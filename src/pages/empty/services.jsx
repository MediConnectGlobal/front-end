import React from 'react';
import { 
  Stethoscope, 
  Calendar, 
  Pill, 
  ClipboardList, 
  Activity, 
  UserCog 
} from 'lucide-react';
import RootLayout from '../../layouts/RootLayout';

const Services = () => {
  const services = [
    {
      icon: <Calendar className="w-12 h-12 text-cyan-500 mb-4" />,
      title: "Appointment Booking",
      description: "Schedule consultations with general practitioners or specialists based on real-time availability. Easily manage and reschedule appointments through our user-friendly interface."
    },
    {
      icon: <Pill className="w-12 h-12 text-cyan-500 mb-4" />,
      title: "Prescription Management",
      description: "Receive and manage digital prescriptions from your healthcare providers. Purchase prescribed medications directly through our platform."
    },
    {
      icon: <UserCog className="w-12 h-12 text-cyan-500 mb-4" />,
      title: "Profile Management",
      description: "Maintain your personal health profile, update medical information, and manage your healthcare preferences all in one place."
    },
    {
      icon: <Stethoscope className="w-12 h-12 text-cyan-500 mb-4" />,
      title: "Online Consultations",
      description: "Connect with healthcare professionals through our platform. Get expert medical advice and diagnosis from the comfort of your home."
    },
    {
      icon: <Activity className="w-12 h-12 text-cyan-500 mb-4" />,
      title: "Vitals Tracking",
      description: "Monitor and record your vital signs including blood pressure, heart rate, and other important health metrics. View historical data with intuitive graphical representations. Coming soon..."
    },
    
    {
      icon: <ClipboardList className="w-12 h-12 text-cyan-500 mb-4" />,
      title: "Medical Records",
      description: "Access your complete medical history, including past consultations, diagnoses, and treatment plans. Keep all your health information organized in one secure place. Coming soon..."
    },
    
  ];

  return (
    <RootLayout>
      <div className="container mx-auto px-4 py-16 mt-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#0CBFC7] mb-4">Our Services</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            MediConnect provides a comprehensive suite of healthcare services designed to make your medical journey seamless and accessible.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-[#0B98A0] p-12 rounded-md">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                {service.icon}
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Ready to experience better healthcare management?
          </p>
          <button 
            onClick={() => window.location.href = '/register'}
            className="bg-cyan-500 text-white px-8 py-3 rounded-lg hover:bg-cyan-600 transition-colors duration-300"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </RootLayout>
  );
};

export default Services;