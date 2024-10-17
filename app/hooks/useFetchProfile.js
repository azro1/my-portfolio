"use client"

import { useState } from "react"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const useFetchProfile = () => {
    const [error, setError] = useState('')
    const [profile, setProfile] = useState(null)

    const fetchProfile = async (user) => {
        const supabase = createClientComponentClient();
  
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select()
            .eq('id', user.id)
            .single();
  
          if (error) {
            throw new Error(error.message)
          }
  
          if (data) {
            setProfile(data)
            return true
          }

        } catch (error) {
            setError(error)
            console.log(error.message)
            return false
        }
    }

    return { error, profile, fetchProfile }
}

export { useFetchProfile }