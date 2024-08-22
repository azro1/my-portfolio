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
            <div className='min-h-52 md:min-h-0 md:hidden max-w-max flex flex-col gap-2 layout-nav sm'>
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

       
            <div className='hidden md:flex md:flex-row  md:gap-2 layout-nav md bg-frostWhite'>
                <div className="flex p-3 w-full">
                    <div className='flex bg-cloudGray  w-full'>
                        <Link className={`${activeLink === '/profile' ? 'active' : ''} flex items-center justify-center text-stoneGray text-base w-28 border-r-4 border-frostWhite`} href={'/profile'} onClick={() => handleActiveLink('/profile')}>
                                <span>Dashboard</span>
                        </Link>
                        <Link className={`${activeLink === '/profile/edit-profile' ? 'active' : ''} w-28 flex items-center justify-center text-stoneGray text-base p-2 border-r-4 border-frostWhite `} href={'/profile/edit-profile'} onClick={() => handleActiveLink('/profile/edit-profile')}>
                                <span>Edit Profile</span>
                        </Link>
                        <Link className={`${activeLink === '/profile/data-privacy' ? 'active' : ''} min-w-28 flex items-center justify-center text-stoneGray text-base p-2 border-r-4 border-frostWhite `} href={'/profile/data-privacy'} onClick={() => handleActiveLink('/profile/data-privacy')}>
                                <span>Your Data</span>
                        </Link>
                    </div>

                </div>

            </div>
        </>
    );
};

export default LayoutNav;
