import Link from 'next/link';
import Image from 'next/image';
import AdminMobileNavigation from './AdminMobileNavigation';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';
import LogoutButton from '../logoutButton';

const NavbarAdmin: React.FC = async () => {
  const { user } = await validateRequest();
  if (user?.role !== 'ADMIN') redirect('/')

  return (
    <nav className="flex justify-between items-center py-2 px-4 bg-[#000319] shadow-md">
      {/* Left Side: Logo and Brand Name */}
      <div className="flex items-center space-x-2">
        <Link href="/admin" passHref>
          <div className="flex items-center space-x-2 hover:text-[#ed1c24] transition duration-300 cursor-pointer group">
            {/* Logo */}
            <div className="relative w-12 h-12 group-hover:scale-125 transform transition-transform duration-300">
              <Image src="/logo2.png" alt="logo" style={{ objectFit: 'contain' }} width={40} height={40} />
            </div>
            {/* Brand Name - Hanya tampil di layar laptop dan desktop */}
            <span className="text-[#ed1c24] text-2xl font-extrabold tracking-tight hidden laptop:hidden desktop:block group-hover:text-white transition-colors duration-300" style={{ fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif' }}>
              Drogo Scans
            </span>
          </div>
        </Link>
      </div>

      {/* Middle: Admin Text - Tampil di tablet, laptop, dan desktop */}
      <div className="hidden mobile:hidden tablet:block">
        <span className="text-white text-xl font-bold ml-4">
          DROGO ADMIN
        </span>
      </div>

      {/* Right Side: Profile Picture, Mobile Menu, and Logout Button */}
      <div className="flex items-center space-x-4">
        {/* Profile Picture - Tampil di layar tablet, laptop, dan desktop */}
        <div className="hidden mobile:hidden tablet:block relative w-8 h-8 md:w-10 md:h-10">
          <Image
            src="/profile.png"
            alt="Profile"
            style={{ objectFit: 'cover' }}
            className="rounded-full cursor-pointer"
            width={40}
            height={40}
          />
        </div>

        {/* Menu Button for Mobile - Tampil di layar mobile */}
        <div className="block mobile:block tablet:hidden">
          <AdminMobileNavigation />
        </div>

        {/* Logout Button - Tampil di semua ukuran layar */}
        <LogoutButton />
      </div>
    </nav>
  );
};

export default NavbarAdmin;
