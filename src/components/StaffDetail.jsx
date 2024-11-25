import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiGetSingleStaff } from '../services/staff';
import RootLayout from '../layouts/RootLayout';
import { ArrowLeft, User } from 'lucide-react';

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
        <RootLayout>
            <div className="container mx-auto p-4 my-28">
                <Link
                    to="/staff"
                    className="flex items-center text-cyan-600 hover:text-cyan-700 mb-6"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Staff List
                </Link>

                {staff && (
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <div className="flex items-start gap-6">
                            <div className="flex-shrink-0">
                                {staff.avatar ? (
                                    <img
                                        src={staff.avatar}
                                        alt={`${staff.firstName} ${staff.lastName}`}
                                        className="w-32 h-32 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                                        <User className="w-16 h-16 text-gray-400" />
                                    </div>
                                )}
                            </div>

                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-cyan-500 mb-4">{`Dr. ${staff.firstName} ${staff.lastName}`}</h1>
                                <div className="space-y-2">
                                    <p className="text-gray-700"><span className="font-semibold">Role:</span> {staff.role}</p>
                                    <p className="text-gray-700"><span className="font-semibold">Facility:</span> {staff.facility}</p>
                                    <p className="text-gray-700"><span className="font-semibold">Department:</span> {staff.department}</p>
                                    <p className="text-gray-700"><span className="font-semibold">Email:</span> {staff.email}</p>
                                    <p className="text-gray-700"><span className="font-semibold">Specialty:</span> {staff.specialty}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </RootLayout>
    );
};

export default StaffDetail;
