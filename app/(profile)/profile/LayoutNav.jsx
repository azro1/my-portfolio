"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// icons
import { FaUserCircle } from "react-icons/fa";
import { HiMiniIdentification } from "react-icons/hi2";

const LayoutNav = () => {
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
            <div className='min-h-52 md:min-h-0 md:hidden shadow-outer bg-deepCharcoal layout-nav sm max-w-xs'>
                <Link className={`${activeLink === '/profile' ? 'active' : ''} flex items-center gap-3 p-3.5 mb-1 bg-nightSky text-stoneGray text-base`} href={'/profile'} onClick={() => handleActiveLink('/profile')}>
                        <FaUserCircle className='text-accentRed' size={20} />
                        <span>Dashboard</span>
                </Link>
                <Link className={`${activeLink === '/profile/edit-profile' ? 'active' : ''} flex items-center gap-3 p-3.5 mb-1 bg-nightSky text-stoneGray text-base`} href={'/profile/edit-profile'} onClick={() => handleActiveLink('/profile/edit-profile')}>
                        <HiMiniIdentification className='text-accentRed' size={20} />
                        <span>Edit Profile</span>
                </Link>
                <Link className={`${activeLink === '/profile/data-privacy' ? 'active' : ''} flex items-center p-3.5 mb-1 bg-nightSky text-stoneGray text-base`} href={'/profile/data-privacy'} onClick={() => handleActiveLink('/profile/data-privacy')}>
                        <span>Data & Privacy</span>
                </Link>
                <Link className={`${activeLink === '/profile/security' ? 'active' : ''} flex items-center p-3.5 bg-nightSky text-stoneGray text-base`} href={'/profile/security'} onClick={() => handleActiveLink('/profile/security')}>
                        <span>Security</span>
                </Link>
            </div>

       
            <div className='min-h-0 md:min-h-12 hidden md:flex md:flex-row md:items-center md:gap-2 layout-nav md'>
                <Link className={`${activeLink === '/profile' ? 'active' : ''} ${activeLink !== '/profile' ? 'hover:bg-softCharcoal hover:rounded-lg' : ''} text-stoneGray text-base py-2.5 px-4`} href={'/profile'} onClick={() => handleActiveLink('/profile')}>
                        <span>Dashboard</span>
                </Link>
                <Link className={`${activeLink === '/profile/edit-profile' ? 'active' : ''}  ${activeLink !== '/profile/edit-profile' ? 'hover:bg-softCharcoal hover:rounded-lg' : ''} text-stoneGray text-base py-2.5 px-4`} href={'/profile/edit-profile'} onClick={() => handleActiveLink('/profile/edit-profile')}>
                        <span>Edit Profile</span>
                </Link>
                <Link className={`${activeLink === '/profile/data-privacy' ? 'active' : ''}  ${activeLink !== '/profile/data-privacy' ? 'hover:bg-softCharcoal hover:rounded-lg' : ''}  text-stoneGray text-base py-2.5 px-4`} href={'/profile/data-privacy'} onClick={() => handleActiveLink('/profile/data-privacy')}>
                        <span>Data & Privacy</span>
                </Link>
                <Link className={`${activeLink === '/profile/security' ? 'active' : ''}  ${activeLink !== '/profile/security' ? 'hover:bg-softCharcoal hover:rounded-lg' : ''}  text-stoneGray text-base py-2.5 px-4`} href={'/profile/security'} onClick={() => handleActiveLink('/profile/security')}>
                        <span>Security</span>
                </Link>
            </div>
        </>
    );
};

export default LayoutNav;
