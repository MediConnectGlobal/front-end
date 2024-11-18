import React from 'react'
import heroImage from "../assets/images/hero3.jpg"
import Navbar from '../components/Navbar'


const HomePage = () => {
  return (
    <div>      
      <Navbar/>
      <div className='bg-cyan-200'>
        <div className='relative w-full ' 
        style={{ height: '100vh' }}>

          <img
            src={heroImage}
            alt="Hero Image"
            className="w-full h-full  "
          />
          <div className="absolute inset-0 flex items-center justify-start p-8">
            <div className="text-white max-w-md">
              <h1 className="text-4xl font-bold mb-4">Bringing Healthcare to Your Doorstep</h1>
              <p className="text-lg">We provide top-notch healthcare services delivered right to your home for convenience and comfort.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
