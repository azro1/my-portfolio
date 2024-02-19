"use client"

import Link from "next/link"
import { useState } from "react"
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'

// components
import Chevron from "../components/Chevron"

export default function AuthLayout ({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleMenu = () => {
    setIsOpen(!isOpen)
  }
  
  const handleCloseMenu = () => {
    setIsOpen(false)
  }

  return (
    <main>
      <nav className='flex items-center h-9.5 relative'>
        <Link href='/' className='mr-auto shadow-3xl pt-1.5 px-4 pb-0.5 rounded-xl bg-shade'>
          <h2 className='logo font-eb text-hint'>
            Port<span>folio</span>
          </h2>
        </Link>

        <Chevron isOpen={isOpen} handleToggleMenu={handleToggleMenu} />

        <div className='hidden lg:flex items-center gap-12'>
          <Link href='/signup'>
            <div className="tooltip group">
              <FaSignInAlt className="group-hover:text-hint transition duration-300 cursor-pointer" size={31} />
              <span className="tooltiptext -left-2.5">Sign up</span>
            </div>
          </Link>
          <Link href='/login'>
            <div className="tooltip group">
              <FaUserPlus className="group-hover:text-hint transition duration-300 cursor-pointer" size={33} />
              <span className="tooltiptext -left-2.5">Login</span>
            </div>
          </Link>
        </div>
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
      </nav>
      {children}
    </main>
  )
}
