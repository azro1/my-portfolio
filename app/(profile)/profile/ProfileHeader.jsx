"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import ProfileAvatar from "./ProfileAvatar";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";

// custom hooks
import { useFetchUser } from '@/app/hooks/useFetchUser';


const ProfileHeader = () => {
   // custom hook to fetch user
   const { user, isLoading } = useFetchUser(true)

   const [first_name, setFirstName] = useState(user ? user.user_metadata.full_name : '');
   const [bio, setBio] = useState('');
   const [avatar_url, setAvatarUrl] = useState('');
   const [isProfileLoading, setIsProfileLoading] = useState(true);

   const supabase = createClientComponentClient();


   // get user profile
   useEffect(() => {
      async function getProfile() {

         try {
            const { data, error } = await supabase
               .from('profiles')
               .select()
               .eq('id', user.id)
               .limit(1)

            if (error) {
               throw new Error(error.message);
            }

            if (data && data.length > 0) {
               const profileData = data[0];
               setFirstName(profileData.first_name || user.user_metadata.full_name);
               setBio(profileData.bio);
               setAvatarUrl(profileData.avatar_url);
            } else {
               setFirstName(user.user_metadata.full_name);
            }
         } catch (error) {
            console.log(error.message);
         } finally {
            setIsProfileLoading(false)
         }
      }
      if (user && user.id) {
         getProfile();
      }
   }, [user && user.id])

   const loading = isLoading || isProfileLoading;



   return (
      <>
         {user && user.app_metadata.provider !== "email" ? (
            <div className='flex-1 text-center'>

               <div className='flex flex-col items-center gap-6'>
                  <div className='flex flex-col items-center gap-3'>

                     {loading ? (
                        <div className='overflow-hidden w-20 h-20'>
                           <img src="../images/loading/loader.gif" alt="a loading gif" />
                        </div>
                     ) : (
                        <>
                           {avatar_url ? (
                              <div className='border-2 border-hint shadow-outer rounded-full p-2'>
                                 <div className="overflow-hidden rounded-full w-20 h-20">
                                    <img className="inline-block w-full h-full object-cover" src={avatar_url} alt="a user avatar" />
                                 </div>
                              </div>

                           ) : (
                              <div className="overflow-hidden rounded-full min-w-max h-auto">
                                 <FaUserCircle size={80} color="gray" />
                              </div>
                           )}
                        </>
                     )}

                     <h2 className='profile-mainheading font-b text-hint'>{`Hi, ${first_name}`}</h2>
                     {isProfileLoading ? (
                           <></>
                        ) : (
                           <>
                               {!isProfileLoading && bio ? (
                                 <p className='text-base text-secondary'>{`"${bio}"`}</p>
                              ) : (
                                 <p className='text-base text-secondary'>"Add a Bio"</p>
                              )}
                           </>
                        )}
                  </div>

                  <div>
                     <p className='text-lg'>This is your Profile section. Here you can view and edit your recent activity, update your personal information, view your data and personalize your account settings.</p>
                  </div>
               </div>

            </div>
         )
            :
         (
            <div className='flex-1 text-center'>

               <div className='flex flex-col items-center gap-6'>
                  <div className='flex flex-col items-center gap-3'>

                  {loading ? (
                     <div className='overflow-hidden w-20 h-20'>
                        <img src="../images/loading/loader.gif" alt="a loading gif" />
                     </div>
                  ) : (
                     <div className='border-2 border-hint shadow-outer rounded-full p-2'>
                        <ProfileAvatar
                           url={avatar_url}
                           size={'w-20 h-20'}
                           lgSize={'w-20 h-20'}
                           phSize={80}
                        />
                     </div>
                  )}


                     <h2 className='profile-mainheading'>{`Hi, ${first_name}`}</h2>
                     {isProfileLoading ? (
                        <></>
                     ) : (
                        <>
                              {!isProfileLoading && bio ? (
                              <p className='text-base text-secondary'>{`"${bio}"`}</p>
                           ) : (
                              <p className='text-base text-secondary'>"Add a Bio"</p>
                           )}
                        </>
                     )}
                  </div>

                  <div>
                     <p className='text-lg'>This is your Profile section. Here you can view and edit your recent activity, update your personal information, view your data and personalize your account settings.</p>
                  </div>
               </div>

            </div>
         )}
      </>
   )
}

export default ProfileHeader
