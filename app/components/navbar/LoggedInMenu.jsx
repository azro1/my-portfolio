import Link from "next/link"

import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaUser,
  FaSignOutAlt,
  FaQuestionCircle,
  FaComments
} from 'react-icons/fa';
import { IoChatbubbleEllipses } from "react-icons/io5";


const LoggedInMenu = ({handleLogout, handleCloseMenu }) => {
  return (
    <>
      <Link href='/'>
        <div className='flex items-center p-3.5 mb-1 bg-softCharcoal group hover:bg-midnightSlate transition duration-300 rounded-tl-md rounded-tr-md' onClick={handleCloseMenu}>
          <FaHome className="text-saddleBrown" size={18} />
          <span className='text-ashGray group-hover:text-stoneGray transition duration-300 text-base ml-3.5'>Home</span>
        </div>
      </Link>
      <Link href='/about'>
        <div className='flex items-center p-3.5 mb-1 bg-softCharcoal group hover:bg-midnightSlate transition duration-300' onClick={handleCloseMenu}>
          <FaInfoCircle className="text-saddleBrown " size={17} />
          <span className='text-ashGray group-hover:text-stoneGray transition duration-300 text-base ml-3.5'>About</span>
        </div>
      </Link>
      <Link href='/contact'>
        <div className='flex items-center p-3.5 mb-1 bg-softCharcoal group hover:bg-midnightSlate transition duration-300' onClick={handleCloseMenu}>
          <FaEnvelope className="text-saddleBrown" size={18} />
          <span className='text-ashGray group-hover:text-stoneGray transition duration-300 text-base ml-3.5'>Contact</span>
        </div>
      </Link>
      <Link href='/profile'>
        <div className='flex items-center p-3.5 mb-1 bg-softCharcoal group hover:bg-midnightSlate transition duration-300' onClick={handleCloseMenu}>
          <FaUser className="text-saddleBrown" size={18} />
          <span className='text-ashGray group-hover:text-stoneGray transition duration-300 text-base ml-3.5'>Profile</span>
        </div>
      </Link>
      <Link className='xl:hidden' href='/chat'>
        <div className='flex items-center p-3.5 mb-1 bg-softCharcoal group hover:bg-midnightSlate transition duration-300' onClick={handleCloseMenu}>
          <IoChatbubbleEllipses className="text-saddleBrown" size={20} />
          <span className='text-ashGray group-hover:text-stoneGray transition duration-300 text-base ml-3.5'>Chatroom</span>
        </div>
      </Link>
      <Link href='/help'>
          <div className='flex items-center p-3.5 mb-1 bg-softCharcoal group hover:bg-midnightSlate transition duration-300' onClick={handleCloseMenu}>
            <FaQuestionCircle className="text-saddleBrown" size={18} />
            <span className='text-ashGray group-hover:text-stoneGray transition duration-300 text-base ml-3.5'>Help</span>
          </div>
      </Link>
      <div onClick={handleLogout}>
          <div className='flex items-center p-3.5 bg-softCharcoal group hover:bg-midnightSlate transition duration-300 cursor-pointer rounded-bl-md rounded-br-md' onClick={handleCloseMenu}>
            <FaSignOutAlt className="text-saddleBrown" size={20} />
            <span className='text-ashGray group-hover:text-stoneGray transition duration-300 text-base ml-3.5'>Logout</span>
          </div>
      </div>
    </>
  )
}

export default LoggedInMenu
