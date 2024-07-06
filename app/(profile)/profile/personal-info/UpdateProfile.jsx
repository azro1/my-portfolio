"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from "react"

// custom hooks
import { useFetchUser } from '@/app/hooks/useFetchUser';
import { useFetchProfile } from '@/app/hooks/useFetchProfile';
import { useUpdateComments } from '@/app/hooks/useUpdateComments';

// components
import AvatarUploader from './AvatarUploader';
import BioForm from './BioForm';






const UpdateProfile = () => {
    // custom hook to fetch user
    const { user } = useFetchUser()
    
    // custom hook to fetch profile
    const { error: profileError, profile, fetchProfile } = useFetchProfile()

    // custom hook to update comments after user updates personal info
    const { updateComments } = useUpdateComments()


    const [first_name, setFirstName] = useState(null)
    const [last_name, setLastName] = useState(null)
    const [email, setEmail] = useState(null)
    const [phone, setPhone] = useState(null)
    const [updating, setUpdating] = useState(false)
    const [updateError, setUpdateError] = useState(null)
    const [updateSuccess, setUpdateSuccess] = useState(null)


    const supabase = createClientComponentClient()






    // make sure we have a user before calling fetchProfile
    useEffect(() => {
        if (user) {
            async function getUserProfile() {
                await fetchProfile(user)
            }
            getUserProfile()
        }
    }, [user])






    // populate form fields with profiles info from supabase
    useEffect(() => {
        if (user && profile) {
            setFirstName(profile.first_name || user.user_metadata.full_name)
            setEmail(profile.email)
        }
    }, [user, profile])




    



  // users can edit the state values in the form input fields and then when the form is submitted we call this function to update the profiles table in supabase
    const updateProfile = async ({
        first_name,
        last_name,
        avatar_url,
        email,
    }) => {

        try {
            setUpdateError(null)
            setUpdating(true)

            const updatedProfile = {
                id: user.id,
                first_name,
                last_name,
                avatar_url,
                email,
                updated_at: new Date().toISOString(),
            }

            const { error } = await supabase.from('profiles').upsert(updatedProfile)

            if (error) {
                throw new Error(error.message)
            }

            if (first_name || last_name || email) {
                setUpdateSuccess('Profile updated!')
                await updateComments(user, undefined, first_name)  // pass first_name to updateComments
                // await updateUserData(first_name)
            }

        } catch (error) {
            setUpdateError('Please enter your profile info. First names must be at least 3 characters long.')
            console.log(error.message)
        } finally {
            setUpdating(false)

            function clearUpdateMsgs() {
                setUpdateSuccess('')
                setUpdateError('')
            }
            setTimeout(clearUpdateMsgs, 2000)
        }
    }






    return (
        <div className='w-1/2 bg-yellow-800'>

            <AvatarUploader
                user={user}
                updateProfile={updateProfile}
            />

            <BioForm
                user={user}
            />

            <form >
                <label>
                    <span className='mt-4 mb-2 text-sm font-os text-secondary block'>
                        First Name
                    </span>
                    <input
                        className='w-full p-2.5 rounded-md'
                        type='text'
                        value={first_name || ''}
                        placeholder='First Name'
                        spellCheck='false'
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>
                <label>
                    <span className='mt-4 mb-2 text-sm font-os text-secondary block'>
                        Last Name
                    </span>
                    <input
                        className='w-full p-2.5 rounded-md'
                        type='text'
                        value={last_name || ''}
                        placeholder='Last Name'
                        spellCheck='false'
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </label>
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
                {updateError && <div className='error mt-2'>* {updateError}</div>}
                {updateSuccess && <div className='success mt-2'>* {updateSuccess}</div>}
            </form>
            <button
                className={`btn block bg-hint ${updateError || updateSuccess ? 'mt-2' : 'mt-3'
                    }`}
                onClick={() => updateProfile({ first_name, last_name, email })}
            >
                {updating ? 'Updating...' : 'Update'}
            </button>
        </div>
    )
}

export default UpdateProfile
