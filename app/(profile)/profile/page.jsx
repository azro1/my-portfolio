"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";


// components
import ProfileHeader from "./ProfileHeader";
import ProfileAvatar from './ProfileAvatar';

const Profile = () => {
  const [first_name, setFirstName] = useState('');
  const [avatar_url, setAvatarUrl] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUser() {
      setIsLoading(true)
      try {
        const {data: { user }, error} = await supabase.auth.getUser();
        if (error) {
          throw new Error(error.message);
        }
        if (user) {
          setIsLoading(false)
          setUser(user);
        }
      } catch (error) {
          setIsLoading(false)
          console.log(error.massage);
      } finally {
          setIsLoading(false)
      }
    }
    getUser();
  }, []);





  // get user profile, activity and comments
  useEffect(() => {
      async function getProfile() {
          setIsLoading(true)

          try {
              const { data: profile, error: profilesError } = await supabase.from('profiles')
               .select('*, comments(*), activity(*)')
               .eq('id', user.id) 
              
              if (profilesError) {
                throw new Error(profilesError.message);
              }
              
              if (profile && profile.length > 0) {
                setIsLoading(false)
                const profileData = profile[0];

                setFirstName(profileData.first_name);
                setAvatarUrl(profileData.avatar_url);

                // map through the array of projects a user has viewed which is currently an array of strings and parse them into numbers which can then be used to reference/fetch the projects matching those ids (which are stored in supabase column of type int8) which will be returned to be displayed in the template 
                const projectIds = profileData.activity.map(activity => activity.project_id)
                const projectIdsInt = projectIds.map(id => parseInt(id));



                // get project views
                const { data, error } = await supabase.from('projects')
                .select()
                .in('id', projectIdsInt)
                
                if (error) {
                    console.log(error)
                } else {
                    console.log(data)
                }



              }



              
          } catch (error) {
              setIsLoading(false)
              console.log(error.message);
          } finally {
              setIsLoading(false)
          }

      }
      if (user && user.id) {
        getProfile();
    }
  }, [avatar_url, first_name, user && user.id])





  return (
      <div className='bg-gray-800'>
          {user && user.app_metadata.provider !== "email" ? ( 
            <div className='flex-1 flex flex-col items-center gap-3'>

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
                                  <FaUserCircle size={48} color="gray" />
                              </div>
                          )}
                      </>
                  )}

              <ProfileHeader heading={`Hi, ${user.user_metadata.full_name}`} text={"Welcome to your Profile dashboard. Get started by personalizing your account settings and exploring our features."} />
            </div>
         )
       :
         (
          <div className='flex-1 flex flex-col items-center gap-3'>
             <ProfileAvatar
                url={avatar_url}
                onUpload={(url) => {
                    setAvatarUrl(url);
                }}
                size={'h-20 w-20'}
                phSize={80}

             />
             <ProfileHeader heading={`Hi, ${first_name}`} text={"Welcome to your Profile dashboard. Get started by personalizing your account settings and exploring our features."} />
          </div>
         )}
         
         <div className='grid grid-cols-2 text-center mt-16 bg-red-900'>
            <h3 className='mb-4 text-2xl font-b font-rubik text-hint'>
               Project views
            </h3>
            <div className='p-20 bg-green-800'></div>
         </div>
     </div>
  );
};

export default Profile;
