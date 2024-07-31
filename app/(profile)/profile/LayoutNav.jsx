"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// icons
import { FaUserCircle, FaLock } from "react-icons/fa";
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
            <div className='min-h-52 md:min-h-0 md:hidden layout-nav max-w-max flex flex-col gap-2'>
                <Link className={`${activeLink === '/profile' ? 'active' : ''} flex-1 flex items-center gap-3 p-2.5 pr-4 bg-nightSky text-stoneGray text-base`} href={'/profile'} onClick={() => handleActiveLink('/profile')}>
                        <FaUserCircle className='text-accentRed' size={20} />
                        <span>Dashboard</span>
                </Link>
                <Link className={`${activeLink === '/profile/edit-profile' ? 'active' : ''} flex-1 flex items-center gap-3 p-2.5  bg-nightSky text-stoneGray text-base`} href={'/profile/edit-profile'} onClick={() => handleActiveLink('/profile/edit-profile')}>
                        <HiMiniIdentification className='text-accentRed' size={20} />
                        <span>Edit Profile</span>
                </Link>
                <Link className={`${activeLink === '/profile/security' ? 'active' : ''} flex-1 flex items-center gap-3 p-2.5  bg-nightSky text-stoneGray text-base`} href={'/profile/security'} onClick={() => handleActiveLink('/profile/security')}>
                        <FaLock className='text-accentRed' size={20} />
                        <span>Security</span>
                </Link>
                <Link className={`${activeLink === '/profile/data-privacy' ? 'active' : ''} flex-1 flex items-center gap-3 p-2.5 bg-nightSky text-stoneGray text-base`} href={'/profile/data-privacy'} onClick={() => handleActiveLink('/profile/data-privacy')}>
                        <span>Data & Privacy</span>
                </Link>
            </div>

       
            <div className='min-h-0 md:min-h-12 hidden md:flex md:flex-row md:items-center md:gap-2 layout-nav'>
                <Link className={`${activeLink === '/profile' ? 'active' : ''} ${activeLink !== '/profile' ? 'hover:bg-softCharcoal hover:rounded-lg' : ''} flex items-center gap-3 text-stoneGray text-base py-2.5 px-4`} href={'/profile'} onClick={() => handleActiveLink('/profile')}>
                        <FaUserCircle className='text-accentRed' size={20} />
                        <span>Dashboard</span>
                </Link>
                <Link className={`${activeLink === '/profile/edit-profile' ? 'active' : ''}  ${activeLink !== '/profile/edit-profile' ? 'hover:bg-softCharcoal hover:rounded-lg' : ''} flex items-center gap-3 text-stoneGray text-base py-2.5 px-4`} href={'/profile/edit-profile'} onClick={() => handleActiveLink('/profile/edit-profile')}>
                        <HiMiniIdentification className='text-accentRed' size={20} />
                        <span>Edit Profile</span>
                </Link>
                <Link className={`${activeLink === '/profile/security' ? 'active' : ''}  ${activeLink !== '/profile/security' ? 'hover:bg-softCharcoal hover:rounded-lg' : ''} flex items-center gap-3 text-stoneGray text-base py-2.5 px-4`} href={'/profile/security'} onClick={() => handleActiveLink('/profile/security')}>
                        <FaLock className='text-accentRed' size={20} />
                        <span>Security</span>
                </Link>
                <Link className={`${activeLink === '/profile/data-privacy' ? 'active' : ''}  ${activeLink !== '/profile/data-privacy' ? 'hover:bg-softCharcoal hover:rounded-lg' : ''}  text-stoneGray text-base py-2.5 px-4`} href={'/profile/data-privacy'} onClick={() => handleActiveLink('/profile/data-privacy')}>
                        <span>Data & Privacy</span>
                </Link>
            </div>
        </>
    );
};

export default LayoutNav;
