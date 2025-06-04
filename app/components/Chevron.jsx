"use client"

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react'
import {
  FiArrowLeft,
  FiChevronDown,
  FiMenu,
  FiUsers
} from 'react-icons/fi';

// components
import Heading from './Heading';
import OnlineUserDropdown from './navbar/OnlineUserDropdown';
import MainMenuDropdown from './navbar/MainMenuDropdown';

const Chevron = ({ user, roomName, roomUsersState, isForumPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isOnlineMenuOpen, setIsOnlineMenuOpen] = useState(false)
  const dropDownMenuRef = useRef()
  const dropDownOnlineMenuRef = useRef()


  
  // close menus if user clicks outside both dropdown menus and profile submenu
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutsideMenu = dropDownMenuRef.current && !dropDownMenuRef.current.contains(event.target)
      const clickedOutsideOnlineMenu = dropDownOnlineMenuRef.current && !dropDownOnlineMenuRef.current.contains(event.target)
  
      if (clickedOutsideMenu && isMenuOpen) {
        setIsMenuOpen(false)
      }
  
      if (clickedOutsideOnlineMenu && isOnlineMenuOpen) {
        setIsOnlineMenuOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen, isOnlineMenuOpen]);





  // toggle default menu
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // close default menu
  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  // toggle online menu
  const handleToggleUserMenu = () => {
    setIsOnlineMenuOpen(!isOnlineMenuOpen)
  }








  return (
    <>
      {!isForumPage && (
        <>  {/* menu shows for large screens */}
          <button onClick={handleToggleMenu} className={'hidden text-base text-stoneGray md:block'}>
            <FiChevronDown size={22} />
          </button>

          {/* menu shows for small screens */}
          <button onClick={handleToggleMenu} className={`text-base text-cloudGray md:hidden`}>
            <FiMenu size={28} />
          </button>
        </>
      )}



      {isForumPage && (
        <div className='flex items-center justify-between'>

            {/* back arrow for small screens */}
            <Link className='xl:hidden' href='/chat'>
              <FiArrowLeft color='#E0E0E3' size={20} />
            </Link>

            {/* Limit width to available space minus icon width, truncates overflow with ellipsis */}
            <Heading className='relative top-[2px] text-lg w-[50vw] overflow-hidden text-ellipsis whitespace-nowrap xl:text-xl'>
              {roomName }
            </Heading>

            {/* online users menu shows for small screens */}
            <button onClick={handleToggleUserMenu} className='xl:hidden text-base text-cloudGray'>
              <FiUsers color='#E0E0E3' size={22} />
            </button>

        </div>
      )}



      { /* passing the users state (roomUsersState) through to dropdown to display online users menu */}
      {isOnlineMenuOpen && (
        <OnlineUserDropdown
          users={roomUsersState}
          dropDownOnlineMenuRef={dropDownOnlineMenuRef}
        />
      )}


      {isMenuOpen && (
        <MainMenuDropdown
          user={user}
          handleCloseMenu={handleCloseMenu}
          isForumPage={isForumPage}
          dropDownMenuRef={dropDownMenuRef}
        />
      )}


    </>
  )
}

export default Chevron
