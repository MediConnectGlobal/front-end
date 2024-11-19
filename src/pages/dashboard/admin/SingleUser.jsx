import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiGetSingleUser } from '../../../services/users'; // Update service import

const SingleUser = () => {
    const { id } = useParams(); // Get user ID from URL
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Fetch user details
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await apiGetSingleUser(id); // Call user-specific API
                setUser(response.data);
                setError(null);
            } catch (error) {
                console.error("Error fetching user details:", error);
                setError('Error fetching user details');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            {user && (
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-cyan-500">{`${user.firstName} ${user.lastName}`}</h1>
                    <p>Role: {user.role}</p>
                    <p>Organization: {user.location || 'N/A'}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone || 'N/A'}</p>
                    <p>Department: {user.department || 'N/A'}</p>
                    <div className="mt-4">
                        <button
                            onClick={() => navigate(-1)} // Navigate back to the previous page
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                        >
                            Back
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleUser;
