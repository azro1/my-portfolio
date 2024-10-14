'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

const useUpdateMetadata = () => {
    const [error, setError] = useState(null)
    const supabase = createClientComponentClient()

    const updateMetadata = async (obj) => {
        setError(null)

        try {
            // update user metadata
            const { error } = await supabase.auth.updateUser({
                data: obj
            })

            if (error) {
                throw new Error(error.message)
            }

            return { success: true }
        } catch (error) {
            setError(error.message)
            return { success: false, error: error.message }
        }
    }
    return { error, updateMetadata }
}

export { useUpdateMetadata }