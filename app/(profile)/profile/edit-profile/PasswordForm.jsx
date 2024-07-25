"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react"
import { useRouter } from "next/navigation"


// components
import Modal from "./Modal";

const PasswordForm = () => {
    const [email, setEmail] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [formError, setFormError] = useState(null)
    const [showForm, setShowForm] = useState(false)
    
    const router = useRouter()
    const supabase = createClientComponentClient()

    


    // Confirm email address
    const handleSendEmail = async () => {     
        if (!email.trim()) {
            setIsSending(false)
            setFormError('Please enter your email address')
            setTimeout(() => setFormError(null), 2000)
            return
        }

        setIsSending(true)

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${location.origin}/profile/update/update-password`
        })

        if (error) {
            setIsSending(false)
            setFormError(error.message)
            setTimeout(() => setFormError(''), 2000)
            return;
          }
      
          if (!error) {
            router.push('/verify/email-for-update-password-instructions')
          }
    }
    

    // handleOpenForm function
    const handleOpenForm = () => {
        setShowForm(true)
        setIsSending(false)
    }


    // handleCloseForm function
    const handleCloseForm = () => {
        setShowForm(false)
    }

    // prevent enter submission
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }


    return (
        <div>

            <div className="max-w-xs">
                <div className="flex items-center justify-between pb-1">
                    <span className="inline-block text-accentRed">Password</span>
                    <span className="text-accentRed cursor-pointer" onClick={handleOpenForm}>
                        Edit
                    </span> 
                </div>
                <p className="text-stoneGray">*********</p>
            </div>

            {showForm && (
                <Modal >
                    <form >
                        <label>
                        <p className="mb-2 text-stoneGray">
                            To update your password, please enter your email for verification.
                        </p>
                            <span className="block mb-2 text-xl">
                                Email
                            </span>
                            <input
                                className='w-full p-2.5 rounded-md border-2'
                                type='text'
                                value={email || ''}
                                placeholder='Email'
                                autoFocus='true'
                                spellCheck='false'
                                maxLength={'40'}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </label>
                    </form>
                    <button className='btn bg-accentRed mt-3 mr-2' onClick={handleCloseForm}>Cancel</button>
                    <button className='btn bg-accentRed mt-3' onClick={handleSendEmail}>
                        {isSending ? 'Sending...' : 'Send'}
                    </button>
                    {( formError) && (
                        <div className="absolute">
                            <p className='modal-form-error'>* {formError}</p>
                        </div>
                    )}
                </Modal>
            )}
        </div>
    )
}

export default PasswordForm
