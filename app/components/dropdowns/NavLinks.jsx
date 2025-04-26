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



    useEffect(() => {
        setActiveLink(pathName)
    }, [pathName])

    const handleActiveLink = (href) => {
        setActiveLink(href);
    };


    return (
        <div className={`${isForumPage ? 'block' : 'border-t-[1px] border-opacity-30 border-dashed border-ashGray md:p-2.5 md:hidden'} `}>
            <Link href={'/'} className={`${activeLink === '/' ? 'text-cloudGray' : 'text-ashGray md:text-stoneGray'}`} onClick={(e) => {
                handleActiveLink('/');
            }}>
                <div className='flex items-center p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray md:p-2.5 md:border-none' onClick={handleCloseMenu}>
                    <span className='text-base'>Home</span>
                </div>
            </Link>
            <Link href={'/about'} className={`${activeLink === '/about' ? 'text-cloudGray' : 'text-ashGray md:text-stoneGray'}`} onClick={(e) => {
                handleActiveLink('/about');
            }}>
                <div className='flex items-center p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray md:p-2.5 md:border-none' onClick={handleCloseMenu}>
                    <span className='text-base'>About</span>
                </div>
            </Link>
            <Link href={'/contact'} className={`${activeLink === '/contact' ? 'text-cloudGray' : 'text-ashGray md:text-stoneGray'}`} onClick={(e) => {
                handleActiveLink('/contact');
            }}>
                <div className='flex items-center p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray md:p-2.5 md:border-none' onClick={handleCloseMenu}>
                    <span className='text-base'>Contact</span>
                </div>
            </Link>
            <div className="flex items-center gap-1 p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray md:p-2.5 md:border-none">
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
