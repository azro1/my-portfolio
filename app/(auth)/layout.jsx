"use client"

import Link from "next/link"
import { useState } from "react"
import { FaChevronDown, FaChevronUp, FaSignInAlt, FaUserPlus } from 'react-icons/fa'

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
        <Link href='/' className='mr-auto shadow-3xl p-3.5 rounded-xl bg-shade'>
          <h2 className='logo font-eb text-hint'>
            Port<span>folio</span>
          </h2>
        </Link>
        <button onClick={handleToggleMenu} className='p-2 text-base font-os font-b text-secondary shadow-3xl rounded-xl bg-shade lg:hidden'>
          {isOpen ? (
            <div className="flex items-center">
              <FaChevronUp size={22} />
            </div>
          ) : (
            <div className="flex items-center">
              <FaChevronDown size={22} />
            </div>
          )}
        </button>
        <div className='hidden lg:flex items-center gap-12'>
          <Link href='/signup'>
            <div className="tooltip group">
              <FaSignInAlt className="group-hover:text-hint transition duration-300 cursor-pointer" size={31} />
              <span className="tooltiptext -left-1">Sign up</span>
            </div>
          </Link>
          <Link href='/login'>
            <div className="tooltip group">
              <FaUserPlus className="group-hover:text-hint transition duration-300 cursor-pointer" size={33} />
              <span className="tooltiptext -left-1">Login</span>
            </div>
          </Link>
        </div>
        {isOpen && (
          <div className='menu-links lg:hidden flex flex-col absolute w-60 right-0 top-32 p-3 bg-primary z-50 border border-secondary'>
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
