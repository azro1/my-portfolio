"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const useFetchUser = (bool) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(bool)

    const supabase = createClientComponentClient();

    useEffect(() => {
        const getUser = async () => {
            setError('')
            try {
                const { data: { user }, error } = await supabase.auth.getUser();
                if (error) {
                    throw new Error(error.message);
                }
                if (user) {
                    setUser(user);
                } else {
                    setUser(null)
                }
            } catch (error) {
                setIsLoading(false)
                setError(error.message)
                console.log(error.message);
            } finally {
                setIsLoading(false)
            }
        }
        getUser();
    }, [supabase.auth]);

    return { user, error, isLoading }
}

export { useFetchUser }