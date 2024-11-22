import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { apiCreateBooking, apiGetAllUsers } from '../../../services/booking'; // Import your apiGetAllStaff function
import { useNavigate } from 'react-router-dom';
// import img from '../../../assets/images/bg1.jpg';
// import RootLayout from '../../../layouts/RootLayout';
import { apiGetAllStaff } from '../../../services/staff';

const Booking = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [staffList, setStaffList] = useState([]); // For the staff dropdown
  //   const [userId, setUserId] = useState(''); // For the logged-in user's ID
  //   const [usersList, setUsersList] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    staffId: '',
    location: '',
    facility: '',
    startDateTime: '',
    endDateTime: '',
    // userId: '',
  });

  // Fetch token and user ID
  useEffect(() => {
    // Get user and token from localStorage
    const user = JSON.parse(localStorage.getItem('user')) || { id: '' };
    const token = localStorage.getItem('token');
    console.log('token', token);
    // setUserId(user.id);

    // Only fetch staff if we have a token
    if (token) {
      const fetchData = async () => {
        try {
          // Fetch staff
          const staffResponse = await apiGetAllStaff(token);
          if (staffResponse && staffResponse.data) {
            setStaffList(staffResponse.data);
          }

          // Fetch users
          // const usersResponse = await apiGetAllUsers(token);
          // if (usersResponse && usersResponse.data) {
          //   setUsersList(usersResponse.data);
          // }
        } catch (error) {
          console.error('Error fetching data:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to load necessary data. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      };

      fetchData();
    } else {
      // Handle case when token is not available
      Swal.fire({
        title: 'Authentication Error',
        text: 'Please log in to book appointments',
        icon: 'error',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/login'); // Redirect to login page
      });
    }
  }, [navigate]); // Add navigate to dependencies

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setLoading(true);

  //     const payload = {
  //       ...formData,
  //     //   userId, // Include user ID from state
  //       startDateTime: new Date(formData.startDateTime).toISOString(),
  //       endDateTime: new Date(formData.endDateTime).toISOString(),
  //     };

  //     try {
  //       const response = await apiCreateBooking(payload);
  // // console.log
  //       if (response.ok) {
  //         Swal.fire({
  //           title: 'success!',
  //           text: 'Appointment booked successfully',
  //           icon: 'success',
  //           confirmButtonText: 'OK',
  //         });
  //         navigate('');
  //       }
  //     } catch (error) {
  //       Swal.fire({
  //         title: 'Error!',
  //         text: 'Failed to book appointment',
  //         icon: 'error',
  //         confirmButtonText: 'OK',
  //       });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      startDateTime: new Date(formData.startDateTime).toISOString(),
      endDateTime: new Date(formData.endDateTime).toISOString(),
    };

    try {
      const response = await apiCreateBooking(payload);
      if (response.status === 201) {
        Swal.fire({
          title: 'Success!',
          text: 'Appointment booked successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        navigate('');
      } else {
        throw new Error(response.data.message || 'Failed to book appointment');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to book appointment',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };




  return (

    <div
      className=""

    >
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md space-y-6"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Book an Appointment</h2>

        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title
        </label>
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

        {/* <label htmlFor="userId" className="block text-sm font-medium mb-2">
            Select User
          </label>
          <select
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mb-4"
          >
            <option value="">Select User</option>
            {usersList.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select> */}

        <label htmlFor="staffId" className="block text-sm font-medium mb-2">
          Select Staff
        </label>
        <select
          id="staffId"
          name="staffId"
          value={formData.staffId}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="">Select Staff</option>
          {staffList.map((staff) => (
            <option key={staff.id} value={staff.id}>
              {staff.firstName} {staff.lastName} - {staff.facility}
            </option>
          ))}
        </select>

        <label htmlFor="location" className="block text-sm font-medium mb-2">
          Location
        </label>
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
          <option value="Hybrid">Hybrid</option>
        </select>

        <label htmlFor="facility" className="block text-sm font-medium mb-2">
          Facility
        </label>
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

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="w-full sm:w-1/2">
            <label htmlFor="startDateTime" className="block text-sm font-medium mb-2">
              Start Date & Time
            </label>
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
            <label htmlFor="endDateTime" className="block text-sm font-medium mb-2">
              End Date & Time
            </label>
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
          className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Booking' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
};

export default Booking;
