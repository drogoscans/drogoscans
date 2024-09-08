"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import { FaUser, FaBookOpen, FaComments, FaBlog, FaThumbsUp, FaTags, FaBell, FaChartBar } from 'react-icons/fa'; // Importing icons

const MenuBar: React.FC = () => {
  return (
    <div className="flex flex-col w-64 bg-[#000319] h-screen p-6 fixed left-0 top-0 shadow-lg">
      {/* Sidebar Content */}
      <div className="flex flex-col space-y-6">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-2 mb-8">
          <div className="relative w-10 h-10">
            <Image
              src="/logo.png"
              alt="logo"
              fill style={{ objectFit: 'contain' }}
            />
          </div>
          <span className="text-[#ed1c24] text-2xl font-extrabold tracking-tight" style={{ fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif' }}>
            Drogo Scans
          </span>
        </div>
        
        {/* Sidebar Links */}
        <ul className="space-y-4">
          <li>
            <Link href="/admin/dashboard" className="flex items-center text-white hover:text-blue-300 py-2 px-4 rounded transition-colors duration-300">
              <FaUser className="mr-2" /> Dashboard
            </Link>
          </li>
          <li>
            <Link href="/admin/users" className="flex items-center text-white hover:text-blue-300 py-2 px-4 rounded transition-colors duration-300">
              <FaUser className="mr-2" /> Users
            </Link>
          </li>
          <li>
            <Link href="/admin/genres" className="flex items-center text-white hover:text-blue-300 py-2 px-4 rounded transition-colors duration-300">
              <FaTags className="mr-2" /> Genres
            </Link>
          </li>
          <li>
            <Link href="/admin/mangas" className="flex items-center text-white hover:text-blue-300 py-2 px-4 rounded transition-colors duration-300">
              <FaBookOpen className="mr-2" /> Mangas
            </Link>
          </li>
          <li>
            <Link href="/admin/recommended" className="flex items-center text-white hover:text-blue-300 py-2 px-4 rounded transition-colors duration-300">
              <FaThumbsUp className="mr-2" /> Recommended
            </Link>
          </li>
          <li>
            <Link href="/admin/community" className="flex items-center text-white hover:text-blue-300 py-2 px-4 rounded transition-colors duration-300">
              <FaComments className="mr-2" /> Community
            </Link>
          </li>
          <li>
            <Link href="/admin/blogs" className="flex items-center text-white hover:text-blue-300 py-2 px-4 rounded transition-colors duration-300">
              <FaBlog className="mr-2" /> Blogs
            </Link>
          </li>
          <li>
            <Link href="/admin/notifications" className="flex items-center text-white hover:text-blue-300 py-2 px-4 rounded transition-colors duration-300">
              <FaBell className="mr-2" /> Notifications
            </Link>
          </li>
          <li>
            <Link href="/admin/analytics" className="flex items-center text-white hover:text-blue-300 py-2 px-4 rounded transition-colors duration-300">
              <FaChartBar className="mr-2" /> Analytics
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuBar;
