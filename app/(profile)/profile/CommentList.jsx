"use client"

import { useState, useEffect } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { FaTrashAlt } from "react-icons/fa";

const CommentList = () => {
    const [user, setUser] = useState(null);
    const [comments, setComments] = useState(null)
    const [deleteMsg, setDeleteMsg] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    const supabase = createClientComponentClient();


    useEffect(() => {
      async function getUser() {
        try {
          const {data: { user }, error} = await supabase.auth.getUser();
          if (error) {
            throw new Error(error.message);
          }
          if (user) {
            setUser(user);
          }
        } catch (error) {
            console.log(error.massage);
        }
      }
      getUser();
   }, []);

   

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
    <div className='flex-1'>
        <h3 className='mb-4 text-lg font-rubik text-secondary'>Comments</h3>
            <div className={`flex flex-col gap-3 text-left md:px-3 ${comments && comments.length > 0 ? 'lg:pt-3' : 'lg:pt-0' } lg:px-0`} >
                {comments && comments.length > 0 ? (
                    comments.map(comment => (
                        <div className='flex items-start justify-between gap-2 p-4 border-2 border-secondary' key={comment.id}>
                            <div>
                                <p>{comment.text}</p>
                                <span className='text-xs text-hint'>{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
                            </div>

                            <FaTrashAlt className="min-w-max cursor-pointer text-hint" size={20} onClick={() => handleDelete(comment.id)}/>
                        </div>
                    ))
                ) : (
                    <>
                        {!deleteMsg && (
                            <p className='text-center pt-0'>No comments.</p>
                        )}
                    </>

                )}
                {deleteMsg && <p className="place-self-center">{deleteMsg}</p>}
                {errorMsg && <p className="error place-self-center">{errorMsg}</p>}
            </div>
    </div>

  )
}

export default CommentList
