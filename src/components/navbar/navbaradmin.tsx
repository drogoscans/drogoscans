import Link from 'next/link';
import Image from 'next/image';
import AdminMobileNavigation from './AdminMobileNavigation';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';


const NavbarAdmin: React.FC = async () => {
  const { user } = await validateRequest();
  if (user?.role !== 'ADMIN') redirect('/')

  return (
    <nav className="flex justify-between items-center py-2 px-4 bg-[#000319] shadow-md">
      <div className="flex items-center space-x-2">
        <Link href="/admin" passHref>
          <div className="flex items-center space-x-2 hover:text-[#ed1c24] transition duration-300 cursor-pointer group"> {/* Group for combined hover effects */}
            {/* Logo */}
            <div className="relative w-12 h-12 group-hover:scale-125 transform transition-transform duration-300"> {/* Added animation effects */}
              <Image src="/logo2.png" alt="logo" style={{ objectFit: 'contain' }} width={40} height={40} />
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
             style={{ objectFit: 'cover' }}
            className="rounded-full cursor-pointer"
            width={40} height={40}
          />
        </div>
        {/* Menu Button for Mobile */}
        <AdminMobileNavigation />
      </div>

      {/* Sidebar Component */}
    </nav>
  );
};

export default NavbarAdmin;
