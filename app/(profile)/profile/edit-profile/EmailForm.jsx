"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

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
            localStorage.setItem('newEmail', draftEmail)
        }

        try {
            setIsSending(true)
            const { data, error } = await supabase.auth.updateUser({
                email: draftEmail,
                options: {
                    emailRedirectTo: `${location.origin}/profile/confirm/password-for-email-update`
                }
            })

            if (error) {
                throw new Error(error.message)
            }

            if (data) {
                setEmail(draftEmail)
                router.push('/verify/email-for-update-email-instructions')
            }
        } catch (error) {
            setIsSending(false)
            setFormError(error.message)
            console.log(error.message)
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
                    <button className='btn bg-accentRed mt-3 mr-2' onClick={handleCloseForm}>Cancel</button>
                    <button className={`btn bg-accentRed mt-3`} onClick={handleEmailUpdate}>
                        {isSending ? 'Sending...' : 'Submit'}
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