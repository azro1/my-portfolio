"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// custom hooks
import { useUpdate } from '@/app/hooks/useUpdate'

// components
import Modal from "./Modal";

const BioForm = ({ user, profile }) => {
    const [bio, setBio] = useState('')
    const [draftBio, setDraftBio] = useState('');
    const [saving, setSaving] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formError, setFormError] = useState(null)
    const [showForm, setShowForm] = useState(false)
  

    // custom hook to update profiles table
    const { error: profileError, updateTable } = useUpdate()


    // populate form fields from profiles table
    useEffect(() => {
        if (user && profile) {
            setIsLoading(true)
            setBio(profile.bio)
            setDraftBio(profile.bio)
        }

        if (profileError) {
            return;
         }
    }, [user, profile])
    


    // update bio
    const handleUpdateBio = async () => {     
        setSaving(true)

        if (!draftBio.trim()) {
            setSaving(false)
            setFormError('Please add a Bio.')
            setTimeout(() => setFormError(null), 2000)
            return
        }

        await updateTable(user, 'profiles', { bio: draftBio }, 'id')
        setBio(draftBio)
        setTimeout(() => setShowForm(false), 1000) 
    }
    

    // handleOpenForm function
    const handleOpenForm = () => {
        setShowForm(true)
        setSaving(false)
    }


    // handleCloseForm function
    const handleCloseForm = () => {
        setShowForm(false)
        setDraftBio(bio)
    }


    return (
        <div>
            {isLoading ? (
                <>
                    <div className="max-w-xs">
                        <div className="flex items-center justify-between pb-1">
                            <span className="inline-block text-hint">Bio</span>
                            <span className="text-hint cursor-pointer" onClick={handleOpenForm}>Edit</span> 
                        </div>
                        <p className="whitespace-normal break-words">{bio}</p>
                    </div>
                </>
            ) : (
                <div className="pt-2">
                    <p className="text-base">Loading...</p>
                </div>
            )}

            {showForm && (
                <Modal >
                    <form >
                        <label>
                            <span className="block mb-2 text-xl">Edit Bio</span>
                            <input
                                className='w-full p-1.5 rounded-md border-2'
                                type='text'
                                value={draftBio || ''}
                                placeholder='Bio'
                                autoFocus='true'
                                spellCheck='false'
                                maxLength={'80'}
                                onChange={(e) => setDraftBio(e.target.value)}
                            />
                        </label>
                    </form>
                    <button className='btn bg-hint mt-3 mr-2' onClick={handleCloseForm}>Cancel</button>
                    <button className='btn bg-hint mt-3' onClick={handleUpdateBio}>
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                    {(profileError || formError) && (
                        <div className="absolute">
                            <p className='error'>* {profileError || formError}</p>
                        </div>
                    )}
                </Modal>
            )}
        </div>
    )
}

export default BioForm
