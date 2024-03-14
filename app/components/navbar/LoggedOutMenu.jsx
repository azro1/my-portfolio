import Link from "next/link"

import {
    FaHome,
    FaInfoCircle,
    FaUser,
    FaSignInAlt,
    FaUserPlus,
    FaQuestionCircle
  } from 'react-icons/fa';

const LoggedOutMenu = ({ handleCloseMenu }) => {
  return (
    <>
      <Link href='/'>
      <div className='flex items-center p-3 group hover:bg-white' onClick={handleCloseMenu}>
          <FaHome className="group-hover:text-primary transition duration-300" size={18} />
          <span className='group-hover:text-primary text-sm font-b ml-3.5'>Home</span>
      </div>
      </Link>
      <Link href='/about'>
      <div className='flex items-center p-3 group hover:bg-white' onClick={handleCloseMenu}>
          <FaInfoCircle className="group-hover:text-primary transition duration-300" size={17} />
          <span className='group-hover:text-primary text-sm font-b ml-3.5'>About</span>
      </div>
      </Link>
      <Link href='/contact'>
      <div className='flex items-center p-3 group hover:bg-white' onClick={handleCloseMenu}>
          <FaUser className="group-hover:text-primary transition duration-300" size={18} />
          <span className='group-hover:text-primary text-sm font-b ml-3.5'>Contact</span>
      </div>
      </Link>
      <Link href='/login'>
      <div className='flex items-center p-3 group hover:bg-white' onClick={handleCloseMenu}>
          <FaSignInAlt className="group-hover:text-primary transition duration-300" size={20} />
          <span className='group-hover:text-primary text-sm font-b ml-3.5'>Login</span>
      </div>
      </Link>
      <Link href='/signup'>
      <div className='flex items-center p-3 group hover:bg-white' onClick={handleCloseMenu}>
          <FaUserPlus className="group-hover:text-primary transition duration-300" size={22} />
          <span className='group-hover:text-primary text-sm font-b ml-3.5'>Sign up</span>
      </div>
      </Link>
      <Link href='/help'>
      <div className='flex items-center p-3 group hover:bg-white' onClick={handleCloseMenu}>
          <FaQuestionCircle className="group-hover:text-primary transition duration-300" size={18} />
          <span className='group-hover:text-primary text-sm font-b ml-3.5'>Help</span>
      </div>
      </Link>
    </>
  )
}

export default LoggedOutMenu
