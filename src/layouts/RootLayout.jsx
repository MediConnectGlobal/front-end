import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RootLayout = ({children, headerText}) => {
  return (
    <div className=''>
      <Navbar/>
      <h1>{headerText}</h1>
      <main className=''>
      {children}
      </main>
      <Footer/>
    </div>
  )
};

export default RootLayout;