"use client"

import Link from "next/link"
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';


// hooks
import { useBlockNavOnOtp } from "@/app/hooks/useBlockNavOnOtp";

const ProfileMenuLarge = ({ handleLogout, handleCloseMenu, isProfilePage }) => {
    const [activeLink, setActiveLink] = useState('');
    const pathName = usePathname()

    const { handleBlockNav } = useBlockNavOnOtp('hasVisitedProfileOtpPage', 'Please complete verification before you leave');



    useEffect(() => {
        setActiveLink(pathName)
    }, [pathName])

    const handleActiveLink = (href) => {
        setActiveLink(href);
    };




    return (
        <div className="hidden md:block">
            <Link href={'/profile'} className={`${activeLink === '/profile' ? 'active' : ''}`} onClick={(e) => {
                handleActiveLink('/profile');
                handleBlockNav(e);
            }}>
                <div className='flex items-center p-2 px-4 xl:hover:bg-ashGray xl:hover:text-cloudGray transition-bg duration-300' onClick={handleCloseMenu}>
                    <span className='text-base'>My Profile</span>
                </div>
            </Link>

            {isProfilePage && (
                <>
                    <Link href={'/profile/edit-profile'} className={`${activeLink === '/profile/edit-profile' ? 'active' : ''}`} onClick={(e) => {
                        handleActiveLink('/profile/edit-profile');
                        handleBlockNav(e);
                    }}>
                        <div className='flex items-center p-2 px-4 xl:hover:bg-ashGray xl:hover:text-cloudGray transition-bg duration-300' onClick={handleCloseMenu}>
                            <span className='text-base'>Edit Profile</span>
                        </div>
                    </Link>
                    <Link href={'/profile/data-privacy'} className={`${activeLink === '/profile/data-privacy' ? 'active' : ''}`} onClick={(e) => {
                        handleActiveLink('/profile/data-privacy');
                        handleBlockNav(e);
                    }}>
                        <div className='flex items-center p-2 px-4 xl:hover:bg-ashGray xl:hover:text-cloudGray transition-bg duration-300' onClick={handleCloseMenu}>
                            <span className='text-base'>Your Data</span>
                        </div>
                    </Link>
                </>
            )}

            <Link href={'/forum'} className={`${activeLink === '/forum' ? 'active' : ''}`} onClick={(e) => {
                handleActiveLink('/forum');
                handleBlockNav(e);
            }}>
                <div className='flex items-center p-2 px-4 xl:hover:bg-ashGray xl:hover:text-cloudGray transition-bg duration-300' onClick={handleCloseMenu}>
                    <span className='text-base'>Forum</span>
                </div>
            </Link>
            <Link href={'/help'} className={`${activeLink === '/help' ? 'active' : ''}`} onClick={(e) => {
                handleActiveLink('/help');
                handleBlockNav(e);
            }}>
                <div className='flex items-center p-2 px-4 xl:hover:bg-ashGray xl:hover:text-cloudGray transition-bg duration-300' onClick={handleCloseMenu}>
                    <span className='text-base'>Help</span>
                </div>
            </Link>
            <div onClick={(e) => handleLogout(e)}>
                <div className='flex items-center p-2 px-4 text-ashGray xl:hover:bg-ashGray xl:hover:text-cloudGray transition-bg duration-300 cursor-pointer' onClick={handleCloseMenu}>
                    <span className='text-base'>Logout</span>
                </div>
            </div>
        </div>
    )
}

export default ProfileMenuLarge
