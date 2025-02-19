"use client"

import Link from "next/link"
import Image from "next/image"

// hooks
import { useBlockNavOnOtp } from "../hooks/useBlockNavOnOtp";

const AuthRegHeader = ({ storageKey, message }) => {
    const { handleBlockNav } = useBlockNavOnOtp(storageKey, message);

    return (
        <header className='bg-nightSky w-full min-h-[90px] flex items-center z-40'>
            <div className='max-w-screen-xl w-full mx-auto'>
            <div className=' w-max pl-4'>
                <main>
                    <Link href='/' onClick={(e) => handleBlockNav(e)}>
                        <Image
                            className='cursor-pointer'
                            src={'/images/my_logo.svg'}
                            alt="Navigate to home page"
                            width={60}
                            height={60}
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
