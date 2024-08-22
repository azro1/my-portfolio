"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import ProfileAvatar from "./ProfileAvatar";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";

// custom hooks
import { useFetchUser } from '@/app/hooks/useFetchUser';
import { useFetchProfile } from '@/app/hooks/useFetchProfile';


const ProfileHeader = ({ title, subheading, showAvatar }) => {
   const [first_name, setFirstName] = useState('');
   const [bio, setBio] = useState('');
   const [avatar_url, setAvatarUrl] = useState('');
   const [isProfileLoading, setIsProfileLoading] = useState(true);

   // custom hooks
   const { user, isLoading } = useFetchUser(true)
   const { profile, fetchProfile } = useFetchProfile()

   const supabase = createClientComponentClient()





   useEffect(() => {
     if (user) {
       fetchProfile(user)
     }
   }, [user])

   




   useEffect(() => {
      if (profile) {
         setIsProfileLoading(false)
         setFirstName(profile.first_name || user.user_metadata.full_name || '')
         setAvatarUrl(profile.avatar_url)
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
      <>
         {user && user.app_metadata.provider !== "email" ? (

            <div className='flex-1 p-4 pt-6 bg-cloudGray'>
               <h2 className='subheading font-b'>{title}</h2>
               <p className='mt-4 leading-normal'>{subheading}</p>

               {showAvatar && (
                  <div className='mt-6'>
                     <div className='flex items-center gap-1 bg-frostWhite p-4'>
                        {avatar_url ? (
                           <div className="border-2 border-cloudGray rounded-full overflow-hidden p-1 w-fit">
                              <img className="inline-block w-20 h-20 object-cover" src={avatar_url} alt="a user avatar" />
                           </div>
                        )  : (
                           <div className="rounded-full border-2 border-cloudGray overflow-hidden p-1 w-fit ">
                              <FaUserCircle size={80} color="gray" />
                           </div>
                        )} 
                        {!loading && (
                           <div className='pl-2 flex-1 min-w-0'>
                              <p className='text-nightSky font-b'>{first_name}</p>
                              <p className='whitespace-normal break-words'>{bio ? `${bio}` : `"Add your Bio"`}</p>
                           </div>
                        )}
                     </div>
                  </div>
               )}
            </div>
         )
            :
         (
            <div className='flex-1 p-4 pt-6 bg-cloudGray'>
               <h2 className='subheading font-b'>{title}</h2>
               <p className='mt-4 leading-normal'>{subheading}</p>

               {showAvatar && (
                  <div className='mt-6'>
                     <div className='flex items-center gap-1 bg-frostWhite p-4'>
                        <div className='border-2 border-cloudGray rounded-full p-1 w-fit'>
                           <ProfileAvatar
                              url={avatar_url}
                              size={'w-20 h-20'}
                              lgSize={'w-20 h-20'}
                              phSize={80}
                           />
                        </div>
                        {!loading && (
                           <div className='pl-2 flex-1 min-w-0'>
                              <p className='text-nightSky text-xl font-b'>Welcome, {first_name}</p>
                              <p className='whitespace-normal break-words pt-1'>{bio ? `${bio}` : `"Add your Bio"`}</p>
                           </div>
                        )}
                     </div>
                  </div>
               )}
            </div>
         )}
      </>
   )
}

export default ProfileHeader
