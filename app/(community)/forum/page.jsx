"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from 'react';

// components
import Messages from "@/app/components/Messages"
import MessageForm from "@/app/components/MessageForm"
import OnlineUsers from './OnlineUsers';

// hooks
import { useFetchUser } from "@/app/hooks/useFetchUser"
import { useFetchProfile } from '@/app/hooks/useFetchProfile';
import { useMessage } from '@/app/hooks/useMessage';


const Forum = () => {
const { user } = useFetchUser()
const [messages, setMessages] = useState([])
const [hasMore, setHasMore] = useState(true);

// custom hooks
const { profile, fetchProfile } = useFetchProfile()
const { changeMessage } = useMessage()





// only try to fetch profile if theres a user
useEffect(() => {
  if (user) {
    fetchProfile(user)
  } 
}, [user, fetchProfile])







  // update messages after new message is added
  const updateMessages = (newMessage) => {
    setMessages(prevMessages => [...prevMessages, newMessage]);
  }







  // as soon as component mounts fetch the last 20 messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const supabase = createClientComponentClient();
        const { data, error } = await supabase
          .from('messages')
          .select()
          .order('created_at', { ascending: false }) // Most recent first
          .range(0, 9); // Fetch the first 10 messages

        if (error) {
          setMessages([]);
          console.log(error.message);
        }

        if (data) {
          setMessages(data.reverse()); // Reverse to display oldest at the top
        }
      } catch (error) {
        changeMessage('error', 'Failed to fetch messages. Please try again later.');
        console.error(error.message);
      } 
    }
    fetchMessages();
  }, [changeMessage]);







// Load more messages when the user scrolls up
const loadMoreMessages = async () => {
    if (!hasMore) return; // Don't load more if there are no more messages

    try {
        const supabase = createClientComponentClient();
        const { data, error } = await supabase
            .from('messages')
            .select()
            .order('created_at', { ascending: false }) // Newest first
            .range(messages.length, messages.length + 4);  // Load the next 5 messages

        if (error) {
            changeMessage('error', 'Failed to load more messages.');
            console.error(error.message);
            return;
        }

        if (data) {
            setMessages(prevMessages => [...data.reverse(), ...prevMessages]); // Prepend new messages (older messages)
            setHasMore(data.length === 5);  // If exactly 5 messages, there might be more
        }
    } catch (error) {
        changeMessage('error', 'Error loading messages.');
        console.error(error.message);
    }
};







return (
    <div className="flex flex-col min-h-screen overflow-hidden pt-28 xl:pt-0">
      {/* Header */}
      <div className="p-6 text-center bg-ashGray">
        <h2 className="subheading text-white font-b">Welcome to the Community Forum</h2>
      </div>
      
      {/* Content Area */}
      <div className="flex-grow flex flex-col w-full">

        {/* Messages Section */}
        <div className="flex-grow overflow-y-auto h-full sm:flex-grow-0 md:flex md:flex-row-reverse">
          <div className='p-4 bg-nightSky'>
            <OnlineUsers
              user={user}
            />
          </div>
          <Messages 
            user={user}
            messages={messages}
            loadMessages={loadMoreMessages}
          />
        </div>
  
        {/* Input Section */}
        <div className="flex-grow flex items-end pt-2 px-4 p-6">
          <MessageForm 
            user={user}
            profile={profile}
            updateMessages={updateMessages}
          />
        </div>

      </div>
    </div>
  );
  
}

export default Forum
