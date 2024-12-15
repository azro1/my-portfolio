"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import {
  FaUserPlus,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
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

        <div className="h-full top-0 fixed z-50 cursor-pointer bg-softCharcoal sidebar border-r-[1px] border-midnightSlate">
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
<div className='pt-[53px] '></div>
<div className='bg-midnightSlate mx-2 h-[1px]'></div>

                <nav className="flex-1">
                  <ul className='flex flex-col '>
                    {!user && (
                      <li className={`m-2 p-3 hover:bg-midnightSlate/40 transtion-bg duration-300 rounded-md ${activeLink === '/signup' ? 'bg-midnightSlate' : ''}`}>
                        <Link href={'/signup'} onClick={() => handleActiveLink('/signup')}>
                            <div className='flex gap-3'>
                              <div className="icon-container ">
                                <FaUserPlus className="icon text-saddleBrown" size={22} />
                              </div>

                              <div className="content-container">
                                <span className="text-base font-medium text-stoneGray w-max">Register</span>
                              </div>
                            </div>
                        </Link> 
                      </li>
                    )}
                    <div className='bg-midnightSlate mx-2 h-[1px]'></div>
                    <li className={`m-2 mb-0 p-3 hover:bg-midnightSlate/40 transtion-bg duration-300 rounded-md ${activeLink === '/' ? 'bg-midnightSlate' : ''}`}>
                        <Link href={'/'} onClick={() => handleActiveLink('/')}>
                            <div className='flex gap-3'>
                              <div className="icon-container ">
                                <FaHome className="icon text-saddleBrown" size={22} />
                              </div>

                              <div className="content-container">
                                <span className="text-base font-medium text-stoneGray">Home</span>
                              </div>
                            </div>
                        </Link> 
                    </li>
                    <li className={`m-2 mb-0 p-3 hover:bg-midnightSlate/40 transtion-bg duration-300 rounded-md ${activeLink === '/about' ? 'bg-midnightSlate' : ''}`}>
                        <Link href={'/about'} onClick={() => handleActiveLink('/about')}>
                            <div className='flex gap-3'>
                              <div className="icon-container ">
                                <FaInfoCircle className="icon text-saddleBrown" size={22} />
                              </div>

                              <div className="content-container">
                                <span className="text-base font-medium text-stoneGray">About</span>
                              </div>
                            </div>
                        </Link> 
                    </li>
                    <li className={`m-2 mb-0 p-3 hover:bg-midnightSlate/40 transtion-bg duration-300 rounded-md ${activeLink === '/contact' ? 'bg-midnightSlate' : ''}`}>
                        <Link href={'/contact'} onClick={() => handleActiveLink('/contact')}>
                            <div className='flex gap-3'>
                              <div className="icon-container ">
                                <FaEnvelope className="icon text-saddleBrown" size={22} />
                              </div>

                              <div className="content-container">
                                <span className="text-base font-medium text-stoneGray">Contact</span>
                              </div>
                            </div>
                        </Link> 
                    </li>
                    {user && (
                      <li className={`m-2 mb-0 p-3 hover:bg-midnightSlate/40 transtion-bg duration-300 rounded-md ${activeLink === '/profile' ? 'bg-midnightSlate' : ''}`}>
                        <Link href={'/profile'} onClick={() => handleActiveLink('/profile')}>
                            <div className='flex gap-3'>
                              <div className="icon-container ">
                                <FaUser className="icon text-saddleBrown" size={22} />
                              </div>

                              <div className="content-container">
                                <span className="text-base font-medium text-stoneGray">Profile</span>
                              </div>
                            </div>
                        </Link> 
                      </li>
                    )}
                    {user && (
                      <li className={`m-2 mb-0 p-3 hover:bg-midnightSlate/40 transtion-bg duration-300 rounded-md ${activeLink === '/chat' ? 'bg-midnightSlate' : ''}`}>
                        <Link href={'/chat'} onClick={() => handleActiveLink('/chat')}>
                            <div className='flex gap-3'>
                              <div className="icon-container ">
                                <IoChatbubbleEllipses className="icon text-saddleBrown" size={22} />
                              </div>

                              <div className="content-container">
                                <span className="text-base font-medium text-stoneGray">Chatroom</span>
                              </div>
                            </div>
                        </Link> 
                      </li>
                    )}
                    <li className={`m-2 p-3 hover:bg-midnightSlate/40 transtion-bg duration-300 rounded-md ${activeLink === '/help' ? 'bg-midnightSlate' : ''}`}>
                        <Link href={'/help'} onClick={() => handleActiveLink('/help')}>
                            <div className='flex gap-3'>
                              <div className="icon-container ">
                                <FaQuestionCircle className="icon text-saddleBrown" size={22} />
                              </div>

                              <div className="content-container">
                                <span className="text-base font-medium text-stoneGray">Help</span>
                              </div>
                            </div>
                        </Link> 
                    </li>

                    <div className='bg-midnightSlate mx-2 h-[1px]'></div>

                    {user && (
                      <div className='m-2 mb-0 p-3 hover:bg-midnightSlate/40 transtion-bg duration-300 rounded-md' onClick={handleLogout}>
                        <div className='flex gap-3'>
                          <div className="icon-container ">
                            <FaSignOutAlt className="icon text-saddleBrown" size={22} />
                          </div>

                          <div className="content-container">
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
