"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from "react"

// custom hooks
import { useFetchUser } from '@/app/hooks/useFetchUser';
import { useFetchProfile } from '@/app/hooks/useFetchProfile';

// components
import AvatarUploader from './AvatarUploader';
import BioForm from './BioForm';
import FirstNameForm from './FirstNameForm';
import EmailForm from './EmailForm';
import LastNameForm from './LastNameForm';
import PhoneForm from './PhoneForm';
import DobForm from './DobForm';






const EditProfilePage = () => {
    const [updateError, setUpdateError] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null)


    // custom hook to fetch user
    const { user } = useFetchUser()
    // custom hook to fetch profile
    const { error: profileError, profile, fetchProfile } = useFetchProfile()

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



    // update users avatar in profiles table
    const updateProfile = async ({ avatar_url }) => {
        try {
            const profileData = {
                id: user.id,
                avatar_url,
                updated_at: new Date().toISOString(),
            }

            const { error } = await supabase.from('profiles').upsert(profileData)

            if (error) {
                throw new Error(error.message)
            }
            
        } catch (error) {
            setUpdateError('Failed to upload avatar.')
            console.log(error.message)
        } finally {
            setTimeout(() => setUpdateError(null), 2000)    
        }
    }

    

    // function to display messages
    const displayMsgs = (msg) => {
        if (msg) {
            setSuccessMsg(msg)
            setTimeout(() => setSuccessMsg(null), 2000)

        }
    }




    return (
        <div className='flex flex-col gap-6'>
            
          {successMsg && <div className='absolute top-1/2  success text-center'>{successMsg}</div>}

            <div className='mt-6 bg-frostWhite p-4'>
                <AvatarUploader
                    user={user}
                    updateProfile={updateProfile}
                    text='Personalize your account by uploading your own avatar'
                    updateError={updateError}
                    btnColor='bg-nightSky'
                    show3DAvatar={false}
                />
            </div>
 
            <div className='bg-frostWhite p-4'>
                <BioForm
                    user={user}
                    profile={profile}
                />
            </div>

            <div className='flex flex-col bg-frostWhite p-4'>
                <FirstNameForm
                    user={user}
                    profile={profile}
                />

                <LastNameForm
                    user={user}
                    profile={profile}
                />

                <DobForm
                    user={user}
                    profile={profile}
                    displayMsgs={displayMsgs}
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
