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
import NameForm from './NameForm';
import EmailForm from './EmailForm';






const UpdateProfile = () => {
    // const [phone, setPhone] = useState(null)
    const [updating, setUpdating] = useState(false)
    const [updateError, setUpdateError] = useState(null)
    const [updateSuccess, setUpdateSuccess] = useState(null)

    // custom hook to fetch user
    const { user } = useFetchUser()
    
    // custom hook to fetch profile
    const { error: profileError, profile, fetchProfile } = useFetchProfile()

    // custom hook to update comments after user updates personal info
    const { updateComments } = useUpdateComments()
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

            if (first_name || last_name) {
                setUpdateSuccess('Profile updated!')
                await updateComments(user, undefined, first_name)  // pass first_name to updateComments
                // await updateUserData(first_name)
            }

        } catch (error) {
            setUpdateError('First names must be at least 3 characters long.')
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

            <NameForm
                user={user}
                profile={profile}
                profileError={profileError}
                updateProfile={updateProfile}
                updateError={updateError}
                updateSuccess={updateSuccess}
                updating={updating}
            />

            <EmailForm 
                user={user}
                profile={profile}
                profileError={profileError}

            />


        </div>
    )
}

export default UpdateProfile
