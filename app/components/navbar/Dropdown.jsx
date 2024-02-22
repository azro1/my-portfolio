"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import Link from "next/link"
import { useRouter } from "next/navigation";
import {
  FaInfoCircle,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt
} from 'react-icons/fa';


const Dropdown = ({ user, handleCloseMenu }) => {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClientComponentClient()
    const {error} = await supabase.auth.signOut()

    if (!error) {
      window.location.reload()
    }

    if (error) {
      console.log(error)
    }
  }

  return (
    <div className='menu-links flex flex-col absolute w-60 right-0 top-28 mt-4 p-3 bg-primary z-50 border-2 border-secondary'>

      {user && (
        <>
          <Link href='/about'>
          <div className='flex items-center p-3 group hover:bg-gray-800' onClick={handleCloseMenu}>
            <FaInfoCircle className="group-hover:text-hint transition duration-300" size={17} />
            <span className='text-secondary font-b ml-3.5'>About</span>
          </div>
          </Link>
          <Link href='/contact'>
            <div className='flex items-center p-3 group hover:bg-gray-800' onClick={handleCloseMenu}>
              <FaUser className="group-hover:text-hint transition duration-300" size={18} />
              <span className='text-secondary font-b ml-3.5'>Contact</span>
            </div>
          </Link>
          <div onClick={handleLogout}>
            <div className='flex items-center p-3 group hover:bg-gray-800 cursor-pointer' onClick={handleCloseMenu}>
              <FaSignOutAlt className="group-hover:text-hint transition duration-300 text-secondary" size={20} />
              <span className='text-secondary text-sm font-b ml-3.5'>Logout</span>
            </div>
          </div>
        </>
      )}

      {!user && (
        <>
          <Link href='/about'>
          <div className='flex items-center p-3 group hover:bg-gray-800' onClick={handleCloseMenu}>
            <FaInfoCircle className="group-hover:text-hint transition duration-300" size={17} />
            <span className='text-secondary font-b ml-3.5'>About</span>
          </div>
          </Link>
          <Link href='/contact'>
            <div className='flex items-center p-3 group hover:bg-gray-800' onClick={handleCloseMenu}>
              <FaUser className="group-hover:text-hint transition duration-300" size={18} />
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
        </>
      )}
    </div>
  )
}

export default Dropdown
