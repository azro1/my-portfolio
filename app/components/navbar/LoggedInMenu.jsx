import Link from "next/link"

import {
  FaHome,
  FaInfoCircle,
  FaUser,
  FaSignOutAlt,
  FaQuestionCircle
} from 'react-icons/fa';

const LoggedInMenu = ({handleLogout, handleCloseMenu }) => {
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
      <div onClick={handleLogout}>
      <div className='flex items-center p-3 group hover:bg-white cursor-pointer' onClick={handleCloseMenu}>
        <FaSignOutAlt className="group-hover:text-primary transition duration-300 text-secondary" size={20} />
        <span className='group-hover:text-primary text-sm font-b ml-3.5'>Logout</span>
      </div>
      </div>
      <Link href='/help'>
      <div className='flex items-center p-3 group hover:bg-white' onClick={handleCloseMenu}>
        <FaQuestionCircle className="group-hover:text-primary transition duration-300" size={18} />
        <span className='group-hover:text-primary text-sm font-b ml-3.5'>Help</span>
      </div>
      </Link>
    </>
  )
}

export default LoggedInMenu
