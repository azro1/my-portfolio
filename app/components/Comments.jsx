"use client";

import Image from "next/image";
import { format } from "date-fns";
import { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";

// components

import Avatar from "@/app/components/Avatar";

const Comments = ({ user, comments, loadComments }) => {
    const [isAtBottom, setIsAtBottom] = useState(true); 
    const commentsContainerRef = useRef(null);














    useEffect(() => {
        if (commentsContainerRef.current) {
            // Scroll to the bottom whenever comments change
            commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
        }
    }, [comments])















    // track when the user scrolls and checks if they are at the bottom load more comments
    useEffect(() => {
       
            const commentsContainer = commentsContainerRef.current;

            // Only add event listener when commentsContainer is available
            if (commentsContainer) {
                const handleScroll = () => {

                    // Check if the user is at the bottom
                    const isAtBottom = commentsContainer.scrollHeight - commentsContainer.scrollTop === commentsContainer.clientHeight;
                    setIsAtBottom(isAtBottom);

                    // Check if the user is at the top
                    if (commentsContainer.scrollTop === 0) {
                        loadComments();
                    }
                };
            
                // Add scroll event listener
                commentsContainer.addEventListener('scroll', handleScroll, { passive: true });

                // Clean up the event listener when component unmounts
                return () => {
                    commentsContainer.removeEventListener('scroll', handleScroll);
                };
           }
    }, [loadComments])






        // Scroll to bottom if user is already at the bottom
        useEffect(() => {
            if (isAtBottom && commentsContainerRef.current) {
                commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
            }
        }, [comments, isAtBottom]);






       // Scroll to bottom if user is already at the bottom
       useEffect(() => {
        if (isAtBottom && commentsContainerRef.current) {
            commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
        }
    }, [comments, isAtBottom]); // Only scroll if new comments and the user is at the bottom






    return (
        <div className="h-[calc(100vh-200px)] overflow-y-scroll hide-scrollbar p-4">
            {comments && comments.length > 0 ? (
                <div
                    className="overflow-y-auto hide-scrollbar h-full flex flex-col"
                    ref={commentsContainerRef}
                >
                    {comments.map((comment) => (
                        <div className="mb-14 flex items-center gap-3" key={comment.id}>
                                {comment.avatar_url ? (
                                    comment.avatar_url.startsWith("https") ? (
                                        <div className="overflow-hidden rounded-full max-w-[50px] max-h-[50px] min-w-[50px]">
                                            <Image
                                                src={comment.avatar_url}
                                                alt="User avatar"
                                                width={50}
                                                height={50}
                                                sizes="(max-width: 480px) 40px, (max-width: 768px) 60px, (max-width: 1024px) 80px, 100px"
                                                quality={100}
                                                priority
                                            />
                                        </div>
                                    ) : (
                                        <div className="min-w-[50px] min-h-[50px]">
                                            <Avatar
                                                url={comment.avatar_url}
                                                width={50}
                                                height={50}
                                            />
                                        </div>

                                    )
                                ) : comment.avatar_url === null && user?.user_metadata.avatar_url ? (
                                    <div className="overflow-hidden rounded-full max-w-[50px] max-h-[50px] min-w-[50px]">
                                        <Image
                                            src={user?.user_metadata.avatar_url}
                                            alt="Fallback user avatar"
                                            width={50}
                                            height={50}
                                            sizes="(max-width: 480px) 40px, (max-width: 768px) 60px, (max-width: 1024px) 80px, 100px"
                                            quality={100}
                                            priority
                                        />
                                    </div>
                                ) : (
                                    <div className="w-fit rounded-full justify-self-center min-w-[50px]">
                                        <FaUserCircle size={50} color="gray" />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <div className="flex gap-2 items-center">
                                        <h6 className="text-lg text-saddleBrown font-medium">
                                            {comment.first_name || comment.full_name}
                                        </h6>
                                        <span className="text-sm text-ashGray">
                                            {format(new Date(comment.created_at), 'd/M/yy, h:mm a')}
                                        </span>
                                    </div>
                                    <p className="text-base text-stoneGray whitespace-normal break-words">
                                        <span>{comment.text}</span>
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

export default Comments;
