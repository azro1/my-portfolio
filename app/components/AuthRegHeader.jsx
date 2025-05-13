"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

// components
import Chevron from "./Chevron"

const AuthRegHeader = () => {
    const pathname = usePathname();

    const routes = [
        '/verify-signup-otp',
        '/verify-login-otp',
        '/verify-forgot-email-otp',
        '/upload-avatar',
        '/register-form'
    ];

    const links = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    const protectedRoutes = routes.some(route => pathname.includes(route));

    return (
        <header className='flex items-center bg-softCharcoal w-full min-h-[92px] fixed z-40 md:static'>
            <div className='max-w-screen-xl mx-auto flex-1 flex items-center justify-between px-4'>
                <Link href={`${protectedRoutes ? '#' : '/'}`}>
                    <Image
                        className='cursor-pointer'
                        src={'/images/logo.svg'}
                        alt="Navigate to home page"
                        width={48}
                        height={44}
                        priority
                        quality={100}
                    />
                </Link>
                {!protectedRoutes && (
                    <>
                        <div className='flex items-center md:hidden'>
                            <Chevron
                                isAuthPage={true}
                            />
                        </div>
                
                        <ul className='hidden md:flex items-center gap-8'>
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







