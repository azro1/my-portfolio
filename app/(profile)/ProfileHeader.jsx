"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from "react";
import Image from 'next/image';

// components
import UserAvatar from '@/app/components/navbar/UserAvatar';
import Heading from '../components/Heading';

// custom hooks
import { useFetchUser } from '@/app/hooks/useFetchUser';
import { useFetchProfile } from '@/app/hooks/useFetchProfile';
import { useMessage } from '@/app/hooks/useMessage';


const ProfileHeader = ({ title, subheading, showAvatar }) => {
   const [first_name, setFirstName] = useState('');
   const [bio, setBio] = useState('');
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
   }, [user, changeMessage, fetchProfile])


   useEffect(() => {
      if (profile) {
         setIsProfileLoading(false)
         setFirstName(profile.first_name || user.user_metadata.name || '')
         setBio(profile.bio)
      }
   }, [profile, user])



   // realtime subscription for profiles
   useEffect(() => {
      const channel = supabase.channel('realtime profiles').on('postgres_changes', {
         event: '*',
         schema: 'public',
         table: 'profiles'
      }, (payload) => {
         if (payload) {
            setFirstName(prevFirstName => payload.new.first_name);
            setBio(prevBio => payload.new.bio)
         }
      }).subscribe()

      return () => supabase.removeChannel(channel)
   }, [supabase])



   const loading = isLoading || isProfileLoading;

   return (
      <div>
         <Heading className='text-1.375 md:text-2xl font-medium text-cloudGray'>
            {title}
         </Heading>
         <p className='mt-4 leading-normal text-charcoalGrayLight'>{subheading}</p>

         {showAvatar && (
            <div className='mt-6 min-h-[480px] bg-softCharcoal'>
               <div className='flex items-start gap-1 p-4 xl:items-center'>

                  {loading ? (
                     <>
                        <div className='w-16 h-16 rounded-full overflow-hidden flex items-center justify-center md:hidden'>
                           <Image
                              width={64}
                              height={64}
                              src="/images/loading/loader.gif"
                              alt="A rotating loading animation on a transparent background"
                           />
                        </div>

                        <div className='hidden w-20 h-20 md:flex items-center justify-center bg-softCharcoal rounded-full overflow-hidden'>
                           <Image
                              width={80}
                              height={80}
                              src="/images/loading/loader.gif"
                              alt="A rotating loading animation on a transparent background"
                           />
                        </div>   
                     </>
                  ) : (
                        <div className='min-w-[64px] md:min-w-[80px]'>
                           <div className='hidden md:block'>
                              <UserAvatar
                                 user={user}
                                 width={80}
                                 height={80}
                                 maxWidth={'max-w-[80px]'}
                                 maxHeight={'max-h-[80px]'}
                                 defaultAvatarSize={80}
                              />
                           </div>

                           <div className='md:hidden'>
                              <UserAvatar
                                 user={user}
                                 width={64}
                                 height={64}
                                 maxWidth={'max-w-[64px]'}
                                 maxHeight={'max-h-[64px]'}
                                 defaultAvatarSize={64}
                              />
                           </div>
                        </div>
                  )}

                  {!loading && (
                     <div className='pl-2 min-w-0'>
                        <Heading className='font-b text-goldenOchre text-2xl md:text-3xl '>
                            Welcome, {first_name}
                        </Heading>
                        <p className='whitespace-normal break-words pt-1'>
                           {bio ? <span className='text-cloudGray leading-normal'>{bio}</span> : <span className='text-ashGray '>Add a brief description about yourself here. You can update this in Edit Profile.</span>}
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
