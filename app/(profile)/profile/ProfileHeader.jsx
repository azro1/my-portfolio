"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import ProfileAvatar from "./ProfileAvatar";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";


const ProfileHeader = () => {
   const [user, setUser] = useState(null);
   const [first_name, setFirstName] = useState(user ? user.user_metadata.full_name : '');
   const [bio, setBio] = useState('');
   const [avatar_url, setAvatarUrl] = useState('');
   const [isUserLoading, setIsUserLoading] = useState(true);
   const [isProfileLoading, setIsProfileLoading] = useState(true);


   const supabase = createClientComponentClient();

   useEffect(() => {
      async function getUser() {
         try {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
               throw new Error(error.message);
            }
            if (user) {
               setUser(user);
            }
         } catch (error) {
            console.log(error.massage);
         } finally {
            setIsUserLoading(false)
         }
      }
      getUser();
   }, []);


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

   const isLoading = isUserLoading || isProfileLoading;



   return (
      <>
         {user && user.app_metadata.provider !== "email" ? (
            <div className='flex-1 text-center'>

               <div className='flex flex-col items-center gap-6 p-8'>
                  <div className='flex flex-col items-center gap-3'>

                     {isLoading ? (
                        <div className='overflow-hidden w-20 h-20'>
                           <img src="images/navbar/avatar/loader.gif" alt="a loading gif" />
                        </div>
                     ) : (
                        <>
                           {avatar_url ? (
                              <div className="overflow-hidden rounded-full w-20 h-20">
                                 <img className="inline-block w-full h-full object-cover" src={avatar_url} alt="a user avatar" />
                              </div>
                           ) : (
                              <div className="overflow-hidden rounded-full min-w-max h-auto">
                                 <FaUserCircle size={80} color="gray" />
                              </div>
                           )}
                        </>
                     )}

                     <h2 className='subheading text-hint'>{`Hi, ${first_name}`}</h2>
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

               <div className='flex flex-col items-center gap-6 p-8'>
                  <div className='flex flex-col items-center gap-3'>

                  {isLoading ? (
                     <div className='overflow-hidden w-20 h-20'>
                        <img src="images/navbar/avatar/loader.gif" alt="a loading gif" />
                     </div>
                  ) : (
                     <>
                     <ProfileAvatar
                        url={avatar_url}
                        size={'w-20 h-20'}
                        lgSize={'w-20 h-20'}
                        phSize={80}
                     />
                     </>
                  )}


                     <h2 className='subheading text-hint'>{`Hi, ${first_name}`}</h2>
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
