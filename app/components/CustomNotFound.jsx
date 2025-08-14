"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

// components
import AuthRegHeader from "./AuthRegHeader"
import Button from "./Button"
import Footer from "./Footer"

const CustomNotFound = () => {
    const [url, setUrl] = useState('/')
    const pathname = usePathname()


    // Map route names to pretty display names with spaces & capitalization
    const prettyNames = {
        login: "Login",
        signup: "Sign Up",
        about: "About",
        contact: "Contact",
        profile: "Profile",
        chat: "Forum",
    }

    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

    const getPrettyName = (url) => {
        if (url === '/') return 'Home'
        const key = url.slice(1).split('/')[0]
        return prettyNames[key] || capitalize(key)
    }

    useEffect(() => {
        let pageName;

        switch (true) {
            case pathname === '/':
                pageName = '/';
                break;
            case pathname.startsWith('/forgot-email'):
                pageName = '/login';
                break;
            case pathname.startsWith('/projects'):
                pageName = '/';
                break;
            case pathname.startsWith('/profile'):
                pageName = '/profile/my-profile';
                break;
            case pathname.startsWith('/forum'):
                pageName = '/chat';
                break;
            default:
                const pages = ['login', 'signup', 'forgot-email', 'about', 'contact', 'projects', 'profile', 'chat'];
                const matched = pages.find(page => pathname.startsWith('/' + page));
                pageName = matched ? '/' + matched : '/';
        }

        setUrl(pageName);
    }, [pathname]);



    const page = getPrettyName(url);
    const isAuthPage = (page === 'Login' || page === 'Sign Up' || page === 'Forgot-email');
    const isProjectPage = pathname.startsWith('/projects')

    const bgClass = isAuthPage ? 'bg-softGray' : 'bg-nightSky';
    const btnClass = isAuthPage ? 'bg-goldenOchre' : 'bg-charcoalGray';
    const titleClass = isAuthPage ? 'text-nightSky' : 'text-goldenOchre';


    return (
        <div className={bgClass}>
            <div className='min-h-[100dvh] flex flex-col'>
                <AuthRegHeader 
                  pageNotFound={true} 
                />
                <div className="main-container flex-grow flex items-center justify-center">
                    <main className="flex flex-col items-center justify-center text-center">
                        <h2 className={`font-semibold text-[26px] md:text-[28px] ${titleClass}`}>Page Not Found</h2>
                        <p className="text-lg leading-normal mt-2">The {isProjectPage ? 'project' : 'page'} you&apos;re looking for doesn&apos;t exist or has been moved.</p>
                        <Link href={url}>
                            <Button
                                className={`py-3 px-5 rounded-lg text-cloudGray mt-5 ${btnClass}`}
                                textStyles='font-bold'
                                text={`Back to ${getPrettyName(url)}`}
                            />
                        </Link>
                    </main>
                </div>
<Footer />

            </div>
        </div>
    )
}

export default CustomNotFound