"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';


const ProfileNav = () => {
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
            <div className='flex flex-col gap-4 py-6 profile-nav sm md:hidden'>
                <Link 
                    className={`${activeLink === '/profile' ? 'active' : ''} w-fit items-center text-ashGray text-base`} 
                    href={'/profile'} 
                    onClick={() => handleActiveLink('/profile')}>
                        <span>Dashboard</span>
                </Link>
                <Link 
                    className={`${activeLink === '/profile/edit-profile' ? 'active' : ''} w-fit items-center text-ashGray text-base`} href={'/profile/edit-profile'} 
                    onClick={() => handleActiveLink('/profile/edit-profile')}>
                        <span>Edit Profile</span>
                </Link>
                <Link 
                    className={`${activeLink === '/profile/data-privacy' ? 'active' : ''} w-fit items-center text-ashGray text-base`} href={'/profile/data-privacy'} 
                    onClick={() => handleActiveLink('/profile/data-privacy')}>
                        <span>Data & Privacy</span>
                </Link>
            </div>

            <div className='hidden md:flex md:flex-row profile-nav md'>
                <div className='flex items gap-1.5 '>
                    <Link 
                        className={`${activeLink === '/profile' ? 'active' : ''} text-ashGray text-base bg-nightSky py-2 px-3 border-[1px] border-b-0 border-ashGray rounded-tl-lg rounded-tr-lg`} 
                        href={'/profile'} 
                        onClick={() => handleActiveLink('/profile')}>
                            <span>Dashboard</span>
                    </Link>
                    <Link 
                        className={`${activeLink === '/profile/edit-profile' ? 'active' : ''} text-ashGray text-base bg-nightSky py-2 px-3 border-[1px] border-b-0 border-ashGray rounded-tl-lg rounded-tr-lg`} 
                        href={'/profile/edit-profile'} 
                        onClick={() => handleActiveLink('/profile/edit-profile')}>
                            <span>Edit Profile</span>
                    </Link>
                    <Link 
                        className={`${activeLink === '/profile/data-privacy' ? 'active' : ''} text-ashGray text-base bg-nightSky py-2 px-3 border-[1px] border-b-0 border-ashGray rounded-tl-lg rounded-tr-lg`} 
                        href={'/profile/data-privacy'} 
                        onClick={() => handleActiveLink('/profile/data-privacy')}>
                            <span>Your Data</span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ProfileNav;
