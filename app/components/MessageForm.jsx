import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useMessage } from "../hooks/useMessage";



const MessageForm = ({ user, profile, updateMessages }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { changeMessage } = useMessage()
 


    // react-hook-form
    const form = useForm()

    // allows us to register a form control
    const { register, handleSubmit, formState, reset } = form;
    const { errors } = formState;







    
    // send message to sever api endpoint
    const handleMessage = async (data) => {

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
          
        const message = sanitizeInput(data.message)
        // console.log(message)
  

        if (!profile) {
            setIsLoading(false)
            changeMessage('error', "An error occured at our end and we're fixing it. Please try again later. If the issue persists, contact support.");
            return
        }


        try {
          setIsLoading(true);

          const res = await fetch(`${location.origin}/api/messages`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              profile,
              message
            })
          })  
    
          // handle response
          const serverResponse = await res.json()
    
          if (serverResponse.error) {
            throw new Error("We're having trouble saving your message right now. Please try again in a bit. If the issue persists, contact support.");
          }
    
          if (serverResponse.data) {
            setIsLoading(false)
            updateMessages(serverResponse.data);
            reset({ message: '' })
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
                        <form onSubmit={handleSubmit(handleMessage)}>
                            <input
                                id='chatinput'
                                spellCheck='false'
                                {...register('message', {
                                    required: 'Message is required'
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

export default MessageForm
