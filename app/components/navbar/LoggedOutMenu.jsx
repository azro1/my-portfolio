import Link from "next/link"

import {
    FaHome,
    FaInfoCircle,
    FaSignInAlt,
    FaUserPlus,
    FaQuestionCircle,
    FaEnvelope
  } from 'react-icons/fa';

const LoggedOutMenu = ({ handleCloseMenu }) => {
  return (
    <>
      <Link href='/'>
        <div className='flex items-center p-3 mb-1 bg-primary group hover:bg-white' onClick={handleCloseMenu}>
          <FaHome className="text-hint group-hover:text-primary transition duration-300" size={18} />
          <span className='text-secondary group-hover:text-primary text-sm ml-3.5'>Home</span>
        </div>
      </Link>
      <Link href='/about'>
        <div className='flex items-center p-3 mb-1 bg-primary group hover:bg-white' onClick={handleCloseMenu}>
          <FaInfoCircle className="text-hint group-hover:text-primary transition duration-300" size={17} />
          <span className='text-secondary group-hover:text-primary text-sm ml-3.5'>About</span>
        </div>
      </Link>
      <Link href='/contact'>
        <div className='flex items-center p-3 mb-1 bg-primary group hover:bg-white' onClick={handleCloseMenu}>
          <FaEnvelope className="text-hint group-hover:text-primary transition duration-300" size={16} />
          <span className='text-secondary group-hover:text-primary text-sm ml-3.5'>Contact</span>
        </div>
      </Link>
      <Link href='/login'>
        <div className='flex items-center p-3 mb-1 bg-primary group hover:bg-white' onClick={handleCloseMenu}>
          <FaSignInAlt className="text-hint group-hover:text-primary transition duration-300" size={20} />
          <span className='text-secondary group-hover:text-primary text-sm ml-3.5'>Login</span>
        </div>
      </Link>
      <Link href='/signup'>
        <div className='flex items-center p-3 mb-1 bg-primary group hover:bg-white' onClick={handleCloseMenu}>
          <FaUserPlus className="text-hint group-hover:text-primary transition duration-300" size={22} />
          <span className='text-secondary group-hover:text-primary text-sm ml-3.5'>Sign up</span>
        </div>
      </Link>
      <Link href='/help'>
        <div className='flex items-center p-3 bg-primary group hover:bg-white' onClick={handleCloseMenu}>
          <FaQuestionCircle className="text-hint group-hover:text-primary transition duration-300" size={18} />
          <span className='text-secondary group-hover:text-primary text-sm ml-3.5'>Help</span>
        </div>
      </Link>
    </>
  )
}

export default LoggedOutMenu
