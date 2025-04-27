"use client"

import Link from "next/link"
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';


const ProfileMenu = ({ handleLogout, handleCloseMenu, isProfilePage, isOpen }) => {
    const [activeLink, setActiveLink] = useState('');
    const pathName = usePathname()

    const topLinks = [
        { href: '/profile', label: 'My Profile' },
    ];

    const profileLinks = [
        { href: '/profile/edit-profile', label: 'Edit Profile' },
        { href: '/profile/data-privacy', label: 'Your Data' },
    ];

    const bottomLinks = [
        { href: '/chat', label: 'Forum' },
        { href: '/profile/help', label: 'Help' },
    ];

    useEffect(() => {
        setActiveLink(pathName)
    }, [pathName])

    const handleActiveLink = (href) => {
        setActiveLink(href);
    };

    return (
        <>
            {isOpen && (
                <div className='profile-menu'>
                    {topLinks.map((link) => (
                        <Link key={link.href} href={link.href} className={`${activeLink === link.href ? 'text-cloudGray' : 'text-ashGray md:text-stoneGray'}`} onClick={() => handleActiveLink(link.href)}>
                            <div className='flex items-center p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray md:p-2.5 md:border-none' onClick={handleCloseMenu}>
                                <span className='text-base'>{link.label}</span>
                            </div>
                        </Link>
                    ))}

                    {isProfilePage && (
                        <>
                            {profileLinks.map((link) => (
                                <Link key={link.href} href={link.href} className={`${activeLink === link.href ? 'text-cloudGray' : 'text-ashGray md:text-stoneGray'}`} onClick={() => handleActiveLink(link.href)}>
                                    <div className='flex items-center p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray md:p-2.5 md:border-none' onClick={handleCloseMenu}>
                                        <span className='text-base'>{link.label}</span>
                                    </div>
                                </Link>
                            ))}
                        </>
                    )}

                    {bottomLinks.map((link) => (
                        <Link key={link.href} href={link.href} className={`${activeLink === link.href ? 'text-cloudGray' : 'text-ashGray md:text-stoneGray'}`} onClick={() => handleActiveLink(link.href)}>
                            <div className='flex items-center p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray md:p-2.5 md:border-none' onClick={handleCloseMenu}>
                                <span className='text-base'>{link.label}</span>
                            </div>
                        </Link>
                    ))}

                    <div onClick={(e) => handleLogout(e)}>
                        <div className='flex items-center p-3 pl-4 md:p-2.5 md:border-none' onClick={handleCloseMenu}>
                            <span className='text-base font-r text-ashGray md:text-stoneGray'>Logout</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProfileMenu
