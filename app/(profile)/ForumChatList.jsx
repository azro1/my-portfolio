"use client"

import { useState, useEffect } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { FiTrash2 } from "react-icons/fi";

// components
import Heading from "../components/Heading";

// hooks
import { useMessage } from "@/app/hooks/useMessage";

const CommentList = ({ user }) => {
  const [error, setError] = useState(false)
  const [comments, setComments] = useState(null)
  const [isCommentsLoading, setIsCommentsLoading] = useState(true)

  // hooks
  const { changeMessage } = useMessage()

  const supabase = createClientComponentClient();

  

  // get user comments
  useEffect(() => {

    async function getComments() {
      try {
        if (user) {
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
        }
      } catch (error) {
        setError(true)
        changeMessage('error', 'We encountered an issue while fetching your comments. Try refreshing the page. Please reach out to support if the issue persists.')
        console.log(error.message);
      } finally {
        setIsCommentsLoading(false)
      }
    }
    getComments();
  }, [changeMessage, user, supabase])



  // Subscription to realtime changes on comments table
  useEffect(() => {
    const channel = supabase.channel('realtime comments').on('postgres_changes', {
      event: 'DELETE',
      schema: 'public',
      table: 'comments'
    }, (payload) => {
      if (payload) {
        setComments(prevComments => prevComments.filter(comment => comment.id !== payload.old.id));
        changeMessage('success', 'Comment deleted!')
      }
    }).subscribe()

    return () => supabase.removeChannel(channel)
  }, [user, supabase, changeMessage])





  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id)
      .select()

    if (error) {
      changeMessage('error', "An unexpected error occurred your comment couldn't be deleted. Please try again later or contact support if the issue persists.");
      console.log(error.message)
    }
  }




  return (
    <div>
        <Heading className='text-lg font-medium text-cloudGray mb-3'>
            Chat History
        </Heading>
            {!error ? (
                <div className={`flex flex-col text-left min-h-96 max-h-96 overflow-y-scroll hide-scrollbar md:max-w-md relative bg-softCharcoal ${comments === null ? 'p-0' : 'p-4'} gap-4`}>
                    {comments && comments.length > 0 ? (
                        comments.map(comment => (
                            <div className='flex items-start justify-between' key={comment.id}>
                                <div className='flex-1 flex flex-col'>
                                    <span className="text-stoneGray text-base leading-normal block">{comment.text}</span>
                                    <span className='text-sm text-frostWhite filter brightness-80'>{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
                                </div>
                                <FiTrash2 className="min-w-max cursor-pointer text-goldenOchre" size={22} onClick={() => handleDelete(comment.id)}/>
                            </div>
                        ))
                    ) : (
                            <div className="min-h-96 bg-softCharcoal">
                                {!isCommentsLoading && <p className='text-ashGray p-4'>No Chats.</p>}
                            </div>
                    )}
                </div>
            ) : (
              <p className='p-4'>Currently unable to display comments. Try refreshing the page.</p>
            )}
    </div>

  )
}

export default CommentList
