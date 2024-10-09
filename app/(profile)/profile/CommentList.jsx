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
    <div>
        <h3 className='text-lg font-b text-nightSky mb-3'>Comments</h3>

            <div className='flex flex-col gap-2 text-left min-h-96 max-h-96 overflow-y-scroll hide-scrollbar md:max-w-xs relative bg-frostWhite'>
                {comments && comments.length > 0 ? (
                    comments.map(comment => (
                        <div className='flex items-start gap-1 justify-between p-3 bg-nightSky' key={comment.id}>
                            <div>
                                <span className="text-stoneGray text-sm pb-1 leading-normal block">{comment.text}</span>
                                <span className='text-sm text-saddleBrown'>{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
                            </div>
                                <MdDeleteForever className="min-w-max cursor-pointer text-saddleBrown" size={25} onClick={() => handleDelete(comment.id)}/>
                        </div>
                    ))
                ) : (
                        <div className="min-h-96 bg-frostWhite">
                            {!isCommentsLoading && !successMsg && <p className='p-4'>No Comments.</p>}
                        </div>
                )}
                {successMsg && <p className="success text-center place-self-center absolute bottom-2">{successMsg}</p>}
                {errorMsg && <p className="error place-self-center">{errorMsg}</p>}
            </div>
    </div>

  )
}

export default CommentList
