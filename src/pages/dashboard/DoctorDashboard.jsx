import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, AlertCircle } from 'lucide-react';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Tabs for different views
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="w-10 h-10 text-blue-500" />
            <div className="ml-4">
              <h3 className="text-gray-500">Total Patients</h3>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Calendar className="w-10 h-10 text-green-500" />
            <div className="ml-4">
              <h3 className="text-gray-500">Today's Appointments</h3>
              <p className="text-2xl font-bold">8</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="w-10 h-10 text-yellow-500" />
            <div className="ml-4">
              <h3 className="text-gray-500">Pending</h3>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <AlertCircle className="w-10 h-10 text-red-500" />
            <div className="ml-4">
              <h3 className="text-gray-500">Urgent</h3>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Appointments Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b px-6 py-4">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'upcoming'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'past'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('past')}
            >
              Past
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Date Selector */}
          <div className="flex items-center mb-6">
            <input
              type="date"
              className="border rounded-lg px-4 py-2"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
          </div>

          {/* Appointments List */}
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Patient Name</h3>
                    <p className="text-sm text-gray-500">General Checkup</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">09:00 AM</p>
                    <p className="text-sm text-gray-500">30 mins</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Patient ID: #12345
                  </span>
                  <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;