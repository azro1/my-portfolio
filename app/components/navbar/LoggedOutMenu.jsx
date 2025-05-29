"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation';

const LoggedOutMenu = ({ handleCloseMenu }) => {
  const pathName = usePathname()

  const links = [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
  ];

  const isHomePage = pathName === '/';
  const isAboutPage = pathName.includes('/about');
  const isContactPage = pathName.includes('/contact');
  const isLoginPage = pathName.includes('/login') || pathName.includes('/forgot-email');
  const isSignupPage = pathName.includes('/signup');

  return (
    <div>
      {links.map(link => {
          if ((link.href === '/' && !isHomePage) ||
              (link.href === '/about' && !isAboutPage) || 
              (link.href === '/contact' && !isContactPage)) {
              return (
                <Link key={link.href} href={link.href}>
                    <div className='flex items-center p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray md:p-2.5 md:border-none' onClick={handleCloseMenu}>
                        <span className='text-base font-r text-stoneGray'>{link.label}</span>
                    </div>
                </Link>
              )
          }
          return null;
      })}

      {!isLoginPage && (
        <Link href={'/login'}>
          <div className='flex items-center p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray' onClick={handleCloseMenu}>
            <span className='text-base font-r text-stoneGray'>Login</span>
          </div>
        </Link>
      )}

      {!isSignupPage && (
        <Link href={'/signup'}>
          <div className='flex items-center p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray' onClick={handleCloseMenu}>
            <span className='text-base font-r text-stoneGray'>Sign up</span>
          </div>
        </Link>
      )}
    </div>
  )
}

export default LoggedOutMenu
