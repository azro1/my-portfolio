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
          }

        } catch (error) {
            console.log(error.message)
            setError('Something went wrong. Try again later.')
        }

    }

    return { error, profile, fetchProfile }
}

export { useFetchProfile }