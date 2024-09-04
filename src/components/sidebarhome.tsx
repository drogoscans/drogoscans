"use client"
import React from 'react';
import Link from 'next/link';
import { FiX } from 'react-icons/fi';

const Sidebar: React.FC<{ isOpen: boolean; toggleSidebar: () => void }> = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed inset-0 right-0 flex lg:hidden transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={toggleSidebar}
    >
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={toggleSidebar}
      ></div>

      <div
        className={`fixed top-0 right-0 transform transition-transform duration-300 ease-in-out bg-gradient-to-b from-[#062985] to-[#0a3db8] w-64 max-w-full sm:w-80 md:w-96 p-6 h-full shadow-2xl rounded-l-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={toggleSidebar} className="text-white mb-6">
          <FiX className="text-2xl hover:text-red-500 transition-colors duration-300" />
        </button>
        <ul className="space-y-4">
          <li>
            <Link href="/" className="block text-white hover:text-blue-300 py-2 px-4 rounded transition-colors duration-300" onClick={toggleSidebar}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/bookmarks" className="block text-white hover:text-blue-300 py-2 px-4 rounded transition-colors duration-300" onClick={toggleSidebar}>
              Bookmarks
            </Link>
          </li>
          <li>
            <Link href="/blog" className="block text-white hover:text-blue-300 py-2 px-4 rounded transition-colors duration-300" onClick={toggleSidebar}>
              Blog
            </Link>
          </li>
          <li>
            <Link href="/community" className="block text-white hover:text-blue-300 py-2 px-4 rounded transition-colors duration-300" onClick={toggleSidebar}>
              Community
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
