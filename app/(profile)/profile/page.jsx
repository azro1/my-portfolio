"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from "react";

// components
import ProfileHeader from "./ProfileHeader";
import ProjectsViewedList from './ProjectsViewedList';
import CommentList from './CommentList';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [first_name, setFirstName] = useState(user ? user.user_metadata.full_name : '');
  const [avatar_url, setAvatarUrl] = useState('');
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUser() {
      setIsUserLoading(true)
      try {
        const {data: { user }, error} = await supabase.auth.getUser();
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
            setIsProfileLoading(true)

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
      <div>
        <ProfileHeader
          user={user}
          isLoading={isLoading} 
          avatar_url={avatar_url} 
          first_name={first_name}
        />

        <div className='mt-16'>
            <h2 className='text-center text-2xl font-b font-rubik text-secondary'>Activity Feed</h2>
        </div>
        
        <div className='flex flex-col gap-8 text-center mt-10  lg:flex-row lg:gap-3'>
            <ProjectsViewedList user={user} />
            <CommentList user={user} />
        </div>
    </div>
  );
};

export default Profile;
