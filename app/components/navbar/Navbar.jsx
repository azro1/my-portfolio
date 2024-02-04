"use client"

import { useState } from "react"
import { IoMenu } from "react-icons/io5"
import Menu from "./Menu"
import Link from "next/link"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <main>
      <nav className="flex items-center h-9.5">
        <Link href="/" className="mr-auto shadow-3xl p-3.5 rounded-xl bg-shade">
          <h2 className="logo font-eb text-hint">Port<span>folio</span></h2>
        </Link>
        <IoMenu onClick={toggleMenu} size={40} className="text-secondary lg:hidden" />
        <div className="links hidden lg:block">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login">Login</Link>
          <Link href="/signup">Sign up</Link>
        </div>
      </nav>
      <Menu isOpen={isOpen} />
    </main>
  )
}

export default Navbar
