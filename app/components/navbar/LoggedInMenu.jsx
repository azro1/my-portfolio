"use client"

import { useState } from 'react';

// components
import NavLinks from "../dropdowns/NavLinks";
import ProfileMenu from "../dropdowns/ProfileMenu";
import ProfileMenuLarge from "../dropdowns/ProfileMenuLarge";


const LoggedInMenu = ({ user, handleLogout, handleCloseMenu, isForumPage }) => {

  const [isOpen, setIsOpen] = useState(false)

  const handleToggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>

      <div>
        {/* dropdown dashboard menu for small screens up to medium */}
        <NavLinks
          user={user}
          handleCloseMenu={handleCloseMenu}
          handleToggleMenu={handleToggleMenu}
          isForumPage={isForumPage}
          
        />

        {/* dropdown profile menu for small screens up to medium */}
        <ProfileMenu
          handleLogout={handleLogout}
          handleCloseMenu={handleCloseMenu}
          isOpen={isOpen}
        />
      </div>

      {/* dropdown profile menu for medium screens up to xl*/}
      <ProfileMenuLarge
        handleLogout={handleLogout}
        handleCloseMenu={handleCloseMenu}
        isForumPage={isForumPage}
      />

    </div>
  )
}

export default LoggedInMenu


















