"use client"
import React from 'react';
import Link from 'next/link';
import { FiX } from 'react-icons/fi';
import { FaUser, FaBookOpen, FaComments, FaBlog, FaThumbsUp, FaTags, FaBell, FaChartBar } from 'react-icons/fa'; // Importing icons

const Sidebar: React.FC<{ isOpen: boolean; toggleSidebar: () => void }> = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed inset-0 right-0 flex lg:hidden transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={toggleSidebar}
    >
      {/* Background Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar Content */}
      <div
        className={`fixed top-0 right-0 transform transition-transform duration-300 ease-in-out bg-gradient-to-b from-[#062985] to-[#0a3db8] w-64 max-w-full sm:w-80 md:w-96 p-6 h-full shadow-2xl rounded-l-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Icon */}
        <button onClick={toggleSidebar} className="text-white mb-6">
          <FiX className="text-2xl hover:text-red-500 transition-colors duration-300" />
        </button>
        
        {/* Sidebar Links */}
        <ul className="space-y-4">
        <li>
            <Link href="/admin/dashboard" className="flex items-center text-white hover:text-blue-300 py-2 px-4 rounded transition-colors duration-300" onClick={toggleSidebar}>
              <FaUser className="mr-2" /> Dashboard
            </Link>
          </li>
          <li>
            <Link href="/admin/users" className="flex items-center text-white hover:text-blue-300 py-2 px-4 rounded transition-colors duration-300" onClick={toggleSidebar}>
              <FaUser className="mr-2" /> Users
            </Link>
          </li>
          <li>
            <Link href="/admin/genres" className="flex items-center text-white hover:text-blue-300 py-2 px-4 rounded transition-colors duration-300" onClick={toggleSidebar}>
              <FaTags className="mr-2" /> Genres
            </Link>
          </li>
          <li>
            <Link href="/admin/mangas" className="flex items-center text-white hover:text-blue-300 py-2 px-4 rounded transition-colors duration-300" onClick={toggleSidebar}>
              <FaBookOpen className="mr-2" /> Mangas
            </Link>
          </li>
          <li>
            <Link href="/admin/recommended" className="flex items-center text-white hover:text-blue-300 py-2 px-4 rounded transition-colors duration-300" onClick={toggleSidebar}>
              <FaThumbsUp className="mr-2" /> Recommended
            </Link>
          </li>
          <li>
            <Link href="/admin/community" className="flex items-center text-white hover:text-blue-300 py-2 px-4 rounded transition-colors duration-300" onClick={toggleSidebar}>
              <FaComments className="mr-2" /> Community
            </Link>
          </li>
          <li>
            <Link href="/admin/blogs" className="flex items-center text-white hover:text-blue-300 py-2 px-4 rounded transition-colors duration-300" onClick={toggleSidebar}>
              <FaBlog className="mr-2" /> Blogs
            </Link>
          </li>
          <li>
            <Link href="/admin/notifications" className="flex items-center text-white hover:text-blue-300 py-2 px-4 rounded transition-colors duration-300" onClick={toggleSidebar}>
              <FaBell className="mr-2" /> Notifications
            </Link>
          </li>
          <li>
            <Link href="/admin/analytics" className="flex items-center text-white hover:text-blue-300 py-2 px-4 rounded transition-colors duration-300" onClick={toggleSidebar}>
              <FaChartBar className="mr-2" /> Analytics
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
