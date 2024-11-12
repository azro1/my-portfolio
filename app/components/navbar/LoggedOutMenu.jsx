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
        <div className='flex items-center p-3 mb-1 bg-nightSky group hover:bg-softCharcoal rounded-tl-md rounded-tr-md' onClick={handleCloseMenu}>
          <FaHome className="text-saddleBrown" size={18} />
          <span className='text-ashGray group-hover:text-frostWhite transition duration-300 text-base ml-3.5'>Home</span>
        </div>
      </Link>
      <Link href='/about'>
        <div className='flex items-center p-3 mb-1 bg-nightSky group hover:bg-softCharcoal' onClick={handleCloseMenu}>
          <FaInfoCircle className="text-saddleBrown" size={17} />
          <span className='text-ashGray group-hover:text-frostWhite transition duration-300 text-base ml-3.5'>About</span>
        </div>
      </Link>
      <Link href='/contact'>
        <div className='flex items-center p-3 mb-1 bg-nightSky group hover:bg-softCharcoal' onClick={handleCloseMenu}>
          <FaEnvelope className="text-saddleBrown" size={16} />
          <span className='text-ashGray group-hover:text-frostWhite transition duration-300 text-base ml-3.5'>Contact</span>
        </div>
      </Link>
      <Link href='/login'>
        <div className='flex items-center p-3 mb-1 bg-nightSky group hover:bg-softCharcoal' onClick={handleCloseMenu}>
          <FaSignInAlt className="text-saddleBrown" size={20} />
          <span className='text-ashGray group-hover:text-frostWhite transition duration-300 text-base ml-3.5'>Login</span>
        </div>
      </Link>
      <Link href='/signup'>
        <div className='flex items-center p-3 mb-1 bg-nightSky group hover:bg-softCharcoal' onClick={handleCloseMenu}>
          <FaUserPlus className="text-saddleBrown" size={22} />
          <span className='text-ashGray group-hover:text-frostWhite transition duration-300 text-base ml-3.5'>Sign up</span>
        </div>
      </Link>
      <Link href='/help'>
        <div className='flex items-center p-3 bg-nightSky group hover:bg-softCharcoal rounded-bl-md rounded-br-md' onClick={handleCloseMenu}>
          <FaQuestionCircle className="text-saddleBrown" size={18} />
          <span className='text-ashGray group-hover:text-frostWhite transition duration-300 text-base ml-3.5'>Help</span>
        </div>
      </Link>
    </>
  )
}

export default LoggedOutMenu
