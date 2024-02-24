"use client"

import { useState } from 'react'
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
       <button onClick={handleToggleMenu} className={`${order} p-1.5 text-base text-secondary bg-shade border-2 border-secondary rounded-lg`}>
         {isOpen ? (
           <FaChevronUp size={22} />
         ) : (
           <FaChevronDown size={22} />
         )}
       </button> 
   
       {isOpen && (
          <Dropdown user={user} handleCloseMenu={handleCloseMenu} />
       )}
    </>
  )
}

export default Chevron
