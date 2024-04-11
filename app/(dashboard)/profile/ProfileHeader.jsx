"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";

const ProfileHeader = ({ user }) => {
    const [first_name, setFirstName] = useState('');

    const supabase = createClientComponentClient();

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
     <div className="">
 
         {user && user.user_metadata.full_name ? ( 
             <h2 className="subheading text-hint text-center">{user.user_metadata.full_name}'s Profile page</h2>
         )
       :
         (
             <h2 className="subheading text-hint text-center mr-8">{first_name}'s Profile page</h2>
         )}
 
     </div>
  )
}

export default ProfileHeader
