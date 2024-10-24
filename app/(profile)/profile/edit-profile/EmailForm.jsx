"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"


// components
import Modal from './Modal'


const EmailForm = ({ user, profile }) => {
    const [email, setEmail] = useState('')
    const [draftEmail, setDraftEmail] = useState('');
    const [formError, setFormError] = useState(null)
    const [isUpdating, setIsUpdating] = useState(false)
    const [showForm, setShowForm] = useState(false)

    const router = useRouter();

    
    useEffect(() => {
        router.refresh();
        // clear cookie from server if user navigates back to this page so they have to enter email again to get new otp
        document.cookie = "canAccessOtpPage=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      }, [router]);


    // populate form fields from profiles table
    useEffect(() => {
        if (user && profile) {
            setEmail(profile.email || '')
            setDraftEmail(profile.email || '')
        }
    }, [user, profile]);


    const handleEmailUpdate = async () => {
        setFormError(null)
        setIsUpdating(true)

        // check if a given string is a valid email address
        const isValidEmail = (value) => {
            const emailRegex = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', 'u');
            return emailRegex.test(value);
        }

        if (!draftEmail) {
            setIsUpdating(false)
            setFormError('Please enter your new email address.')
            setTimeout(() => setFormError(null), 2000)
            return
        } else if (!isValidEmail(draftEmail)) {
            setIsUpdating(false)
            setFormError('Please enter a valid email address.')
            setTimeout(() => setFormError(null), 2000)
            return;
        } else if (email === draftEmail.trim()) {
            setIsUpdating(false)
            setFormError('Please update your email before saving.')
            setTimeout(() => setFormError(null), 2000)
            return;
        } else {

            try {
                const emailToLowercase = draftEmail.trim().toLowerCase();

                // store email temporarily in local storage
                localStorage.setItem('email', emailToLowercase);

                const res = await fetch(`${location.origin}/api/auth/email-update`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                            email: emailToLowercase
                        })
                })

                const serverEmail = await res.json();

                if (!res.ok && serverEmail.error) {
                    throw new Error(error.message)
                } else if (res.status === 200 && !serverEmail.error) {
                    router.push('/profile/verify-email-otp')
                }
                
              
            } catch (error) {
                setIsUpdating(false)
                // clear cookie if there's an error that comes back from server
                document.cookie = "canAccessOtpPage=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                setFormError('An unexpected error occurred while updating your email. Please try again later. If the issue persists, contact support.')
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
        setFormError(null)
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
                            <span className='block mb-3 text-xl'>
                                Edit Email Address
                            </span>
                            <p className='mb-3'>Please provide your new email address, ensuring it follows a valid format (e.g., example@domain.com). This email will be used for account verification and notifications.</p>
                            <input
                                className='w-full p-2.5 rounded-md border-2'
                                type='email'
                                value={draftEmail || ''}
                                placeholder='Email'
                                maxLength={40}
                                spellCheck={false}
                                autoFocus={true}
                                onChange={(e) => setDraftEmail(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </label>
                    </form>
                    <div className='flex items-center'>
                        <button className='btn-small bg-saddleBrown mt-3 mr-2' onClick={handleCloseForm}>Cancel</button>
                        <button className={`btn-small bg-saddleBrown mt-3`} onClick={handleEmailUpdate}>
                            {isUpdating ? (
                                <div className='flex items-center gap-2'>
                                    <img className="w-5 h-5 opacity-50" src="../../images/loading/spinner.svg" alt="Loading indicator" />
                                    <span>Save</span>
                                </div>
                            ) : (
                                'Save'
                            )}
                        </button>
                    </div>
                    {formError && <p className='modal-form-error'>{formError}</p>}
                </Modal>
            )}

        </div>

    )
}

export default EmailForm