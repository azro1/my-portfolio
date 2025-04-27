"use client"

import Link from "next/link"
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FiChevronDown } from 'react-icons/fi';


// components
import UserAvatar from "../navbar/UserAvatar";


const NavLinks = ({ user, handleCloseMenu, handleToggleMenu, isForumPage }) => {
    const [activeLink, setActiveLink] = useState('');
    const pathName = usePathname();

    const links = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    useEffect(() => {
        setActiveLink(pathName)
    }, [pathName])

    const handleActiveLink = (href) => {
        setActiveLink(href);
    };


    return (
        <div className={`nav-links ${isForumPage ? 'block' : 'md:hidden'}`}>

            {links.map((link) => (
                <Link key={link.href} href={link.href} className={`${activeLink === link.href ? 'text-cloudGray' : 'text-ashGray md:text-stoneGray'}`} onClick={() => handleActiveLink(link.href)}>
                    <div className='flex items-center p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray md:p-2.5 md:border-none' onClick={handleCloseMenu}>
                        <span className='text-base'>{link.label}</span>
                    </div>
                </Link>
            ))}

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
                <button onClick={handleToggleMenu} className='text-base text-stoneGray'>
                    <FiChevronDown size={22} />
                </button>
            </div>
        </div>
    )
}

export default NavLinks
