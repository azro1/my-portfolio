"use client"

import { useState, useEffect, useRef } from 'react'
import {
  FiChevronDown,
  FiMenu
} from 'react-icons/fi';

// components
import Dropdown from './navbar/Dropdown'


const Chevron = ({ user, isProfilePage }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropDownRef = useRef()



  
  // close menus if user clicks outside both dropdown menus and profile submenu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target) && isOpen) {
        setIsOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen])


  
  const handleToggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleCloseMenu = () => {
    setIsOpen(false)
  }


  return (
     <>
        {/* shows for large screens */}
        <button onClick={handleToggleMenu} className='hidden text-base text-ashGray md:block'>
            <FiChevronDown size={22} />
        </button> 
        
        {/* shows for small screens */}
        <button onClick={handleToggleMenu} className='text-base text-cloudGray md:hidden'>
            <FiMenu size={24} />
        </button> 

       {isOpen && (
          <Dropdown 
              user={user} 
              handleCloseMenu={handleCloseMenu} 
              isProfilePage={isProfilePage}
              dropDownRef={dropDownRef} 
          />
       )}
    </>
  )
}

export default Chevron
