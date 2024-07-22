"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from "react"

// custom hooks
import { useFetchUser } from '@/app/hooks/useFetchUser';
import { useFetchProfile } from '@/app/hooks/useFetchProfile';
import { useUpdate } from '@/app/hooks/useUpdate';

// components
import AvatarUploader from './AvatarUploader';
import BioForm from './BioForm';
import FirstNameForm from './FirstNameForm';
import EmailForm from './EmailForm';
import LastNameForm from './LastNameForm';
import PhoneForm from './PhoneForm';
import DobForm from './DobForm';
import AgeForm from './AgeForm';
import PasswordForm from './PasswordForm';






const UpdateProfile = () => {
    // const [phone, setPhone] = useState(null)
    const [updating, setUpdating] = useState(false)
    const [updateError, setUpdateError] = useState(null)

    // custom hook to fetch user
    const { user } = useFetchUser()
    
    // custom hook to fetch profile
    const { error: profileError, profile, fetchProfile } = useFetchProfile()

    // custom hook to update comments after user updates personal info
    const { updateTable } = useUpdate()

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

            let tableData = {
                first_name,
                avatar_url: undefined
            }
            await updateTable(user, 'comments', tableData, 'comment_id') // pass in params to updateTable function from generic custom hook useUpdate to update comments table
            

        } catch (error) {
            setUpdateError('First names must be at least 3 characters long.')
            console.log(error.message)
        } finally {
            setTimeout(() => setUpdateError(null), 2000)    
        }
    }






    return (
        <div className='flex flex-col gap-12 relative'>
          
          
            <AvatarUploader
                user={user}
                updateProfile={updateProfile}
            />

            <BioForm
                user={user}
                profile={profile}
            />

            <FirstNameForm
                user={user}
                profile={profile}
            />

            <LastNameForm
                user={user}
                profile={profile}
            />

            <AgeForm
                user={user}
                profile={profile}
            />

            <DobForm
                user={user}
                profile={profile}
            />

            <EmailForm 
                user={user}
                profile={profile}
                profileError={profileError}
            />

            <PhoneForm
                user={user}
                profile={profile}
            />

            <PasswordForm />


        </div>
    )
}

export default UpdateProfile
