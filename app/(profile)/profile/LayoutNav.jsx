"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';


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
                <Link className={`${activeLink === '/profile' ? 'active' : ''} w-fit items-center p-2.5 bg-nightSky text-stoneGray text-base`} href={'/profile'} onClick={() => handleActiveLink('/profile')}>
                        <span>Dashboard</span>
                </Link>
                <Link className={`${activeLink === '/profile/edit-profile' ? 'active' : ''} w-fit items-center p-2.5  bg-nightSky text-stoneGray text-base`} href={'/profile/edit-profile'} onClick={() => handleActiveLink('/profile/edit-profile')}>
                        <span>Edit Profile</span>
                </Link>
                <Link className={`${activeLink === '/profile/data-privacy' ? 'active' : ''} w-fit items-center p-2.5 bg-nightSky text-stoneGray text-base`} href={'/profile/data-privacy'} onClick={() => handleActiveLink('/profile/data-privacy')}>
                        <span>Data & Privacy</span>
                </Link>
            </div>

       
            <div className='min-h-0 md:min-h-12 hidden md:flex md:flex-row md:items-center md:gap-2 layout-nav'>
                <Link className={`${activeLink === '/profile' ? 'active' : ''} ${activeLink !== '/profile' ? 'hover:bg-softCharcoal hover:rounded-lg' : ''} flex items-center text-stoneGray text-base py-2.5 px-4`} href={'/profile'} onClick={() => handleActiveLink('/profile')}>
                        <span>Dashboard</span>
                </Link>
                <Link className={`${activeLink === '/profile/edit-profile' ? 'active' : ''}  ${activeLink !== '/profile/edit-profile' ? 'hover:bg-softCharcoal hover:rounded-lg' : ''} flex items-center text-stoneGray text-base py-2.5 px-4`} href={'/profile/edit-profile'} onClick={() => handleActiveLink('/profile/edit-profile')}>
                        <span>Edit Profile</span>
                </Link>
                <Link className={`${activeLink === '/profile/data-privacy' ? 'active' : ''}  ${activeLink !== '/profile/data-privacy' ? 'hover:bg-softCharcoal hover:rounded-lg' : ''}  text-stoneGray text-base py-2.5 px-4`} href={'/profile/data-privacy'} onClick={() => handleActiveLink('/profile/data-privacy')}>
                        <span>Data & Privacy</span>
                </Link>
            </div>
        </>
    );
};

export default LayoutNav;
