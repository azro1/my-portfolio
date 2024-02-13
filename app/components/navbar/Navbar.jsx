"use client"

import { useState } from "react"
import Link from "next/link"
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// components
import Dropdown from "./Dropdown"

const Navbar = () => {
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
        <div className='links hidden lg:block'>
          <Link href='/about'>About</Link>
          <Link href='/contact'>Contact</Link>
          <Link href='/signup'>Sign up</Link>
          <Link href='/login'>Login</Link>
        </div>

        {isOpen && (
          <Dropdown handleCloseMenu={handleCloseMenu} />
        )}
      </nav>
    </main>
  );
}

export default Navbar
