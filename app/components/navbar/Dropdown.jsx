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
      router.push('/login')
      router.refresh()
    }

    if (error) {
      console.log(error)
    }
  }

  return (
    <div className='menu-links flex flex-col absolute w-60 right-0 top-28 mt-4 p-3 bg-primary z-50 border-2 border-secondary bg-shade'>

      {user && (
        <>
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
              <FaUser className="group-hover:text-primary transition duration-300" size={18} />
              <span className='group-hover:text-primary text-sm font-b ml-3.5'>Help</span>
            </div>
          </Link>
        </>
      )}

      {!user && (
        <>
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
              <FaUser className="group-hover:text-primary transition duration-300" size={18} />
              <span className='group-hover:text-primary text-sm font-b ml-3.5'>Help</span>
            </div>
          </Link>
        </>
      )}
    </div>
  )
}

export default Dropdown
