"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from "next/image";

import { 
  FiLogIn, 
  FiUserPlus, 
  FiHome,
  FiInfo, 
  FiPhone
} from 'react-icons/fi';

// hooks
import { useBlockNavOnOtp } from "../hooks/useBlockNavOnOtp";

// components
import UserAvatar from "./navbar/UserAvatar";
import Chevron from "./Chevron";



const Sidebar = ({ isProfilePage }) => {
  const [user, setUser] = useState(null)
  const [activeLink, setActiveLink] = useState('');
  const [isRegComplete, setIsRegComplete] = useState(null)
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const pathName = usePathname()
  const supabase = createClientComponentClient();

  const { handleBlockNav } = useBlockNavOnOtp('hasVisitedProfileOtpPage', 'Please complete verification before you leave');



   // realtime subscription to display sidebar data
  useEffect(() => {
    if (!user) return;

    const channel = supabase.channel('realtime-profiles').on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'profiles'
    }, (payload) => {
      if (payload) {
        // console.log(payload)
        setFirstName((prevFirstName) => payload.new.first_name)
        setAvatarUrl((prevAvatarUrl) => payload.new.avatar_url)
      }
    }).subscribe((status) => {
      console.log('Subscription status:', status);
    });
    return () => supabase.removeChannel(channel)
  }, [user])





  useEffect(() => {
    const fetchUserData = async () => {

      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('is_reg_complete')
          .eq('id', user.id)
          .single();

        if (error) {
          console.log(error);
        } else {
          setIsRegComplete(data?.is_reg_complete);
        }
      } else {
        setIsRegComplete(null);
      }

      setLoading(false);
    };

    fetchUserData();
  }, [supabase]);

  





  useEffect(() => {
      setActiveLink(pathName)
  }, [pathName])

  const handleActiveLink = (href) => {
      if (href) {
        setActiveLink(href);
      }
  };







  if (loading) {
    return (
      <div className='w-full box-border xl:inline-block xl:w-[300px] xl:min-w-[300px] xl:h-screen xl:min-h-[768px]'>
        <div className="sidebar-content  fixed bg-softCharcoal  min-h-[113px] md:flex md:items-center md:justify-end xl:h-full xl:overflow-y-scroll xl:hide-scrollbar  xl:items-start xl:justify-center ">

          <div className="hidden md:block  mr-20 xl:mr-0 xl:mt-56">
            <img className="w-8 opacity-60" src="/images/loading/spinner.svg" alt="" />
          </div>
        </div>
      </div>
    )
  }


  
  return (
    <div className='w-full box-border xl:inline-block xl:w-[300px] xl:min-w-[300px] xl:h-screen xl:min-h-[768px]'>
      <div className="sidebar-content fixed bg-softCharcoal xl:h-full xl:overflow-y-scroll xl:hide-scrollbar ">

          <nav className="px-[x-pad] flex justify-between md:gap-6 relative xl:px-0 xl:flex-col xl:justify-normal xl:gap-0 xl:min-h-[768px] ">
            {/* Code Dynamics Logo */}
            <div className="flex items-center justify-center py-4 xl:p-10">
              <Link href='/' onClick={(e) => handleBlockNav(e)}>
                <Image
                  className='cursor-pointer'
                  src={'/images/my_logo.svg'}
                  alt="Navigate to home page"
                  width={80}
                  height={80}
                  priority
                  quality={100}
                />
              </Link>
            </div>

            {/* hamburger menu for logged out users on mobiles*/}
            {!user && <div className="flex items-center md:hidden">
              <Chevron />
            </div>}
            
            <ul className='hidden md:flex-1 md:flex md:items-center md:justify-end md:gap-8 xl:flex-none xl:flex-col xl:items-stretch xl:justify-start xl:gap-0'>
              <div className='hidden xl:block bg-charcoalGray mx-2 h-[1px]'></div>
              <li className={`xl:m-2 xl:mb-0 xl:p-3 xl:max-h-12 xl:hover:bg-nightSky transition-bg duration-300 xl:rounded-md ${activeLink === '/' ? 'xl:bg-slateOnyx' : ''}`}>
                <Link href={'/'} onClick={(e) => {
                  handleActiveLink('/');
                  handleBlockNav(e);
                }}>
                  <div className='xl:flex items-center gap-3'>
                    <div className="hidden xl:flex items-center">
                      <FiHome className="icon text-saddleBrown" size={20} />
                    </div>

                    <div className="flex items-center">
                      <span className={`text-base ${activeLink === '/' ? 'text-cloudGray font-medium xl:text-stoneGray' : ''}`}>Home</span>
                    </div>
                  </div>
                </Link>
              </li>
              <li className={`xl:m-2 xl:mb-0 xl:p-3 xl:max-h-12 xl:hover:bg-nightSky transition-bg duration-300 xl:rounded-md ${activeLink === '/about' ? 'xl:bg-slateOnyx' : ''}`}>
                <Link href={'/about'} onClick={(e) => {
                  handleActiveLink('/about');
                  handleBlockNav(e);
                }}>
                  <div className='xl:flex items-center gap-3'>
                    <div className="hidden xl:flex items-center">
                      <FiInfo className="icon text-saddleBrown" size={20} />
                    </div>

                    <div className="flex items-center">
                      <span className={`text-base ${activeLink === '/about' ? 'text-cloudGray font-medium xl:text-stoneGray' : ''}`}>About</span>
                    </div>
                  </div>
                </Link>
              </li>
              <li className={`xl:m-2 xl:p-3 xl:max-h-12 xl:hover:bg-nightSky transition-bg duration-300 xl:rounded-md ${activeLink === '/contact' ? 'xl:bg-slateOnyx' : ''}`}>
                <Link href={'/contact'} onClick={(e) => {
                  handleActiveLink('/contact');
                  handleBlockNav(e);
                }}>
                  <div className='xl:flex items-center gap-3'>
                    <div className="hidden xl:flex items-center">
                      <FiPhone className="icon text-saddleBrown" size={20} />
                    </div>

                    <div className="flex items-center">
                      <span className={`text-base ${activeLink === '/contact' ? 'text-cloudGray font-medium xl:text-stoneGray' : ''}`}>Contact</span>
                    </div>
                  </div>
                </Link>
              </li>
              <div className='hidden xl:block bg-slateOnyx mx-2 h-[1px]'></div>

              {!user && (
                <li className={`xl:m-2 xl:mb-0 xl:p-3 xl:max-h-12 xl:hover:bg-nightSky transition-bg duration-300 xl:rounded-md ${activeLink === '/auth/login' ? 'xl:bg-slateOnyx' : ''}`}>
                  <Link href={'/auth/login'} onClick={() => handleActiveLink('/auth/login')}>
                    <div className='xl:flex items-center gap-3'>
                      <div className="hidden xl:flex items-center">
                        <FiLogIn className="icon text-saddleBrown" size={24} />
                      </div>

                      <div className="flex items-center">
                        <span className={`text-base w-max ${activeLink === '/auth/login' ? 'text-cloudGray font-medium xl:text-stoneGray' : ''}`}>Login</span>
                      </div>
                    </div>
                  </Link>
                </li>
              )}
              {!user && (
                <li className={`xl:m-2 xl:p-3 xl:max-h-12 xl:hover:bg-nightSky transition-bg duration-300 xl:rounded-md ${activeLink === '/auth/signup' ? 'xl:bg-slateOnyx' : ''}`}>
                  <Link href={'/auth/signup'} onClick={() => handleActiveLink('/auth/signup')}>
                    <div className='xl:flex items-center gap-3'>
                      <div className="hidden xl:flex items-center">
                        <FiUserPlus className="icon text-saddleBrown" size={24} />
                      </div>

                      <div className="flex items-center">
                        <span className={`text-base w-max ${activeLink === '/auth/signup' ? 'text-cloudGray font-medium xl:text-stoneGray' : ''}`}>Sign up</span>
                      </div>
                    </div>
                  </Link>
                </li>
              )}
            </ul>
            
            {(user && isRegComplete) && (
              <div className="flex items-center xl:m-2 xl:ml-1 xl:mt-6 xl:mb-0 xl:p-3 xl:max-h-12 xl:rounded-md">
                
                <div className='flex items-center gap-2'>
                  <div className="hidden md:flex items-center gap-2">

                    <div className="min-w-[32px] min-h-[32px]">
                      <UserAvatar 
                          user={user}
                          avatarUrl={avatarUrl}
                          width={32}
                          height={32}
                          maxWidth={'max-w-[32px]'}
                          maxHeight={'max-h-[32px]'}
                          defaultAvatarSize={32}
                      />
                    </div>
                    {firstName ? (
                      <span className="hidden text-base font-medium text-stoneGray xl:inline">{firstName}</span>
                    ) : (
                      <span className="hidden text-base font-medium text-stoneGray xl:inline">{user?.user_metadata.first_name || user?.user_metadata.full_name}</span>
                    )}
                  </div>
                   
                  <div className="flex items-center gap-2">
                    <Chevron user={user} isProfilePage={isProfilePage} />
                  </div>
                </div>

              </div>)}
          </nav>
        </div>

      </div>
  )
}

export default Sidebar
