"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";



// components
import AvatarUploader from "@/app/components/AvatarUploader";
import Heading from '@/app/components/Heading';

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
       localStorage.setItem('hasVisitedRegPage', 'true');
    }, []);




 





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
        <div className='flex-1 flex flex-col justify-center w-full max-w-xs sm:max-w-sm md:max-w-md'>

          <div className='flex flex-col justify-center gap-3.5 md:bg-white md:shadow-outer md:p-12 md:rounded-xl relative'>

            <Heading className='font-semibold text-nightSky text-[26px] md:text-[28px]'>
              Upload your avatar
            </Heading>

            <p className='md:text-[17px] leading-normal'>
              Choose an image to personalize your profile or skip this step to continue. This helps others recognize you but is entirely optional
            </p>
      
            <div>
              <AvatarUploader
                user={user}
                updateProfile={updateProfile}
                btnColor='bg-goldenOchre'
                show3DAvatar={true}
                buttonTextStyles={'text-[17px]'}
              />
            </div>

            <Link className='w-full h-0 mt-2' href='/register-form'>
              <div className='flex'>
                <button className='text-nightSky ml-auto'>
                  Skip
                </button>
              </div>
            </Link>
          </div>

        </div>
      );
      
};

export default UploadAvatar;
