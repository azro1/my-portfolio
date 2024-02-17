"use client"

import { useState } from "react"
import Link from "next/link"
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import {
  FaInfoCircle,
  FaComment,
  FaSignInAlt,
  FaUserPlus
} from 'react-icons/fa';

// components
import Dropdown from "./Dropdown"

const Navbar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleCloseMenu = () => {
    setIsOpen(false)
  }

  return (
    <main>
      <nav className='flex items-center justify-between h-9.5 relative'>
        <Link href='/' className='shadow-3xl p-3.5 rounded-xl bg-shade'>
          <h2 className='logo font-eb text-hint'>
            Port<span>folio</span>
          </h2>
        </Link>
        <button onClick={handleToggleMenu} className='order-1 p-2 text-base font-os font-b text-secondary shadow-3xl rounded-xl bg-shade lg:hidden'>
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
        
        {user && <p className="text-hint absolute left-0 top-36 md:static">Hello, <span className="text-secondary">{user.email}</span></p>}

        <div className="flex items-center gap-16">
          <div className='links hidden lg:flex lg:items-center gap-12'>
            <Link href="/about">
              <div className="tooltip group">
                  <FaInfoCircle className="group-hover:text-hint transition duration-300 text-secondary cursor-pointer" size={28} />
                <span className="tooltiptext -left-0.5">About</span>
              </div>
            </Link>
            <Link href="/contact">
              <div className="tooltip group">
                <FaComment className="group-hover:text-hint transition duration-300 text-secondary cursor-pointer" size={30} />
                <span className="tooltiptext -left-1">Contact</span>
              </div>
            </Link>
            <Link href="/signup">
              <div className="tooltip group">
                <FaSignInAlt className="group-hover:text-hint transition duration-300 text-secondary cursor-pointer" size={32} />
                <span className="tooltiptext -left-1">Sign up</span>
              </div>
            </Link>
            <Link href="/login">
              <div className="tooltip group">
                <FaUserPlus className="group-hover:text-hint transition duration-300 text-secondary cursor-pointer" size={33} />
                <span className="tooltiptext -left-1">Login</span>
              </div>
            </Link>
          </div>
        </div>
        {isOpen && (
          <Dropdown handleCloseMenu={handleCloseMenu} />
        )}
      </nav>
    </main>
  );
}

export default Navbar
