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


  useEffect(() => {
      const getProfile = async () => {
          setIsLoading(true)
          try {
              const { data, error } = await supabase.from('profiles')
                  .select()
                  .eq("id", user.id)
                  .limit(1);
              if (error) {
                  throw new Error(error.message);
              }
              if (data && data.length > 0) {
                  setIsLoading(false)
                  const profileData = data[0];
                  setFirstName(profileData.first_name);
                  setAvatarUrl(profileData.avatar_url);
              }
          } catch (error) {
              setIsLoading(false)
              console.log(error.message);
          } finally {
            setIsLoading(false)
          }
      };
      if (user && user.id) {
          getProfile();
      }
  }, [avatar_url, first_name, user && user.id]);


  return (
      <>
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
     </>
  );
};

export default Profile;
