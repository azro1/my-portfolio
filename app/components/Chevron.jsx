"use client"

import { useState } from 'react'
import Link from "next/link"
import {
  FaChevronDown,
  FaChevronUp,
  FaSignInAlt,
  FaUserPlus,
} from 'react-icons/fa';

// components
import Dropdown from './navbar/Dropdown'


const Chevron = ({ order, user }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleCloseMenu = () => {
    setIsOpen(false)
  }

  return (
    <>
    <button onClick={handleToggleMenu} className={`${order} p-2 text-base text-secondary rounded-xl bg-shade border border-secondary lg:hidden`}>
      {isOpen ? (
        <FaChevronUp size={22} />
      ) : (
        <FaChevronDown size={22} />
      )}
    </button> 

    {isOpen && (
       <Dropdown user={user} handleCloseMenu={handleCloseMenu} />
    )}

    {isOpen && (
      <div className='menu-links flex flex-col w-60 p-3 absolute right-0 top-28 mt-4 bg-primary z-50 border border-secondary lg:hidden'>
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
    )}
    </>

  )
}

export default Chevron
