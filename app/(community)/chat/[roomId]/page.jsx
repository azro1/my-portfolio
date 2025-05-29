"use client";

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useFetchProfile } from '../../../hooks/useFetchProfile';
import Link from 'next/link';
import Image from "next/image";
import { format } from "date-fns";
import { FaUserCircle } from "react-icons/fa";
import { FiArrowLeft } from 'react-icons/fi';

// components
import MessageForm from '../MessageForm';
import Avatar from "@/app/components/Avatar";
import Chevron from '@/app/components/Chevron';
import Heading from '@/app/components/Heading';
import MessageImage from '@/app/components/MessageImage';
import UserListWithStatus from '../UserListWithStatus';

const AWAY_TIMEOUT = 5 * 60 * 1000;

const ChatRoomPage = () => {
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [roomId, setRoomId] = useState(null);
  const [user, setUser] = useState(null);
  const [roomUsersState, setRoomUsersState] = useState({}); // State for all users in the room (online, away, offline)
  const supabase = createClientComponentClient();
  const params = useParams();
  const { fetchProfile, profile } = useFetchProfile();
  const messagesContainerRef = useRef(null);
  const channelRef = useRef(null); // Ref for the channel instance






  // Fetch authenticated user
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, [supabase]);







  // Fetch user profile once user is available
  useEffect(() => {
    if (user) {
      fetchProfile(user);
    }
  }, [user, fetchProfile]);







  // Set roomId from URL parameters
  useEffect(() => {
    if (params && params.roomId) {
      setRoomId(params.roomId);
    }
  }, [params]);










  // Fetch room details, initial messages, and set up real-time subscription with Presence
  useEffect(() => {
    // Ensure we have the roomId, user, and profile before subscribing
    if (!roomId || !supabase || !user || !profile) return;

    // Fetch Room Name (can run concurrently with subscription setup)
    const fetchRoomName = async () => {
      const { data, error } = await supabase
        .from('chat_rooms')
        .select('name')
        .eq('id', roomId)
        .single();
      if (error) {
        // console.error('Error fetching room name:', error);
        return;
      }
      setRoomName(data?.name || 'Chat Room'); // Use optional chaining and default
    };
    fetchRoomName();






    // Fetch Initial Messages
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*') // Consider selecting specific columns if profile info is redundant
        .eq('chatroom_id', roomId)
        .order('created_at', { ascending: true });

      if (error) {
        // console.error('Error fetching messages:', error);
        return;
      }
      setMessages(data || []); // Ensure messages is always an array
    };
    fetchMessages();







    // Real-time Subscription with Presence
    const presenceChannelName = `room-${roomId}`;
    const channel = supabase.channel(presenceChannelName, {
      config: {
        presence: {
          key: user.id, // Unique key for this client connection
        },
      },
    });

    channelRef.current = channel; // Store channel instance







    // Handle new messages
    channel.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `chatroom_id=eq.${roomId}` }, (payload) => {
      setMessages((oldMessages) => [...oldMessages, payload.new]);
      // When a message is received, ensure the sender's status is 'online'.
      // We rely on presence updates (triggered by channel.track in handleSendMessage)
      // to propagate the 'last_active' time consistently via the 'online_at' field.
      const senderId = payload.new.message_id; // Confirmed this is the user ID field
      if (senderId) {
         setRoomUsersState(prev => {
            // Check if the sender exists in our state
            if (prev[senderId] && prev[senderId].status !== 'online') {
                // Only update status if they weren't already online
                // Do NOT update last_active here; rely on presence sync/join.
                return { ...prev, [senderId]: { ...prev[senderId], status: 'online' } };
            }
            // If user doesn't exist or is already online, return previous state
            return prev;
         });
      }
    });






    // Handle Presence sync (merge with existing state)
    channel.on('presence', { event: 'sync' }, () => {
      const presenceState = channel.presenceState();
      setRoomUsersState(prev => {
        const newState = { ...prev }; // Start with the current state

        // Mark all users currently in presenceState as 'online' and update their info
        for (const id in presenceState) {
          const pres = presenceState[id][0]; // Assuming one presence entry per user
          if (pres) {
            const existingUser = newState[id];
            newState[id] = {
              // Keep existing data, especially last_active, if user already exists
              ...(existingUser || {}),
              id: pres.user_id,
              first_name: pres.first_name,
              avatar_url: pres.avatar_url,
              // Only set last_active if the user is new or didn't have one previously
              last_active: existingUser?.last_active || (pres.online_at ? new Date(pres.online_at).getTime() : Date.now()),
              status: 'online' // Mark as online
            };
          }
        }

        // Optional: Mark users in prev state but NOT in presenceState as 'offline'
        // This handles cases where a user might have dropped unexpectedly without a 'leave' event
        // for (const id in prev) {
        //   if (!presenceState[id] && prev[id].status !== 'offline') {
        //      newState[id] = { ...prev[id], status: 'offline' };
        //   }
        // }
        // Decided against the above optional block for now to keep it simpler,
        // relying on the 'leave' event primarily.

        return newState;
      });
    });







    // Handle users joining
    channel.on('presence', { event: 'join' }, ({ key, newPresences }) => {
      setRoomUsersState(prev => {
        const updatedUsers = { ...prev };
        newPresences.forEach(pres => {
          const existingUser = updatedUsers[key];
          updatedUsers[key] = {
            // Keep existing data if user somehow already exists (though 'join' implies new)
             ...(existingUser || {}),
            id: pres.user_id,
            first_name: pres.first_name,
            avatar_url: pres.avatar_url,
            // Set last_active based on presence 'online_at' or current time for new joins
            last_active: pres.online_at ? new Date(pres.online_at).getTime() : Date.now(),
            status: 'online'
          };
        });
        return updatedUsers;
      });
    });






    // Handle users leaving
    channel.on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
      // Mark user as offline instead of removing
      setRoomUsersState(prev => {
        const updatedUsers = { ...prev };
        // The 'key' directly identifies the user who left.
        // We check if the user exists in our state before updating.
        if (updatedUsers[key]) {
          updatedUsers[key] = { ...updatedUsers[key], status: 'offline', last_active: Date.now() }; // Update status and last_active
        }
        // No need to iterate leftPresences, the key is sufficient.
        return updatedUsers;
      });
    });







    // Subscribe to the channel
    channel.subscribe(async (status, err) => {
      if (status === 'SUBSCRIBED') {
        // console.log(`Subscribed to presence channel ${presenceChannelName}`);
        // Track the current user's presence once subscribed
        const trackPayload = {
          online_at: new Date().toISOString(),
          user_id: user.id,
          first_name: profile.first_name || profile.full_name,
          avatar_url: profile.avatar_url,
        };
        await channel.track(trackPayload);
        // console.log('Tracked presence:', trackPayload);
      }
      // if (status === 'CHANNEL_ERROR') {
      //   console.error(`Subscription error on ${presenceChannelName}:`, err);
      // }
      // if (status === 'CLOSED') {
      //   console.log(`Subscription closed for ${presenceChannelName}`);
      // }
    });

    // Cleanup function
    return () => {
      if (channelRef.current) {
        // console.log(`Unsubscribing from ${presenceChannelName}`);
        channelRef.current.untrack(); // Untrack presence
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
    // Depend on user and profile to ensure they are loaded before subscribing/tracking
  }, [roomId, supabase, user, profile]);








  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);








  // Effect for checking inactivity (Away status)
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();
      setRoomUsersState(prev => {
        let changed = false;
        const updatedUsers = { ...prev };
        for (const userId in updatedUsers) {
          // Don't mark the current user as away based on this timer
          if (userId === user?.id) continue;

          const userState = updatedUsers[userId];
          const currentStatus = userState.status;

          // Only perform checks if the user is not already 'offline'
          if (currentStatus !== 'offline') {
            const lastActiveTime = userState.last_active || 0; // Ensure last_active exists
            const inactiveDuration = now - lastActiveTime;
            const isInactive = inactiveDuration > AWAY_TIMEOUT;

            if (currentStatus === 'online' && isInactive) {
              // Mark online user as away if inactive
              updatedUsers[userId] = { ...userState, status: 'away' };
              changed = true;
            } else if (currentStatus === 'away' && !isInactive) {
              // Mark away user as online if active again
              updatedUsers[userId] = { ...userState, status: 'online' };
              changed = true;
            }
            // No change needed if user is 'online' and active, or 'away' and inactive.
          }
        }
        return changed ? updatedUsers : prev;
      });
    }, 30000); // Check every 30 seconds

    return () => clearInterval(intervalId); // Cleanup interval
  }, [user?.id]); // Rerun if user changes








  
  // Handle sending a new message
  const handleSendMessage = async (newMessage) => {
    if (!newMessage || !roomId || !profile || !user || !channelRef.current) return;

    // 1. Update local state for current user's activity
    const now = Date.now();
    setRoomUsersState(prev => ({
        ...prev,
        [user.id]: {
            ...prev[user.id], // Keep existing info
            last_active: now,
            status: 'online' // Ensure status is online when sending
        }
    }));

    // 2. Track presence update via Supabase (updates 'online_at' for others)
    //    We re-send profile info in case it changed, though ideally it wouldn't frequently.
    await channelRef.current.track({
        online_at: new Date(now).toISOString(),
        user_id: user.id,
        // Use fallback for name, similar to initial track
        first_name: profile.first_name || profile.full_name,
        avatar_url: profile.avatar_url,
    });

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile,
          roomId,
          message: newMessage,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error sending message:", errorData.error || 'Unknown error');
        // Remove optimistic message if it failed
        // setMessages((prevMessages) => prevMessages.filter(msg => msg.id !== optimisticMessage.id));
        return;
      }


    } catch (error) {
      console.error("Error sending message:", error);
      // Remove optimistic message if it failed
      // setMessages((prevMessages) => prevMessages.filter(msg => msg.id !== optimisticMessage.id));
    }
  };









  return (
    <div className='flex min-h-[100dvh]'> 
      
      {/* Main Chat Area */}
      <div className="flex-1 w-full flex flex-col bg-nightSky" >

        <div className=" flex items-center bg-slateOnyx text-cloudGray p-4 text-center sticky top-0 z-10">
          <Link className='hidden xl:block' href='/chat'>
              <FiArrowLeft color='#E0E0E3' size={28} />
          </Link>

          <Heading className='hidden xl:block subheading break-words w-[65vw] mx-auto'>
            {roomName || 'Loading Room...'} (<span className='text-green-600'>{Object.keys(roomUsersState).filter(k => roomUsersState[k].status !== 'offline').length} online</span>)
          </Heading>
  
          <div className="flex-1 xl:hidden">
            <Chevron
              user={user} 
              roomName={roomName} 
              roomUsersState={roomUsersState} 
              isForumPage={true} />
          </div>
        </div>
  
        {/* Message Display Area */}
        <div className="overflow-y-scroll h-full hide-scrollbar p-4 sm:p-6 space-y-4"
          ref={messagesContainerRef}
        >
          {messages && messages.length > 0 ? (
            messages.map((message) => {
              const isCurrentUser = user?.id && message.message_id === user.id;
              return (
                <div
                  key={message.id} // Use message.id which should be unique
                  className={`flex items-start ${isCurrentUser ? 'justify-end gap-1' : 'gap-3'}`}
                >
                  {/* Avatar (show only for other users or based on preference) */}
                  {!isCurrentUser && (
                    <div className="hidden xl:block flex-shrink-0 mt-1"> {/* Added mt-1 for alignment */}
                      {message.avatar_url ? (
                        message.avatar_url.startsWith("https") ? (
                          <div className="overflow-hidden rounded-full w-[36px] h-[36px]">
                            <Image
                              src={message.avatar_url}
                              alt="User avatar"
                              width={36}
                              height={36}
                              quality={90}
                              priority={false}
                            />
                          </div>
                        ) : (
                          <Avatar url={message.avatar_url} width={36} height={36} />
                        )
                      ) : (
                        <FaUserCircle size={36} className="text-gray-500" />
                      )}
                    </div>
                  )}
  
                  {/* Message Content */}
                  <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
  
                    <div className={`p-2 px-3 rounded-lg max-w-xs sm:max-w-md md:max-w-lg break-words ${isCurrentUser ? 'bg-[#C71585]' : 'bg-slateOnyx'}`}>
                      {message.file_path ? (
                        <MessageImage 
                          filePath={message.file_path}
                          className='rounded-md object-cover'
                        />
                      ) : (
                        <p className="text-cloudGray">{message.text}</p>
                      )}
                    </div>

                    <span className='text-xs mt-1 p-1.5 rounded-lg text-stoneGray'>
                      {format(new Date(message.created_at), 'p')}
                    </span>
                  </div>
  
                  {/* Avatar for current user (optional, shown on the right) */}
                  {isCurrentUser && (
                    <div className="hidden xl:block flex-shrink-0 mt-1 ml-2"> {/* Added ml-2 */}
                      {message.avatar_url ? (
                        message.avatar_url.startsWith("https") ? (
                          <div className="overflow-hidden rounded-full w-[36px] h-[36px]">
                            <Image
                              src={message.avatar_url}
                              alt="User avatar"
                              width={36}
                              height={36}
                              quality={90}
                              priority={false}
                            />
                          </div>
                        ) : (
                          <Avatar url={message.avatar_url} width={36} height={36} />
                        )
                      ) : (
                        <FaUserCircle size={36} className="text-gray-500" />
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center text-center h-full text-ashGray">
              Be the first to send a message!
            </div>
          )}
        </div>
  
        {/* Message Input Form */}
        <div className="flex-shrink-0 p-4 border-t border-charcoalGray sticky bottom-0 bg-nightSky">
          <MessageForm 
            user={user}
            profile={profile}
            roomId={roomId}
            onSendMessage={handleSendMessage} />
        </div>
      </div>
  
      {/* User List - takes remaining height */}
      <div className="hidden xl:block min-h-screen overflow-hidden">
        <UserListWithStatus users={roomUsersState} />
      </div>
    </div>
  );
 
};

export default ChatRoomPage;
