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
        <div className="w-full">
                {user && (
                    <div>
                        <form onSubmit={handleSubmit(handleComment)}>
                            <label className='text-xl font-b text-goldenOchre sr-only' htmlFor='comment'>Leave a Comment</label>
                            <input
                                id='comment'
                                spellCheck='false'
                                {...register('comment', {
                                    required: 'Comment is required'
                                })}
                                placeholder="Tell us what's on your mind..."
                                className='py-3 px-4 w-full outline-none text-base rounded-md text-cloudGray bg-charcoalGray block'
                            ></input>
                        </form>
                    </div>
                )}
        </div>
    )
}

export default CommentForm
