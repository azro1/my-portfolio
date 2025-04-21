"use client";

import { useState, useEffect, useRef, useCallback } from 'react'; // Added useCallback
import { useParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useFetchProfile } from '../../../hooks/useFetchProfile';
import Image from "next/image"; // Added Image
import { format } from "date-fns"; // Added date-fns
import { FaUserCircle } from "react-icons/fa"; // Added FaUserCircle

// components
import MessageForm from '../MessageForm';
import Avatar from "@/app/components/Avatar"; // Added Avatar
import Chevron from '@/app/components/Chevron';
import Heading from '@/app/components/Heading';
import Sidebar from '@/app/components/Sidebar';
import UserListWithStatus from '../UserListWithStatus'; // Import the new component - Corrected path

const AWAY_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

const ChatRoomPage = () => {
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [roomId, setRoomId] = useState(null);
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({}); // State for presence
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







  // Helper to update user status (online/away)
  const updateUserStatus = useCallback((userId, newStatus) => {
    setOnlineUsers(prev => {
      if (prev[userId] && prev[userId].status !== newStatus) {
        return { ...prev, [userId]: { ...prev[userId], status: newStatus } };
      }
      return prev;
    });
  }, []);






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
      // Update sender's last_active time when they send a message
      const senderId = payload.new.message_id;
      if (senderId) {
         setOnlineUsers(prev => {
            if (prev[senderId]) {
                return { ...prev, [senderId]: { ...prev[senderId], last_active: Date.now(), status: 'online' } };
            }
            return prev; // Should ideally already be present from 'join'/'sync'
         });
      }
    });






    // Handle Presence sync (get initial list of users)
    channel.on('presence', { event: 'sync' }, () => {
      const presenceState = channel.presenceState();
      const users = {};
      for (const id in presenceState) {
        const pres = presenceState[id][0]; // Assuming one presence entry per user

        if (pres) {
            users[id] = {
                id: pres.user_id,
                first_name: pres.first_name,
                avatar_url: pres.avatar_url,
                last_active: pres.online_at ? new Date(pres.online_at).getTime() : Date.now(), // Use online_at or current time
                status: 'online' // Initial status
            };
        }
      }
      setOnlineUsers(users);
    });







    // Handle users joining
    channel.on('presence', { event: 'join' }, ({ key, newPresences }) => {
      setOnlineUsers(prev => {
        const updatedUsers = { ...prev };
        newPresences.forEach(pres => {

          updatedUsers[key] = {
            id: pres.user_id,
            first_name: pres.first_name,
            avatar_url: pres.avatar_url,
            last_active: pres.online_at ? new Date(pres.online_at).getTime() : Date.now(),
            status: 'online'
          };
        });
        return updatedUsers;
      });
    });






    // Handle users leaving
    channel.on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
      setOnlineUsers(prev => {
        const updatedUsers = { ...prev };
        leftPresences.forEach(pres => {
          // Optionally mark as offline instead of removing, depends on desired UX
          delete updatedUsers[key];
        });
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
      setOnlineUsers(prev => {
        let changed = false;
        const updatedUsers = { ...prev };
        for (const userId in updatedUsers) {
          // Don't mark the current user as away based on this timer
          if (userId === user?.id) continue;

          const userState = updatedUsers[userId];
          const currentStatus = userState.status;
          let newStatus = currentStatus;

          if (now - userState.last_active > AWAY_TIMEOUT) {
            newStatus = 'away';
          } else {
            // If they were away, but last_active is now recent, mark online
            // (This handles cases where 'sync' or 'join' brought them back)
            if (currentStatus === 'away') {
               newStatus = 'online';
            }
          }

          if (newStatus !== currentStatus) {
            updatedUsers[userId] = { ...userState, status: newStatus };
            changed = true;
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
    setOnlineUsers(prev => ({
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
        first_name: profile.first_name,
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
    <div className='flex  min-h-screen'> 
      
      <div className='hidden xl:block'>
        <Sidebar />
      </div>
  
      {/* Main Chat Area */}
      <div className="flex-1 w-full flex flex-col chat-container bg-nightSky">
        <div className="flex-shrink-0 min-h-[92px] flex items-center text-xl sm:text-2xl text-cloudGray font-bold p-4 border-b border-charcoalGray text-center sticky top-0 bg-softCharcoal z-10">
          <Heading className='text-center w-full'>
            {roomName || 'Loading Room...'} ({Object.keys(onlineUsers).length} online)
          </Heading>
  
          <div className="ml-auto xl:hidden">
            <Chevron user={user} isForumPage={true} />
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
                  className={`flex items-start gap-3 ${isCurrentUser ? 'justify-end' : ''}`}
                >
                  {/* Avatar (show only for other users or based on preference) */}
                  {!isCurrentUser && (
                    <div className="flex-shrink-0 mt-1"> {/* Added mt-1 for alignment */}
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
                    <span className="text-xs text-stoneGray mb-1">
                      {message.first_name || message.full_name || 'User'}
                    </span>
  
                    <div
                      className={`p-2 px-3 rounded-lg max-w-xs sm:max-w-md md:max-w-lg break-words ${
                        isCurrentUser
                          ? 'bg-ashGray' // Current user's message style
                          : 'bg-slateOnyx' // Other users' message style
                      }`}
                    >
                      <p className="text-sm sm:text-base text-cloudGray">{message.text}</p>
                    </div>
                    <span className='text-xs mt-1 text-stoneGray'>
                      {format(new Date(message.created_at), 'p')}
                    </span>
                  </div>
  
                  {/* Avatar for current user (optional, shown on the right) */}
                  {isCurrentUser && (
                    <div className="flex-shrink-0 mt-1 ml-2"> {/* Added ml-2 */}
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
          <MessageForm onSendMessage={handleSendMessage} />
        </div>
      </div>
  
      {/* User List - takes remaining height */}
      <div className="min-h-screen overflow-hidden">
        <UserListWithStatus users={onlineUsers} />
      </div>
    </div>
  );
 
};

export default ChatRoomPage;