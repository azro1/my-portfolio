"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";



// components
import AvatarUploader from "@/app/components/AvatarUploader";
import Button from '@/app/components/Button';

// hooks
import { useUpdateTable } from '@/app/hooks/useUpdateTable';


// server action
import { setUploadAvatarFlag } from '@/app/actions';





const UploadAvatar = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const supabase = createClientComponentClient()
    const { updateTable } = useUpdateTable();







 
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data, error } = await supabase.auth.getUser();
                if (error) {
                    console.error("Error fetching user:", error.message);
                    setUser(null);
                    return;
                }
                setUser(data?.user || null);
            } catch (error) {
                console.error("Unexpected error fetching user:", error);
                setUser(null);
            }
        };
        fetchUser();
    }, [supabase]);










    // send beacon to logout if the leave via the address bar
    useEffect(() => {
        const handleBeforeUnload = () => {
            console.log('before unload ran......')
            navigator.sendBeacon(`${location.origin}/api/auth/logout`, JSON.stringify({ hasLeftViaAddressBar: true }));
        };
    
        window.addEventListener("beforeunload", handleBeforeUnload);
    
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);
    








   
    useEffect(() => {
        if (user) {
            const setRegistrationFlag = async () => {
                try {
                    const flagResult = await updateTable(user, 'profiles', { has_visited_reg: true }, 'id');

                    if (!flagResult) {
                        throw new Error(flagResult.error)
                    }

                    // console.log('flag updated:', flagResult)

                } catch (error) {
                    console.log('error updating flag:', error)
                }
            }
            setRegistrationFlag();
        }
    }, [user, updateTable]);

    
    





    // update user avatar in profiles table
    const updateProfile = async ({ avatar_url }) => {
        try {
            const profileData = {
                id: user.id,
                avatar_url,
                updated_at: new Date().toISOString(),
                last_avatar_update_at: new Date().toISOString()
            }

            const { error } = await supabase.from('profiles').upsert(profileData)

            if (error) {
                throw new Error(error.message)
            }

            localStorage.setItem('hasUploadedAvatar', 'true');
            await setUploadAvatarFlag();
            router.push('/register-form')
            return { success: true }
            
        } catch (error) {
            console.log('profile update error:', error.message)
            return { success: false }
        }
    }
    



    


    return (
        <div className='min-h-[640px] flex flex-col justify-center'>
            <p className='pb-2'>Step 1/2</p>
            <div className='flex flex-col items-center justify-center gap-4 max-w-[500px] sm:bg-white sm:shadow-outer sm:p-12 sm:rounded-xl relative'>
                <div>
                    <h2 className='text-3xl mb-4 font-b text-nightSky'>Upload Your Avatar</h2>
                    <p className=''>Choose an image to personalize your profile or skip this step to continue. This helps others recognize you but is entirely optional.</p>
                </div>

                <div>
                    <AvatarUploader
                        user={user}
                        updateProfile={updateProfile}
                        btnColor='bg-green-700'
                        show3DAvatar={true}
                    />
                </div>

                <Link className='w-full' href='/register-form'>
                    <div className='flex'>
                        <Button
                            isLoading={false}
                            padding='py-2 px-3.5'
                            width='w-auto'
                            backgroundColor='bg-nightSky'
                            margin='ml-auto'
                            text='Skip'
                        />
                    </div>
                </Link>
            </div>
        </div>



    );
};

export default UploadAvatar;
