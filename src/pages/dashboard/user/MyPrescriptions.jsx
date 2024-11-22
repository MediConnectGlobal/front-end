import React, { useState, useEffect } from 'react';
import { apiGetAllPrescriptions } from '../../../services/prescription';
import { Calendar, Pill, Stethoscope } from 'lucide-react';
import Swal from 'sweetalert2';

const MyPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await apiGetAllPrescriptions();
      console.log("Prescriptions data:", response.data);
      setPrescriptions(response.data);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch prescriptions',
      });
    } finally {
      setLoading(false);
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Prescriptions</h2>
        <span className="text-sm text-gray-500">
          Total Prescriptions: {prescriptions.length}
        </span>
      </div>

      {prescriptions.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Pill className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No Prescriptions Found</h3>
          <p className="mt-1 text-sm text-gray-500">You don't have any prescriptions yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {prescriptions.map((prescription) => {
            // Staff info is directly available in staffId object
            const staff = prescription.staffId;
            console.log("Staff data:", staff);

            return (
              <div key={prescription.id} 
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-blue-50 p-4 border-b border-blue-100">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center space-x-3">
                      <Stethoscope className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Prescribed by Dr. {staff?.firstName || 'Unknown'} {staff?.lastName || ''}
                        </p>
                        <p className="text-xs text-gray-500">
                          {staff?.specialty || 'General Practitioner'} - {staff?.department}
                        </p>
                        <p className="text-xs text-gray-500">
                          {staff?.facility}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span className="text-sm text-gray-600">
                        {formatDate(prescription.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                      <Pill className="h-5 w-5 text-blue-500" />
                      Prescribed Medications
                    </h3>
                    
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {prescription.medication.map((med, index) => (
                        <div 
                          key={index}
                          className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                        >
                          <h4 className="font-medium text-gray-900 mb-2">{med.drug}</h4>
                          <div className="space-y-1 text-sm">
                            <p className="text-gray-600">
                              <span className="font-medium">Dosage:</span> {med.dose}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-medium">Duration:</span> {med.days} days
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {prescription.notes && (
                    <div className="mt-6 bg-yellow-50 p-4 rounded-md">
                      <h4 className="font-medium text-gray-900 mb-2">Additional Notes</h4>
                      <p className="text-sm text-gray-700">{prescription.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyPrescriptions;
