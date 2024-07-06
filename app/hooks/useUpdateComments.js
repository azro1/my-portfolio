'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const useUpdateComments = () => {
    const supabase = createClientComponentClient()

    // update comments component after user updates personal info
    const updateComments = async (user, path, firstname) => {
        try {
            const { error } = await supabase
                .from('comments')
                .update({
                    avatar_url: path,
                    first_name: firstname
                })
                .eq('comment_id', user.id)
                .select()

            if (error) {
                throw new Error(error.message)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return { updateComments }
}

export { useUpdateComments }