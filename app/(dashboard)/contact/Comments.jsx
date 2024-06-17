"use client"

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// hooks
import { useFetchProfile } from '@/app/hooks/useFetchProfile';

// components
import ProfileAvatar from '@/app/(profile)/profile/ProfileAvatar';


const Comments = ({ user }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([])
    const [commentError, setCommentError] = useState('')
    const [isCommentLoading, setIsCommentLoading] = useState(false);


    // custom hooks
    const { profile, fetchProfile } = useFetchProfile() 
  

    // watch user value to get users profile
    useEffect(() => {
      if (user) {
        fetchProfile(user)
      }
    }, [user])



    // update comments after new comment is added
    const updateComments = (newComment) => {
        setComments(prevComments => [...prevComments, newComment]);
    }




    // as soon as component mounts fetch all comments to be displayed on page
    const fetchComments = async () => {
        try {
        const supabase = createClientComponentClient();
        const { data, error } = await supabase
        .from('comments')
        .select()
        .order('created_at', {
            ascending: false
        })

        if (error) {
            setComments([])
            console.log(error.message)
        }
        
        if (data) {
            setComments(data)
        }
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchComments();
    }, []);





    const handleComment = async (e) => {
        e.preventDefault();
        setIsCommentLoading(true)
        setCommentError('')
        setComment('')
          
        try {
          const res = await fetch(`${location.origin}/api/auth/comments`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              profile,
              comment
            })
          })  
    
          // handle response
          const json = await res.json()
    
          if (json.error) {
            throw new Error(json.error);
          }
    
          if (json.data) {
            // console.log(json.data)
            setIsCommentLoading(false)
            updateComments(json.data);
            fetchComments();
          }
      
        } catch (error) {
            setIsCommentLoading(false)
            console.log(error.message)
        }
      };





    return (
        <div className='place-self-start'>
            {user && (
                <div>
                    <h3 className='mb-2 text-xl font-b font-rubik text-hint'>
                        Leave a Comment
                    </h3>
                    <form onSubmit={handleComment}>
                        <textarea
                            className='p-2 outline-none text-sm'
                            cols='40'
                            rows='4'
                            spellCheck='false'
                            placeholder="Tell us what's on your mind..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        ></textarea>
                        {commentError && <div className='error'>{commentError}</div>}
                        <div>
                            {isCommentLoading && (
                                <button className='btn mt-2 bg-hint'>Processing...</button>
                            )}
                            {!isCommentLoading && (
                                <button className='btn mt-2 bg-hint'>Add Comment</button>
                            )}
                        </div>
                    </form>
                </div>
            )}

            {user !== null && comments.length === 0 && (
                <div className='md:row-start-3 col-start-1 mt-4'>
                    <p>No comments.</p>
                </div>
            )}


            {comments !== null && comments.length > 0 && (
                <div className='w-full sm:max-w-xl mt-20'>
                    <h3 className='text-xl font-b font-rubik text-hint mb-8'>
                        Comments
                    </h3>
                    {comments.map(comment => (
                        <div className='mb-8' key={comment.id}>

                            <>
                                <div className="flex items-start gap-3">
                                    {comment.avatar_url?.includes('https') ? (
                                        <div className="overflow-hidden rounded-full min-w-max h-12">
                                            <img className="inline-block w-full h-full object-cover" src={comment.avatar_url} alt="a user avatar" />
                                        </div>
                                    ) : (
                                        <ProfileAvatar
                                            url={comment.avatar_url}
                                            size={'h-12 w-12'}
                                            phSize={50}
                                        />
                                    )}
                                    <div>
                                        <div className='flex gap-2 items-center font-os mb-2'>
                                            <h6 className='text-sm text-hint font-b'>{comment.first_name ? comment.first_name : comment.full_name}</h6>
                                            <span className='text-xs text-secondary'>{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
                                        </div>
                                        <p>{comment.text}</p>
                                    </div>
                                </div>
                            </>

                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Comments
