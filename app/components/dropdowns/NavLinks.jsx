"use client"

import Link from "next/link"
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FiChevronDown } from 'react-icons/fi';

// hooks
import { useBlockNavOnOtp } from "@/app/hooks/useBlockNavOnOtp";

// components
import UserAvatar from "../navbar/UserAvatar";


const NavLinks = ({ user, handleCloseMenu, handleToggleMenu }) => {
    const [activeLink, setActiveLink] = useState('');
    const pathName = usePathname();

    const { handleBlockNav } = useBlockNavOnOtp('hasVisitedProfileOtpPage', 'Please complete verification before you leave');


    useEffect(() => {
        setActiveLink(pathName)
    }, [pathName])

    const handleActiveLink = (href) => {
        setActiveLink(href);
    };


    return (
        <div className='md:hidden'>
            <Link href={'/'} className={`${activeLink === '/' ? 'active' : ''}`} onClick={(e) => {
                handleActiveLink('/');
                handleBlockNav(e);
            }}>
                <div className='flex items-center p-2 px-4' onClick={handleCloseMenu}>
                    <span className='text-base'>Home</span>
                </div>
            </Link>
            <Link href={'/about'} className={`${activeLink === '/about' ? 'active' : ''}`} onClick={(e) => {
                handleActiveLink('/about');
                handleBlockNav(e);
            }}>
                <div className='flex items-center p-2 px-4' onClick={handleCloseMenu}>
                    <span className='text-base'>About</span>
                </div>
            </Link>
            <Link href={'/contact'} className={`${activeLink === '/contact' ? 'active' : ''}`} onClick={(e) => {
                handleActiveLink('/contact');
                handleBlockNav(e);
            }}>
                <div className='flex items-center p-2 px-4' onClick={handleCloseMenu}>
                    <span className='text-base'>Contact</span>
                </div>
            </Link>
            <div className="flex items-center gap-1 p-2 px-4">
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
                    <span className="text-base font-medium text-stoneGray xl:inline">{user?.user_metadata.first_name || user?.user_metadata.full_name}</span>
                </div>
                <button onClick={handleToggleMenu} className='text-base text-ashGray'>
                    <FiChevronDown size={22} />
                </button>
            </div>
        </div>
    )
}

export default NavLinks
