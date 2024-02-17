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
        <div className='lg:flex items-end gap-12 hidden '>
          <div className="tooltip group">
            <Link href='/signup'><FaSignInAlt className="group-hover:text-hint transition duration-300" size={30} /></Link>
            <span className="tooltiptext -left-1">Sign up</span>
          </div>
          <div className="tooltip group">
            <Link href='/login'><FaUserPlus className="group-hover:text-hint transition duration-300" size={32} /></Link>
            <span className="tooltiptext -left-1">Login</span>
          </div>
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
