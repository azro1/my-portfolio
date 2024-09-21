"use client"

import { useState, useEffect } from "react"

// custom hooks
import { useUpdateTable } from '@/app/hooks/useUpdateTable'

// components
import Modal from "./Modal";

const BioForm = ({ user, profile }) => {
    const [bio, setBio] = useState('')
    const [draftBio, setDraftBio] = useState('');
    const [saving, setSaving] = useState(false)
    const [formError, setFormError] = useState(null)
    const [showForm, setShowForm] = useState(false)
  

    // custom hook to update profiles table
    const { error: profileError, updateTable } = useUpdateTable()


    // populate form fields from profiles table
    useEffect(() => {
        if (user && profile) {
            setBio(profile.bio || '')
            setDraftBio(profile.bio || '')
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
            setFormError('Please add a Bio')
            setTimeout(() => setFormError(null), 2000)
            return
        }

        await updateTable(user, 'profiles', { bio: draftBio }, 'id')
        setTimeout(() => {
            setShowForm(false)
            setBio(draftBio)
        }, 1000) 
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


    // prevent enter submission
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }


    return (
        <div>
            <div>
                <div className="flex items-center justify-between pb-1">
                    <span className="inline-block text-base text-stoneGray">Bio</span>
                    <span className={`${bio ? 'text-red-600' : 'text-stoneGray'} text-base cursor-pointer`} onClick={handleOpenForm}>
                        {bio ? 'Edit' : 'Add'}
                    </span> 
                </div>
                <p className="text-nightSky frost whitespace-normal break-words">{bio}</p>
            </div>

            {showForm && (
                <Modal >
                    <form >
                        <label>
                            <span className="block mb-2 text-xl">
                                {bio ? 'Edit Bio' : 'Add Bio'}
                            </span>
                            <input
                                className='w-full p-1.5 rounded-md border-2'
                                type='text'
                                value={draftBio || ''}
                                placeholder='Bio'
                                autoFocus='true'
                                spellCheck='false'
                                maxLength={'80'}
                                onChange={(e) => setDraftBio(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </label>
                    </form>
                    <button className='btn bg-deepOlive mt-3 mr-2' onClick={handleCloseForm}>Cancel</button>
                    <button className='btn bg-deepOlive mt-3' onClick={handleUpdateBio}>
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                    {(profileError || formError) && (
                        <div className="absolute">
                            <p className='modal-form-error'>* {profileError || formError}</p>
                        </div>
                    )}
                </Modal>
            )}
        </div>
    )
}

export default BioForm
