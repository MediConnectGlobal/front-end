import React from 'react'

const AuthWrapper = ({ title, children }) => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6'>
        <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-8'>
            <h2 className='text-2xl font-semibold text-center text-gray-800 mb-6'>
            {title}
            </h2>
            {children}
        </div>

    </div>
  )
};

export default AuthWrapper;