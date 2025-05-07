"use client"

import Link from "next/link"
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';



const ProfileMenuLarge = ({ handleLogout, handleCloseMenu, isProfilePage, isForumPage }) => {
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


    // sidebar dropdown profile menu
    return (
        <div>
            {!isForumPage && (
                <div className="hidden md:block">

                    {topLinks.map((link) => (
                        <Link key={link.href} href={link.href} className={`${activeLink === link.href ? 'text-cloudGray' : 'text-stoneGray'}`} onClick={() => handleActiveLink(link.href)}>
                            <div className='flex items-center p-2.5 pl-4 xl:hover:bg-charcoalGray xl:hover:text-cloudGray transition-colors duration-300' onClick={handleCloseMenu}>
                                <span className='text-base'>{link.label}</span>
                            </div>
                        </Link>
                    ))}

                    {isProfilePage && (
                        <>
                            {profileLinks.map((link) => (
                                <Link key={link.href} href={link.href} className={`${activeLink === link.href ? 'text-cloudGray' : 'text-stoneGray'}`} onClick={() => handleActiveLink(link.href)}>
                                    <div className='flex items-center p-2.5 pl-4 xl:hover:bg-charcoalGray xl:hover:text-cloudGray transition-colors duration-300' onClick={handleCloseMenu}>
                                        <span className='text-base'>{link.label}</span>
                                    </div>
                                </Link>
                            ))}
                        </>
                    )}

                    {bottomLinks.map((link) => (
                        <Link key={link.href} href={link.href} className={`${activeLink === link.href ? 'text-cloudGray' : 'text-stoneGray'}`} onClick={() => handleActiveLink(link.href)}>
                            <div className='flex items-center p-2.5 pl-4 xl:hover:bg-charcoalGray xl:hover:text-cloudGray transition-colors duration-300' onClick={handleCloseMenu}>
                                <span className='text-base'>{link.label}</span>
                            </div>
                        </Link>
                    ))}

                    <div onClick={(e) => handleLogout(e)}>
                        <div className='flex items-center p-2.5 pl-4 text-stoneGray xl:hover:bg-charcoalGray xl:hover:text-cloudGray transition-colors duration-300 cursor-pointer' onClick={handleCloseMenu}>
                            <span className='text-base'>Logout</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
 
    )
}

export default ProfileMenuLarge
