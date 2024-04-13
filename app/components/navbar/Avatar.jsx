"use client"

// Avatar.jsx
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import ProfileAvatar from "@/app/(profile)/profile/ProfileAvatar";

const Avatar = ({ user }) => {
    const [first_name, setFirstName] = useState('');
    const [avatar_url, setAvatarUrl] = useState('');

    const supabase = createClientComponentClient();

    useEffect(() => {
        const channel = supabase.channel('realtime profile').on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'profiles'
        }, (payload) => {
  
             if (payload) {
                setFirstName((prevFirstName) => {
                    return prevFirstName ? payload.new.first_name : prevFirstName
                })

                setAvatarUrl((prevAvatar) => {
                    return prevAvatar ? payload.new.avatar_url : prevAvatar
                })
             }
        }).subscribe()
  
        return () => supabase.removeChannel(channel)
      }, [avatar_url])


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
                    setAvatarUrl(profileData.avatar_url);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getProfile();
    }, [avatar_url, first_name]);
 
    return (
        <div>
            {user && user.user_metadata.full_name ? (
                <div className="flex flex-col items-center gap-1 absolute left-0 top-8.625 md:static mr-8">
                    <div className="overflow-hidden rounded-full w-12 h-12">
                        <img className="inline-block w-full h-full object-cover" src={user.user_metadata.avatar_url} alt="a user avatar" />
                    </div>
                    <p className="font-b text-base text-hint">{user.user_metadata.full_name}</p>
                </div>
                )
            :
               (
                <div className="flex flex-col items-center gap-1 absolute left-0 top-8.625 md:static mr-8">
                   <div className="overflow-hidden rounded-full w-14 h-14">
                    <ProfileAvatar
                        url={avatar_url}
                        size={150}
                        onUpload={(url) => {
                            setAvatarUrl(url);
                        }}
                    />
                  </div>
                    <p className="font-b text-base text-hint">{first_name}</p>
                </div>
            )}

        </div>
    );
};

export default Avatar;


