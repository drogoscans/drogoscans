"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaDiscord } from 'react-icons/fa';
import { FiSearch, FiMenu } from 'react-icons/fi';
import Sidebar from './sidebar'; 

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="flex justify-center items-center py-2 px-4 bg-[#062985] shadow-md">
      <div className="flex items-center justify-between w-full max-w-screen-xl">
        {/* Left Side: Logo and Brand Name in a Single Division */}
        <Link href="/" passHref>
          <div className="flex items-center space-x-2 hover:text-[#ed1c24] transition duration-300 cursor-pointer group"> {/* Group for combined hover effects */}
            {/* Logo */}
            <div className="relative w-12 h-12 group-hover:scale-125 transform transition-transform duration-300"> {/* Added animation effects */}
              <Image src="/logo.png" alt="logo" layout="fill" objectFit="contain" />
            </div>
            {/* Brand Name */}
            <span className="text-[#ed1c24] text-2xl font-extrabold tracking-tight hidden lg:block group-hover:text-white transition-colors duration-300" style={{ fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif' }}>
              Drogo Scans
            </span>
          </div>
        </Link>
        
        {/* Navigation Links - Hidden on Small Screens */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link href="/" className="text-white hover:text-red-500 cursor-pointer transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/bookmarks" className="text-white hover:text-red-500 cursor-pointer transition duration-300">
              Bookmarks
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-white hover:text-red-500 cursor-pointer transition duration-300">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/community" className="text-white hover:text-red-500 cursor-pointer transition duration-300">
              Community
            </Link>
          </li>
        </ul>

        {/* Right Side: Search Bar, Discord Icon, Profile Picture, and Menu Icon */}
        <div className="flex items-center space-x-4 ml-8">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
            <FiSearch className="absolute left-3 top-2 text-gray-400" />
          </div>
          <Link href="https://discord.com" passHref target="_blank" rel="noopener noreferrer">
            <FaDiscord className="text-white text-2xl hover:text-red-500 transition duration-300" />
          </Link>
          <div className="relative w-8 h-8 md:w-10 md:h-10">
            <Image
              src="/profile.png"
              alt="Profile"
              layout="fill"
              className="rounded-full cursor-pointer"
              objectFit="cover"
            />
          </div>
          <button onClick={toggleSidebar} className="md:hidden">
            <FiMenu className="text-white text-2xl" />
          </button>
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </nav>
  );
};

export default Navbar;
