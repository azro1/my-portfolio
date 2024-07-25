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
        <div className='flex items-center p-3 mb-1 bg-nightSky group hover:bg-frostWhite' onClick={handleCloseMenu}>
          <FaHome className="text-accentRed group-hover:text-nightSky transition duration-300" size={18} />
          <span className='text-stoneGray group-hover:text-nightSky text-base ml-3.5'>Home</span>
        </div>
      </Link>
      <Link href='/about'>
        <div className='flex items-center p-3 mb-1 bg-nightSky group hover:bg-frostWhite' onClick={handleCloseMenu}>
          <FaInfoCircle className="text-accentRed group-hover:text-nightSky transition duration-300" size={17} />
          <span className='text-stoneGray group-hover:text-nightSky text-base ml-3.5'>About</span>
        </div>
      </Link>
      <Link href='/contact'>
        <div className='flex items-center p-3 mb-1 bg-nightSky group hover:bg-frostWhite' onClick={handleCloseMenu}>
          <FaEnvelope className="text-accentRed group-hover:text-nightSky transition duration-300" size={16} />
          <span className='text-stoneGray group-hover:text-nightSky text-base ml-3.5'>Contact</span>
        </div>
      </Link>
      <Link href='/login'>
        <div className='flex items-center p-3 mb-1 bg-nightSky group hover:bg-frostWhite' onClick={handleCloseMenu}>
          <FaSignInAlt className="text-accentRed group-hover:text-nightSky transition duration-300" size={20} />
          <span className='text-stoneGray group-hover:text-nightSky text-base ml-3.5'>Login</span>
        </div>
      </Link>
      <Link href='/signup'>
        <div className='flex items-center p-3 mb-1 bg-nightSky group hover:bg-frostWhite' onClick={handleCloseMenu}>
          <FaUserPlus className="text-accentRed group-hover:text-nightSky transition duration-300" size={22} />
          <span className='text-stoneGray group-hover:text-nightSky text-base ml-3.5'>Sign up</span>
        </div>
      </Link>
      <Link href='/help'>
        <div className='flex items-center p-3 bg-nightSky group hover:bg-frostWhite' onClick={handleCloseMenu}>
          <FaQuestionCircle className="text-accentRed group-hover:text-nightSky transition duration-300" size={18} />
          <span className='text-stoneGray group-hover:text-nightSky text-base ml-3.5'>Help</span>
        </div>
      </Link>
    </>
  )
}

export default LoggedOutMenu
