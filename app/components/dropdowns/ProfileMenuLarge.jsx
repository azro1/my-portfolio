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


    // sidebar dropdown profile menu
    return (
        <div className="hidden md:block">
            <Link href={'/profile'} className={`${activeLink === '/profile' ? 'text-cloudGray' : 'text-charcoalGrayLight'}`} onClick={(e) => {
                handleActiveLink('/profile');
            }}>
                <div className='flex items-center p-2 px-4 xl:hover:bg-ashGray xl:hover:text-cloudGray transition-colors duration-300' onClick={handleCloseMenu}>
                    <span className='text-base'>My Profile</span>
                </div>
            </Link>

            {isProfilePage && (
                <>
                    <Link href={'/profile/edit-profile'} className={`${activeLink === '/profile/edit-profile' ? 'text-cloudGray' : 'text-charcoalGrayLight'}`} onClick={(e) => {
                        handleActiveLink('/profile/edit-profile');
    
                    }}>
                        <div className='flex items-center p-2 px-4 xl:hover:bg-ashGray xl:hover:text-cloudGray transition-colors duration-300' onClick={handleCloseMenu}>
                            <span className='text-base'>Edit Profile</span>
                        </div>
                    </Link>
                    <Link href={'/profile/data-privacy'} className={`${activeLink === '/profile/data-privacy' ? 'text-cloudGray' : 'text-charcoalGrayLight'}`} onClick={(e) => {
                        handleActiveLink('/profile/data-privacy');
    
                    }}>
                        <div className='flex items-center p-2 px-4 xl:hover:bg-ashGray xl:hover:text-cloudGray transition-colors duration-300' onClick={handleCloseMenu}>
                            <span className='text-base'>Your Data</span>
                        </div>
                    </Link>
                </>
            )}

            <Link href={'/forum'} className={`${activeLink === '/forum' ? 'text-cloudGray' : 'text-charcoalGrayLight'}`} onClick={(e) => {
                handleActiveLink('/forum');
            }}>
                <div className='flex items-center p-2 px-4 xl:hover:bg-ashGray xl:hover:text-cloudGray transition-colors duration-300' onClick={handleCloseMenu}>
                    <span className='text-base'>Forum</span>
                </div>
            </Link>
            <Link href={'/profile/help'} className={`${activeLink === '/help' ? 'text-cloudGray' : 'text-charcoalGrayLight'}`} onClick={(e) => {
                handleActiveLink('/profile/help');
            }}>
                <div className='flex items-center p-2 px-4 xl:hover:bg-ashGray xl:hover:text-cloudGray transition-colors duration-300' onClick={handleCloseMenu}>
                    <span className='text-base'>Help</span>
                </div>
            </Link>
            <div onClick={(e) => handleLogout(e)}>
                <div className='flex items-center p-2 px-4 text-charcoalGrayLight xl:hover:bg-ashGray xl:hover:text-cloudGray transition-colors duration-300 cursor-pointer' onClick={handleCloseMenu}>
                    <span className='text-base'>Logout</span>
                </div>
            </div>
        </div>
    )
}

export default ProfileMenuLarge
