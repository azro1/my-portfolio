'use client';

import { useState, useEffect, useRef } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';


// components
import { FaUserCircle } from "react-icons/fa";
import Image from 'next/image';

// custom hooks
import { useFetchUser } from '@/app/hooks/useFetchUser';


const PersonalInfo = () => {
  // custom hook to fetch user
  const { user } = useFetchUser()

  const [first_name, setFirstName] = useState(null)
  const [full_name, setFullName] = useState(null)
  const [email, setEmail] = useState(null)
  const [updateError, setUpdateError] = useState(null)
  const [updateSuccess, setUpdateSuccess] = useState(null)
  const [updating, setUpdating] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [uploadSuccess, setUploadSuccess] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileInputError, setFileInputError] = useState(null)
  const [imgSrc, setImgSrc] = useState('')
  const formRef = useRef(null)

  const [bio, setBio] = useState(null)
  const [adding, setAdding] = useState(null)
  const [bioError, setBioError] = useState(null)
  const [bioSuccess, setBioSuccess] = useState(null)

  const supabase = createClientComponentClient()




  // make sure we have a user and a user before calling getProfile
  useEffect(() => {
    if (user) {
      getProfile()
    }
  }, [user])







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
        setFileInputError('Could not select file. Please try again.')
    }
  }




  

  // gets a users profile row with the id that is equal to the users id who is signed in and store properties in state whose values are being pre-poulated in the input fields as we have 2 way binding unsing controlled inputs
  const getProfile = async () => {
    setUpdateError('')

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', user.id)
        .limit(1)
      if (error) {
        throw new Error(error.message);
      }
      if (data && data.length > 0) {
        const profileData = data[0];
        setFirstName(profileData.first_name)
        setFullName(profileData.full_name)
        setEmail(profileData.email)
      } else {
        throw new Error('You currently have no profile saved.')
      }
    } catch (error) {
      setUpdateError(error.message)
      console.log(error.message)
    }
  }







  // update comment avatar after user uploads avatar
  const fetchComments = async (path, name) => {
    try {
      const { error } = await supabase
        .from('comments')
        .update({
          avatar_url: path,
          first_name: name
        })
        .eq('comment_id', user.id)
        .select()

      if (error) {
        throw error
      }
    } catch (error) {
      console.log(error.message)
    }
  }






  // users can edit the state values in the form input fields and then when the form is submitted we call this function to update the profiles table in supabase
  const updateProfile = async ({
    first_name,
    full_name,
    avatar_url,
    email,
  }) => {

    try {
      setUpdating(true)

      const updatedProfile = {
        id: user.id,
        first_name,
        full_name,
        avatar_url,
        email,
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase.from('profiles').upsert(updatedProfile)

      if (error) {
        throw new Error(error.message)
      }

      if (first_name || full_name || email) {
        setUpdateSuccess('Profile updated!')
        await fetchComments(undefined, first_name)  // pass first_name to fetchComments

      } else {
        setUploadSuccess('Avatar uploaded successfully.')
      }

    } catch (error) {
        setUpdateError('Please enter your profile info. First names must be at least 3 characters long.')
    } finally {
        setUpdating(false)
    }

    function clearUpdateMsgs() {
      setUpdateSuccess('')
      setUploadSuccess('')
      setUpdateError('')
    }
    setTimeout(clearUpdateMsgs, 2000)
  }




    


  // we use the file that a user selects to construct a file path which we use to upload the file to the avatars bucket, once the operation is complete we upadte the users profile again this time setting the value of the avatar_url property to the filePath which was just uploaded to the bucket and use await to wait until the operation is complete
  const uploadAvatar = async () => {
    
    try {
      setUploading(true)

      if (!selectedFile) {
        throw new Error('You must select an image to upload.')
      }
      const fileExt = selectedFile.name.split('.').pop()
      const filePath = `${user.id}-${Math.random()}.${fileExt}`;
      const { error } = await supabase.storage
        .from('avatars')
        .upload(filePath, selectedFile, { upsert: true })
      if (error) {
        throw error
      }
      await updateProfile({ avatar_url: filePath })
      await fetchComments(filePath, undefined)  // pass filePath to fetchComments

      if (formRef.current) {
        setImgSrc('')
        setSelectedFile('')
        formRef.current.reset()
      }

    } catch (error) {
        setUploadError(error.message)
        setTimeout(() => setUploadError(''), 2000)
    } finally {
      setUploading(false)
    }
  }








  // update bio
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  const updateBio = async (event) => {
    event.preventDefault()

    try {
       setAdding(true)

      if (!bio) {
        setBioError('Please add a bio.')
        setTimeout(() => setBioError(''), 2000)
        return
      }
  
      const { error } = await supabase
        .from('profiles')
        .update({
          bio,
        })
        .eq('id', user.id)
        .select()
  
      if (error) {
        throw error
      } else {
        setBioSuccess('Bio added!')
        setBio('')
      }
    } catch (error) {
        console.log(error.message)
        setBioError('Something went wrong. Please try again later.')
    } finally {
        setAdding(false)
    }

    function clearBioMsgs() {
      setBioSuccess('')
      setBioError('')
    }
    setTimeout(clearBioMsgs, 2000)
  }
 















  return (
    <div className='sm:flex-1'>

      <div className='text-center px-3'>
        <h2 className='text-center profile-subheading text-hint mb-5'>Personal Information</h2>
        <p className='text-base'>This is your personal information section. Here, you can easily edit and update your profile information.</p>
      </div>

      <div className='mt-8 flex flex-col items-left bg-red-900'>

        <div className='w-full max-w-xs flex-1 px-3 order-2'>
          <form onSubmit={updateBio}>
            <label>
              <span className='mt-4 mb-2 text-sm font-os text-secondary block'>
                Bio
              </span>
              <input
                className='w-full p-2.5 rounded-md'
                type='text'
                value={bio || ''}
                maxLength={'80'}
                placeholder='Bio'
                spellCheck='false'
                onChange={(e) => setBio(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </label>

            {bioError && <div className='error mt-2'>* {bioError}</div>}
            {bioSuccess && <div className='success mt-2'>* {bioSuccess}</div>}
            <button className={`btn block bg-hint ${bioError || bioSuccess ? 'mt-2' : 'mt-3'}`}>
               {adding ? 'Adding...' : 'Add'}
            </button>
          </form>

      

    
          <form className='pt-5'> 
            <label>
              <span className='mt-4 mb-2 text-sm font-os text-secondary block'>
                Full Name
              </span>
              <input
                className='w-full p-2.5 rounded-md'
                type='text'
                value={full_name || ''}
                placeholder='Full Name'
                spellCheck='false'
                onChange={(e) => setFullName(e.target.value)}
              />
            </label>
            <label>
              <span className='mt-4 mb-2 text-sm font-os text-secondary block'>
                First Name
              </span>
              <input
                className='w-full p-2.5 rounded-md'
                type='text'
                value={first_name || ''}
                placeholder='First Name'
                spellCheck='false'
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label>
              <span className='max-w-min mt-4 mb-2 text-sm font-os text-secondary block'>
                Email
              </span>
              <input
                className='w-full p-2.5 rounded-md'
                type='url'
                value={email || ''}
                placeholder='Email'
                spellCheck='false'
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            {updateError && <div className='error mt-2'>* {updateError}</div>}
            {updateSuccess && <div className='success mt-2'>* {updateSuccess}</div>}
          </form>
          <button
            className={`btn block bg-hint ${
              updateError || updateSuccess ? 'mt-2' : 'mt-3'
            }`}
            onClick={() => updateProfile({ first_name, full_name, email })}
          >
            {updating ? 'Updating...' : 'Update'}
          </button>
        </div>

        <div className='w-full max-w-xs flex-1 order-1 px-3 pb-5'>
          <div>
            <div className='mb-4'>
              <div className='h-14 w-14 relative'>
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
            </div>
            <form ref={formRef}>
              <input
                className='text-secondary file:cursor-pointer file:mr-3'
                type='file'
                id='single'
                accept='image/*'
                onChange={handleFileInputChange}
                disabled={uploading || (user && user.user_metadata.full_name)}
              />
            </form>
            {fileInputError && <div className='error mt-2'>* {fileInputError}</div>}
            {uploadError && <div className='error mt-2'>* {uploadError}</div>}
            {uploadSuccess && <div className='success mt-2'>* {uploadSuccess}</div>}
            <button
              className={`btn bg-hint max-w-max primary block ${
                uploadError || uploadSuccess ? 'mt-2' : 'mt-3'
              }`}
              onClick={uploadAvatar}
              disabled={uploading || (user && user.user_metadata.full_name)}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo;
