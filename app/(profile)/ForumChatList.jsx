"use client"

import { useState, useEffect } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { FiTrash2 } from "react-icons/fi";


// components
import Heading from "../components/Heading";
import MessageImage from "../components/MessageImage";

// hooks
import { useMessage } from "@/app/hooks/useMessage";

const ForumChatList = ({ user }) => {
  const [error, setError] = useState(false)
  const [messages, setMessages] = useState(null)
  const [isMessagesLoading, setIsMessagesLoading] = useState(true)

  // hooks
  const { changeMessage } = useMessage()

  const supabase = createClientComponentClient();

  

  // get user messages
  useEffect(() => {

    async function getMessages() {
      try {
        if (user) {
          const { data, error } = await supabase
            .from('messages')
            .select()
            .order('created_at', {
              ascending: false
            })
            .eq('message_id', user.id)

          if (error) {
            throw new Error(error.message);
          }

          if (data && data.length > 0) {
            setMessages(data)
          }
        }
      } catch (error) {
        setError(true)
        changeMessage('error', 'We encountered an issue while fetching your messages. Try refreshing the page. Please reach out to support if the issue persists.')
        console.log(error.message);
      } finally {
        setIsMessagesLoading(false)
      }
    }
    getMessages();
  }, [changeMessage, user, supabase])



  // Subscription to realtime changes on messages table
  useEffect(() => {
    const channel = supabase.channel('realtime messages').on('postgres_changes', {
      event: 'DELETE',
      schema: 'public',
      table: 'messages'
    }, (payload) => {
      if (payload) {
        setMessages(prevMessages => prevMessages.filter(message => message.id !== payload.old.id));
      }
    }).subscribe()

    return () => supabase.removeChannel(channel)
  }, [user, supabase, changeMessage])





  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id)
      .select()

    if (error) {
      changeMessage('error', "An unexpected error occurred your message couldn't be deleted. Please try again later or contact support if the issue persists.");
      console.log(error.message)
    } else {
      changeMessage('success', 'Message deleted!')
    }
  }




  return (
    <div>
        <Heading className='font-medium text-cloudGray mb-4'>
            Chat History
        </Heading>
        {!error ? (
            <div className={`flex flex-col text-left min-h-96 max-h-96 p-2 relative bg-nightSky overflow-y-auto hide-scrollbar gap-2 md:max-w-lg`}>
                {messages && messages.length > 0 ? (
                    messages.map(message => (

                        <div className='flex items-start justify-between p-4 gap-2 bg-nightSkyLight' key={message.id}>
                            {message.file_path ? (
                                <div className='flex flex-col gap-2'>
                                    <MessageImage 
                                        width={32} 
                                        height={32}
                                        filePath={message.file_path}
                                    />
                                    <span className='text-xs text-ashGray'>{formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}</span>
                                </div>
                            ) : (
                                <div className='flex-1 flex flex-col w-full break-words min-w-0 gap-1'>
                                    <span className="text-stoneGray text-base leading-normal block">{message.text}</span>
                                    <span className='text-xs text-ashGray'>{formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}</span>
                                </div>

                            )} 
                               
                            <div className="flex-shrink-0">
                              <FiTrash2
                                className="cursor-pointer text-cloudGray hover:text-red-600 transition-colors duration-200 ease-in-out"
                                size={21}
                                onClick={() => handleDelete(message.id)}
                              />
                            </div>

                        </div>
                    ))
                ) : (
                        <div>
                            {!isMessagesLoading && <p className='text-ashGray'>No Chats.</p>}
                        </div>
                )}
            </div>
        ) : (
          <p className='p-4'>Currently unable to display messages. Try refreshing the page.</p>
        )}
    </div>

  )
}

export default ForumChatList
