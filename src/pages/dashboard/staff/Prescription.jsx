import React, { useState, useEffect } from 'react';
import { apiPostPrescription } from '../../../services/prescription';
import { apiGetAllUsers } from '../../../services/user'; // Make sure this exists
import Swal from 'sweetalert2';
import { Plus, Trash2 } from 'lucide-react';

const Prescription = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userId: '',
    medication: [
      {
        drug: '',
        dose: '',
        days: ''
      }
    ]
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiGetAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch users',
      });
    }
  };

  const handleUserChange = (e) => {
    setFormData({
      ...formData,
      userId: e.target.value
    });
  };

  const handleMedicationChange = (index, field, value) => {
    const newMedication = formData.medication.map((med, i) => {
      if (i === index) {
        return { ...med, [field]: value };
      }
      return med;
    });

    setFormData({
      ...formData,
      medication: newMedication
    });
  };

  const addMedication = () => {
    setFormData({
      ...formData,
      medication: [
        ...formData.medication,
        { drug: '', dose: '', days: '' }
      ]
    });
  };

  const removeMedication = (index) => {
    if (formData.medication.length > 1) {
      setFormData({
        ...formData,
        medication: formData.medication.filter((_, i) => i !== index)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiPostPrescription(formData);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Prescription has been created successfully',
      });
      
      // Reset form
      setFormData({
        userId: '',
        medication: [{ drug: '', dose: '', days: '' }]
      });
    } catch (error) {
      console.error('Error creating prescription:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create prescription',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Prescription</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Patient
          </label>
          <select
            value={formData.userId}
            onChange={handleUserChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a patient</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
        </div>

        {/* Medications */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Medications</h3>
            <button
              type="button"
              onClick={addMedication}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} className="mr-1" />
              Add Medication
            </button>
          </div>

          {formData.medication.map((med, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-md relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Drug
                  </label>
                  <input
                    type="text"
                    value={med.drug}
                    onChange={(e) => handleMedicationChange(index, 'drug', e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dose
                  </label>
                  <input
                    type="text"
                    value={med.dose}
                    onChange={(e) => handleMedicationChange(index, 'dose', e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g., 1*3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Days
                  </label>
                  <input
                    type="number"
                    value={med.days}
                    onChange={(e) => handleMedicationChange(index, 'days', e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              {formData.medication.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMedication(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Creating Prescription...' : 'Create Prescription'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Prescription;