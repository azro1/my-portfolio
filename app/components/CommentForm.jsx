import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useMessage } from "../hooks/useMessage";



const CommentForm = ({ user, profile, updateComments }) => {
    const [isLoading, setIsLoading] = useState(false);

    const { changeMessage } = useMessage()
 


    // react-hook-form
    const form = useForm()

    // allows us to register a form control
    const { register, handleSubmit, formState, reset } = form;
    const { errors } = formState;







    
    // send comment to sever api endpoint
    const handleComment = async (data) => {

        const sanitizeInput = (input) => {
            return input.replace(/[&<>]/g, (char) => {
                const entityMap = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                };
                return entityMap[char] || char;
            });
        };
          
        const comment = sanitizeInput(data.comment)
        // console.log(comment)
  

        if (!profile) {
            setIsLoading(false)
            changeMessage('error', "An error occured at our end and we're fixing it. Please try again later. If the issue persists, contact support.");
            return
        }


        try {
          setIsLoading(true);

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
            reset({ comment: '' })
          }
      
        } catch (error) {
            setIsLoading(false)
            changeMessage('error', error.message)
        }
    };









    return (
        <div className="">
                {user && (
                    <div>
                        <form onSubmit={handleSubmit(handleComment)}>
                            <label className='text-xl font-b text-saddleBrown sr-only' htmlFor='comment'>Leave a Comment</label>
                            <input
                                id='comment'
                                spellCheck='false'
                                {...register('comment', {
                                    required: 'Comment is required'
                                })}
                                placeholder="Tell us what's on your mind..."
                                className='mt-3 p-3 w-full outline-none text-base rounded-md text-stoneGray bg-softCharcoal border-[1px] border-ashGray block'
                            ></input>

                            <p className='text-red-600 text-sm mt-1'>{errors.comment?.message}</p>       

                            <button className='btn block mt-2.5 bg-saddleBrown' disabled={isLoading}>
                                {isLoading ? (
                                    <div className='flex items-center gap-2'>
                                        <img className="w-5 h-5 opacity-50" src="../images/loading/spinner.svg" alt="Loading indicator" />
                                        <span>Post</span>
                                    </div>
                                ) : (
                                    'Post'
                                )}
                            </button>
                        </form>
                    </div>
                )}
        </div>
    )
}

export default CommentForm
