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
  FiPhone,
  FiArrowLeft,
  FiArrowRight
} from 'react-icons/fi';



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
  const [isOpen, setIsOpen] = useState(false);

  const pathName = usePathname()
  const supabase = createClientComponentClient();




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
      console.log('Sidebar Subscription status:', status);
    });
    return () => supabase.removeChannel(channel)
  }, [user, supabase])





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





  // function to toggle sidebar
  const handleToggleSidebar = () => {
     setIsOpen(!isOpen);
  }







  if (loading) {
    return (
      <div className={`w-full box-border xl:inline-block ${isOpen ? 'xl:w-[300px]' : 'xl:w-[64px]'} xl:h-screen xl:min-h-[768px]`}>
        <div className='sidebar-content fixed bg-nightSky min-h-[92px] flex items-center md:justify-end xl:h-full xl:overflow-y-scroll xl:hide-scrollbar  xl:items-start xl:justify-center'>

          <div className="ml-8 md:mr-20 xl:ml-0 xl:mr-0 xl:mt-56">
                <Image
                    className="opacity-60"
                    width={32}
                    height={32}
                    src="/images/loading/spinner.svg"
                    alt="A rotating loading animation on a transparent background"
                />
          </div>
        </div>
      </div>
    )
  }




  
  return (
    <div className={`w-full box-border xl:inline-block transition-width duration-200 ease-in delay-100 ${isOpen ? 'xl:w-[300px]' : 'xl:w-[64px]'} xl:h-screen xl:min-h-[768px]`}>


      
      <div className='sidebar-content fixed bg-softCharcoal xl:h-full xl:overflow-y-scroll xl:overflow-x-hidden xl:hide-scrollbar'>

          <div className={`hidden xl:block absolute top-3 cursor-pointer z-10 p-3 ${!isOpen ? 'right-2.5' : 'right-2'}`} onClick={handleToggleSidebar}>
            {isOpen ? (
              <FiArrowLeft className='text-cloudGray' size={22}/>
            ) : (
              <FiArrowRight className='text-cloudGray' size={22}/>
            )}
          </div>

          <nav className="px-[x-pad] flex justify-between md:gap-6 relative xl:px-0 xl:flex-col xl:justify-normal xl:gap-0 xl:min-h-[768px] ">
            
            {/* Large Logo */}
            <div className="hidden xl:flex items-center justify-center py-4 xl:p-10 xl:min-h-[160px]">
              <Link href='/'>
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

            {/* Small Logo */}
            <div className="flex items-center py-4 min-h-[92px] xl:hidden">
              <Link href='/'>
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
            </div>

            {/* hamburger menu for logged out users on mobiles*/}
            {!user && (
              <div className="flex items-center min-h-[92px] md:hidden">
                <Chevron />
              </div>
            )}
            
            <ul className='hidden md:min-h-[92px] md:flex-1 md:flex md:items-center md:justify-end md:gap-8 xl:flex-none xl:flex-col xl:items-stretch xl:justify-start xl:gap-0'>
              <div className='hidden xl:block bg-charcoalGray mx-2 h-[1px]'></div>
              <li className={`group xl:m-2 xl:mb-0 xl:p-3 xl:max-h-12 xl:hover:text-cloudGray rounded-md ${activeLink === '/' && !isOpen ? 'xl:bg-nightSky xl:shadow-sm xl:shadow-goldenOchre' : ''}`} >
                <Link href={'/'} onClick={(e) => {
                  handleActiveLink('/');
                }}>
                  <div className='xl:flex items-center gap-3'>
                    <div className="hidden xl:flex items-center">
                      <FiHome className={`icon ${isOpen ? 'text-goldenOchre' : activeLink === '/' ? 'text-cloudGray' : 'text-stoneGray'}`} size={20} />
                    </div>

                    <div className={`flex items-center transition-opacity duration-200 ease-in delay-100 ${isOpen ? 'xl:opacity-100' : 'xl:opacity-0'}`}>
                      <span className={`text-base transition-text duration-300 group-hover:text-cloudGray ${activeLink === '/' ? 'text-cloudGray' : 'text-stoneGray'}`}>Home</span>
                    </div>
                  </div>
                </Link>
              </li>
              <li className={`group xl:m-2 xl:mb-0 xl:p-3 xl:max-h-12 xl:hover:text-cloudGray rounded-md ${activeLink === '/about' && !isOpen ? 'xl:bg-nightSky xl:shadow-sm xl:shadow-goldenOchre' : ''}`}>
                <Link href={'/about'} onClick={(e) => {
                  handleActiveLink('/about');
                }}>
                  <div className='xl:flex items-center gap-3'>
                    <div className="hidden xl:flex items-center">
                      <FiInfo className={`icon ${isOpen ? 'text-goldenOchre' : activeLink === '/about' ? 'text-cloudGray' : 'text-stoneGray'}`} size={20} />
                    </div>

                    <div className={`flex items-center transition-opacity duration-200 ease-in delay-100 ${isOpen ? 'xl:opacity-100' : 'xl:opacity-0'}`}>
                      <span className={`text-base transition-bg duration-300 group-hover:text-cloudGray ${activeLink === '/about' ? 'text-cloudGray' : 'text-stoneGray'}`}>About</span>
                    </div>
                  </div>
                </Link>
              </li>
              <li className={`group xl:m-2 xl:p-3 xl:max-h-12 xl:hover:text-cloudGray rounded-md ${activeLink === '/contact' && !isOpen ? 'xl:bg-nightSky xl:shadow-sm xl:shadow-goldenOchre' : ''}`}>
                <Link href={'/contact'} onClick={(e) => {
                  handleActiveLink('/contact');
                }}>
                  <div className='xl:flex items-center gap-3'>
                    <div className="hidden xl:flex items-center">
                      <FiPhone className={`icon ${isOpen ? 'text-goldenOchre' : activeLink === '/contact' ? 'text-cloudGray' : 'text-stoneGray'}`} size={20} />
                    </div>

                    <div className={`flex items-center transition-opacity duration-200 ease-in delay-100 ${isOpen ? 'xl:opacity-100' : 'xl:opacity-0'}`}>
                      <span className={`text-base transition-bg duration-300 group-hover:text-cloudGray ${activeLink === '/contact' ? 'text-cloudGray' : 'text-stoneGray'}`}>Contact</span>
                    </div>
                  </div>
                </Link>
              </li>
              <div className='hidden xl:block bg-charcoalGray mx-2 h-[1px]'></div>

              {!user && (
                <li className={`group xl:m-2 xl:mb-0 xl:p-3 xl:max-h-12 xl:hover:text-cloudGray rounded-md ${activeLink === '/login' && !isOpen ? 'xl:bg-nightSky xl:shadow-sm xl:shadow-goldenOchre' : ''}`}>
                  <Link href={'/login'} onClick={() => handleActiveLink('/login')}>
                    <div className='xl:flex items-center gap-3'>
                      <div className="hidden xl:flex items-center">
                        <FiLogIn className={`icon ${isOpen ? 'text-goldenOchre' : activeLink === '/login' ? 'text-cloudGray' : 'text-stoneGray'}`} size={24} />
                      </div>

                      <div className={`flex items-center transition-opacity duration-200 ease-in delay-100 ${isOpen ? 'xl:opacity-100' : 'xl:opacity-0'}`}>
                        <span className={`text-base w-max transition-bg duration-300 group-hover:text-cloudGray ${activeLink === '/login' ? 'text-cloudGray' : 'text-stoneGray'}`}>Login</span>
                      </div>
                    </div>
                  </Link>
                </li>
              )}
              {!user && (
                <li className={`group xl:m-2 xl:p-3 xl:max-h-12 xl:hover:text-cloudGray rounded-md ${activeLink === '/signup' && !isOpen ? 'xl:bg-nightSky xl:shadow-sm xl:shadow-goldenOchre' : ''}`}>
                  <Link href={'/signup'} onClick={() => handleActiveLink('/signup')}>
                    <div className='xl:flex items-center gap-3'>
                      <div className="hidden xl:flex items-center ">
                        <FiUserPlus className={`icon ${isOpen ? 'text-goldenOchre' : activeLink === '/signup' ? 'text-cloudGray' : 'text-stoneGray'}`} size={24} />
                      </div>

                      <div className={`flex items-center transition-opacity duration-200 ease-in delay-100 ${isOpen ? 'xl:opacity-100' : 'xl:opacity-0'}`}>
                        <span className={`text-base w-max transition-bg duration-300 group-hover:text-cloudGray ${activeLink === '/signup' ? 'text-cloudGray' : 'text-stoneGray'}`}>Sign up</span>
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
                      <span className={`hidden text-base text-stoneGray xl:inline transition-opacity duration-200 ease-in delay-100 ${isOpen ? 'xl:opacity-100' : 'xl:opacity-0'}`}>{firstName}</span>
                    ) : (
                      <span className={`hidden text-base text-stoneGray xl:inline transition-opacity duration-200 ease-in delay-100 ${isOpen ? 'xl:opacity-100' : 'xl:opacity-0'}`}>{user?.user_metadata.first_name || user?.user_metadata.full_name}</span>
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
