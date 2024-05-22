"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from "react";
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

// components
import ProfileHeader from "./ProfileHeader";
import ProjectsViewedList from './ProjectsViewedList';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [first_name, setFirstName] = useState(user ? user.user_metadata.full_name : '');
  const [avatar_url, setAvatarUrl] = useState('');
  const [comments, setComments] = useState(null);

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
               .select('*, comments(*)')
               .eq('id', user.id)
              
              if (error) {
                throw new Error(error.message);
              }
              
              if (data && data.length > 0) {
                const profileData = data[0];
                setFirstName(profileData.first_name || user.user_metadata.full_name);
                setAvatarUrl(profileData.avatar_url);

                if (data[0].comments && data[0].comments.length > 0) {
                   setComments(data[0].comments)
                }
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
  }, [avatar_url, first_name, user && user.id])

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
        
        <div className='text-center mt-10 gap-3 lg:flex'>
    
            <ProjectsViewedList user={user} />

            <div className='flex-1'>
              <h3 className='row-start-1 col-span-2 mb-3 text-xl font-b font-rubik text-hint'>Comments</h3>
              <div className='flex flex-col gap-5 text-left'>
                  {comments ? (comments.map((comment) => (
                    <div className='flex items-start justify-between gap-3 pt-2' key={comment.id}>
                      <div>
                          <p>{comment.text}</p>
                          <span className='text-xs text-hint'>{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
                      </div>
                        <button className='btn bg-hint'>Delete</button>

                    </div>
                  ))) :
                    <p className='text-center'>No comments yet.</p>
                  }
              </div>
            </div>

        </div>
    </div>
  );
};

export default Profile;
