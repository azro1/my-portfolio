"use client"

import Link from "next/link"
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ProfileMenuLarge = ({ handleLogout, handleCloseMenu, isProfilePage }) => {
    const [activeLink, setActiveLink] = useState('');
    const pathName = usePathname()


    useEffect(() => {
        setActiveLink(pathName)
    }, [pathName])

    const handleActiveLink = (href) => {
        setActiveLink(href);
    };


    return (
        <div className="hidden md:block">
            <Link href={'/profile'} className={`${activeLink === '/profile' ? 'active' : ''}`} onClick={() => handleActiveLink('/profile')}>
                <div className='flex items-center p-2 px-4 xl:hover:bg-ashGray xl:hover:text-cloudGray transition-bg duration-300' onClick={handleCloseMenu}>
                    <span className='text-base'>Profile</span>
                </div>
            </Link>

            {isProfilePage && (
                <>
                    <Link href={'/profile/edit-profile'} className={`${activeLink === '/profile/edit-profile' ? 'active' : ''}`} onClick={() => handleActiveLink('/profile/edit-profile')}>
                        <div className='flex items-center p-2 px-4 xl:hover:bg-ashGray xl:hover:text-cloudGray transition-bg duration-300' onClick={handleCloseMenu}>
                            <span className='text-base'>Edit Profile</span>
                        </div>
                    </Link>
                    <Link href={'/profile/data-privacy'} className={`${activeLink === '/profile/data-privacy' ? 'active' : ''}`} onClick={() => handleActiveLink('/profile/data-privacy')}>
                        <div className='flex items-center p-2 px-4 xl:hover:bg-ashGray xl:hover:text-cloudGray transition-bg duration-300' onClick={handleCloseMenu}>
                            <span className='text-base'>Your Data</span>
                        </div>
                    </Link>
                </>
            )}

            <Link href={'/forum'} className={`${activeLink === '/forum' ? 'active' : ''}`} onClick={() => handleActiveLink('/forum')}>
                <div className='flex items-center p-2 px-4 xl:hover:bg-ashGray xl:hover:text-cloudGray transition-bg duration-300' onClick={handleCloseMenu}>
                    <span className={`text-base ${activeLink === '/forum' ? 'text-cloudGray xl:text-stoneGray' : ''}`}>Forum</span>
                </div>
            </Link>
            <Link href={'/help'} className={`${activeLink === '/help' ? 'active' : ''}`} onClick={() => handleActiveLink('/help')}>
                <div className='flex items-center p-2 px-4 xl:hover:bg-ashGray xl:hover:text-cloudGray transition-bg duration-300' onClick={handleCloseMenu}>
                    <span className={`text-base ${activeLink === '/help' ? 'text-cloudGray xl:text-stoneGray' : ''}`}>Help</span>
                </div>
            </Link>
            <div onClick={handleLogout}>
                <div className='flex items-center p-2 px-4 text-ashGray xl:hover:bg-ashGray xl:hover:text-cloudGray transition-bg duration-300' onClick={handleCloseMenu}>
                    <span className={`text-base ${activeLink === '/logout' ? 'text-cloudGray xl:text-stoneGray' : ''}`}>Logout</span>
                </div>
            </div>
        </div>
    )
}

export default ProfileMenuLarge
