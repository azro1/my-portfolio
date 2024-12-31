"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';


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
      <button className='h-[50px] max-h-[50px] rounded-lg font-medium text-ashGray bg-nightSky mb-3 shadow-outer border-ashGray w-64 flex items-center justify-center hover:text-frostWhite hover:bg-softCharcoal duration-300 relative' onClick={handleGoogleClick}>
        <Image 
          src={"../images/auth/google.svg"} 
          className='mr-3' 
          alt="a google icon"
          width={24}
          height={24}
          priority
          quality={100}
        />
        {text} with Google
      </button>

      <button className='h-[50px] max-h-[50px] rounded-lg font-medium text-ashGray bg-nightSky mb-3 shadow-outer border-ashGray w-64 flex items-center justify-center hover:text-frostWhite hover:bg-softCharcoal duration-300 relative' onClick={handleGithubClick}>        
        <Image 
          src={"../images/auth/github.svg"} 
          className='mr-3' 
          alt="a github icon"
          width={28}
          height={28}
          priority
          quality={100}
        />
        {text} with GitHub
      </button>
      
      <button className='h-[50px] max-h-[50px] rounded-lg font-medium text-ashGray bg-nightSky shadow-outer border-ashGray w-64 flex items-center justify-center hover:text-frostWhite hover:bg-softCharcoal duration-500' onClick={handleDiscordClick}>
        <Image 
          src="../images/auth/discord.svg" 
          className='mr-3' 
          alt="a discord icon"
          width={28}
          height={28}
          priority
          quality={100}
        />
        {text} with Discord
      </button>
    </>
  )
}

export default SocialButtons
