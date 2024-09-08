'use client'
import React, { useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import SidebarAdmin from './sidebaradmin';

export default function AdminMobileNavigation() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  return (
    <>
       <button onClick={toggleSidebar} className="lg:hidden  p-2">
          <FiMenu className="text-white text-2xl" />
        </button>
        <SidebarAdmin isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  )
}
