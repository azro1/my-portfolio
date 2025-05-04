"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useCallback, useRef } from "react"
import { useRouter } from 'next/navigation';

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
import Heading from '@/app/components/Heading';

// server actions
import { getProFlag } from '@/app/actions';
import { deleteProFlag } from '@/app/actions';



const EditProfileForms = () => {

    const { user } = useFetchUser()
    const { profile, fetchProfile } = useFetchProfile()
    const { changeMessage } = useMessage()
    const hasDeletedProFlag = useRef(false);
    const router = useRouter()





    // refresh if user is redirected back from otp form 
    useEffect(() => {
        const refreshAfterVerify = async() => {
            const hasVerified = await getProFlag();

            if (hasVerified) {
                router.refresh();
            }

            if (!hasDeletedProFlag.current) {
                await deleteProFlag();
                hasDeletedProFlag.current = true;
            }
        }
        refreshAfterVerify();
    }, [router])
  





    // Memoize fetchProfile using useCallback
    const memoizedFetchProfile = useCallback(async () => {
        if (user && !profile) {
            const profileResult = await fetchProfile(user);
            if (!profileResult) {
                changeMessage('error', "Sorry, we couldn't load some of your profile information at this time. Please check your internet connection or refresh the page. If the issuse persist, contact support.");
            }
        }
    }, [user, profile, fetchProfile, changeMessage]);

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
        <div className='flex flex-col'>
            
            <div className='mt-6 p-4 bg-nightSky '>
                <AvatarUploader
                    user={user}
                    updateProfile={updateProfile}
                    btnColor='bg-goldenOchre'
                    show3DAvatar={false}
                />
            </div>

            <div className='pt-16'>
              <Heading className='text-cloudGray font-semibold text-1.375 md:text-2xl'>
                  Basic Information
              </Heading>
              <p className='mt-3 leading-normal text-charcoalGrayLight'>Update your personal information</p>

              <div className='mt-6 bg-nightSky p-4'>
                <BioForm
                    user={user}
                    profile={profile}
                    changeMessage={changeMessage}
                    fetchProfile={fetchProfile}
                />
                <div className='bg-charcoalGray h-[1px]'></div>

                <FirstNameForm
                    user={user}
                    profile={profile}
                    changeMessage={changeMessage}
                    fetchProfile={fetchProfile}
                />
                <div className='bg-charcoalGray h-[1px]'></div>


                <LastNameForm
                    user={user}
                    profile={profile}
                    changeMessage={changeMessage}
                    fetchProfile={fetchProfile}
                />
                <div className='bg-charcoalGray h-[1px]'></div>

                <DobForm
                    user={user}
                    profile={profile}
                    changeMessage={changeMessage}
                    fetchProfile={fetchProfile}
                />
                <div className='bg-charcoalGray h-[1px]'></div>

                <EmailForm 
                    user={user}
                    profile={profile}
                />
                <div className='bg-charcoalGray h-[1px]'></div>

                <PhoneForm
                    user={user}
                    profile={profile}
                />
            </div>
            </div>

        </div>
    )
}

export default EditProfileForms
