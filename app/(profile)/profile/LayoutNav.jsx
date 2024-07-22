"use client"

import Link from 'next/link';
import { useState } from 'react';

const Nav = () => {
    const [activeLink, setActiveLink] = useState('/profile')

    const handleActiveLink = (herf) => {
        setActiveLink(herf)
    }

    return (
        <div className='flex items-center gap-2 mb-20 layout-nav'>
            <Link className={`${activeLink === '/profile' ? 'active' : ''} ${activeLink !== '/profile' ? 'hover:bg-lightshade hover:rounded-lg' : ''} text-secondary text-base py-2.5 px-4`} href={'/profile'}
                onClick={() => handleActiveLink('/profile')}>
                <span >
                    Dashboard
                </span>
            </Link>
            <Link className={`${activeLink === '/profile/edit-profile' ? 'active' : ''}  ${activeLink !== '/profile/edit-profile' ? 'hover:bg-lightshade hover:rounded-lg' : ''} text-secondary text-base py-2.5 px-4`} href={'/profile/edit-profile'} onClick={() => handleActiveLink('/profile/edit-profile')}>
                <span >
                    Edit Profile
                </span>
            </Link>
            <Link className={`${activeLink === '/profile/data-privacy' ? 'active' : ''}  ${activeLink !== '/profile/data-privacy' ? 'hover:bg-lightshade hover:rounded-lg' : ''}  text-secondary text-base py-2.5 px-4`} href={'/profile/data-privacy'} onClick={() => handleActiveLink('/profile/data-privacy')}>
                <span >
                    Data & Privacy
                </span>
            </Link >
            <Link
                className={`${activeLink === '/profile/security' ? 'active' : ''}  ${activeLink !== '/profile/security' ? 'hover:bg-lightshade hover:rounded-lg' : ''}  text-secondary text-base py-2.5 px-4`} href={'/profile/security'}
                onClick={() => handleActiveLink('/profile/security')}>
                <span >
                    Security
                </span>
            </Link >
        </div >
    )
}

export default Nav
