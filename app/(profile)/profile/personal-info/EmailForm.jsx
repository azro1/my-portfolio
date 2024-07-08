"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";



const EmailForm = ({ user, profile, profileError }) => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const supabase = createClientComponentClient()




    // populate form fields from profiles table
    useEffect(() => {
        if (user && profile) {
            setEmail(profile.email)
        }
    }, [user, profile])



    const handleEmailUpdate = async (e) => {
        e.preventDefault()

        if (profile.email !== email) {
          localStorage.setItem('newEmail', email)
          
        } else {
            setError('Please change your email address.')
            setTimeout(() => setError(''), 2000)
            return;
        }

        try {
            setIsLoading(true)
            const { data, error } = await supabase.auth.updateUser({
                email,
                options: {
                    emailRedirectTo: `${location.origin}/profile/confirm/email`
                }
            })

            if (error) {
                throw new Error(error.message)
            }

            if (data) {
                router.push('/verify/email')
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }

    }



    return (
        <form >
            <label>
                <span className='max-w-min mt-4 mb-2 text-sm font-os text-secondary block'>
                    Email
                </span>
                <input
                    className='w-full p-2.5 rounded-md'
                    type='url'
                    value={email || ''}
                    placeholder='Email'
                    spellCheck='false'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>

            {profileError && <div className='error mt-2'>* {profileError}</div>}
            {error && <div className='error mt-2'>* {error}</div>}

            <button className={`btn block bg-hint mt-3`} onClick={handleEmailUpdate}>
                {isLoading ? 'Loading...' : 'Update Email'}
            </button>

            {/* {updateError && <div className='error mt-2'>* {updateError}</div>}
            {updateSuccess && <div className='success mt-2'>* {updateSuccess}</div>}
            <button className={`btn block bg-hint ${updateError || updateSuccess ? 'mt-2' : 'mt-3'}`} onClick={handleEmailUpdate} >
                {updating ? 'Updating...' : 'Update Email'}
            </button> */}
        </form>
    )
}

export default EmailForm