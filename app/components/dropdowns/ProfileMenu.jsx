"use client"

import Link from "next/link"
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';


const ProfileMenu = ({ handleLogout, handleCloseMenu, isProfilePage, isOpen }) => {
    const [activeLink, setActiveLink] = useState('');
    const pathName = usePathname()


    useEffect(() => {
        setActiveLink(pathName)
    }, [pathName])

    const handleActiveLink = (href) => {
        setActiveLink(href);
    };

    return (
        <>
            {isOpen && (
                <>
                    <Link href={'/profile'} className={`${activeLink === '/profile' ? 'text-cloudGray ' : 'text-charcoalGrayLight'}`} onClick={(e) => {
                        handleActiveLink('/profile');
                    }}>
                        <div className='flex items-center p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray' onClick={handleCloseMenu}>
                            <span className='text-base'>My Profile</span>
                        </div>
                    </Link>

                    {isProfilePage && (
                        <>
                            <Link href={'/profile/edit-profile'} className={`${activeLink === '/profile/edit-profile' ? 'text-cloudGray' : 'text-charcoalGrayLight'}`} onClick={(e) => {
                                handleActiveLink('/profile/edit-profile');
    
                            }}>
                                <div className='flex items-center p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray' onClick={handleCloseMenu}>
                                    <span className='text-base'>Edit Profile</span>
                                </div>
                            </Link>
                            <Link href={'/profile/data-privacy'} className={`${activeLink === '/profile/data-privacy' ? 'text-cloudGray' : 'text-charcoalGrayLight'}`} onClick={(e) => {
                                handleActiveLink('/profile/data-privacy');
    
                            }}>
                                <div className='flex items-center p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray' onClick={handleCloseMenu}>
                                    <span className='text-base'>Your Data</span>
                                </div>
                            </Link>
                        </>
                    )}

                    <Link href={'/forum'} className={`${activeLink === '/forum' ? 'text-cloudGray' : 'text-charcoalGrayLight'}`} onClick={(e) => {
                        handleActiveLink('/forum');
                    }}>
                        <div className='flex items-center p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray' onClick={handleCloseMenu}>
                            <span className='text-base'>Forum</span>
                        </div>
                    </Link>
                    <Link href={'/profile/help'} className={`${activeLink === '/help' ? 'text-cloudGray' : 'text-charcoalGrayLight'}`} onClick={(e) => {
                        handleActiveLink('/profile/help');
                    }}>
                        <div className='flex items-center p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray' onClick={handleCloseMenu}>
                            <span className='text-base'>Help</span>
                        </div>
                    </Link>
                    <div onClick={(e) => handleLogout(e)}>
                        <div className='flex items-center p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray' onClick={handleCloseMenu}>
                            <span className='text-base text-charcoalGrayLight'>Logout</span>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ProfileMenu
