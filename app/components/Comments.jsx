"use client"

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// hooks
import { useFetchProfile } from '@/app/hooks/useFetchProfile';
// custom hook to display global messages
import { useMessage } from '@/app/hooks/useMessage';

// components
import Avatar from '@/app/components/Avatar';


const Comments = ({ user }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([])
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isCommentsLoading, setIsCommentsLoading] = useState(true);
    const commentsContainerRef = useRef(null);

    // custom hooks
    const { profile, fetchProfile } = useFetchProfile()
    // global messages function
    const { changeMessage } = useMessage()

    // validation function returns regex to strip out harmful chars
    const containsInvalidChars = (value) => /[<>\/\\`"'&]/.test(value);

  

    // watch user value to get users profile and show profile error is there is one
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
            changeMessage('error', 'Failed to fetch comments. Please try again later.')
            console(error.message);
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
                changeMessage('error', "Sorry we're unable to load more comments right now.");
                console.log(error.message)
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
        setIsLoading(true);
          

        if (!comment) {
            setIsLoading(false);
            changeMessage('error', 'Oops! The comment field is empty. Please share your thoughts before submitting.');
            return
        } else if (containsInvalidChars(comment)) {
            setIsLoading(false);
            changeMessage('error', 'Your comment contains characters that are not allowed. Please remove them and try again.');
            return 
        }


        if (!profile) {
            setIsLoading(false)
            changeMessage('error', "An error occured at our end and we're fixing it. Please try again later. If the issue persists, contact support.");
            return
        }


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
          const serverComment = await res.json()
    
          if (serverComment.error) {
            throw new Error("We're having trouble saving your comment right now. Please try again in a bit. If the issue persists, contact support.");
          }
    
          if (serverComment.data) {
            setIsLoading(false)
            updateComments(serverComment.data);
            changeMessage('success', 'Comment added!')
            setComment('')
          }
      
        } catch (error) {
            setIsLoading(false)
            changeMessage('error', error.message)
        }
    };








    return (
        <>
            {user && (
                <div className='relative max-w-max'>
                    <h3 className='mb-2 text-xl font-b text-saddleBrown'>
                        Leave a Comment
                    </h3>
                    <form onSubmit={handleComment}>
                        <textarea
                            className='py-2 px-2.5 outline-none text-base text-black rounded-md'
                            cols='40'
                            rows='4'
                            spellCheck='false'
                            placeholder="Tell us what's on your mind..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>

                        <button className='btn block mt-2 bg-saddleBrown' disabled={isLoading}>
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
                <img className="w-20" src="/images/loading/loading.gif" alt="a loading gif" />
            ) : (
                <>
                    {user !== null && comments.length === 0 && (
                        <p>No comments.</p>
                    )}
                </>
            )}



            {comments !== null && comments.length > 0 && (
                <div className='w-full sm:max-w-xl'>
                    <h3 className='text-xl font-b text-saddleBrown mb-8'>
                        Comments
                    </h3>
                    <div className='overflow-y-scroll hide-scrollbar max-h-custom-md' ref={commentsContainerRef}>
                    {comments.map(comment => (
                        <div className='mb-8' key={comment.id}>

                            <>
                                <div className="flex items-start gap-3">
                                    {comment.avatar_url?.includes('https') ? (
                                        <div className="overflow-hidden rounded-full min-w-max relative w-14 h-14">
                                            <Image 
                                                className="inline-block w-full h-full object-cover" 
                                                src={comment.avatar_url} 
                                                alt="a user avatar"
                                                fill
                                                sizes="(max-width: 480px) 40px, (max-width: 768px) 60px, (max-width: 1024px) 80px, 100px"
                                                quality={100}
                                                priority 
                                            />
                                        </div>
                                    ) : (
                                        <Avatar
                                            url={comment.avatar_url}
                                            size={'h-14 w-14'}
                                            lgSize={'w-14 h-14'}
                                            phSize={50}
                                        />
                                    )}
                                    <div>
                                        <div className='flex gap-2 items-center mb-2'>
                                            <h6 className='text-base text-saddleBrown font-b'>{comment.first_name ? comment.first_name : comment.full_name}</h6>
                                            <span className='text-sm text-cloudGray filter brightness-75'>{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
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
        </>
    )
}

export default Comments
