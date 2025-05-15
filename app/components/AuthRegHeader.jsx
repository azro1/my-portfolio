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
            <div className='max-w-screen-xl mx-auto flex-1 flex items-center justify-between px-[x-pad]'>
                <Link href={`${protectedRoutes ? '#' : '/'}`}>
                    <Image
                        className='cursor-pointer md:hidden'
                        src={'/images/logo.svg'}
                        alt="SS Logo that navigates to homepage"
                        width={42}
                        height={42}
                        priority
                        quality={100}
                    />
                    <Image
                        className='hidden cursor-pointer md:block'
                        src={'/images/logo.svg'}
                        alt="SS Logo that navigates to homepage"
                        width={52}
                        height={52}
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
                
                        <ul className='hidden md:flex items-center gap-8 mr-2 xl:mr-0'>
                            {links.map((link) => (
                                <li key={link.href}> 
                                    <Link href={link.href}>
                                        <span className='text-base transition-text duration-300 text-cloudGray'>{link.label}</span>
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







