import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../../../assets/images/hero10.jpg';
import { apiGetAllUsers } from '../../../services/user'; // Update service import

const AllUsers = () => {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(6); // Display 6 users per page

    const navigate = useNavigate();

    useEffect(() => {
        const getAllUsers = async () => {
            setLoading(true);
            try {
                const response = await apiGetAllUsers(); // Call user-specific API
                console.log("API Response:", response.data);
                setUserList(response.data);
                setError(null);
            } catch (error) {
                console.error("Error fetching user list:", error);
                setError('Error fetching user list');
            } finally {
                setLoading(false);
            }
        };
        getAllUsers();
    }, []);

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = userList.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-cyan-500 text-center mb-6">Our Users</h1>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentUsers.map((user) => (
                    <div
                        key={user.id}
                        className="bg-white shadow-md rounded-lg p-4 text-center transition-transform transform hover:scale-105 hover:shadow-lg"
                        onClick={() => navigate(`/staff-dashboard/singleuser/${user.id}`)} // Updated route
                    >
                        <img
                            src={img} // Replace with user.image if available
                            alt={`${user.firstName} ${user.lastName}`}
                            className="rounded-full mx-auto mb-4 w-32 h-32 object-cover"
                        />
                        <h2 className="text-lg font-bold">{`${user.firstName} ${user.lastName}`}</h2>
                        <p className="text-sm text-gray-600">{user.role}</p> {/* Replace 'specialty' */}
                        <p className="text-sm text-gray-600">{user.location || 'N/A'}</p> {/* Replace 'facility' */}
                        <div className="mt-4">
                            <p className="text-sm text-gray-500">📞 {user.contact}</p>
                            <p className="text-sm text-gray-500">📧 {user.email}</p>
                        </div>
                        <div className="flex justify-center mt-4 space-x-4 text-gray-500">
                            <a href="#" className="hover:text-gray-900">Facebook</a>
                            <a href="#" className="hover:text-gray-900">Twitter</a>
                            <a href="#" className="hover:text-gray-900">Instagram</a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                {Array.from({ length: Math.ceil(userList.length / usersPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 mx-1 rounded-lg ${
                            currentPage === index + 1
                                ? 'bg-cyan-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-cyan-500 hover:text-white'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllUsers;
