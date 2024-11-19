import React, { useEffect, useState } from 'react';
// import { apiGetAllStaff, } from '../services/staff';
import img from '../../../assets/images/hero10.jpg';
import {useNavigate} from 'react-router-dom';
import { apiGetAllStaff } from '../../../services/staff';

const AllStaff = () => {
    const [staffList, setStaffList] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [staffPerPage] = useState(6); // Display 6 staff members per page

const navigate = useNavigate();

    useEffect(() => {
        const getAllStaff = async () => {
            setLoading(true);
            try {
                const response = await apiGetAllStaff();
                console.log("API Response:", response.data);
                setStaffList(response.data);
                setError(null);
            } catch (error) {
                console.error("Error fetching staff list:", error);
                setError('Error fetching staff list');
            } finally {
                setLoading(false);
            }
        };
        getAllStaff();
    }, []);


    // Pagination logic
    const indexOfLastStaff = currentPage * staffPerPage;
    const indexOfFirstStaff = indexOfLastStaff - staffPerPage;
    const currentStaff = staffList.slice(indexOfFirstStaff, indexOfLastStaff);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-cyan-500 text-center mb-6">Meet Our Team</h1>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentStaff.map((staff) => (
                    <div
                        key={staff.id}
                        className="bg-white shadow-md rounded-lg p-4 text-center transition-transform transform hover:scale-105 hover:shadow-lg"
                        onClick={() => navigate(`/singlestaff/${staff.id}`)}
                    >
                        <img
                            src={img} // Replace with staff.image if available
                            alt={`${staff.firstName} ${staff.lastName}`}
                            className="rounded-full mx-auto mb-4 w-32 h-32 object-cover"
                        />
                        <h2 className="text-lg font-bold">{`Dr. ${staff.firstName} ${staff.lastName}`}</h2>
                        <p className="text-sm text-gray-600">{staff.specialty}</p>
                        <p className="text-sm text-gray-600">{staff.facility}</p>
                        <div className="mt-4">
                            <p className="text-sm text-gray-500">📞 {staff.contact}</p>
                            <p className="text-sm text-gray-500">📧 {staff.email}</p>
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
                {Array.from({ length: Math.ceil(staffList.length / staffPerPage) }, (_, index) => (
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

export default AllStaff;
