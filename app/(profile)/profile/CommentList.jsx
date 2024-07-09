"use client"

import { useState, useEffect } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { MdDeleteForever } from "react-icons/md";

const CommentList = ({ user }) => {
  const [comments, setComments] = useState(null)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isCommentsLoading, setIsCommentsLoading] = useState(true)

  const supabase = createClientComponentClient();

  

  // get user comments
  useEffect(() => {
    async function getComments() {
      try {
        setErrorMsg('')
        const { data, error } = await supabase
          .from('comments')
          .select()
          .order('created_at', {
            ascending: false
          })
          .eq('comment_id', user.id)

        if (error) {
          throw new Error(error.message);
        }

        if (data && data.length > 0) {
          setComments(data)
        }
      } catch (error) {
        setErrorMsg('Could not fetch comments. Please try again later.')
        console.log(error.message);
      } finally {
        setIsCommentsLoading(false)
      }
    }
    if (user) {
      getComments();
    }
  }, [user])




  // Subscription to realtime changes on comments table
  useEffect(() => {
    const channel = supabase.channel('realtime comments').on('postgres_changes', {
      event: 'DELETE',
      schema: 'public',
      table: 'comments'
    }, (payload) => {
      if (payload) {
        setComments(prevComments => prevComments.filter(comment => comment.id !== payload.old.id));
        setSuccessMsg('Comment deleted!')
        setTimeout(() => setSuccessMsg(''), 1500);
      }
    }).subscribe()

    return () => supabase.removeChannel(channel)
  }, [user, supabase])





  const handleDelete = async (id) => {
    const { data } = await supabase
      .from('comments')
      .delete()
      .eq('id', id)
      .select()

    if (!data) {
      setErrorMsg('Could not delete comment.')
    }
  }

  return (
    <div className='lg:row-span-2 '>
        <h3 className='text-center profile-sub-subheading'>Comments</h3>
            <div className='flex flex-col gap-2 text-left min-h-96 max-h-96 lg:max-h-custom-fixed overflow-y-scroll hide-scrollbar md:max-w-xs md:mx-auto'>
                {comments && comments.length > 0 ? (
                    comments.map(comment => (
                        <div className='flex items-start justify-between p-3 border-shade border-4' key={comment.id}>
                            <div>
                                <p className="pb-1">{comment.text}</p>
                                <span className='text-xs text-hint'>{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
                            </div>
                                <MdDeleteForever className="min-w-max cursor-pointer text-hint" size={24} onClick={() => handleDelete(comment.id)}/>
                        </div>
                    ))
                ) : (
                    <div className="relative h-full">
                        {isCommentsLoading ? (
                           <img className="w-16 absolute top-16 left-1/2 transform -translate-x-1/2" src="../images/loading/loader.gif" alt="a loading gif" />
                        ) : (
                          <>
                             {!isCommentsLoading && !successMsg && (<p className='text-center'>No Comments.</p>)}
                          </>
                        )}
                    </div>

                )}
                {successMsg && <p className="success place-self-center">{successMsg}</p>}
                {errorMsg && <p className="error place-self-center">{errorMsg}</p>}
            </div>
    </div>

  )
}

export default CommentList
