"use client"

import { useState, useEffect } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';


const CommentList = ({ user }) => {
    const [comments, setComments] = useState(null);

    const supabase = createClientComponentClient();

    // get user comments
    useEffect(() => {
        async function getComments() {
            try {
                const { data, error } = await supabase
                .from('comments')
                .select()
                .eq('comment_id', user.id)
                
                if (error) {
                    throw new Error(error.message);
                }
                
                if (data && data.length > 0) {
                    setComments(data)
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        if (user && user.id) {
          getComments();
        }
    }, [user && user.id])

  return (
    <div className='flex-1'>
        <h3 className='mb-5 text-xl font-b font-rubik text-hint'>Comments</h3>
            <div className='flex flex-col gap-5 text-left md:p-3 lg:p-0'>
                {comments ? (comments.map((comment) => (
                    <div className='flex items-start justify-between gap-3 pt-2' key={comment.id}>
                        <div>
                            <p>{comment.text}</p>
                            <span className='text-xs text-hint'>{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
                        </div>
                        <button className='btn bg-hint'>Delete</button>
                    </div>
                    ))) :
                    <p className='text-center'>No comments yet.</p>
                }
            </div>
    </div>

  )
}

export default CommentList
