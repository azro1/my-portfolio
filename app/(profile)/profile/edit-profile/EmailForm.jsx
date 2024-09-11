"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"


// components
import Modal from './Modal'


const EmailForm = ({ user, profile, profileError }) => {
    const [email, setEmail] = useState('')
    const [draftEmail, setDraftEmail] = useState('');
    const [formError, setFormError] = useState(null)
    const [isSending, setIsSending] = useState(false)
    const [showForm, setShowForm] = useState(false)


    const router = useRouter()
    const supabase = createClientComponentClient()



    // populate form fields from profiles table
    useEffect(() => {
        if (user && profile) {
            setEmail(profile.email || '')
            setDraftEmail(profile.email || '')
        }
    }, [user, profile])



    const handleEmailUpdate = async () => {
        setFormError(null)

        // check if a given string is a valid email address
        const isValidEmail = (value) => {
            const emailRegex = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', 'u');
            return emailRegex.test(value);
        }

        if (!isValidEmail(draftEmail)) {
            setFormError('Please enter a valid email address')
            setTimeout(() => setFormError(''), 2000)
            return;
        } else if (profile.email === draftEmail.trim()) {
            setFormError('Please change your email address')
            setTimeout(() => setFormError(''), 2000)
            return;
        } else {




        // sent email to server endpoint to check if email already exists within profiles table
        try {
            setIsSending(true)
            const res = await fetch(`${location.origin}/api/auth/email-exists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: draftEmail
                })
            })
    
            // await json response from server and store in const userEmail
            const userEmail = await res.json()    
    
            if (res.status === 409) {
                setIsSending(false)
                setFormError('This email is already associated with an account')
                return
    
            } else if (userEmail.error) {
                setIsSending(false)
                setFormError(userEmail.error)
                return
    
            } else if (!userEmail.exists && res.status === 404) {
                
                // store email temporarily in local storage
                localStorage.setItem('email', draftEmail)

                const { data, error } = await supabase.auth.updateUser({
                    email: draftEmail,
                })
                
                if (error) {
                    throw new Error(error.message)
                }

                if (data) {
                    router.push('/profile/verify-email-update-otp')
                }
            }

        } catch(error) {
            console.log(error.message)
        }

        }
    }










    // handleOpenForm function
    const handleOpenForm = () => {
        setShowForm(true)
    }


    // handleCloseForm function
    const handleCloseForm = () => {
        setShowForm(false)
        setDraftEmail(email)
    }

    // prevent enter submission
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }


    return (
        <div>

            <div className='my-4'>
                <div className="flex items-center justify-between pb-1">
                    <span className="inline-block text-stoneGray">Email</span>
                    <span className="text-red-600 cursor-pointer" onClick={handleOpenForm}>Edit</span>
                </div>
                <p className="text-nightSky frostWhitespace-normal break-words">{email}</p>
            </div>

            <div className='bg-cloudGray h-px'></div>

            {showForm && (
                <Modal>
                    <form >
                        <label>
                            <span className='block mb-2 text-xl'>
                                Edit Email
                            </span>
                            <input
                                className='w-full p-2.5 rounded-md border-2'
                                type='email'
                                value={draftEmail || ''}
                                placeholder='Email'
                                maxLength={40}
                                spellCheck='false'
                                autoFocus='true'
                                onChange={(e) => setDraftEmail(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </label>
                    </form>
                    <button className='btn bg-deepOlive mt-3 mr-2' onClick={handleCloseForm}>Cancel</button>
                    <button className={`btn bg-deepOlive mt-3`} onClick={handleEmailUpdate}>
                        {isSending ? 'Updating...' : 'Submit'}
                    </button>
                    {(profileError || formError) && (
                        <div className="absolute">
                            <p className='modal-form-error'>* {profileError || formError}</p>
                        </div>
                    )}
                </Modal>
            )}

        </div>

    )
}

export default EmailForm