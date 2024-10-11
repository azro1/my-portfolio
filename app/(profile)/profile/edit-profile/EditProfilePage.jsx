"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from "react"

// custom hooks
import { useFetchUser } from '@/app/hooks/useFetchUser';
import { useFetchProfile } from '@/app/hooks/useFetchProfile';
import { useMessage } from '@/app/hooks/useMessage';

// components
import AvatarUploader from './AvatarUploader';
import BioForm from './BioForm';
import FirstNameForm from './FirstNameForm';
import EmailForm from './EmailForm';
import LastNameForm from './LastNameForm';
import PhoneForm from './PhoneForm';
import DobForm from './DobForm';



const EditProfilePage = () => {

    // custom hook to fetch user
    const { user } = useFetchUser()
    // custom hook to fetch profile
    const { error: profileError, profile, fetchProfile } = useFetchProfile()
    // global messages function
    const { changeMessage } = useMessage()
  

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


    // function to display global messages
    const displayGlobalMsg = (type, message) => {
        if (message) {
            changeMessage(type, message)
        }
    }


    return (
        <div className='flex flex-col gap-6'>
            
            <div className='mt-6 bg-frostWhite p-4'>
                <AvatarUploader
                    user={user}
                    text='Personalize your account by uploading your own avatar'
                    btnColor='bg-nightSky'
                    show3DAvatar={false}
                    displayGlobalMsg={displayGlobalMsg}
                />
            </div>
 
            <div className='bg-frostWhite p-4'>
                <BioForm
                    user={user}
                    profile={profile}
                    displayGlobalMsg={displayGlobalMsg}
                />
            </div>

            <div className='flex flex-col bg-frostWhite p-4'>
                <FirstNameForm
                    user={user}
                    profile={profile}
                    displayGlobalMsg={displayGlobalMsg}
                />

                <LastNameForm
                    user={user}
                    profile={profile}
                    displayGlobalMsg={displayGlobalMsg}
                />

                <DobForm
                    user={user}
                    profile={profile}
                    displayGlobalMsg={displayGlobalMsg}
                />

                <EmailForm 
                    user={user}
                    profile={profile}
                />

                <PhoneForm
                    user={user}
                    profile={profile}
                />
            </div>
            
            {profileError && <div className='error'>{profileError}</div>}
        </div>
    )
}

export default EditProfilePage
