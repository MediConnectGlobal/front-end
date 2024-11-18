import React, { useState } from 'react';

const staffMembers = [
  { id: 1, name: 'Dr.Mirazul Alom', specialty: 'Oncologist', image: 'https://example.com/doctor1.jpg' },
  { id: 2, name: 'Pt. Mira Afful', specialty: 'Physiotherapist', image: 'https://example.com/doctor2.jpg' },
  { id: 3, name: 'RD. Lisa Ampoful', specialty: 'Dietitian', image: 'https://example.com/doctor3.jpg' },
  { id: 4, name: 'Dr. Jason Ntiful', specialty: 'Cardiologist', image: 'https://example.com/doctor4.jpg' },
  { id: 5, name: 'Nurse Otiwaa Lukeman', specialty: 'Nurse', image: 'https://example.com/doctor5.jpg' },
];

const StaffCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? staffMembers.length - 3 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === staffMembers.length - 3 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Expert Doctors</h2>
      <div className="relative flex items-center">
        <button onClick={handlePrev} className="p-2 text-gray-600 hover:text-gray-800">
          &lt;
        </button>
        <div className="flex overflow-hidden w-full justify-center gap-6">
          {staffMembers.slice(currentIndex, currentIndex + 3).map((staff) => (
            <div
              key={staff.id}
              className="bg-white rounded-lg shadow-lg p-4 w-64 transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img src={staff.image} alt={staff.name} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="text-center mt-4">
                <h3 className="text-xl font-semibold text-gray-800">{staff.name}</h3>
                <p className="text-gray-600">{staff.specialty}</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleNext} className="p-2 text-gray-600 hover:text-gray-800">
          &gt;
        </button>
      </div>
    </section>
  );
};

export default StaffCarousel;
