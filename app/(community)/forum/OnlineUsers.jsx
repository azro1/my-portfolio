"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

// components
import Avatar from "@/app/components/Avatar";

// hooks
import { useRealtime } from "@/app/hooks/useRealtime";

const OnlineUsers = () => {
    const [realtimeProfiles, setRealtimeProfiles] = useState([]);
    const { onlineUsers } = useRealtime(); // Assuming useRealtime provides the updated list of online users
    
    useEffect(() => {
        if (!onlineUsers || onlineUsers.length === 0) {
            setRealtimeProfiles([]); // Clear profiles when no users online
            return;
        }
        // console.log('Online users:', onlineUsers);
        setRealtimeProfiles([...onlineUsers]); // Ensure a new reference to trigger re-render
    }, [onlineUsers]);

    return (
        <>
            {realtimeProfiles && (
                <div className="h-full flex flex-col gap-6">
                    {realtimeProfiles.map((profile) => (
                        <div className="flex items-center gap-4 justify-between" key={profile.id}>
                            <div className="flex items-center gap-2 ">
                                <div>
                                    {profile.is_online ? (
                                        <div className="w-3 h-3 rounded-full bg-[#00FF00]"></div> // Green for online
                                    ) : (
                                        <div className="w-3 h-3 rounded-full bg-[#B8860B]"></div> // orange for away
                                    )}
                                </div>
                                <div className="flex items-center">
                                    <h6 className="text-base text-ashGray">
                                        {profile.first_name || profile.full_name}
                                    </h6>
                                </div>
                            </div>

                            {/* Render avatar */}
                            {profile.avatar_url ? (
                                profile.avatar_url.startsWith("https") ? (
                                    <div className="overflow-hidden rounded-full max-w-[32px] max-h-[32px] min-w-[32px]">
                                        <Image
                                            src={profile.avatar_url}
                                            alt="User avatar"
                                            width={32}
                                            height={32}
                                            quality={100}
                                        />
                                    </div>
                                ) : (
                                    <div className="min-w-[32px] min-h-[32px]">
                                        <Avatar url={profile.avatar_url} width={32} height={32} />
                                    </div>
                                )
                            ) : (
                                <div className="w-fit rounded-full justify-self-center">
                                    <FaUserCircle size={32} color="gray" />
                                </div>
                            )}
                        
                        </div>
                    ))}
                </div>
            )}

        </>
    );
};

export default OnlineUsers;
