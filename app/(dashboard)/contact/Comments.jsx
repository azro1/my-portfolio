"use client"

import { useState, useEffect, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// hooks
import { useFetchProfile } from '@/app/hooks/useFetchProfile';

// components
import ProfileAvatar from '@/app/(profile)/profile/ProfileAvatar';


const Comments = ({ user }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([])
    const [hasMore, setHasMore] = useState(true);
    const [commentError, setCommentError] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [isCommentsLoading, setIsCommentsLoading] = useState(true);
    const commentsContainerRef = useRef(null);

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
        setComments(prevComments => [newComment, ...prevComments]);
    }


    // as soon as component mounts fetch 5 comments to be displayed on page
    const fetchComments = async () => {
        try {
            const supabase = createClientComponentClient();
            const { data, error } = await supabase
                .from('comments')
                .select()
                .order('created_at', { ascending: false })
                .range(comments.length, comments.length + 5 - 1)

            if (error) {
                setComments([])
                console.log(error.message)
            }

            if (data) {
                setComments(data)
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsCommentsLoading(false)
        }
    }

    useEffect(() => {
        fetchComments();
    }, [])



    // lazy loading function
    useEffect(() => {
        // everytime a user scrolls to the bottom of the comments div fetch an additional 5 comments and updates comments state
        const loadMoreComments = async () => {
            if (!hasMore) return;

            try {
                const supabase = createClientComponentClient();
                const { data, error } = await supabase
                    .from('comments')
                    .select()
                    .order('created_at', { ascending: false })
                    .range(comments.length, comments.length + 5 - 1)

                if (error) {
                    setComments([])
                    throw new Error(error.message)
                }

                if (data) {
                    setComments(prevComments => [...prevComments, ...data])
                    setHasMore(data.length > 0);
                }
            } catch (error) {
                console.log(error.message)
                setError('Unable to load more comments.');
            } finally {
                setIsCommentsLoading(false)
            }
        }

        const commentsContainer = commentsContainerRef.current;
        if (!commentsContainer) return;
        
        // function that checks if user has scrolled to bottom of comments div
        const handleScroll = () => {
            if (
                commentsContainer.scrollTop + commentsContainer.clientHeight >=
                commentsContainer.scrollHeight
            ) {
                loadMoreComments();
            }
        };

        commentsContainer.addEventListener('scroll', handleScroll);
        return () => commentsContainer.removeEventListener('scroll', handleScroll);

    }, [comments, hasMore])



    // send comment to sever api endpoint
    const handleComment = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        setCommentError('')
        setComment('')
          
        try {
          const res = await fetch(`${location.origin}/api/comments`, {
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
            setIsLoading(false)
            updateComments(json.data);
          }
      
        } catch (error) {
            setIsCommentsLoading(false)
            console.log(error.message)
        }
    };


    return (
        <div className='place-self-start'>
            {user && (
                <div>
                    <h3 className='mb-2 text-xl font-b text-saddleBrown'>
                        Leave a Comment
                    </h3>
                    <form onSubmit={handleComment}>
                        <textarea
                            className='p-2 outline-none text-base'
                            cols='40'
                            rows='4'
                            spellCheck='false'
                            placeholder="Tell us what's on your mind..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        ></textarea>
                        {commentError && <div className='error'>{commentError}</div>}
                            <button className='btn block mt-2 bg-saddleBrown'>
                                {isLoading ? (
                                    <div className='flex items-center gap-2'>
                                        <img className="w-5 h-5 opacity-50" src="../images/loading/spinner.svg" alt="Loading indicator" />
                                        <span>Adding</span>
                                    </div>
                                ) : (
                                    'Add Comment'
                                )}
                            </button>
                    </form>
                </div>
            )}
            

            {isCommentsLoading ? (
                <div className='mt-20'>
                   <img className="w-20" src="/images/loading/loading.gif" alt="a loading gif" />
                </div>
            ) : (
                <>
                    {user !== null && comments.length === 0 && (
                        <div className='md:row-start-3 col-start-1 mt-4'>
                            <p>No comments.</p>
                        </div>
                    )}
                </>
            )}



            {comments !== null && comments.length > 0 && (
                <div className='w-full sm:max-w-xl mt-20'>
                    <h3 className='text-xl font-b text-saddleBrown mb-8'>
                        Comments
                    </h3>
                    <div className='overflow-y-scroll hide-scrollbar max-h-custom-md' ref={commentsContainerRef}>
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
                                        <div className='flex gap-2 items-center mb-2'>
                                            <h6 className='text-base text-saddleBrown font-b'>{comment.first_name ? comment.first_name : comment.full_name}</h6>
                                            <span className='text-sm text-stoneGray'>{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
                                        </div>
                                        <p>{comment.text}</p>
                                    </div>
                                </div>
                            </>

                        </div>
                    ))}

                    </div>

                </div>
            )}
        </div>
    )
}

export default Comments
