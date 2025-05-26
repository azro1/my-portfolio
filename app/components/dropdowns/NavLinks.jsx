"use client"

import Link from "next/link"
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FiChevronDown } from 'react-icons/fi';


// components
import UserAvatar from "../navbar/UserAvatar";


const NavLinks = ({ user, handleCloseMenu, handleToggleMenu, isForumPage }) => {
    const pathName = usePathname();

    const links = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    const isHomePage = pathName === '/';
    const isAboutPage = pathName.includes('/about');
    const isContactPage = pathName.includes('/contact');

    return (
        <div className={`nav-links ${isForumPage ? 'block' : 'md:hidden'}`}>

            {links.map(link => {
                if ((link.href === '/' && !isHomePage) ||
                    (link.href === '/about' && !isAboutPage) || 
                    (link.href === '/contact' && !isContactPage)) {
                    return (
                    <Link key={link.href} href={link.href}>
                        <div className='flex items-center p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray md:p-2.5 md:border-none' onClick={handleCloseMenu}>
                            <span className='text-base text-ashGray'>{link.label}</span>
                        </div>
                    </Link>
                    );
                }
                return null;
            })}
            
            <div className="flex items-center gap-1 p-3 pl-4  md:p-2.5 md:border-none">
                <div className='flex items-center gap-2'>
                    <div className="min-w-[32px] min-h-[32px]">
                        <UserAvatar
                            user={user}
                            width={32}
                            height={32}
                            maxWidth={'max-w-[32px]'}
                            maxHeight={'max-h-[32px]'}
                            defaultAvatarSize={32}
                        />
                    </div>
                    <span className="text-base font-r text-ashGray md:text-stoneGray xl:inline">{user?.user_metadata.first_name || user?.user_metadata.full_name}</span>
                </div>
                <button onClick={handleToggleMenu} className='text-base text-ashGray md:text-stoneGray'>
                    <FiChevronDown size={22} />
                </button>
            </div>
        </div>
    )
}

export default NavLinks
