"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu } from 'react-icons/fi';
import SidebarAdmin from './sidebaradmin';


const NavbarAdmin: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="flex justify-between items-center py-2 px-4 bg-[#000319] shadow-md">
      <div className="flex items-center space-x-2">
        <Link href="/admin" passHref>
          <div className="flex items-center space-x-2 hover:text-[#ed1c24] transition duration-300 cursor-pointer group"> {/* Group for combined hover effects */}
            {/* Logo */}
            <div className="relative w-12 h-12 group-hover:scale-125 transform transition-transform duration-300"> {/* Added animation effects */}
              <Image src="/logo2.png" alt="logo" layout="fill" objectFit="contain" />
            </div>
            {/* Brand Name */}
            <span className="text-[#ed1c24] text-2xl font-extrabold tracking-tight hidden lg:block group-hover:text-white transition-colors duration-300" style={{ fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif' }}>
              Drogo Scans
            </span>
          </div>
        </Link>
      </div>

      <div>
         {/* Admin Text */}
         <span className="md:block text-white text-xl font-bold ml-4">
          DROGO ADMIN
        </span>
      </div>


      {/* Right Side: Profile and Menu Icon */}
      <div className="flex items-center space-x-4">
        {/* Profile Picture */}
        <div className="relative w-8 h-8 md:w-10 md:h-10">
          <Image
            src="/profile.png"
            alt="Profile"
            layout="fill"
            className="rounded-full cursor-pointer"
            objectFit="cover"
          />
        </div>
        {/* Menu Button for Mobile */}
        <button onClick={toggleSidebar} className="lg:hidden  p-2">
          <FiMenu className="text-white text-2xl" />
        </button>
      </div>

      {/* Sidebar Component */}
      <SidebarAdmin isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </nav>
  );
};

export default NavbarAdmin;
