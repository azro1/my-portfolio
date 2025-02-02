"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import Image from 'next/image';

// components
import Avatar from "../../components/Avatar";

// custom hooks
import { useFetchUser } from '@/app/hooks/useFetchUser';
import { useFetchProfile } from '@/app/hooks/useFetchProfile';
import { useMessage } from '@/app/hooks/useMessage';


const ProfileHeader = ({ title, subheading, showAvatar }) => {
   const [first_name, setFirstName] = useState('');
   const [bio, setBio] = useState('');
   const [avatar_url, setAvatarUrl] = useState('');
   const [isProfileLoading, setIsProfileLoading] = useState(true);

   // custom hooks
   const { user, isLoading } = useFetchUser(true)
   const { profile, fetchProfile } = useFetchProfile()
   const { changeMessage } = useMessage();

   const supabase = createClientComponentClient()


   useEffect(() => {
      const fetchProfileResult = async () => {
         if (user) {
            const profileResult = await fetchProfile(user);
            if (!profileResult) {
               changeMessage('error', "Sorry, we couldn't load some of your profile information at this time. Please check your internet connection or refresh the page. If the issuse persist, contact support.");
               return
            }
         }
      }
      fetchProfileResult()
   }, [user])

   
   useEffect(() => {
      if (profile) {
         setIsProfileLoading(false)
         setFirstName(profile.first_name || user.user_metadata.name || '')
         setAvatarUrl(profile.avatar_url || user.user_metadata.avatar_url || '')
         setBio(profile.bio)
      }
   }, [profile])



   // realtime subscription for profiles
   useEffect(() => {
      const channel = supabase.channel('realtime profiles').on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'profiles'
      }, (payload) => {
        if (payload) {
          setFirstName(prevFirstName => payload.new.first_name);
          setAvatarUrl(prevAvatar_url => payload.new.avatar_url);
          setBio(prevBio => payload.new.bio)
        }
      }).subscribe()
  
      return () => supabase.removeChannel(channel)
    }, [supabase])



   const loading = isLoading || isProfileLoading;
   
   return (
      <div className='pt-16'>
            <h2 className='subheading font-b text-cloudGray'>{title}</h2>
            <p className='mt-4 leading-normal text-cloudGray'>{subheading}</p>

            {showAvatar && (
               <div className='mt-6 h-[480px] bg-softCharcoal'>
                  <div className='flex items-center gap-1 p-4'>
                        {loading ? (
                           <div className='w-20 h-20 bg-nightSky rounded-full overflow-hidden flex items-center justify-center'>
                              <img
                                 src="../images/loading/loader.gif"
                                 className='w-16 h-16'
                                 alt="Loading avatar"
                              />
                           </div>
                        ) : avatar_url ? (
                           avatar_url.startsWith("http") ? (
                              <div className="border-2 border-cloudGray rounded-full overflow-hidden p-1 relative w-20 h-20">
                                 <Image 
                                    className="object-cover" 
                                    src={avatar_url} 
                                    alt="a user avatar"
                                    fill
                                    sizes="(max-width: 480px) 40px, (max-width: 768px) 60px, (max-width: 1024px) 80px, 100px"
                                    quality={100}
                                    priority
                                 />
                              </div>
                           ) : (
                              <div className='border-2 border-cloudGray rounded-full p-1 w-fit'>
                                 <Avatar
                                    url={avatar_url}
                                    size={'w-20 h-20'}
                                    lgSize={'w-20 h-20'}
                                    phSize={80}
                                 />
                              </div>
                           )
                        ) : (
                           <FaUserCircle size={80} color="gray" />
                        )}
                     
                     {!loading && (
                        <div className='pl-2 min-w-0'>
                           <p className='text-stoneGray text-2xl font-b'>Welcome, {first_name}</p>
                           <p className='whitespace-normal break-words pt-1'>
                              {bio ? <span className='text-cloudGray'>{bio}</span> : `"Add your Bio"`}
                           </p>
                        </div>
                     )}
                  </div>
               </div>
            )}
         </div>
   )
}

export default ProfileHeader
