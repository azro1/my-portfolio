"use client"

import { useState, useEffect } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { MdDeleteForever } from "react-icons/md";

// custom hooks
import { useFetchUser } from "@/app/hooks/useFetchUser";

const CommentList = () => {
  // custom hook to fetch user
  const { user } = useFetchUser()

  const [comments, setComments] = useState(null)
  const [deleteMsg, setDeleteMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [isCommentsLoading, setIsCommentsLoading] = useState(true)

  const supabase = createClientComponentClient();




  // get user comments
  useEffect(() => {
    async function getComments() {
      try {
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
        console.log(error.message);
      } finally {
        setIsCommentsLoading(false)
      }
    }
    if (user && user.id) {
      getComments();
    }
  }, [user && user.id])




  // Subscription to realtime changes on comments table
  useEffect(() => {
    const channel = supabase.channel('realtime comments').on('postgres_changes', {
      event: 'DELETE',
      schema: 'public',
      table: 'comments'
    }, (payload) => {
      if (payload) {
        setComments(prevComments => prevComments.filter(comment => comment.id !== payload.old.id));
        setDeleteMsg('Comment deleted!')
        setTimeout(() => setDeleteMsg(''), 1500);
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
    <div className='text-center flex-1'>
        <h3 className='mb-4 text-lg font-rubik text-hint'>Comments</h3>
            <div className='flex flex-col gap-2 text-left max-w-sm mx-auto lg:max-w-none overflow-auto h-96'>
                {comments && comments.length > 0 ? (
                    comments.map(comment => (
                        <div className='flex items-start justify-between gap-2 p-3 shadow-outer' key={comment.id}>
                            <div>
                                <p>{comment.text}</p>
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
                             {!isCommentsLoading && !deleteMsg && (<p className='text-center pt-0'>No Comments.</p>)}
                          </>
                        )}
                    </div>

                )}
                {deleteMsg && <p className="mt-4  place-self-center">{deleteMsg}</p>}
                {errorMsg && <p className="mt-4 error place-self-center">{errorMsg}</p>}
            </div>
    </div>

  )
}

export default CommentList
