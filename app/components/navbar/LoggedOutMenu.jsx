"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation';

const LoggedOutMenu = ({ handleCloseMenu }) => {
  const pathName = usePathname()

  const isLoginPage = pathName.includes('/login') || pathName.includes('/forgot-email');
  const isSignupPage = pathName.includes('/signup');

  return (
    <div>
      <Link href={'/'}>
        <div className='flex items-center p-3 pl-4 border-t-[1px] border-b-[1px] border-opacity-30 border-dashed border-ashGray' onClick={handleCloseMenu}>
          <span className={`text-base text-stoneGray`}>Home</span>
        </div>
      </Link>

      <Link href={'/about'}>
        <div className='flex items-center p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray' onClick={handleCloseMenu}>
          <span className={`text-base text-stoneGray`}>About</span>
        </div>
      </Link>

      <Link href={'/contact'}>
        <div className='flex items-center p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray' onClick={handleCloseMenu}>
          <span className={`text-base text-stoneGray`}>Contact</span>
        </div>
      </Link>

      {!isLoginPage && (
        <Link href={'/login'}>
          <div className='flex items-center p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray' onClick={handleCloseMenu}>
            <span className={`text-base text-stoneGray`}>Login</span>
          </div>
        </Link>
      )}

      {!isSignupPage && (
        <Link href={'/signup'}>
          <div className='flex items-center p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray' onClick={handleCloseMenu}>
            <span className={`text-base text-stoneGray`}>Sign up</span>
          </div>
        </Link>
      )}
    </div>
  )
}

export default LoggedOutMenu
