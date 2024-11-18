import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetSingleStaff } from '../services/staff';

const StaffDetail = () => {
    const { id } = useParams(); // Get staff ID from URL
    const [staff, setStaff] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStaff = async () => {
            setLoading(true);
            try {
                const response = await apiGetSingleStaff(id);
                setStaff(response.data);
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            {staff && (
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-cyan-500">{`Dr. ${staff.firstName} ${staff.lastName}`}</h1>
                    <p>Role: {staff.role}</p>
                    <p>Facility: {staff.facility}</p>
                    <p>Department: {staff.department}</p>
                    <p>Email: {staff.email}</p>
                    <p>Specialty: {staff.specialty}</p>
                </div>
            )}
        </div>
    );
};

export default StaffDetail;
