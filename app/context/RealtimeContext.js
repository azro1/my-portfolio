"use client";
import { createContext, useState, useEffect, useRef } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname } from "next/navigation";

const RealtimeContext = createContext();

const RealtimeProvider = ({ children }) => {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const supabase = createClientComponentClient();
    const pathname = usePathname();
    const channelRef = useRef(null);
    const isSubscribed = useRef(false);
    const lastOnlineStatus = useRef({});

    useEffect(() => {
        if (isSubscribed.current) return;

        const channel = supabase.channel('forum-presence-channel');
        channelRef.current = channel;

        const handleJoin = async (payload) => {
            // console.log("User joined:", payload);

            const { data: user } = await supabase
                .from('profiles')
                .select()
                .eq('id', payload.newPresences[0].user_id)
                .single();

            // console.log("User data fetched:", user);

            setOnlineUsers((prevUsers) => {
                const existingUser = prevUsers.find(existingUser => existingUser.id === user.id);
                if (!existingUser) {
                    return [...prevUsers, { ...user, is_online: true }];
                }
                // Update user online status without duplication
                return prevUsers.map(u => u.id === user.id ? { ...u, is_online: true } : u);
            });

            // Track the user status in lastOnlineStatus to prevent unnecessary changes
            lastOnlineStatus.current[user.id] = true;
        };

        const handleLeave = (payload) => {
            // console.log("User left:", payload);

            const userId = payload.leftPresences[0].user_id;

            setOnlineUsers((prevUsers) => {
                const updatedUsers = prevUsers.map(user => {
                    if (user.id === userId && lastOnlineStatus.current[userId]) {
                        return { ...user, is_online: false };
                    }
                    return user;
                });
                return updatedUsers;
            });

            // Mark the user as offline in the last known status only if they truly left
            lastOnlineStatus.current[userId] = false;
        };

        // Subscribe to presence events
        // channel.on('presence', { event: 'join' }, handleJoin);
        // channel.on('presence', { event: 'leave' }, handleLeave);

        // Subscribe to the channel
        channel.subscribe((status) => {
            // console.log("Realtime Channel status:", status);
            if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
                setTimeout(() => {
                    if (!isSubscribed.current) {
                        channel.subscribe(); // Attempt to resubscribe if needed
                    }
                }, 5000); // Retry every 5 seconds
            }
        });

        // Track user on initial load or on navigation change
        const trackUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                channel.track({ user_id: user.id });
            }
        };

        trackUser();

        // Listen for auth state changes
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                channel.track({ user_id: session.user.id });
            } else if (event === 'SIGNED_OUT') {
                channel.untrack();
            }
        });

        isSubscribed.current = true;

        return () => {
            if (channelRef.current) {
                supabase.removeChannel(channelRef.current);
            }
            isSubscribed.current = false;
        };
    }, [supabase, pathname]);

    useEffect(() => {
        // console.log("Updated onlineUsers:", onlineUsers);
    }, [onlineUsers]);

    return (
        <RealtimeContext.Provider value={{ onlineUsers }}>
            {children}
        </RealtimeContext.Provider>
    );
};

export { RealtimeContext, RealtimeProvider };
