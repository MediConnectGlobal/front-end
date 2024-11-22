import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Menu, LogOut, User, Edit, Share2, Phone } from "lucide-react";
import { apiUpdateUser } from "../services/user";
import { apiUpdateStaff } from "../services/staff";
import { apiUpdateAdmin } from "../services/admin";
import { 
  apiLogoutUser, 
  apiLogoutStaff, 
  apiLogoutAdmin 
} from "../services/auth";
import Navbar from "../components/Navbar";
import Swal from 'sweetalert2';
import { apiGetSingleStaff } from "../services/staff";

const DashboardLayout = ({ links = [], children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [staff, setStaff] = useState(null);
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchStaffProfile = async () => {
      if (userType?.toUpperCase() === 'STAFF' && userProfile?._id) {
        setLoading(true);
        try {
          const response = await apiGetSingleStaff(userProfile._id);
          setStaff(response.data);
          setFormData(response.data); // Initialize form data with staff data
          
          // Update userProfile with staff details
          setUserProfile(prev => ({
            ...prev,
            ...response.data
          }));
          
          setError(null);
        } catch (error) {
          console.error("Error fetching staff details:", error);
          setError('Error fetching staff details');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStaffProfile();
  }, [userType, userProfile?._id]);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      console.log(localStorage.getItem('token'));
      const userType = localStorage.getItem('userType');
      let userData = null;

      // Only try to parse if user data exists in localStorage
      const storedUser = localStorage.getItem('user');
      console.log(localStorage.getItem('user'));
      if (storedUser && storedUser !== 'undefined') {
        userData = JSON.parse(storedUser);
      }

      if (!token || !userType || !userData) {
        // If any required data is missing, clear everything and redirect
        localStorage.clear();
        navigate('/login');
        return;
      }

      setIsLoggedIn(true);
      setUserType(userType);
      setUserProfile(userData);
    } catch (error) {
      console.error('Error initializing dashboard:', error);
      localStorage.clear();
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (staff && userType?.toUpperCase() === 'STAFF') {
      setUserProfile(prevProfile => ({
        ...prevProfile,
        ...staff,
        firstName: staff.firstName,
        lastName: staff.lastName,
        email: staff.email,
        contact: staff.contact,
        specialty: staff.specialty,
        avatar: staff.avatar
      }));
    }
  }, [staff, userType]);

  const handleLogout = async () => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your account",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#245294',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'No, stay logged in',
      background: '#fff',
      customClass: {
        title: 'text-xl font-bold text-gray-900',
        content: 'text-gray-700',
      }
    });

    // If user confirms logout
    if (result.isConfirmed) {
      try {
        switch(userType?.toUpperCase()) {
          case 'USER':
            await apiLogoutUser();
            break;
          case 'STAFF':
            await apiLogoutStaff();
            break;
          case 'ADMIN':
            await apiLogoutAdmin();
            break;
          default:
            console.error('Invalid user type for logout:', userType);
        }

        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('user');
        
        // Show success message before redirecting
        await Swal.fire({
          title: 'Logged Out!',
          text: 'You have been successfully logged out',
          icon: 'success',
          confirmButtonColor: '#245294',
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false
        });

        navigate('/login');
      } catch (error) {
        console.error('Logout error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Logout Failed',
          text: 'There was an error logging out. Please try again.',
          confirmButtonColor: '#245294'
        });
      }
    }
  };

  const handleEditProfile = async () => {
    const initialData = userType?.toUpperCase() === 'STAFF' ? staff : userProfile;

    Swal.fire({
      title: 'Edit Profile',
      html: `
        <input 
          type="text" 
          id="firstName" 
          class="swal2-input" 
          placeholder="First Name" 
          value="${initialData?.firstName || ''}"
        >
        <input 
          type="text" 
          id="lastName" 
          class="swal2-input" 
          placeholder="Last Name" 
          value="${initialData?.lastName || ''}"
        >
        <input 
          type="email" 
          id="email" 
          class="swal2-input" 
          placeholder="Email" 
          value="${initialData?.email || ''}"
        >
        <input 
          type="tel" 
          id="contact" 
          class="swal2-input" 
          placeholder="Phone Number" 
          value="${initialData?.contact || ''}"
        >
        ${userType?.toUpperCase() === 'STAFF' ? `
          <input 
            type="text" 
            id="specialty" 
            class="swal2-input" 
            placeholder="Specialty" 
            value="${initialData?.specialty || ''}"
          >
        ` : ''}
        <div class="mt-3">
          <label for="avatar" class="block text-sm font-medium text-gray-700 mb-1">
            Profile Image
          </label>
          <input 
            type="file" 
            id="avatar" 
            accept="image/*"
            class="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-[#245294] file:text-white
            hover:file:bg-[#1F3656]"
          >
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Save Changes',
      confirmButtonColor: '#245294',
      preConfirm: async () => {
        const formData = new FormData();
        const avatar = document.getElementById('avatar').files[0];
        
        formData.append('firstName', document.getElementById('firstName').value);
        formData.append('lastName', document.getElementById('lastName').value);
        formData.append('email', document.getElementById('email').value);
        formData.append('contact', document.getElementById('contact').value);
        
        if (userType?.toUpperCase() === 'STAFF') {
          formData.append('specialty', document.getElementById('specialty').value);
        }
        
        if (avatar) {
          formData.append('avatar', avatar);
        }

        try {
          let response;
          switch(userType?.toUpperCase()) {
            case 'USER':
              response = await apiUpdateUser(formData);
              break;
            case 'STAFF':
              response = await apiUpdateStaff(formData);
              // Update staff state after successful update
              if (response?.data) {
                setStaff(response.data);
              }
              break;
            case 'ADMIN':
              response = await apiUpdateAdmin(formData);
              break;
            default:
              throw new Error(`Invalid user type: ${userType}`);
          }
          
          if (!response?.data) {
            throw new Error('No data received from server');
          }
          return response.data;
        } catch (error) {
          console.error('Profile update error:', error);
          Swal.showValidationMessage(`Request failed: ${error.message}`);
        }
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const updatedProfile = result.value;
        
        // Update both localStorage and states
        localStorage.setItem('user', JSON.stringify(updatedProfile));
        
        if (userType?.toUpperCase() === 'STAFF') {
          setStaff(updatedProfile);  // Update staff state
        }
        
        setUserProfile(prevProfile => ({
          ...prevProfile,
          ...updatedProfile
        }));

        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated!',
          text: 'Your profile has been updated successfully.',
          confirmButtonColor: '#245294'
        });

        // Force a re-fetch of staff profile if it's a staff member
        if (userType?.toUpperCase() === 'STAFF') {
          fetchStaffProfile();
        }
      }
    });
  };

  const handleShare = () => {
    const shareData = {
      title: 'Healthcare Profile',
      text: `Contact ${userProfile?.firstName} ${userProfile?.lastName}`,
      url: 'https://savefiles.org/drive/s/rtak9HF95chj4Uj0EBYNHUSDenEmhv/${userProfile.avatar}shareable_link=537'
    };

    if (navigator.share) {
      navigator.share(shareData)
        .catch((error) => console.log('Error sharing:', error));
    } else {
      const shareText = `${shareData.text}\nContact: 537\nEmail: ${userProfile?.email}`;
      Swal.fire({
        title: 'Share Profile',
        html: `
          <div class="p-4">
            <p class="mb-2">${shareText}</p>
            <button onclick="navigator.clipboard.writeText('${shareText}')" class="bg-[#245294] text-white px-4 py-2 rounded">
              Copy to Clipboard
            </button>
          </div>
        `,
        showConfirmButton: false
      });
    }
  };

  const fetchStaffProfile = async () => {
    if (userType?.toUpperCase() === 'STAFF' && userProfile?._id) {
      setLoading(true);
      try {
        const response = await apiGetSingleStaff(userProfile._id);
        setStaff(response.data);
        setFormData(response.data);
        
        // Update userProfile with fresh staff data
        setUserProfile(prev => ({
          ...prev,
          ...response.data
        }));
        
        setError(null);
      } catch (error) {
        console.error("Error fetching staff details:", error);
        setError('Error fetching staff details');
      } finally {
        setLoading(false);
      }
    }
  };
 
  useEffect(() => {
    console.log('Current userProfile were watching:', userProfile);
    setAvatar(userProfile?.avatar);
    console.log('were watching avatar:', avatar);
    console.log('Current staff data:', staff);
  }, [userProfile, staff]);

  

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-10">
        <Navbar 
          isLoggedIn={isLoggedIn}
          userType={userType}
          userProfile={userProfile}
        />
      </div>
      <div className="flex h-screen mt-20">
        {/* Sidebar */}
        <div
          className={`bg-[#0CBFC7] text-white w-64 fixed h-screen transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          {/* Profile Section */}
          <div className="p-6 border-b border-[#0ba4ab]">
            <div className="flex flex-col items-center">
              {loading ? (
                <div className="w-24 h-24 rounded-full border-4 border-white mb-3 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              ) : (
                <div className="relative">
                  {userProfile?.avatar ? (
                    <img 
                      src={userProfile?.avatar} 
                      alt={userProfile?.firstName} 
                      className="w-24 h-24 rounded-full border-4 border-white mb-3 object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full border-4 border-white mb-3 flex items-center justify-center bg-[#245294]">
                      <User size={40} />
                    </div>
                  )}
                  <button 
                    onClick={handleEditProfile}
                    className="absolute bottom-2 right-0 bg-[#245294] p-2 rounded-full hover:bg-[#1F3656] transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                </div>
              )}
              <h3 className="text-lg font-semibold text-center">
                {userProfile?.firstName} {userProfile?.lastName}
              </h3>
              <p className="text-sm text-gray-200 mt-1">{userProfile?.email}</p>
              {userProfile?.contact && (
                <p className="text-sm text-gray-200 mt-1">
                  <Phone size={14} className="inline mr-1" />
                  {userProfile.contact}
                </p>
              )}
              {userProfile?.specialty && (
                <p className="text-sm text-gray-200 mt-1">
                  Specialty: {userProfile.specialty}
                </p>
              )}
              <p className="text-xs text-gray-200 mt-1 uppercase bg-[#245294] px-3 py-1 rounded-full">
                {userType}
              </p>
              <button
                onClick={handleShare}
                className="mt-2 flex items-center text-sm hover:text-gray-200"
              >
                <Share2 size={14} className="mr-1" />
                Share Profile
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Dashboard</h2>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="flex items-center space-x-2 p-2 hover:bg-[#0ba4ab] rounded-lg transition-colors"
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logout Button */}
          <div className="absolute  w-full p-4 border-t border-[#0ba4ab]">
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 text-white hover:text-red-200 w-full p-2 hover:bg-[#0ba4ab] rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-100 p-6 overflow-auto justify-center ml-64">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
