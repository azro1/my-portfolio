"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { FaUserCircle } from "react-icons/fa";

// custom hooks
import { useUpdateTable } from '@/app/hooks/useUpdateTable';
import { useMessage } from '@/app/hooks/useMessage';



const AvatarUploader = ({ user, updateProfile, btnColor, show3DAvatar }) => {
    // custom hooks
    const { updateTable } = useUpdateTable()
    const { changeMessage } = useMessage()

    const [selectedFile, setSelectedFile] = useState(null)
    const [imgSrc, setImgSrc] = useState('')
    const [uploading, setUploading] = useState(false)
    const formRef = useRef(null)

    const supabase = createClientComponentClient()

    
 


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
            const { data, error: profileError } = await supabase
            .from('profiles')
            .select()
            .eq('id', user.id)
            .single();

            if (profileError) {
              console.log(profileError)
            }


            const lastUploadTime = data?.last_avatar_update_at ? new Date(data.last_avatar_update_at).getTime() : 0;
            const currentTime = Date.now();
            const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 7 day limit
    
            // check if the cooling-off period has passed
            if (currentTime - lastUploadTime < oneWeekInMilliseconds) {
                const timeLeft = oneWeekInMilliseconds - (currentTime - lastUploadTime);
                const daysLeft = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
                const hoursLeft = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
                
                if (formRef.current) {
                    setImgSrc('')
                    setSelectedFile('')
                    formRef.current.reset()
                }
                throw new Error(`Avatar uploads are limited to once per week. You can update your avatar again in ${daysLeft} days and ${hoursLeft} hours`);
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

                if (!avatarUpdateProfilesResult.success) {
                    throw new Error("An unexpected error occurred and we couldn't upload your avatar. Please try again later. If the issue persists, contact support.")
                }

                // update messages avatar
                const avatarUpdateMessagesResult = await updateTable(user, 'messages', { 
                    avatar_url: filePath,
                    updated_at: new Date().toISOString()
                }, 'message_id');

                if (!avatarUpdateMessagesResult.success) {
                    throw new Error("Your profile picture was uploaded successfully, but we encountered an issue updating your messages. Please try again later. If the issue persists, contact support.")
                }
                
                changeMessage('success', 'Your Avatar has been uploaded')

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


    return (
        <div>
            <div>
                <div className={`${show3DAvatar ? 'flex' : '' }`}>

                     <div className='flex-1'>
                        <div className='mb-2.5 h-14 w-14 relative'>
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
                                className='text-ashGray font-light file:cursor-pointer file:mr-3 w-full max-w-xs'
                                type='file'
                                id='single'
                                accept='image/*'
                                onChange={handleFileInputChange}
                                disabled={uploading}
                            />
                        </form>
                        <button className={`btn-small ${btnColor} block mt-3 min-w-[80px] min-h-[40px] ${uploading ? 'opacity-65' : 'opacity-100'}`}
                            onClick={uploadAvatar}
                            disabled={uploading}
                        >
                            {uploading ? (
                                <div className='flex items-center justify-center'>
                                    <Image
                                        className='opacity-65'
                                        width={20}
                                        height={20}
                                        src="/images/loading/reload.svg"
                                        alt="A spinning loading animation on a transparent background"
                                    />
                                </div>
                            ) : (
                                'Upload'
                            )}
                        </button>
                    </div>

                    {show3DAvatar && (
                        <div className='flex-1 relative w-[150px] h-[150px]'>
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
