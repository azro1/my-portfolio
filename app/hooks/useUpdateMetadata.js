'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const useUpdateMetadata = () => {
    const supabase = createClientComponentClient()

    const updateMetadata = async (obj) => {
        // update user metadata
        const { error } = await supabase.auth.updateUser({
            data: obj
        })
        if (error) {
            console.log('metadata:', error)
        }
    }
    return { updateMetadata }
}

export { useUpdateMetadata }