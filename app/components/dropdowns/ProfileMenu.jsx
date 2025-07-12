"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation';


const ProfileMenu = ({ handleLogout, handleCloseMenu, isOpen }) => {
    const pathName = usePathname()

    const topLinks = [
        { href: '/profile/my-profile', label: 'Profile' },
    ];

    const middleLinks = [
        { href: '/profile/edit-profile', label: 'Edit Profile' },
        { href: '/profile/account', label: 'Account' },
    ];

    const bottomLinks = [
        { href: '/chat', label: 'Forum' },
        { href: '/profile/help', label: 'Help' },
    ];

    const isMyProfilePage = pathName.includes('/my-profile');
    const isEditProfilePage = pathName.includes('/edit-profile');
    const isAccountPage = pathName.includes('/account');
    const isHelpPage = pathName.includes('/help');
    const isChatPage = pathName.includes('/chat');

    return (
        <>
            {isOpen && (
                <div className='profile-menu'>

                    {topLinks.map((link) => {
                        if (link.href === '/profile/my-profile' && !isMyProfilePage) {
                            return (
                                <Link key={link.href} href={link.href} >
                                    <div className='flex items-center p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray md:p-2.5 md:border-none' onClick={handleCloseMenu}>
                                        <span className='text-base font-r text-stoneGray'>{link.label}</span>
                                    </div>
                                </Link>
                            )
                        }
                        return null;
                    })}   

                    
                    {middleLinks.map(link => {
                        if ((link.href === '/profile/edit-profile' && !isEditProfilePage) ||
                            (link.href === '/profile/account' && !isAccountPage)) {
                            return (
                                <Link key={link.href} href={link.href}>
                                    <div className='flex items-center p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray md:p-2.5 md:border-none' onClick={handleCloseMenu}>
                                        <span className='text-base font-r text-stoneGray'>{link.label}</span>
                                    </div>
                                </Link>
                            );
                        }
                        return null;
                    })}
           

                    {bottomLinks.map(link => {
                    if ((link.href === '/chat' && !isChatPage) ||
                        (link.href === '/profile/help' && !isHelpPage) ) {
                        return (
                        <Link key={link.href} href={link.href}>
                            <div className='flex items-center p-3 pl-4 border-b-[1px] border-opacity-30 border-dashed border-ashGray md:p-2.5 md:border-none' onClick={handleCloseMenu}>
                                <span className='text-base font-r text-stoneGray'>{link.label}</span>
                            </div>
                        </Link>
                        );
                    }
                    return null;
                    })}

                    <div onClick={(e) => handleLogout(e)}>
                        <div className='flex items-center p-3 pl-4 md:p-2.5 md:border-none' onClick={handleCloseMenu}>
                            <span className='text-base font-r text-stoneGray md:text-stoneGray'>Logout</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProfileMenu
