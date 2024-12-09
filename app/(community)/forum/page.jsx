"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect, useRef } from 'react';

// components
import Comments from "@/app/components/Comments"
import CommentForm from "@/app/components/CommentForm"

// hooks
import { useFetchUser } from "@/app/hooks/useFetchUser"
import { useFetchProfile } from '@/app/hooks/useFetchProfile';
import { useMessage } from '@/app/hooks/useMessage';


const Forum = () => {
const { user } = useFetchUser()
const [comments, setComments] = useState([])
const [hasMore, setHasMore] = useState(true);
const [isCommentsLoading, setIsCommentsLoading] = useState(true);

// custom hooks
const { profile, fetchProfile } = useFetchProfile()
const { changeMessage } = useMessage()





// watch user value to get users profile and show profile error is there is one
useEffect(() => {
  if (user) {
    fetchProfile(user)
  } else {
    
  }
}, [user])







// update comments after new comment is added
const updateComments = (newComment) => {
    setComments(prevComments => [...prevComments, newComment]);
}

// as soon as component mounts fetch the last 20 comments
const fetchComments = async () => {
    try {
        const supabase = createClientComponentClient();
        const { data, error } = await supabase
            .from('comments')
            .select()
            .order('created_at', { ascending: false }) // Most recent first
            .range(0, 9); // Fetch the first 10 comments

        if (error) {
            setComments([]);
            console.log(error.message);
        }

        if (data) {
            setComments(data.reverse()); // Reverse to display oldest at the top
        }
    } catch (error) {
        changeMessage('error', 'Failed to fetch comments. Please try again later.');
        console.error(error.message);
    } finally {
        setIsCommentsLoading(false);
    }
};

useEffect(() => {
    fetchComments();
}, []);







// Load more comments when the user scrolls up
const loadMoreComments = async () => {
    if (!hasMore) return; // Don't load more if there are no more comments

    try {
        const supabase = createClientComponentClient();
        const { data, error } = await supabase
            .from('comments')
            .select()
            .order('created_at', { ascending: false }) // Newest first
            .range(comments.length, comments.length + 4);  // Load the next 5 comments

        if (error) {
            changeMessage('error', 'Failed to load more comments.');
            console.error(error.message);
            return;
        }

        if (data) {
            setComments(prevComments => [...data.reverse(), ...prevComments]); // Prepend new comments (older comments)
            setHasMore(data.length === 5);  // If exactly 5 comments, there might be more
        }
    } catch (error) {
        changeMessage('error', 'Error loading comments.');
        console.error(error.message);
    }
};







  return (
    <div>
       {/* <h2 className="subheading font-b text-frostWhite">Community Forum</h2> */}
       <div className="flex flex-col h-full p-8">
       <Comments 
         user={user}
         comments={comments}
         loadComments={loadMoreComments}
       />

       <CommentForm 
         user={user}
         profile={profile}
         updateComments={updateComments}
       />

       </div>
    </div>

  )
}

export default Forum
