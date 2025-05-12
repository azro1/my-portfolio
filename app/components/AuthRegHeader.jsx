"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

const AuthRegHeader = () => {
    const pathname = usePathname();

    const routes = [
        '/verify-signup-otp',
        '/verify-login-otp',
        '/verify-forgot-email-otp',
        '/upload-avatar',
        '/register-form'
    ];

    const protectedRoutes = routes.some(route => pathname.includes(route));
    
    return (
        <header className='flex items-center bg-softCharcoal w-full min-h-[82px] fixed z-40 md:static'>
            <div className='max-w-screen-xl w-full flex-1 h-full mx-auto'>
                <div className='w-max pl-4'>
                    <main>
                        <Link href={`${protectedRoutes ? '#' : '/'}`}>
                            <Image
                                className='cursor-pointer'
                                src={'/images/logo.svg'}
                                alt="Navigate to home page"
                                width={50}
                                height={44}
                                priority
                                quality={100}
                            />
                        </Link>
                    </main>
                </div>
            </div>
        </header>
    )
}

export default AuthRegHeader
