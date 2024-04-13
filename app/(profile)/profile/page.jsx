"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from "react";

// components
import ProfileHeader from "./ProfileHeader";

const Profile = () => {
  const [first_name, setFirstName] = useState('');
  const [user, setUser] = useState(null);

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUser() {
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
      }
    }
    getUser();
  }, []);


  useEffect(() => {
      const getProfile = async () => {
          try {
              const { data, error } = await supabase.from('profiles')
                  .select()
                  .eq("id", user.id)
                  .limit(1);
              if (error) {
                  throw new Error(error.message);
              }
              if (data && data.length > 0) {
                  const profileData = data[0];
                  setFirstName(profileData.first_name);
              }
          } catch (error) {
              console.log(error.message);
          }
      };
      if (user && user.id) {
          getProfile();
      }
  }, [first_name, user && user.id]);


  return (
      <>
          {user && user.user_metadata.full_name ? ( 
            <div className='subheading text-white text-center flex-1'>
              <ProfileHeader heading={user.user_metadata.full_name} text={"Welcome to your Profile. Here you can manage your info and update your details"} />
            </div>
         )
       :
         (
          <div className='subheading text-white text-center flex-1'>
             <ProfileHeader heading={`Hi, ${first_name}`} text={"Welcome to your Profile dashboard. Get started by personalizing your account settings and exploring our features."} />
          </div>
         )}
     </>
  );
};

export default Profile;
