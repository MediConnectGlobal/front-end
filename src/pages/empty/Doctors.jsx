import React from 'react';
import img from '../../assets/images/Error page1.jpg'
import RootLayout from '../../layouts/RootLayout';

const Doctors = ({ src, alt, width, height }) => {
  return (
  <RootLayout>
      <div className="flex justify-center items-center">
      <img
        src={img}
        alt={alt}
        className={`max-w-full h-auto ${width ? `w-${width}` : ''} ${height ? `h-${height}` : ''}`}
      />
    </div>
  </RootLayout>
  );
};

export default Doctors;