import Link from 'next/link';
import Image from 'next/image';
import { FaDiscord, FaRegUser } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import HomeMobileNavigation from './HomeMobileNavigation';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DropdownUser from './DropdownUser';
import Sidebar from './sidebarhome'; 

const Navbar: React.FC = async () => {
  const { user } = await validateRequest();
  if (user?.role === 'ADMIN') redirect('/admin/users')

  return (
    <nav className="flex justify-center items-center py-2 px-4 bg-[#000319] shadow-md">
      <div className="flex items-center justify-between w-full max-w-screen-xl">
        {/* Left Side: Logo and Brand Name in a Single Division */}
        <Link href="/" passHref>
          <div className="flex items-center space-x-2 hover:text-[#ed1c24] transition duration-300 cursor-pointer group"> {/* Group for combined hover effects */}
            {/* Logo */}
            <div className="relative w-12 h-12 group-hover:scale-125 transform transition-transform duration-300"> {/* Added animation effects */}
              <Image src="/logo2.png" alt="logo" style={{ objectFit: 'contain' }} width={40} height={40} priority />
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

          {user ? (
            <DropdownUser />
          ) : (
            <Link href={'/signin'}>
              <FaRegUser size={22} className='text-white text-2xl hover:text-red-500 transition duration-300 border-0' />
            </Link>
          )}
          <HomeMobileNavigation />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
