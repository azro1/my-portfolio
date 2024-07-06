"use client"

import { useState } from "react"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';


const BioForm = ({ user }) => {
    const [bio, setBio] = useState(null)
    const [adding, setAdding] = useState(null)
    const [bioError, setBioError] = useState(null)
    const [bioSuccess, setBioSuccess] = useState(null)


    const supabase = createClientComponentClient()

    
    // update bio
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
        }
    }

    const updateBio = async (event) => {
        event.preventDefault()

        try {
            setAdding(true)

            if (!bio) {
                setBioError('Please add a bio.')
                setTimeout(() => setBioError(''), 2000)
                return
            }

            const { error } = await supabase
                .from('profiles')
                .update({
                    bio,
                })
                .eq('id', user.id)
                .select()

            if (error) {
                throw new Error(error.message)
            } else {
                setBioSuccess('Bio added!')
                setBio('')
            }
        } catch (error) {
            console.log(error.message)
            setBioError('Something went wrong. Please try again later.')
        } finally {
            setAdding(false)
        }

        function clearBioMsgs() {
            setBioSuccess('')
            setBioError('')
        }
        setTimeout(clearBioMsgs, 2000)
    }



    return (
        <form className="bg-pink-900" onSubmit={updateBio}>
            <label>
                <span className='mt-4 mb-2 text-sm font-os text-secondary block'>
                    Bio
                </span>
                <input
                    className='w-full p-2.5 rounded-md'
                    type='text'
                    value={bio || ''}
                    maxLength={'80'}
                    placeholder='Bio'
                    spellCheck='false'
                    onChange={(e) => setBio(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </label>

            {bioError && <div className='error mt-2'>* {bioError}</div>}
            {bioSuccess && <div className='success mt-2'>* {bioSuccess}</div>}
            <button className={`btn block bg-hint ${bioError || bioSuccess ? 'mt-2' : 'mt-3'}`}>
                {adding ? 'Adding...' : 'Add'}
            </button>
        </form>
    )
}

export default BioForm
