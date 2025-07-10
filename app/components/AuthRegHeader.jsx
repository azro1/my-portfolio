"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

// components
import Chevron from "./Chevron"
import Logo from "./Logo"

const AuthRegHeader = () => {
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
            <div className='max-w-screen-xl mx-auto flex-1 flex items-center justify-between px-[x-pad]'>
                <Link href={`${protectedRoutes ? '#' : '/'}`}>
                    <div className='cursor-pointer md:hidden'>
                      <Logo />
                    </div>
                    <div className='hidden cursor-pointer md:block'>
                      <Logo size={50} />
                    </div>
                </Link>
                {!protectedRoutes && (
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
        </header>
    )
}

export default AuthRegHeader







