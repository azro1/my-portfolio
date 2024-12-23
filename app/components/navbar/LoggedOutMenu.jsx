import Link from "next/link"

import {
    FaHome,
    FaInfoCircle,
    FaSignInAlt,
    FaUserPlus,
    FaQuestionCircle,
    FaPhoneAlt
  } from 'react-icons/fa';

const LoggedOutMenu = ({ handleCloseMenu }) => {
  return (
    <>
      <Link href='/'>
        <div className='flex items-center gap-3 p-3 max-h-16 mb-1 bg-softCharcoal group hover:bg-midnightSlate transition duration-300 rounded-tl-md rounded-tr-md' onClick={handleCloseMenu}>
          <FaHome className="text-saddleBrown" size={20} />
          <span className='text-ashGray group-hover:text-stoneGray transition duration-300 text-base'>Home</span>
        </div>
      </Link>
      <Link href='/about'>
        <div className='flex items-center gap-3 p-3 max-h-16 mb-1 bg-softCharcoal group hover:bg-midnightSlate transition duration-300' onClick={handleCloseMenu}>
          <FaInfoCircle className="text-saddleBrown" size={18} />
          <span className='text-ashGray group-hover:text-stoneGray transition duration-300 text-base'>About</span>
        </div>
      </Link>
      <Link href='/contact'>
        <div className='flex items-center gap-3 p-3 max-h-16 mb-1 bg-softCharcoal group hover:bg-midnightSlate transition duration-300' onClick={handleCloseMenu}>
          <FaPhoneAlt className="text-saddleBrown" size={17} />
          <span className='text-ashGray group-hover:text-stoneGray transition duration-300 text-base'>Contact</span>
        </div>
      </Link>
      <Link href='/login'>
        <div className='flex items-center gap-3 p-3 max-h-16 mb-1 bg-softCharcoal group hover:bg-midnightSlate transition duration-300' onClick={handleCloseMenu}>
          <FaSignInAlt className="text-saddleBrown" size={20} />
          <span className='text-ashGray group-hover:text-stoneGray transition duration-300 text-base'>Login</span>
        </div>
      </Link>
      <Link href='/signup'>
        <div className='flex items-center gap-3 p-3 max-h-16 mb-1 bg-softCharcoal group hover:bg-midnightSlate transition duration-300' onClick={handleCloseMenu}>
          <FaUserPlus className="text-saddleBrown" size={22} />
          <span className='text-ashGray group-hover:text-stoneGray transition duration-300 text-base'>Sign up</span>
        </div>
      </Link>
      <Link href='/help'>
        <div className='flex items-center gap-3 p-3 max-h-16 bg-softCharcoal group hover:bg-midnightSlate transition duration-300 rounded-bl-md rounded-br-md' onClick={handleCloseMenu}>
          <FaQuestionCircle className="text-saddleBrown" size={18} />
          <span className='text-ashGray group-hover:text-stoneGray transition duration-300 text-base'>Help</span>
        </div>
      </Link>
    </>
  )
}

export default LoggedOutMenu
