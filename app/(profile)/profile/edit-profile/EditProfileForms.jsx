"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useCallback } from "react"

// custom hooks
import { useFetchUser } from '@/app/hooks/useFetchUser';
import { useFetchProfile } from '@/app/hooks/useFetchProfile';
import { useMessage } from '@/app/hooks/useMessage';

// components
import AvatarUploader from '../../../components/AvatarUploader';
import BioForm from './BioForm';
import FirstNameForm from './FirstNameForm';
import EmailForm from './EmailForm';
import LastNameForm from './LastNameForm';
import PhoneForm from './PhoneForm';
import DobForm from './DobForm';



const EditProfileForms = () => {

    // custom hook to fetch user
    const { user } = useFetchUser()
    // custom hook to fetch profile
    const { profile, fetchProfile } = useFetchProfile()
    // global messages function
    const { changeMessage } = useMessage()
  


    // Memoize fetchProfile using useCallback
    const memoizedFetchProfile = useCallback(async () => {
        if (user && !profile) {
            const profileResult = await fetchProfile(user);
            if (!profileResult) {
                changeMessage('error', "Sorry, we couldn't load some of your profile information at this time. Please check your internet connection or refresh the page. If the issuse persist, contact support.");
            }
        }
    }, [user, fetchProfile, changeMessage]);

    useEffect(() => {
        memoizedFetchProfile();
    }, [memoizedFetchProfile]);




    // update user avatar in profiles table
    const updateProfile = async ({ avatar_url }) => {
        try {
            const profileData = {
                id: user.id,
                avatar_url,
                updated_at: new Date().toISOString(),
                last_avatar_update_at: new Date().toISOString()
            }
            
            const supabase = createClientComponentClient()
            const { error } = await supabase.from('profiles').upsert(profileData)

            if (error) {
                throw new Error(error.message)
            }
            return { success: true }

        } catch (error) {
            console.log('profile update error:', error.message)
            return { success: false }
        }
    }



    
    return (
        <div className='flex flex-col gap-6'>
            
            <div className='mt-4 h-[500px] bg-softCharcoal p-4'>
                <AvatarUploader
                    user={user}
                    updateProfile={updateProfile}
                    text='Personalize your account by uploading your own avatar'
                    btnColor='bg-saddleBrown'
                    show3DAvatar={false}
                />
            </div>


            <div className='flex flex-col bg-softCharcoal p-4'>
                <BioForm
                    user={user}
                    profile={profile}
                    changeMessage={changeMessage}
                    fetchProfile={fetchProfile}
                />

                <FirstNameForm
                    user={user}
                    profile={profile}
                    changeMessage={changeMessage}
                    fetchProfile={fetchProfile}
                />

                <LastNameForm
                    user={user}
                    profile={profile}
                    changeMessage={changeMessage}
                    fetchProfile={fetchProfile}
                />

                <DobForm
                    user={user}
                    profile={profile}
                    changeMessage={changeMessage}
                    fetchProfile={fetchProfile}
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
        </div>
    )
}

export default EditProfileForms
