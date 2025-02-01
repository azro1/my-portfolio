"use client"

import Link from "next/link"
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const LoggedOutMenu = ({ handleCloseMenu }) => {

  const [activeLink, setActiveLink] = useState('');
  const pathName = usePathname()

  useEffect(() => {
    setActiveLink(pathName)
  }, [pathName])

  const handleActiveLink = (href) => {
      setActiveLink(href);
  };


  return (
    <div className='p-2 md:p-0'>
      <Link href={'/'} className={`${activeLink === '/' ? 'active' : ''}`} onClick={() => handleActiveLink('/')}>
        <div className='flex items-center p-3' onClick={handleCloseMenu}>
          <span className={`text-base ${activeLink === '/' ? 'text-cloudGray xl:text-stoneGray' : ''}`}>Home</span>
        </div>
      </Link>
      <Link href={'/about'} className={`${activeLink === '/about' ? 'active' : ''}`} onClick={() => handleActiveLink('/about')}>
        <div className='flex items-center p-3' onClick={handleCloseMenu}>
          <span className={`text-base ${activeLink === '/about' ? 'text-cloudGray xl:text-stoneGray' : ''}`}>About</span>
        </div>
      </Link>
      <Link href={'/contact'} className={`${activeLink === '/contact' ? 'active' : ''}`} onClick={() => handleActiveLink('/contact')}>
        <div className='flex items-center p-3' onClick={handleCloseMenu}>
          <span className={`text-base ${activeLink === '/contact' ? 'text-cloudGray xl:text-stoneGray' : ''}`}>Contact</span>
        </div>
      </Link>
      <Link href={'/login'} className={`${activeLink === '/login' ? 'active' : ''}`} onClick={() => handleActiveLink('/login')}>
        <div className='flex items-center p-3' onClick={handleCloseMenu}>
          <span className={`text-base ${activeLink === '/login' ? 'text-cloudGray xl:text-stoneGray' : ''}`}>Login</span>
        </div>
      </Link>
      <Link href={'/signup'} className={`${activeLink === '/signup' ? 'active' : ''}`} onClick={() => handleActiveLink('/signup')}>
        <div className='flex items-center p-3' onClick={handleCloseMenu}>
          <span className={`text-base ${activeLink === '/signup' ? 'text-cloudGray xl:text-stoneGray' : ''}`}>Sign up</span>
        </div>
      </Link>
    </div>
  )
}

export default LoggedOutMenu
