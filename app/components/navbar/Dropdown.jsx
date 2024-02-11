import Link from "next/link"
import {
  FaInfoCircle,
  FaComment,
  FaSignInAlt,
  FaUserPlus
} from 'react-icons/fa';

const Dropdown = ({ handleCloseMenu }) => {
  return (
    <div className='menu-links lg:hidden flex flex-col absolute w-60 right-0 top-32 p-3 bg-dropdown z-50 border border-secondary'>
      <Link href='/about'>
        <div className='flex items-center p-3 group hover:bg-gray-800' onClick={handleCloseMenu}>
          <FaInfoCircle className="group-hover:text-hint transition duration-300" size={17} />
          <span className='text-secondary font-b ml-3.5'>About</span>
        </div>
      </Link>
      <Link href='/contact'>
        <div className='flex items-center p-3 group hover:bg-gray-800' onClick={handleCloseMenu}>
          <FaComment className="group-hover:text-hint transition duration-300" size={17} />
          <span className='text-secondary font-b ml-3.5'>Contact</span>
        </div>
      </Link>
      <Link href='/login'>
        <div className='flex items-center p-3 group hover:bg-gray-800' onClick={handleCloseMenu}>
          <FaSignInAlt className="group-hover:text-hint transition duration-300" size={20} />
          <span className='text-secondary font-b ml-3.5'>Login</span>
        </div>
      </Link>
      <Link href='signup'>
        <div className='flex items-center p-3 group hover:bg-gray-800' onClick={handleCloseMenu}>
          <FaUserPlus className="group-hover:text-hint transition duration-300" size={22} />
          <span className='text-secondary font-b ml-3.5'>Sign up</span>
        </div>
      </Link>
    </div>
  )
}

export default Dropdown
