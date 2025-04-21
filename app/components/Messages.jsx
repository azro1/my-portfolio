"use client";

import Image from "next/image";
import { format } from "date-fns";
import { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";

// components
import Avatar from "@/app/components/Avatar";

const Messages = ({ messages, loadMessages }) => {
    const [isAtBottom, setIsAtBottom] = useState(true); 
    const messagesContainerRef = useRef(null);














    useEffect(() => {
        if (messagesContainerRef.current) {
            // Scroll to the bottom whenever messages change
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages])



    // track when the user scrolls and checks if they are at the bottom load more messages
    useEffect(() => {
       
            const messagesContainer = messagesContainerRef.current;

            // Only add event listener when messagesContainer is available
            if (messagesContainer) {
                const handleScroll = () => {

                    // Check if the user is at the bottom
                    const isAtBottom = messagesContainer.scrollHeight - messagesContainer.scrollTop === messagesContainer.clientHeight;
                    setIsAtBottom(isAtBottom);

                    // Check if the user is at the top
                    if (messagesContainer.scrollTop === 0) {
                        loadMessages();
                    }
                };
            
                // Add scroll event listener
                messagesContainer.addEventListener('scroll', handleScroll, { passive: true });

                // Clean up the event listener when component unmounts
                return () => {
                    messagesContainer.removeEventListener('scroll', handleScroll);
                };
           }
    }, [loadMessages])



    // Scroll to bottom if user is already at the bottom
    useEffect(() => {
        if (isAtBottom && messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages, isAtBottom]);



    // Scroll to bottom if user is already at the bottom
    useEffect(() => {
        if (isAtBottom && messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages, isAtBottom]); // Only scroll if new messages and the user is at the bottom






    return (
        <div className="h-[calc(100vh-200px)] overflow-y-scroll hide-scrollbar flex-1">
            {messages && messages.length > 0 ? (
                <div
                    className="overflow-y-auto hide-scrollbar h-full flex flex-col gap-8 p-6"
                    ref={messagesContainerRef}
                >
                    {messages.map((message) => (
                        <div className="flex items-start gap-3 max-w-max my-2" key={message.id}>
    
    
                            {/* Render avatar */}
                            {message.avatar_url ? (
                                message.avatar_url.startsWith("https") ? (
                                    <div className="overflow-hidden rounded-full max-w-[42px] max-h-[42px] min-w-[42px]">
                                        <Image
                                            src={message.avatar_url}
                                            alt="User avatar"
                                            width={42}
                                            height={42}
                                            sizes="(max-width: 480px) 40px, (max-width: 768px) 60px, (max-width: 1024px) 80px, 100px"
                                            quality={100}
                                            priority
                                        />
                                    </div>
                                ) : (
                                    <div className="min-w-[42px] min-h-[42px]">
                                        <Avatar url={message.avatar_url} width={42} height={42} />
                                    </div>
                                )
                            ) : (
                                <div className="w-fit rounded-full justify-self-center min-w-[42px]">
                                    <FaUserCircle size={42} color="gray" />
                                </div>
                            )}
    
                            <div className="flex-1 flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <h6 className="text-goldenOchre">
                                        {message.first_name || message.full_name}
                                    </h6>
                                    <span className="text-xs text-ashGray">
                                        {format(new Date(message.created_at), 'd/M/yy, h:mm a')}
                                    </span>
                                </div>
    
                                <p className="bg-slateOnyx p-2 px-3 rounded-md text-base text-frostWhite whitespace-normal break-words max-w-max">
                                    <span>{message.text}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center text-center h-full text-ashGray">
                    No discussions yet. Start the conversation and share your thoughts!
                </div>
            )}
        </div>
    );
    
};

export default Messages;
