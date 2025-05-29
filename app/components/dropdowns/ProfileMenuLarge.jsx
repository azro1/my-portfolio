"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation';

const ProfileMenuLarge = ({ handleLogout, handleCloseMenu, isProfilePage, isForumPage }) => {
    const pathName = usePathname()

    const topLinks = [
        { href: '/profile/my-profile', label: 'My Profile' },
    ];

    const middleLinks = [
        { href: '/profile/edit-profile', label: 'Edit Profile' },
        { href: '/profile/data-privacy', label: 'Your Data' },
    ];

    const bottomLinks = [
        { href: '/chat', label: 'Forum' },
        { href: '/profile/help', label: 'Help' },
    ];



    const isMyProfilePage = pathName.includes('/my-profile');
    const isEditProfilePage = pathName.includes('/edit-profile');
    const isDataPrivacyPage = pathName.includes('/data-privacy');
    const isHelpPage = pathName.includes('/help');
    const isChatPage = pathName.includes('/chat');


    // sidebar dropdown profile menu
    return (
        <div>
            {!isForumPage && (
                <div className="hidden md:block">

                    {topLinks.map((link) => {
                        if (link.href === '/profile/my-profile' && !isMyProfilePage) {
                            return (
                                <Link key={link.href} href={link.href}>
                                    <div className='flex items-center p-2.5 pl-4 group hover:bg-charcoalGray transition-colors duration-300 xl:hover:bg-softCharcoal' onClick={handleCloseMenu}>
                                        <span className='text-base text-stoneGray font-light xl:font-r xl:text-charcoalGrayLight group-hover:text-cloudGray transition-colors duration-300'>{link.label}</span>
                                    </div>
                                </Link>
                            )
                        }
                        return null;
                    })}

               
                    {middleLinks.map(link => {
                    if ((link.href === '/profile/edit-profile' && !isEditProfilePage) ||
                        (link.href === '/profile/data-privacy' && !isDataPrivacyPage) ) {
                        return (
                        <Link key={link.href} href={link.href}>
                            <div className='flex items-center p-2.5 pl-4 group hover:bg-charcoalGray transition-colors duration-300 xl:hover:bg-softCharcoal' onClick={handleCloseMenu}>
                            <span className='text-base text-stoneGray font-light xl:font-r xl:text-charcoalGrayLight group-hover:text-cloudGray transition-colors duration-300'>{link.label}</span>
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
                            <div className='flex items-center p-2.5 pl-4 group hover:bg-charcoalGray transition-colors duration-300 xl:hover:bg-softCharcoal' onClick={handleCloseMenu}>
                            <span className='text-base text-stoneGray font-light xl:font-r xl:text-charcoalGrayLight group-hover:text-cloudGray transition-colors duration-300'>{link.label}</span>
                            </div>
                        </Link>
                        );
                    }
                    return null;
                    })}


                    <div onClick={(e) => handleLogout(e)}>
                        <div className='flex items-center p-2.5 pl-4 cursor-pointer group hover:bg-charcoalGray transition-colors duration-300 xl:hover:bg-softCharcoal' onClick={handleCloseMenu}>
                            <span className='text-base text-stoneGray font-light xl:font-r xl:text-charcoalGrayLight group-hover:text-cloudGray transition-colors duration-300'>Logout</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
 
    )
}

export default ProfileMenuLarge
