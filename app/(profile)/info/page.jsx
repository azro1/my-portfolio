'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';


// components
import ProfileHeader from '../profile/ProfileHeader';
import { FaUserCircle } from "react-icons/fa";
import Image from 'next/image';


const PersonalInfo = () => {
  const [authUser, setAuthUser] = useState('');
  const [first_name, setFirstName] = useState(null);
  const [full_name, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [fileInputError, setFileInputError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  const supabase = createClientComponentClient();

  // get user session object as soon as component loads, set user state then call getProfile
  useEffect(() => {
    async function getUser() {
      setUpdateError('');
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) {
          throw new Error(error);
        }
        if (user) {
          setAuthUser(user);
        }
      } catch (error) {
        setUpdateError(error.message);
        console.log(error.message);
      }
    }
    getUser();
  }, []);


  // make sure we have a user and a user id before calling getProfile
  useEffect(() => {
    if (authUser && authUser.id) {
      getProfile();
    }
  }, [authUser && authUser.id]);

  // when a user selects a file this function is invoked and the file is stored in state, the URL.createObjectURL function takes a File object as an input and creates a temporary URL that represents the file's content. It creates a URL that can be used to reference the file directly in the browser without uploading it to a server. This is stored as the value to avatar_url which is then passed as a prop to the ProfileAvatar component
  const handleFileInputChange = async (event) => {
    setFileInputError('');

    const file = event.target.files[0];
    setSelectedFile(file);

    // display image users selects
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImgSrc(e.target.result)
      }
      reader.readAsDataURL(file);
    } else {
        setFileInputError('Could not select file. Please try again.');
    }
  };

  // gets a users profile row with the id that is equal to the users id who is signed in and store properties in state whose values are being pre-poulated in the input fields as we have 2 way binding unsing controlled inputs
  const getProfile = async () => {
    setUpdateError('');

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', authUser.id)
        .limit(1);
      if (error) {
        throw new Error(error.message);
      }
      if (data && data.length > 0) {
        const profileData = data[0];
        setFirstName(profileData.first_name);
        setFullName(profileData.full_name);
        setEmail(profileData.email);
      } else {
        throw new Error('You currently have no profile saved.');
      }
    } catch (error) {
      setUpdateError(error.message);
      console.log(error.message);
    }
  };







  // update comment avatar after user uploads avatar
  const fetchComments = async (path, name) => {
    try {
      const { error } = await supabase
        .from('comments')
        .update({
          avatar_url: path,
          first_name: name
        })
        .eq('comment_id', authUser.id)
        .select()

      if (error) {
        throw error;
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
    setUpdateSuccess('');
    setUploadSuccess('');
    setUpdateError('');

    try {
      const updatedProfile = {
        id: authUser.id,
        first_name,
        full_name,
        avatar_url,
        email,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('profiles').upsert(updatedProfile);

      if (error) {
        throw new Error(error.message);
      }

      if (first_name || full_name || email) {
        setUpdateSuccess('Profile updated!');
        await fetchComments(undefined, first_name)  // pass first_name to fetchComments

      } else {
        setUploadSuccess('Avatar uploaded successfully.');
      }

      function clearSuccessMsg() {
        setUpdateSuccess('');
        setUploadSuccess('');
        setUpdateError('');
      }
      setTimeout(clearSuccessMsg, 1500);
    } catch (error) {
        setUpdateError('Please enter your profile info. First names must be at least 3 characters long.');
        console.log(error.message)
    }
  };




    
  // we use the file that a user selects to construct a file path which we use to upload the file to the avatars bucket, once the operation is complete we upadte the users profile again this time setting the value of the avatar_url property to the filePath which was just uploaded to the bucket and use await to wait until the operation is complete
  const uploadAvatar = async () => {
    setUpdateSuccess('');
    setUploadSuccess('');
    setUploadError('');

    try {
      setUploading(true);
      if (!selectedFile) {
        throw new Error('You must select an image to upload.');
      }
      const fileExt = selectedFile.name.split('.').pop();
      const filePath = `${authUser.id}-${Math.random()}.${fileExt}`;
      const { error } = await supabase.storage
        .from('avatars')
        .upload(filePath, selectedFile, { upsert: true });
      if (error) {
        throw error;
      }
      console.log(filePath)
      await updateProfile({ avatar_url: filePath });
      await fetchComments(filePath, undefined)  // pass filePath to fetchComments

    } catch (error) {
        setUploadError(error.message);
  
        function clearErrorMsg() {
          setUploadError('');
        }
        setTimeout(clearErrorMsg, 1500);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='sm:flex-1'>
      <ProfileHeader heading={"Personal Information"} text={"Welcome to your personal information section! Here, you can easily edit and update your profile details for the site."} />

      <div className='mt-8 flex flex-col-reverse items-center gap-5 lg:flex-row lg:justify-end'>
        <div className='w-full max-w-xs flex-1'>
          <form>
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
              updateError || updateSuccess ? 'mt-2' : 'mt-4'
            }`}
            onClick={() => updateProfile({ first_name, full_name, email })}
          >
            Update
          </button>
        </div>

        <div className='w-full max-w-xs flex-1'>
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
            <input
              className='text-secondary file:cursor-pointer'
              type='file'
              id='single'
              accept='image/*'
              onChange={handleFileInputChange}
              disabled={uploading || (authUser && authUser.user_metadata.full_name)}
            />
            {fileInputError && <div className='error mt-2'>* {fileInputError}</div>}
            {uploadError && <div className='error mt-2'>* {uploadError}</div>}
            {uploadSuccess && <div className='success mt-2'>* {uploadSuccess}</div>}
            <button
              className={`btn bg-hint max-w-max primary block ${
                uploadError || uploadSuccess ? 'mt-2' : 'mt-3'
              }`}
              onClick={uploadAvatar}
              disabled={uploading || (authUser && authUser.user_metadata.full_name)}
            >
              {uploading ? 'Uploading ...' : 'Upload'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
