"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import Avatar from "@/app/components/Avatar";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Image from "next/image";



const NavbarAvatar = ({ user }) => {
    const [first_name, setFirstName] = useState(user ? user.user_metadata.full_name : '');
    const [avatar_url, setAvatarUrl] = useState('');
    const [isProfileLoading, setIsProfileLoading] = useState(true);

    const router = useRouter();
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
            router.refresh();
            getProfile();
        }
    }, [avatar_url, first_name, user && user.id, router]);
 
    return (
        <>
            <div>
                {user && user.app_metadata.provider !== "email" ? (
                    <div className="flex flex-col items-center gap-1 absolute left-0 top-8.625 md:static mr-8">

                        {isProfileLoading ? (
                            <div className='overflow-hidden w-12 h-12'>
                                <img src="../../images/loading/loader.gif" alt="a loading gif" />
                            </div>
                        ) : (
                            <>
                                {avatar_url ? (
                                    <div className="overflow-hidden rounded-full relative w-12 h-12">
                                        <Image 
                                            className="w-full h-full object-cover" 
                                            src={avatar_url} 
                                            alt="a user avatar"
                                            fill
                                            sizes="(max-width: 480px) 40px, (max-width: 768px) 60px, (max-width: 1024px) 80px, 100px"
                                            quality={100}
                                            priority
                                        />
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

                          <h6 className="font-os text-sm font-b text-saddleBrown">{first_name}</h6>

                        )}
                    </div>
                )
            :
                (
                    <div className="flex flex-col items-center justify-center gap-1 absolute left-0 top-8.625 md:static mr-8">
                        {isProfileLoading ? (
                            <div className='overflow-hidden w-12 h-12'>
                                <img src="../../images/loading/loader.gif" alt="a loading gif" />
                            </div>
                        ) : (
                            <>
                                <Avatar
                                    url={avatar_url}
                                    size={'w-12 h-12'}
                                    lgSize={'w-12 h-12'}
                                    phSize={50}
                                />
                            </>
                        )}
                        <h6 className="font-os text-sm font-b text-saddleBrown">{first_name}</h6>
                    </div>
                )}
            </div>
        </>
    );
};

export default NavbarAvatar;
