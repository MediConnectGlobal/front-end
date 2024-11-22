import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiGetSingleStaff,   } from '../../../services/staff';

const SingleStaffForUser = () => {
    const { id } = useParams(); // Get staff ID from URL
    const [staff, setStaff] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    // Fetch staff details
    useEffect(() => {
        const fetchStaff = async () => {
            setLoading(true);
            try {
                const response = await apiGetSingleStaff(id);
                setStaff(response.data);
                setFormData(response.data); // Initialize form data with staff data
                setError(null);
            } catch (error) {
                console.error("Error fetching staff details:", error);
                setError('Error fetching staff details');
            } finally {
                setLoading(false);
            }
        };
        fetchStaff();
    }, [id]);

    // Handle input change for edit form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle staff update
    // const handleUpdate = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await apiUpdateStaff(id, formData); // Replace with your API integration
    //         setStaff(response.data); // Update state with updated staff data
    //         setEditMode(false); // Exit edit mode
    //         setError(null);
    //     } catch (error) {
    //         console.error("Error updating staff:", error);
    //         setError('Error updating staff');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // Handle staff delete
    // const handleDelete = async () => {
    //     const confirmDelete = window.confirm("Are you sure you want to delete this staff?");
    //     if (!confirmDelete) return;

    //     setLoading(true);
    //     try {
    //         await apiDeleteStaff(id); // Replace with your API integration
    //         navigate('/staff'); // Navigate back to staff list after deletion
    //     } catch (error) {
    //         console.error("Error deleting staff:", error);
    //         setError('Error deleting staff');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            {staff && !editMode && (
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-cyan-500">{`Dr. ${staff.firstName} ${staff.lastName}`}</h1>
                    <p>Role: {staff.role}</p>
                    <p>Facility: {staff.facility}</p>
                    <p>Department: {staff.department}</p>
                    <p>Email: {staff.email}</p>
                    <p>Specialty: {staff.specialty}</p>
                    {/* <div className="flex space-x-4 mt-4">
                        <button
                            onClick={() => setEditMode(true)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div> */}
                </div>
            )}

            {/* Edit Form */}
            {/* {editMode && (
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-cyan-500">Edit Staff</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block font-semibold">First Name:</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Last Name:</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Role:</label>
                            <input
                                type="text"
                                name="role"
                                value={formData.role || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Facility:</label>
                            <input
                                type="text"
                                name="facility"
                                value={formData.facility || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Specialty:</label>
                            <input
                                type="text"
                                name="specialty"
                                value={formData.specialty || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="flex space-x-4 mt-4">
                            <button
                                type="button"
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditMode(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )} */}
        </div>
    );
};

export default SingleStaffForUser;
