'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

const useUpdate = () => {
    const [error, setError] = useState(null)
    const supabase = createClientComponentClient()

    // update a component table
    const updateTable = async (user, table, obj, column) => {
        try {
            const { error } = await supabase
                .from(table)
                .update(obj)
                .eq(column, user.id)

            if (error) {
                throw new Error(error.message)
            }
        } catch (error) {
            console.log(error.message)
            setError(`failed to update ${table}.`)
            setTimeout(() => setError(null), 2000)
        }
    }

    return { error, updateTable }
}

export { useUpdate }