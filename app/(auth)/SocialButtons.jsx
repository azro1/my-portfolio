"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';


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
      <button className='h-[50px] max-h-[50px] rounded-lg font-semibold text-nightSky mb-3 border-[1px] border-gray-300 w-64 flex items-center justify-center gap-3 bg-white hover:bg-cloudGray hover:border-gray-400 transition-all duration-300 ease-in-out relative' onClick={handleGoogleClick}>
        <Image 
          src={"../images/auth/google.svg"} 
          alt="a google icon"
          width={24}
          height={24}
          priority
          quality={100}
        />
        <span>
          {text} with Google
        </span>
      </button>

      <button className='h-[50px] max-h-[50px] rounded-lg font-semibold text-nightSky  mb-3 border-[1px] border-gray-300 w-64 flex items-center justify-center gap-3 bg-white hover:bg-cloudGray hover:border-gray-400 transition-all duration-300 ease-in-out relative' onClick={handleGithubClick}>        
        <FaGithub size={27} />
        <span>
          {text} with GitHub
        </span>
      </button>
      
      <button className='h-[50px] max-h-[50px] rounded-lg font-semibold text-nightSky border-[1px] border-gray-300 w-64 flex items-center justify-center gap-3 bg-white hover:bg-cloudGray hover:border-gray-400 transition-all duration-300 ease-in-out' onClick={handleDiscordClick}>
        <Image 
          src="../images/auth/discord.svg" 
          alt="a discord icon"
          width={28}
          height={28}
          priority
          quality={100}
        />
        <span>
          {text} with Discord
        </span>
      </button>
    </>
  )
}

export default SocialButtons
