"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";

// custom hooks
import { useUpdateTable } from '@/app/hooks/useUpdateTable';

// components
import Modal from './Modal';



const AvatarUploader = ({ user, updateProfile, updateError, title, displayTitle, btnColor, btnText }) => {

    // custom hook to update comments after user updates personal info
    const { updateTable } = useUpdateTable()

    const [fileInputError, setFileInputError] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [imgSrc, setImgSrc] = useState('')
    const [uploading, setUploading] = useState(false)
    const [uploadError, setUploadError] = useState(null)
    const formRef = useRef(null)

    const supabase = createClientComponentClient()



    /* This function is triggered when a user selects a file. If a file is selected, the FileReader object reads the file as a data URL. The FileReader API is used to asynchronously read the contents of files stored on the user's computer. The readAsDataURL method of FileReader reads the content of the file and converts it into a base64-encoded string, called a data URL. A data URL is a string that represents the file's data and includes a media type prefix. The FileReader's onload event is triggered once the file is read, and the result (data URL) is stored in imgSrc. This data URL can be used to display the image directly in the browser */
    const handleFileInputChange = (event) => {
        setFileInputError('')

        const file = event.target.files[0];
        setSelectedFile(file)

        // display image users selects
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setImgSrc(e.target.result)
            }
            reader.readAsDataURL(file)
        } else {
            setFileInputError('Could not select file. Please try again')
            setTimeout(() => setFileInputError(null), 2000)
        }
    }



    // we use the file that a user selects to construct a file path which we use to upload the file to the avatars bucket, once the operation is complete we upadte the users profile again this time setting the value of the avatar_url property to the filePath which was just uploaded to the bucket and use await to wait until the operation is complete
    const uploadAvatar = async () => {

        try {
            setUploading(true)

            if (!selectedFile) {
                throw new Error('You must select an image to upload')
            }
            const fileExt = selectedFile.name.split('.').pop()
            const filePath = `${user.id}-${Math.random()}.${fileExt}`;
            const { error } = await supabase.storage
                .from('avatars')
                .upload(filePath, selectedFile, { upsert: true })
            if (error) {
                throw new Error(error.message)
            }
            // update profiles avatar
            await updateProfile({ avatar_url: filePath })

            // update comments avatar
            await updateTable(user, 'comments', { avatar_url: filePath }, 'comment_id') 
            
            if (formRef.current) {
                setImgSrc('')
                setSelectedFile('')
                formRef.current.reset()
            }
        } catch (error) {
            setUploadError(error.message)
        } finally {
            setUploading(false)
            setTimeout(() => setUploadError(null), 2000)
        }
    }



    return (
        <div>
            <div>
                {displayTitle &&  (
                    <h2 className='text-2xl text-stoneGray mb-3'>{title}</h2>
                )}
                <p className='leading-normal'>Personalize your account by uploading your own avatar</p>
                <div className='mb-2 mt-4 h-14 w-14 relative '>
                    {imgSrc ? (
                        <Image
                            src={imgSrc}
                            alt="A user's selected image"
                            fill={true}
                            quality={100}
                            sizes="100%"
                        />
                    ) : (
                        <FaUserCircle size={56} color="gray" />
                    )}
                </div>
                <form ref={formRef}>
                    <input
                        className='text-stoneGray file:cursor-pointer file:mr-3'
                        type='file'
                        id='single'
                        accept='image/*'
                        onChange={handleFileInputChange}
                        disabled={uploading || (user && user.user_metadata.name)}
                    />
                </form>
                <button className={`small-btn ${btnColor} block ${uploadError ? 'mt-2' : 'mt-3'}`}
                    onClick={uploadAvatar}
                    disabled={uploading || (user && user.user_metadata.name)}
                >
                    {uploading ? 'Uploading...' : `${btnText}`}
                </button>
            </div>

            {(uploadError || fileInputError || updateError) && (
                <Modal>
                    <div className="text-center">
                        <p className='modal-form-error'>* {uploadError || fileInputError || updateError}</p>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default AvatarUploader
