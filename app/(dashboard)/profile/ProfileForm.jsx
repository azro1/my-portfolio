"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";

const ProfileForm = ({ user }) => {
  const [userId, setUserId] = useState('')
  const [file, setFile] = useState('')
  const [avatars, setAvatars] = useState([])
  const [error, setError] = useState('')

  const supabase = createClientComponentClient()


  const getAvatars = async () => {
    const { data, error } = await supabase.storage
      .from('avatars')
      .list(userId + '/', {
        limit: 1,
        offset: 0,
        sortBy: { 
          column: 'name',
          order: 'desc' 
        },
      });

      if (error) {
        console.log(error)
      }

      if (data) {
        setAvatars(data)
        console.log(data)
      }
  }


  const uploadImage = async (avatarFile) => {
    // console.log(userId)
    // let uploadStr = `${userId}/public/avatars/${avatarFile.name}`
    // console.log(uploadStr, avatarFile)

    const { data, error } = await supabase.storage
    .from('avatars')
    .upload(userId + "/" + avatarFile.name, avatarFile, {
      cacheControl: '3600',
      upsert: false
    })

    if (error) {
      console.log(error)
    }

    if (data) {
      getAvatars()
    }
  }

  useEffect(() => {
    if (user) {
      setUserId(user.id)
    }
  }, [user])


  useEffect(() => {
    if (file && userId) {
      uploadImage(file);
    }
  }, [file, userId]);


  // file upload
  const handleFileChange = (e) => {
    let avatarFile = e.target.files[0]
    setFile(avatarFile)
  }

  

  return (
    <div className="mt-16">
      <div>
        {avatars.map(avatar => (
          <div key={avatar.id}>
            <img className="w-36 h-36 object-contain"
              src={`https://kbmnrcytukwoivprnqhf.supabase.co/storage/v1/object/public/avatars/${userId}/${avatar.name}`}
              alt="" />
          </div>
        ))}
      </div>
       <h3 className='text-xl font-eb font-rubik text-hint mb-5'>Upload your avatar</h3>
       <form action="">
         <input 
         className="text-white"
         type="file"
         onChange={handleFileChange}
         />
      </form>
      {error && <div className="error mt-2">* {error}</div>}
    </div>
  )
}

export default ProfileForm