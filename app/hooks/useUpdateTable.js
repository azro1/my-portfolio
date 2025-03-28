'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useCallback, useState } from 'react';

const useUpdateTable = () => {
    const [error, setError] = useState(null)
    const supabase = createClientComponentClient()

    // update a component table
    const updateTable = useCallback(async (user, table, obj, column) => {
        setError(null);

        try {
            const { error } = await supabase
                .from(table)
                .update(obj)
                .eq(column, user.id)

            if (error) {
                throw new Error(error.message)
            }

            return { success: true }
        } catch (error) {
            console.log('useUpdateTable:', error.message)
            setError(error.message)
            return { success: false }
        }
    }, [supabase])

    return { error, updateTable }
}

export { useUpdateTable }