"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

// components
import Chevron from "./Chevron"
import Logo from "./Logo"

const AuthRegHeader = ({ pageNotFound }) => {
    const pathname = usePathname();

    const routes = [
        '/verify-signup-otp',
        '/verify-login-otp',
        '/verify-forgot-email-otp',
        '/upload-avatar',
        '/register-form',
        '/verify-email-otp',
        '/verify-phone-otp',
    ];

    const protectedRoutes = routes.some(route => pathname.includes(route));


    const isSignup = pathname.includes('/signup');
    const authUrl = isSignup ? '/login' : '/signup';
    const authLabel = isSignup ? 'Log In' : 'Sign Up';

    const links = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
        ...(pathname.includes('login') || pathname.includes('signup') || pathname.includes('forgot-email')
            ? [{ href: authUrl, label: authLabel }]
            : [])
    ];


    return (
        <header className='flex items-center bg-softCharcoal w-full py-4 fixed z-40 md:static'>
            <div className='flex-1 max-w-[1200px] uw:max-w-screen-xl mx-auto px-[x-pad]'>
                <div className='flex items-center justify-between'>
                    {protectedRoutes ? (
                        <>
                            <div className="pointer-events-none md:hidden">
                                <Logo />
                            </div>
                            <div className="pointer-events-none hidden md:block">
                                <Logo size={50} />
                            </div>
                        </>
                    ) : (
                        <Link href="/">
                            <div className="cursor-pointer flex items-center">
                                <div className="md:hidden">
                                    <Logo />
                                </div>
                                <div className="hidden md:block">
                                    <Logo size={50} />
                                </div>
                            </div>
                        </Link>
                    )}

                    {(!protectedRoutes && !pageNotFound) && (
                        <>
                            <div className='flex items-center md:hidden'>
                                <Chevron />
                            </div>
                    
                            <ul className='hidden md:flex items-center gap-8 mr-2 xl:mr-0'>
                                {links.map((link) => (
                                    <li key={link.href}> 
                                        <Link href={link.href}>
                                            <span className='text-base transition-text duration-300 text-stoneGray hover:text-cloudGray'>{link.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>      
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default AuthRegHeader







