import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { apiCreateBooking } from '../services/booking';
import { useNavigate } from 'react-router-dom';
import img from '../assets/images/bg1.jpg'
import RootLayout from '../layouts/RootLayout';

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    userId: '',
    staffId: '',
    location: '',
    facility: '',
    startDateTime: '',
    endDateTime: '',
  });

  const token = localStorage.getItem("token");
  console.log(token)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    const payload = {  
      ...formData,
      title: formData.title,
      userId: formData.userId,
      staffId: formData.staffId,
      location: formData.location,
      facility: formData.facility,
      startDateTime: new Date(formData.startDateTime).toISOString(),
      endDateTime: new Date(formData.endDateTime).toISOString(),
    };

    try {
      const response = await apiCreateBooking(payload);

      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Appointment booked successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
       navigate("")
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to book appointment',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally{
      setLoading(false);
    };
  };

  return (
   <RootLayout>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    style={{
      backgroundImage: `url(${img})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Book an Appointment</h2>

      <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="e.g., Follow-up Consultation"
      />

      <label htmlFor="userId" className="block text-sm font-medium mb-2">User ID</label>
      <input
        type="text"
        id="userId"
        name="userId"
        value={formData.userId}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <label htmlFor="staffId" className="block text-sm font-medium mb-2">Staff ID</label>
      <input
        type="text"
        id="staffId"
        name="staffId"
        value={formData.staffId}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <label htmlFor="location" className="block text-sm font-medium mb-2">Location</label>
      <select
        id="location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded mb-4"
      >
        <option value="">Select Location</option>
        <option value="Online">Online</option>
        <option value="Inperson">In-person</option>
      </select>

      {/* Facility appears only when Location is In-person */}
      {formData.location === 'Inperson' && (
        <>
          <label htmlFor="facility" className="block text-sm font-medium mb-2">Facility</label>
          <input
            type="text"
            id="facility"
            name="facility"
            value={formData.facility}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="e.g., Main Clinic Building"
          />
        </>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="w-full sm:w-1/2">
          <label htmlFor="startDateTime" className="block text-sm font-medium mb-2">Start Date & Time</label>
          <input
            type="datetime-local"
            id="startDateTime"
            name="startDateTime"
            value={formData.startDateTime}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="w-full sm:w-1/2">
          <label htmlFor="endDateTime" className="block text-sm font-medium mb-2">End Date & Time</label>
          <input
            type="datetime-local"
            id="endDateTime"
            name="endDateTime"
            value={formData.endDateTime}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700" disabled={loading}
      >
{loading  ? "Booking" : "Book Appointment"}
        
      </button>
    </form>
   </div>
   </RootLayout>
  );
};

export default AppointmentBooking;
