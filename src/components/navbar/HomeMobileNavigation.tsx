'use client'
import React, { useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import Sidebar from './sidebarhome'

export default function HomeMobileNavigation() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <button onClick={toggleSidebar} className="md:hidden">
        <FiMenu className='text-white text-2xl hover:text-red-500 transition duration-300' />
      </button>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  )
}
