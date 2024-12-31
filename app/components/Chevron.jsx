"use client"

import { useState, useEffect, useRef } from 'react'
import {
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

// components
import Dropdown from './navbar/Dropdown'


const Chevron = ({ order, user }) => {
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
       <span className='p-1 inline-block shadow-outer rounded-md'>
          <button onClick={handleToggleMenu} className='p-1.5 text-base text-ashGray bg-softCharcoal ' ref={dropDownRef}>
            {isOpen ? (
              <FaChevronUp size={22} />
            ) : (
              <FaChevronDown size={22} />
            )}
          </button> 
       </span>

   
       {isOpen && (
          <Dropdown user={user} handleCloseMenu={handleCloseMenu} />
       )}
    </>
  )
}

export default Chevron
