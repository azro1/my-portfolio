"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// hooks
import { useFetchUser } from "@/app/hooks/useFetchUser";

// components
import AvatarUploader from "@/app/components/AvatarUploader";


// server actions
import { deleteCanAccessAuthOtpPageCookie } from '@/app/(auth)/auth/actions';







const UploadAvatar = () => {

    // custom hooks
    const { user } = useFetchUser();
    const router = useRouter();
    const supabase = createClientComponentClient()





    // set indicator that user has been to this page and delete auth otp access cookie
    useEffect(() => {
        localStorage.setItem("hasVisitedRegPage", "true");
        localStorage.setItem('hasShownAbortMessage', 'false');

        try {
            navigator.sendBeacon('/api/auth/delete-otp-cookie', JSON.stringify({ isOnRegistrationPage: true }));
        } catch (error) {
            console.error("sendBeacon error:", error);
        }
    }, []);

    






    // log users out on page reload
    useEffect(() => {
        const beforeUnloadListener = () => {
            localStorage.setItem("regIsReloading", "true");

        };

        window.addEventListener("beforeunload", beforeUnloadListener);

        return () => {
            window.removeEventListener("beforeunload", beforeUnloadListener);
        };
    }, []);

    useEffect(() => {
        const handleLogoutOnLoad = async () => {
            if (localStorage.getItem("regIsReloading") === "true") {

                try {
                    await supabase.auth.signOut();
                    localStorage.removeItem("regIsReloading");
                    router.push("/auth/login");
                } catch (error) {
                    console.error("Logout failed:", error);
                }
            }
        };
        handleLogoutOnLoad();
    }, [router]);

    





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
                        btnColor='bg-nightSky'
                        show3DAvatar={true}
                    />
                </div>

    
                <Link className='w-full' href='/register-form'>
                    <div className='flex'>
                        <button className='btn-small bg-nightSky ml-auto'>
                            Skip
                        </button>
                    </div>
                </Link>
            </div>
        </div>



    );
};

export default UploadAvatar;
