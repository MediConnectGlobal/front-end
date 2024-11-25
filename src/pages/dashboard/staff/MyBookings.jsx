import React, { useState, useEffect } from 'react';
import { apiGetBookings, apiUpdateBooking } from '../../../services/booking';
import { apiGetSingleUser } from '../../../services/user';
import { Calendar, Clock, Check, X, AlertCircle } from 'lucide-react';
import Swal from 'sweetalert2';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const userType = localStorage.getItem('userType');
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Not authenticated');
      }

      const userData = JSON.parse(localStorage.getItem('user'));
      console.log('User Data:', userData);

      if (!userData || !userData._id) {
        const userResponse = await apiGetSingleUser('me');
        console.log('User Response:', userResponse.data);
        
        if (!userResponse.data || !userResponse.data._id) {
          throw new Error('User data not available');
        }
        
        localStorage.setItem('user', JSON.stringify(userResponse.data));
        userData = userResponse.data;
      }

      if (userType !== 'STAFF') {
        throw new Error('Unauthorized access');
      }

      const response = await apiGetBookings(userData._id);
      console.log("Bookings response:", response);

      if (response.data) {
        setBookings(response.data);
      } else {
        setBookings([]);
      }
      
      setError(null);
    } catch (error) {
      console.error('Error in fetchBookings:', error);
      setError(error.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      const result = await Swal.fire({
        title: `Confirm ${newStatus}?`,
        text: `Are you sure you want to ${newStatus.toLowerCase()} this booking?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0CBFC7',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, ${newStatus.toLowerCase()} it!`
      });

      if (result.isConfirmed) {
        const response = await apiUpdateBooking(bookingId, { status: newStatus });
        
        if (response.data) {
          await fetchBookings();

          Swal.fire({
            title: 'Updated!',
            text: `Booking has been ${newStatus.toLowerCase()}.`,
            icon: 'success',
            confirmButtonColor: '#0CBFC7'
          });
        }
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update booking status.',
        icon: 'error',
        confirmButtonColor: '#0CBFC7'
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0CBFC7]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">Error Loading Bookings</h3>
        <p className="mt-1 text-sm text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
        <span className="text-sm text-gray-500">
          Total Bookings: {bookings.length}
        </span>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No Bookings</h3>
          <p className="mt-1 text-sm text-gray-500">You don't have any bookings yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {booking.userId?.firstName} {booking.userId?.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">{booking.userId?.email}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-[#0CBFC7]" />
                    <span className="text-sm text-gray-600">
                      {formatDate(booking.appointmentDate)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Reason:</span> {booking.reason}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-medium">Status:</span>{' '}
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                      booking.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </p>

                  {booking.status === 'PENDING' && (
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleStatusUpdate(booking._id, 'CONFIRMED')}
                        className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Confirm
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(booking._id, 'REJECTED')}
                        className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;