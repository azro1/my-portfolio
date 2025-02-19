"use client"

import Link from "next/link"
import Image from "next/image"

// hooks
import { useBlockNavOnOtp } from "../hooks/useBlockNavOnOtp";

const AuthRegHeader = ({ storageKey, message }) => {
    const { handleBlockNav } = useBlockNavOnOtp(storageKey, message);

    return (
        <header className='bg-nightSky w-full min-h-[90px] flex items-center z-40'>
            <div className='max-w-screen-xl w-full px-6 mx-auto'>
                <main>
                    <Link href='/' onClick={(e) => handleBlockNav(e)}>
                        <Image
                            className='cursor-pointer'
                            src={'/images/my_logo.svg'}
                            alt="Navigate to home page"
                            width={50}
                            height={50}
                            priority
                            quality={100}
                        />
                    </Link>
                </main>
            </div>
        </header>
    )
}

export default AuthRegHeader
