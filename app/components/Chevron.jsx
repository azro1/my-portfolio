"use client"

import { useState, useEffect, useRef } from 'react'
import {
  FiChevronDown
} from 'react-icons/fi';

// components
import Dropdown from './navbar/Dropdown'


const Chevron = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropDownRef = useRef()


  
  // close menus if user clicks on page
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target !== dropDownRef.current && isOpen) {
        setIsOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, dropDownRef])


  
  const handleToggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleCloseMenu = () => {
    setIsOpen(false)
  }


  return (
     <>
        <button onClick={handleToggleMenu} className=' text-base text-ashGray ' ref={dropDownRef}>
            <FiChevronDown size={22} />
        </button> 

       {isOpen && (
          <Dropdown user={user} handleCloseMenu={handleCloseMenu} />
       )}
    </>
  )
}

export default Chevron
