"use client"

import { useState } from "react"
import { FaAngleRight, FaChevronDown, FaChevronUp } from "react-icons/fa";

import Link from "next/link"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <main>
      <nav className='flex items-center h-9.5 relative'>
        <Link href='/' className='mr-auto shadow-3xl p-3.5 rounded-xl bg-shade'>
          <h2 className='logo font-eb text-hint'>
            Port<span>folio</span>
          </h2>
        </Link>
        <button onClick={toggleMenu} className='p-2 text-base font-os font-b text-secondary shadow-3xl rounded-xl bg-shade lg:hidden'>
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
          <Link href='/login'>Login</Link>
          <Link href='/signup'>Sign up</Link>
        </div>

        {isOpen && (
          <div className='menu-links lg:hidden flex flex-col absolute w-60 right-0 top-32 p-3 bg-dropdown z-50 border border-secondary'>
            <div className='p-3 group hover:bg-gray-800'>
              <Link className='text-secondary font-b' href='/about'>
                About
              </Link>
            </div>
            <div className='p-3 group hover:bg-gray-800'>
              <Link className='text-secondary font-b' href='/contact'>
                Contact
              </Link>
            </div>
            <div className='p-3 group hover:bg-gray-800'>
              <Link className='text-secondary font-b' href='/login'>
                Login
              </Link>
            </div>
            <div className='p-3 group hover:bg-gray-800'>
              <Link className='text-secondary font-b' href='signup'>
                Sign up
              </Link>
            </div>
          </div>
        )}
      </nav>
    </main>
  );
}

export default Navbar
