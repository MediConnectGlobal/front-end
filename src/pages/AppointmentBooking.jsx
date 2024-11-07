import React, { useState } from 'react';
import { Calendar, Clock, User } from 'lucide-react';

const AppointmentBooking = () => {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState({
    doctor: '',
    date: '',
    time: '',
    reason: ''
  });

  // Sample data - in real app, this would come from API
  const doctors = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "General Physician" },
    { id: 2, name: "Dr. Michael Patel", specialty: "General Physician" }
  ];

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM",
    "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle booking submission
    console.log("Booking details:", booking);
    // Show success message
    setStep(4);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((num) => (
          <div 
            key={num}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= num ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {num}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Select Doctor */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Select Doctor</h2>
            <div className="grid gap-4">
              {doctors.map((doctor) => (
                <button
                  key={doctor.id}
                  type="button"
                  className={`p-4 border rounded-lg text-left hover:border-blue-500 ${
                    booking.doctor === doctor.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => {
                    setBooking({ ...booking, doctor: doctor.id });
                    setStep(2);
                  }}
                >
                  <div className="flex items-center">
                    <User className="w-8 h-8 text-gray-400 mr-3" />
                    <div>
                      <div className="font-medium">{doctor.name}</div>
                      <div className="text-sm text-gray-500">{doctor.specialty}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Date */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Select Date</h2>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="date"
                className="w-full p-2 border rounded"
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => {
                  setBooking({ ...booking, date: e.target.value });
                  setStep(3);
                }}
              />
            </div>
          </div>
        )}

        {/* Step 3: Select Time & Reason */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Select Time</h2>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={`p-2 border rounded text-center hover:border-blue-500 ${
                      booking.time === time ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => setBooking({ ...booking, time })}
                  >
                    <Clock className="w-4 h-4 mx-auto mb-1" />
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Reason for Visit</h2>
              <textarea
                className="w-full p-3 border rounded"
                rows="3"
                placeholder="Briefly describe your reason for visit"
                value={booking.reason}
                onChange={(e) => setBooking({ ...booking, reason: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
              disabled={!booking.time || !booking.reason}
            >
              Confirm Booking
            </button>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Appointment Confirmed!</h2>
            <p className="text-gray-600">
              You will receive a confirmation email with the details.
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default AppointmentBooking;