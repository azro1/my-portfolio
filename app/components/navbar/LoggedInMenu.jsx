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
      <div className='flex items-center p-3.5 mb-1 bg-nightSky group hover:bg-softCharcoal' onClick={handleCloseMenu}>
        <FaHome className="text-deepOlive" size={18} />
        <span className='text-stoneGray group-hover:text-frostWhite transition duration-300 text-base ml-3.5'>Home</span>
      </div>
      </Link>
      <Link href='/about'>
      <div className='flex items-center p-3.5 mb-1 bg-nightSky group hover:bg-softCharcoal' onClick={handleCloseMenu}>
        <FaInfoCircle className="text-deepOlive " size={17} />
        <span className='text-stoneGray group-hover:text-frostWhite transition duration-300 text-base ml-3.5'>About</span>
      </div>
      </Link>
      <Link href='/contact'>
      <div className='flex items-center p-3.5 mb-1 bg-nightSky group hover:bg-softCharcoal' onClick={handleCloseMenu}>
        <FaEnvelope className="text-deepOlive" size={18} />
        <span className='text-stoneGray group-hover:text-frostWhite transition duration-300 text-base ml-3.5'>Contact</span>
      </div>
      </Link>
      <Link href='/profile'>
      <div className='flex items-center p-3.5 mb-1 bg-nightSky group hover:bg-softCharcoal' onClick={handleCloseMenu}>
        <FaUser className="text-deepOlive" size={18} />
        <span className='text-stoneGray group-hover:text-frostWhite transition duration-300 text-base ml-3.5'>Profile</span>
      </div>
      </Link>
      <Link href='/help'>
        <div className='flex items-center p-3.5 mb-1 bg-nightSky group hover:bg-softCharcoal' onClick={handleCloseMenu}>
          <FaQuestionCircle className="text-deepOlive" size={18} />
          <span className='text-stoneGray group-hover:text-frostWhite transition duration-300 text-base ml-3.5'>Help</span>
        </div>
      </Link>
      <div onClick={handleLogout}>
        <div className='flex items-center p-3.5 bg-nightSky group hover:bg-softCharcoal cursor-pointer' onClick={handleCloseMenu}>
          <FaSignOutAlt className="text-deepOlive" size={20} />
          <span className='text-stoneGray group-hover:text-frostWhite transition duration-300 text-base ml-3.5'>Logout</span>
        </div>
      </div>
    </>
  )
}

export default LoggedInMenu
