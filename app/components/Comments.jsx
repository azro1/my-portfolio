"use client";

import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect, useRef } from "react";

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
        <div className="h-[85vh] overflow-y-scroll hide-scrollbar">
            {comments && comments.length > 0 ? (
                <div
                    className="overflow-y-auto hide-scrollbar h-full flex flex-col"
                    ref={commentsContainerRef}
                >
                    {comments.map((comment) => (
                        <div className="mb-10" key={comment.id}>
                            <div className="flex gap-4">
                                <div className="rounded-full min-w-max relative w-12 h-12">
                                    {comment.avatar_url ? (
                                        comment.avatar_url.startsWith("http") ? (
                                            <Image
                                                className="inline-block w-full h-full object-cover"
                                                src={comment.avatar_url}
                                                alt="User avatar"
                                                fill
                                                sizes="(max-width: 480px) 40px, (max-width: 768px) 60px, (max-width: 1024px) 80px, 100px"
                                                quality={100}
                                                priority
                                            />
                                        ) : (
                                            <Avatar
                                                url={comment.avatar_url}
                                                size={"h-12 w-12"}
                                                lgSize={"w-12 h-12"}
                                                phSize={50}
                                            />
                                        )
                                    ) : (
                                        <Image
                                            className="inline-block w-full h-full object-cover"
                                            src={user.user_metadata.avatar_url}
                                            alt="Fallback user avatar"
                                            fill
                                            sizes="(max-width: 480px) 40px, (max-width: 768px) 60px, (max-width: 1024px) 80px, 100px"
                                            quality={100}
                                            priority
                                        />
                                    )}
                                </div>
                                <div className="w-full ">
                                    <div className="flex gap-2 items-center">
                                        <h6 className="text-base text-saddleBrown font-medium">
                                            {comment.first_name || comment.full_name}
                                        </h6>
                                        <span className="text-sm text-ashGray">
                                            {formatDistanceToNow(new Date(comment.created_at), {
                                                addSuffix: true,
                                            })}
                                        </span>
                                    </div>
                                    <div className="p-4 mt-3 w-fit rounded-xl bg-chatbox max-w-3xl">
                                        <p className="text-base text-stoneGray font-os whitespace-normal break-words">
                                            <span>{comment.text}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center h-full text-ashGray">
                        No discussions yet. Start the conversation and share your thoughts!
                </div>
            )}
        </div>
    );
};

export default Comments;
