"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FaGoogle, FaGithub, FaDiscord } from 'react-icons/fa';

const SocialButtons = ({ text }) => {

  // google
  const handleGoogleClick = async (e) => {
    e.preventDefault()

    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: `${location.origin}/api/auth/google`
      }
    })
    if (error) {
      console.log(error)
    }
  }

  // github
  const handleGithubClick = async (e) => {
    e.preventDefault()
  
    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: `${location.origin}/api/auth/github`
      }
    })
    if (error) {
      console.log(error)
    }
  }
  
  // discord
  const handleDiscordClick = async (e) => {
    e.preventDefault()

    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${location.origin}/api/auth/discord`
      }
    })
    if (error) {
      console.log(error)
    }
  }

  return (
    <>
      <button className='py-2.5 px-4 text-sm rounded-lg font-rubik text-white font-b mb-2 bg-red-600 w-64 flex items-center justify-center hover:filter hover:brightness-75 duration-300' onClick={handleGoogleClick}>
        <FaGoogle className="mr-2" size={24} />
        {text} with Google
      </button>
      <button className='py-2.5 px-4 text-sm rounded-lg font-rubik text-white font-b mb-2 bg-github w-64 flex items-center justify-center hover:filter hover:brightness-75 duration-300' onClick={handleGithubClick}>
        <FaGithub className="mr-2" size={26} />
        {text} with GitHub
      </button>
      <button className='py-2.5 px-4 text-sm rounded-lg font-rubik text-white font-b bg-discord w-64 flex items-center justify-center hover:filter hover:brightness-75 duration-500' onClick={handleDiscordClick}>
        <FaDiscord className="mr-2" size={26} />
        {text} with Discord
      </button>
    </>
  )
}

export default SocialButtons
