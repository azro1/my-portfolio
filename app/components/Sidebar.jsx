"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { 
  FiLogIn, 
  FiUserPlus, 
  FiHome,
  FiInfo, 
  FiPhone, 
  FiHelpCircle, 
  FiUser, 
  FiMessageSquare, 
  FiLogOut,
} from 'react-icons/fi';

// components
import NavbarAvatar from "./navbar/NavbarAvatar";
import Chevron from "./Chevron";



const Sidebar = () => {
  const [user, setUser] = useState(null)
  const [activeLink, setActiveLink] = useState('');
  const [isRegComplete, setIsRegComplete] = useState(null)

  const pathName = usePathname()
  const router = useRouter()

  
  
  const supabase = createClientComponentClient();
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
           
        // registration status so logged in links are not shown until user has completed registering
        const getRegStatus = async() => {
          const { data, error } = await supabase
            .from('profiles')
            .select('is_reg_complete')
            .eq('id', session.user.id)
            .limit(1)
            .single()
    
            if (error) {
              console.log(error)
            } 
    
            if (data) {
              setIsRegComplete(data.is_reg_complete)
            }
        }
        getRegStatus()
      } else {
        setUser(null);
        setIsRegComplete(null);
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
      setIsRegComplete(null);
      document.cookie = "isRegComplete=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      router.push('/login')
      router.refresh()
    }

    if (error) {
      console.log(error)
    }
  }
  
  return (
    <div className='hidden xl:inline-block min-w-[64px] h-full items-center z-40'>

      <div className="h-full top-0 fixed cursor-pointer bg-softCharcoal border-r-[1px] border-midnightSlate sidebar">
        <div className="h-full flex flex-col ">

          <nav className="flex-1 mt-16">
            <ul className='flex flex-col '>
              {!user && (
                <li className={`m-2 mb-0 p-3 max-h-12 hover:bg-midnightSlate/40 transition-bg duration-300 rounded-md ${activeLink === '/login' ? 'bg-midnightSlate' : ''}`}>
                  <Link href={'/login'} onClick={() => handleActiveLink('/login')}>
                    <div className='flex items-center gap-3'>
                      <div className="flex items-center">
                        <FiLogIn className="icon text-saddleBrown" size={24} />
                      </div>

                      <div className="flex items-center content-container">
                        <span className="text-base font-medium text-stoneGray w-max">Login</span>
                      </div>
                    </div>
                  </Link>
                </li>
              )}
              {!user && (
                <li className={`m-2 p-3 max-h-12 hover:bg-midnightSlate/40 transition-bg duration-300 rounded-md ${activeLink === '/signup' ? 'bg-midnightSlate' : ''}`}>
                  <Link href={'/signup'} onClick={() => handleActiveLink('/signup')}>
                    <div className='flex items-center gap-3'>
                      <div className="flex items-center">
                        <FiUserPlus className="icon text-saddleBrown" size={24} />
                      </div>

                      <div className="flex items-center content-container">
                        <span className="text-base font-medium text-stoneGray w-max">Sign up</span>
                      </div>
                    </div>
                  </Link>
                </li>
              )}
              <div className='bg-midnightSlate mx-2 h-[1px]'></div>
              <li className={`m-2 mb-0 p-3 max-h-12 hover:bg-midnightSlate/40 transition-bg duration-300 rounded-md ${activeLink === '/' ? 'bg-midnightSlate' : ''}`}>
                <Link href={'/'} onClick={() => handleActiveLink('/')}>
                  <div className='flex items-center gap-3'>
                    <div className="flex items-center">
                      <FiHome className="icon text-saddleBrown" size={20} />
                    </div>

                    <div className="flex items-center content-container">
                      <span className="text-base font-medium text-stoneGray">Home</span>
                    </div>
                  </div>
                </Link>
              </li>
              <li className={`m-2 mb-0 p-3 max-h-12 hover:bg-midnightSlate/40 transition-bg duration-300 rounded-md ${activeLink === '/about' ? 'bg-midnightSlate' : ''}`}>
                <Link href={'/about'} onClick={() => handleActiveLink('/about')}>
                  <div className='flex items-center gap-3'>
                    <div className="flex items-center">
                      <FiInfo className="icon text-saddleBrown" size={20} />
                    </div>

                    <div className="flex items-center content-container">
                      <span className="text-base font-medium text-stoneGray">About</span>
                    </div>
                  </div>
                </Link>
              </li>
              <li className={`m-2 p-3 max-h-12 hover:bg-midnightSlate/40 transition-bg duration-300 rounded-md ${activeLink === '/contact' ? 'bg-midnightSlate' : ''}`}>
                <Link href={'/contact'} onClick={() => handleActiveLink('/contact')}>
                  <div className='flex items-center gap-3'>
                    <div className="flex items-center">
                      <FiPhone className="icon text-saddleBrown" size={20} />
                    </div>

                    <div className="flex items-center content-container">
                      <span className="text-base font-medium text-stoneGray">Contact</span>
                    </div>
                  </div>
                </Link>
              </li>
              <div className='bg-midnightSlate mx-2 h-[1px]'></div>
            </ul>

            {(user && isRegComplete) && (
              <div className="flex items-center m-2 ml-1 mt-6 mb-0 p-3 max-h-12 hover:bg-midnightSlate/40 transition-bg duration-300 rounded-md">
                <div className='flex items-center gap-3'>
                  <div className="flex items-center">
                    <NavbarAvatar user={user} />
                  </div>

                  <div className="flex items-center gap-2 content-container">
                    <span className="text-base font-medium text-stoneGray">{user?.user_metadata.first_name || user?.user_metadata.full_name}</span>
                    <Chevron user={user} />
                  </div>
                </div>
              </div>)}
          </nav>
        </div>

      </div>

    </div>
  )
}

export default Sidebar
