"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import Avatar from "@/app/components/Avatar";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";



const NavbarAvatar = ({ user }) => {
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
                    setAvatarUrl(profileData.avatar_url || user.user_metadata.avatar_url);
                } else {
                    setFirstName(user.user_metadata.full_name);
                    setAvatarUrl(user.user_metadata.avatar_url);
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
    }, [user]);
 


    return (
        <div>
            {isProfileLoading ? (
                <div className="flex flex-col items-center gap-1">
                    <div className="overflow-hidden w-12 h-12">
                        <img src="../../images/loading/loader.gif" alt="a loading gif" />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <div className="overflow-hidden rounded-full relative w-14 h-14 ">
                        {avatar_url ? (
                            avatar_url.startsWith("http") ? ( 
                                /* Absolute URLs (e.g., third-party avatars or signed URLs) */
                                <Image
                                    className="w-full h-full object-cover"
                                    src={avatar_url}
                                    alt="User avatar"
                                    fill
                                    sizes="(max-width: 480px) 40px, (max-width: 768px) 60px, (max-width: 1024px) 80px, 100px"
                                    quality={100}
                                    priority
                                />
                            ) : (
                                /* Handle signed URLs if further processing is required */
                                <Avatar
                                    url={avatar_url}
                                    size="w-14 h-14"
                                    lgSize="w-14 h-14"
                                    phSize={50}
                                />
                            )
                        ) : (
                            /* Placeholder for when no avatar exists */
                            <div className="w-fit rounded-full justify-self-center">
                              <FaUserCircle size={50} color="gray" />

                            </div>
                        )}
                    </div>
                    <h6 className="font-os text-sm font-b mt-1 text-saddleBrown">{first_name}</h6>
                </div>
            )}
        </div>


    );
};

export default NavbarAvatar;
