"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";

// custom hooks
import { useUpdateTable } from '@/app/hooks/useUpdateTable';
import { useMessage } from '@/app/hooks/useMessage';
import { useFetchProfile } from '../hooks/useFetchProfile';



const AvatarUploader = ({ user, title, text, isFirstUpload, displayTitle, btnColor, show3DAvatar }) => {
    // custom hooks
    const { updateTable } = useUpdateTable()
    const { changeMessage } = useMessage()
    const { profile, fetchProfile } = useFetchProfile()

    const [selectedFile, setSelectedFile] = useState(null)
    const [imgSrc, setImgSrc] = useState('')
    const [uploading, setUploading] = useState(false)
    const formRef = useRef(null)

    const supabase = createClientComponentClient()

    
    // we dont need to handle retrun value from fetchProfile here for user feedback because we are fetching profile in background just to check the last_avatar_update_at property to implement a cool off period for image uploads 
    useEffect(() => {
        if (user) {
            fetchProfile(user)
        }
    }, [user])



    /* This function is triggered when a user changes a file or cancels a file. If a file is selected, the FileReader object reads the file as a data URL. The FileReader API is used to asynchronously read the contents of files stored on the user's computer. The readAsDataURL method of FileReader reads the content of the file and converts it into a base64-encoded string, called a data URL. A data URL is a string that represents the file's data and includes a media type prefix. The FileReader's onload event is triggered once the file is read, and the result (data URL) is stored in imgSrc. This data URL can be used to display the image directly in the browser */
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file)

        // display image users selects
        if (file) {
            if (!file.type.includes('image')) {
                changeMessage('error', "The file selected must be an image.");

                if (formRef.current) {
                    setImgSrc('')
                    setSelectedFile('')
                    formRef.current.reset()
                }
                return
            } else if (file.size > 1000000) {
                changeMessage('error', "The file is too large! Please select an image that's less than 100KB.");

                if (formRef.current) {
                    setImgSrc('')
                    setSelectedFile('')
                    formRef.current.reset()
                }
                return
            }
            const reader = new FileReader()
            reader.onload = (e) => {
                setImgSrc(e.target.result)
            }
            reader.readAsDataURL(file)
        } else {
            changeMessage('error', 'No file selected. Please choose a file to continue.')
        }
    }



    // we use the file that a user selects to construct a file path which we use to upload the file to the avatars bucket, once the operation is complete we upadte the users profile again this time setting the value of the avatar_url property to the filePath which was just uploaded to the bucket and use await to wait until the operation is complete
    const uploadAvatar = async () => {

        try {
            setUploading(true)

            if (!selectedFile) {
                throw new Error("Oops! You need to select an image to upload.")
            }

            // check to see when a user last updated their avatar and deny them if its within a week
            if (profile) {
                const lastUploadTime = profile.last_avatar_update_at ? new Date(profile.last_avatar_update_at).getTime() : 0;
                const currentTime = Date.now();
                const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 7 day limit
        
                // check if the cooling-off period has passed
                if (currentTime - lastUploadTime < oneWeekInMilliseconds) {
                    
                    if (formRef.current) {
                        setImgSrc('')
                        setSelectedFile('')
                        formRef.current.reset()
                    }
                    throw new Error("You have reached the upload limit for this week. Thank you for your patience!");
                }
            }

            const fileExt = selectedFile.name.split('.').pop()
            const filePath = `${user.id}-${Math.random()}.${fileExt}`;
            const { error } = await supabase.storage
                .from('avatars')
                .upload(filePath, selectedFile, { upsert: true })
            if (error) {
                throw new Error("An unexpected error occurred and we couldn't upload your avatar. Please try again later. If the issue persists, contact support.")
            } else {
                
                // update profiles avatar
                const avatarUpdateProfilesResult = await updateProfile({ avatar_url: filePath })
                await fetchProfile(user) // call fetchProfile immediately after to fetch latest profile data

                if (!avatarUpdateProfilesResult.success) {
                    throw new Error("An unexpected error occurred and we couldn't upload your avatar. Please try again later. If the issue persists, contact support.")
                }

                // update comments avatar
                const avatarUpdateCommentsResult = await updateTable(user, 'comments', { 
                    avatar_url: filePath,
                    updated_at: new Date().toISOString()
                }, 'comment_id');

                if (!avatarUpdateCommentsResult.success) {
                    throw new Error("Your profile picture was uploaded successfully, but we encountered an issue updating your comments. Please try again later. If the issue persists, contact support.")
                }
                
                changeMessage('success', 'Avatar uploaded!')

                if (formRef.current) {
                    setImgSrc('')
                    setSelectedFile('')
                    formRef.current.reset()
                }
            }
        } catch (error) {
            changeMessage('error', error.message)
        } finally {
            setUploading(false)
        }
    }




    // update users avatar in profiles table
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
            
            return { success: true }
        } catch (error) {
            console.log('profile update error:', error.message)
            return { success: false }
        }
    }
    


    return (
        <div>
            <div>
                {displayTitle &&  (
                    <h2 className='text-2xl text-stoneGray mb-3 font-eb font-rubik'>{title}</h2>
                )}
                <p className='leading-normal text-ashGray'>{text}</p>
                {isFirstUpload && (
                    <em><p className='text-sm mt-1 leading-normal'> (Optional) Please note that after your first upload, you can only change your avatar once a week.</p></em>
                )}
                <div className={`${show3DAvatar ? 'mt-5 grid grid-flow-col auto-cols-auto' : '' }`}>

                     <div>
                        <div className='mb-2 mt-4 h-14 w-14 relative'>
                            {imgSrc ? (
                                <Image
                                    src={imgSrc}
                                    alt="A user's selected image"
                                    fill
                                    quality={100}
                                    sizes="(max-width: 480px) 40px, (max-width: 768px) 60px, (max-width: 1024px) 80px, 100px"
                                    priority
                                />
                            ) : (
                                <FaUserCircle size={56} color="gray" />
                            )}
                        </div>
                        <form ref={formRef} className='w-full'>
                            <input
                                className='text-ashGray file:cursor-pointer file:mr-3 w-full max-w-xs'
                                type='file'
                                id='single'
                                accept='image/*'
                                onChange={handleFileInputChange}
                                disabled={uploading || (user && user.user_metadata.name)}
                            />
                        </form>
                        <button className={`btn-small ${btnColor} block mt-3`}
                            onClick={uploadAvatar}
                            disabled={uploading || (user && user.user_metadata.name)}
                        >
                            {uploading ? (
                                <div className='flex items-center gap-2'>
                                    <img className="w-5 h-5 opacity-50" src="../../images/loading/spinner.svg" alt="Loading indicator" />
                                    <span>Upload</span>
                                </div>
                            ) : (
                                'Upload'
                            )}
                        </button>
                    </div>

                    {show3DAvatar && (
                        <div className='col-start-1 place-self-center justify-self-start md:col-start-2 md:justify-self-end relative w-[150px] h-[150px]'>
                            <Image 
                                src="/images/registration/avatar.svg" 
                                alt="an image of a 3D avatar"
                                fill
                                quality={100}
                                priority
                            />
                        </div>
                    )}

                </div>

            </div>

        </div>
    )
}

export default AvatarUploader
