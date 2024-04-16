import Link from "next/link"

import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaUser,
  FaSignOutAlt,
  FaQuestionCircle
} from 'react-icons/fa';

const LoggedInMenu = ({handleLogout, handleCloseMenu }) => {
  return (
    <>
      <Link href='/'>
      <div className='flex items-center p-3.5 mb-1 bg-primary group hover:bg-white' onClick={handleCloseMenu}>
        <FaHome className="text-hint group-hover:text-primary transition duration-300" size={18} />
        <span className='text-secondary group-hover:text-primary text-sm font-b ml-3.5'>Home</span>
      </div>
      </Link>
      <Link href='/about'>
      <div className='flex items-center p-3.5 mb-1 bg-primary group hover:bg-white' onClick={handleCloseMenu}>
        <FaInfoCircle className="text-hint group-hover:text-primary transition duration-300" size={17} />
        <span className='text-secondary group-hover:text-primary text-sm font-b ml-3.5'>About</span>
      </div>
      </Link>
      <Link href='/contact'>
      <div className='flex items-center p-3.5 mb-1 bg-primary group hover:bg-white' onClick={handleCloseMenu}>
        <FaEnvelope className="text-hint group-hover:text-primary transition duration-300" size={18} />
        <span className='text-secondary group-hover:text-primary text-sm font-b ml-3.5'>Contact</span>
      </div>
      </Link>
      <Link href='/profile'>
      <div className='flex items-center p-3.5 mb-1 bg-primary group hover:bg-white' onClick={handleCloseMenu}>
        <FaUser className="text-hint group-hover:text-primary transition duration-300" size={18} />
        <span className='text-secondary group-hover:text-primary text-sm font-b ml-3.5'>Profile</span>
      </div>
      </Link>
      <Link href='/help'>
        <div className='flex items-center p-3.5 mb-1 bg-primary group hover:bg-white' onClick={handleCloseMenu}>
          <FaQuestionCircle className="text-hint group-hover:text-primary transition duration-300" size={18} />
          <span className='text-secondary group-hover:text-primary text-sm font-b ml-3.5'>Help</span>
        </div>
      </Link>
      <div onClick={handleLogout}>
        <div className='flex items-center p-3.5 bg-primary group hover:bg-white cursor-pointer' onClick={handleCloseMenu}>
          <FaSignOutAlt className="text-hint group-hover:text-primary transition duration-300" size={20} />
          <span className='text-secondary group-hover:text-primary text-sm font-b ml-3.5'>Logout</span>
        </div>
      </div>
    </>
  )
}

export default LoggedInMenu
