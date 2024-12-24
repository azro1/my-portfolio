import Link from "next/link"

import {
  FaHome,
  FaInfoCircle,
  FaPhoneAlt,
  FaUser,
  FaSignOutAlt,
  FaQuestionCircle
} from 'react-icons/fa';
import { IoChatbubbleEllipses } from "react-icons/io5";


const LoggedInMenu = ({handleLogout, handleCloseMenu }) => {
  return (
    <>
      <Link href='/'>
        <div className='flex items-center gap-3 p-3.5 max-h-16 mb-1 bg-softCharcoal group hover:bg-midnightSlate transition duration-300 rounded-tl-md rounded-tr-md' onClick={handleCloseMenu}>
          <FaHome className="text-saddleBrown" size={20} />
          <span className='text-ashGray group-hover:text-stoneGray transition duration-300 text-base'>Home</span>
        </div>
      </Link>
      <Link href='/about'>
        <div className='flex items-center gap-3 p-3.5 mb-1 max-h-16 bg-softCharcoal group hover:bg-midnightSlate transition duration-300' onClick={handleCloseMenu}>
          <FaInfoCircle className="text-saddleBrown " size={18} />
          <span className='text-ashGray group-hover:text-stoneGray transition duration-300 text-base'>About</span>
        </div>
      </Link>
      <Link href='/contact'>
        <div className='flex items-center gap-3 p-3.5 mb-1 max-h-16 bg-softCharcoal group hover:bg-midnightSlate transition duration-300' onClick={handleCloseMenu}>
          <FaPhoneAlt className="text-saddleBrown" size={17} />
          <span className='text-ashGray group-hover:text-stoneGray transition duration-300 text-base'>Contact</span>
        </div>
      </Link>
      <Link href='/profile'>
        <div className='flex items-center gap-3 p-3.5 mb-1 max-h-16 bg-softCharcoal group hover:bg-midnightSlate transition duration-300' onClick={handleCloseMenu}>
          <FaUser className="text-saddleBrown" size={19} />
          <span className='text-ashGray group-hover:text-stoneGray transition duration-300 text-base'>Profile</span>
        </div>
      </Link>
      <Link className='xl:hidden' href='/chat'>
        <div className='flex items-center gap-3 p-3.5 mb-1 max-h-16 bg-softCharcoal group hover:bg-midnightSlate transition duration-300' onClick={handleCloseMenu}>
          <IoChatbubbleEllipses className="text-saddleBrown" size={19} />
          <span className='text-ashGray group-hover:text-stoneGray transition duration-300 text-base'>Chatroom</span>
        </div>
      </Link>
      <Link href='/help'>
          <div className='flex items-center gap-3 p-3.5 mb-1 max-h-16 bg-softCharcoal group hover:bg-midnightSlate transition duration-300' onClick={handleCloseMenu}>
            <FaQuestionCircle className="text-saddleBrown" size={18} />
            <span className='text-ashGray group-hover:text-stoneGray transition duration-300 text-base'>Help</span>
          </div>
      </Link>
      <div onClick={handleLogout}>
          <div className='flex items-center gap-3 p-3.5 max-h-16 bg-softCharcoal group hover:bg-midnightSlate transition duration-300 cursor-pointer rounded-bl-md rounded-br-md' onClick={handleCloseMenu}>
            <FaSignOutAlt className="text-saddleBrown" size={20} />
            <span className='text-ashGray group-hover:text-stoneGray transition duration-300 text-base'>Logout</span>
          </div>
      </div>
    </>
  )
}

export default LoggedInMenu
