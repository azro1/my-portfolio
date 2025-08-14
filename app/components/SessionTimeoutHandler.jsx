'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// hooks
import { useMessage } from "../hooks/useMessage"

const SessionTimeoutHandler = () => {
  const router = useRouter()
  const supabase = createClientComponentClient();
  const { changeMessage } = useMessage()
  const timeout = 15 * 60 * 1000 // 15 minutes

  useEffect(() => {
    let logoutTimer;
    let warningTimer;

    const resetTimer = () => {
      clearTimeout(logoutTimer)
      clearTimeout(warningTimer)

      warningTimer = setTimeout(() => {
        changeMessage('warning', 'For security you are about to be logged out due to inactivity. Please interact with the page to stay logged in.')
      }, timeout - 2 * 60 * 1000)
    
      logoutTimer = setTimeout(handleLogout, timeout)
    }

    // Function to handle logout
    const handleLogout = async () => {
      await supabase.auth.signOut()
      navigator.sendBeacon(`${location.origin}/api/auth/is-registered`, JSON.stringify({ isRegistered: false }));
      router.push('/login')
    }

    window.addEventListener('mousemove', resetTimer)
    window.addEventListener('keydown', resetTimer)
    resetTimer()

    return () => {
      clearTimeout(logoutTimer)
      clearTimeout(warningTimer)
      window.removeEventListener('mousemove', resetTimer)
      window.removeEventListener('keydown', resetTimer)
    }
  }, [])

  return null
}

export default SessionTimeoutHandler
