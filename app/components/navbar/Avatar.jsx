"use client"

// Avatar.jsx
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import ProfileAvatar from "@/app/(profile)/profile/ProfileAvatar";
import { FaUserCircle } from "react-icons/fa";


const Avatar = ({ user }) => {
    const [first_name, setFirstName] = useState(user ? user.user_metadata.full_name : '');
    const [avatar_url, setAvatarUrl] = useState('');
    const [isProfileLoading, setIsProfileLoading] = useState(true);

    const supabase = createClientComponentClient();
    
    // Subscription to realtime changes on profiles table
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
      }, [])


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
                    setFirstName(profileData.first_name || user.user_metadata.full_name );
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
    }, [avatar_url, first_name, user && user.id]);
 
    return (
        <>
            <div>
                {user && user.app_metadata.provider !== "email" ? (
                    <div className="flex flex-col items-center gap-1 absolute left-0 top-8.625 md:static mr-8">

                        {isProfileLoading ? (
                            <div className='overflow-hidden w-12 h-12'>
                                <img src="images/navbar/avatar/loader.gif" alt="a loading gif" />
                            </div>
                        ) : (
                            <>
                                {avatar_url ? (
                                    <div className="overflow-hidden rounded-full w-12 h-12">
                                        <img className="inline-block w-full h-full object-cover" src={avatar_url} alt="a user avatar" />
                                    </div>
                                ) : (
                                    <div className="overflow-hidden rounded-full min-w-max h-auto">
                                        <FaUserCircle size={48} color="gray" />
                                    </div>
                                )}
                            </>
                        )}

                        {isProfileLoading ? (
                          <div></div>
                        ) : (

                          <h6 className="font-os text-sm font-b text-hint">{first_name}</h6>

                        )}
                    </div>
                )
            :
                (
                    <div className="flex flex-col items-center justify-center gap-1 absolute left-0 top-8.625 md:static mr-8">
                        {isProfileLoading ? (
                            <div className='overflow-hidden w-12 h-12'>
                                <img src="images/navbar/avatar/loader.gif" alt="a loading gif" />
                            </div>
                        ) : (
                            <>
                                <ProfileAvatar
                                    url={avatar_url}
                                    size={'w-12 h-12'}
                                    lgSize={'w-12 h-12'}
                                    phSize={50}
                                />
                            </>
                        )}
                        <h6 className="font-os text-sm font-b text-hint">{first_name}</h6>
                    </div>
                )}
            </div>
        </>
    );
};

export default Avatar;
