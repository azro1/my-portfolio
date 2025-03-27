"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import Avatar from "@/app/components/Avatar";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";


const UserAvatar = ({ user, avatarUrl, width = 32, height = 32, maxWidth, maxHeight, defaultAvatarSize }) => {
    const [isProfileLoading, setIsProfileLoading] = useState(true);
    const [userAvatarUrl, setUserAvatarUrl] = useState('')

    const supabase = createClientComponentClient();
    

    // check for avatarUrl passed down from sidebar and update avatar fetched from profiles
    useEffect(() => {
        if (avatarUrl) {
          setUserAvatarUrl((prevAvatarUrl) => {
            return avatarUrl !== prevAvatarUrl ? avatarUrl : prevAvatarUrl;
          });
        }
     }, [avatarUrl]);
     


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

                    setUserAvatarUrl(profileData.avatar_url || user.user_metadata.avatar_url);
                } else {
                    setUserAvatarUrl(user.user_metadata.avatar_url);
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
    }, [supabase, user]);
 

    if (isProfileLoading) {
        return null;
    }


    return (
        <div>
            <div className="flex items-center">
                <div className="overflow-hidden rounded-full relative">
                    {userAvatarUrl ? (
                        userAvatarUrl.startsWith("https") ? (
                            /* Absolute URLs (e.g., third-party avatars or signed URLs) */
                            <div className={`${maxWidth} ${maxHeight}`}>
                                <Image
                                    src={userAvatarUrl}
                                    alt="User avatar"
                                    width={width}
                                    height={height}
                                    quality={100}
                                    sizes="(max-width: 480px) 40px, (max-width: 768px) 60px, (max-width: 1024px) 80px, 100px"
                                    priority
                                />
                            </div>
                        ) : (
                            /* Handle signed URLs if further processing is required */
                            <div className={`${maxWidth} ${maxHeight}`}>
                                <Avatar
                                    url={userAvatarUrl}
                                    width={width}
                                    height={height}
                                />
                            </div>
                        )
                    ) : (
                        /* Placeholder for when no avatar exists */
                        <div className="w-fit rounded-full justify-self-center">
                            <FaUserCircle size={defaultAvatarSize} color="gray" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserAvatar;
