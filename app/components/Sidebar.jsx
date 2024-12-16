"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import {
  FaUserPlus,
  FaHome,
  FaInfoCircle,
  FaPhoneAlt,
  FaUser,
  FaSignOutAlt,
  FaQuestionCircle,
  
} from 'react-icons/fa';
import { IoChatbubbleEllipses } from "react-icons/io5";


// components
import Card from "./Card";




const Sidebar = () => {
  const [user, setUser] = useState(null)
  const [activeLink, setActiveLink] = useState('');

  const pathName = usePathname()
  const router = useRouter()

  
  
  const supabase = createClientComponentClient();
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      }
    });
    return () => {
      if (authListener && typeof authListener.unsubscribe === 'function') {
        authListener.unsubscribe();
      }
    };
  }, [supabase]);







  useEffect(() => {
      setActiveLink(pathName)
  }, [pathName])

  const handleActiveLink = (href) => {
      if (href) {
        setActiveLink(href);
      }
  };

  const handleLogout = async () => {
    const supabase = createClientComponentClient()
    const {error} = await supabase.auth.signOut()

    if (!error) {
      setUser(null);
      router.push('/login')
      router.refresh()
    }

    if (error) {
      console.log(error)
    }
  }
  
  return (
    <div className='hidden xl:inline-block min-w-[60px] h-full items-center z-50'>

        <div className="h-full top-0 fixed z-50 cursor-pointer bg-softCharcoal border-r-[1px] border-midnightSlate sidebar">
            <div className="h-full flex flex-col ">

                {/* <Link href="/">
                    <div className="p-20 flex flex-col items-center">
                        <Card values={'shadow-3xl pt-1.5 px-4 pb-0.5 rounded-xl bg-deepCharcoal'}>
                            <h2 className='mainheading font-eb text-saddleBrown'>
                                Port<span className="text-stoneGray">folio</span>
                            </h2>
                        </Card>
                    </div>
                    <div className='bg-nightSky h-[3px]'></div>
                </Link> */}
<div className='pt-[53px]'></div>
<div className='bg-midnightSlate mx-2 h-[1px]'></div>

                <nav className="flex-1">
                  <ul className='flex flex-col '>
                    {!user && (
                      <li className={`m-2 p-3 max-h-12 hover:bg-midnightSlate/40 transtion-bg duration-300 rounded-md ${activeLink === '/signup' ? 'bg-midnightSlate' : ''}`}>
                        <Link href={'/signup'} onClick={() => handleActiveLink('/signup')}>
                            <div className='flex items-center gap-3'>
                              <div className="flex items-center">
                                <FaUserPlus className="icon text-saddleBrown" size={24} />
                              </div>

                              <div className="flex items-center content-container">
                                <span className="text-base font-medium text-stoneGray w-max">Register</span>
                              </div>
                            </div>
                        </Link> 
                      </li>
                    )}
                    <div className='bg-midnightSlate mx-2 h-[1px]'></div>
                    <li className={`m-2 mb-0 p-3 max-h-12 hover:bg-midnightSlate/40 transtion-bg duration-300 rounded-md ${activeLink === '/' ? 'bg-midnightSlate' : ''}`}>
                        <Link href={'/'} onClick={() => handleActiveLink('/')}>
                            <div className='flex items-center gap-3'>
                              <div className="flex items-center">
                                <FaHome className="icon text-saddleBrown" size={23} />
                              </div>

                              <div className="flex items-center content-container">
                                <span className="text-base font-medium text-stoneGray">Home</span>
                              </div>
                            </div>
                        </Link> 
                    </li>
                    <li className={`m-2 mb-0 p-3 max-h-12 hover:bg-midnightSlate/40 transtion-bg duration-300 rounded-md ${activeLink === '/about' ? 'bg-midnightSlate' : ''}`}>
                        <Link href={'/about'} onClick={() => handleActiveLink('/about')}>
                            <div className='flex items-center gap-3'>
                              <div className="flex items-center">
                                <FaInfoCircle className="icon text-saddleBrown" size={20} />
                              </div>

                              <div className="flex items-center content-container">
                                <span className="text-base font-medium text-stoneGray">About</span>
                              </div>
                            </div>
                        </Link> 
                    </li>
                    <li className={`m-2 mb-0 p-3 max-h-12 hover:bg-midnightSlate/40 transtion-bg duration-300 rounded-md ${activeLink === '/contact' ? 'bg-midnightSlate' : ''}`}>
                        <Link href={'/contact'} onClick={() => handleActiveLink('/contact')}>
                            <div className='flex items-center gap-3'>
                              <div className="flex items-center">
                                <FaPhoneAlt className="icon text-saddleBrown" size={20} />
                              </div>

                              <div className="flex items-center content-container">
                                <span className="text-base font-medium text-stoneGray">Contact</span>
                              </div>
                            </div>
                        </Link> 
                    </li>
                    {user && (
                      <li className={`m-2 mb-0 p-3 max-h-12 hover:bg-midnightSlate/40 transtion-bg duration-300 rounded-md ${activeLink === '/profile' ? 'bg-midnightSlate' : ''}`}>
                        <Link href={'/profile'} onClick={() => handleActiveLink('/profile')}>
                            <div className='flex items-center gap-3'>
                              <div className="flex items-center">
                                <FaUser className="icon text-saddleBrown" size={21} />
                              </div>

                              <div className="flex items-center content-container">
                                <span className="text-base font-medium text-stoneGray">Profile</span>
                              </div>
                            </div>
                        </Link> 
                      </li>
                    )}
                    {user && (
                      <li className={`m-2 mb-0 p-3 max-h-12 hover:bg-midnightSlate/40 transtion-bg duration-300 rounded-md ${activeLink === '/chat' ? 'bg-midnightSlate' : ''}`}>
                        <Link href={'/chat'} onClick={() => handleActiveLink('/chat')}>
                            <div className='flex items-center gap-3'>
                              <div className="flex items-center">
                                <IoChatbubbleEllipses className="icon text-saddleBrown" size={21} />
                              </div>

                              <div className="flex items-center content-container">
                                <span className="text-base font-medium text-stoneGray">Chatroom</span>
                              </div>
                            </div>
                        </Link> 
                      </li>
                    )}
                    <li className={`m-2 p-3 max-h-12 hover:bg-midnightSlate/40 transtion-bg duration-300 rounded-md ${activeLink === '/help' ? 'bg-midnightSlate' : ''}`}>
                        <Link href={'/help'} onClick={() => handleActiveLink('/help')}>
                            <div className='flex items-center gap-3'>
                              <div className="flex items-center">
                                <FaQuestionCircle className="icon text-saddleBrown" size={21} />
                              </div>

                              <div className="flex items-center content-container">
                                <span className="text-base font-medium text-stoneGray">Help</span>
                              </div>
                            </div>
                        </Link> 
                    </li>

                    <div className='bg-midnightSlate mx-2 h-[1px]'></div>

                    {user && (
                      <div className='m-2 mb-0 p-3 max-h-12 hover:bg-midnightSlate/40 transtion-bg duration-300 rounded-md' onClick={handleLogout}>
                        <div className='flex items-center gap-3'>
                          <div className="flex items-center">
                            <FaSignOutAlt className="icon text-saddleBrown" size={23} />
                          </div>

                          <div className="flex items-center content-container">
                            <span className="text-base font-medium text-stoneGray">Logout</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </ul>
                </nav>

            </div>

        </div>

    </div>
  )
}

export default Sidebar
