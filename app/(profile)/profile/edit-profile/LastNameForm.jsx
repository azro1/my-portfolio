"use client"

import { useState, useEffect } from 'react'

// custom hooks
import { useUpdate } from '@/app/hooks/useUpdate'
import { useUpdateMetadata } from '@/app/hooks/useUpdateMetadata';


// components
import Modal from './Modal'


const LastNameForm = ({ user, profile }) => {
    const [last_name, setLastName] = useState('')
    const [draftLastName, setDraftLastName] = useState('');
    const [showForm, setShowForm] = useState(false)
    const [formError, setFormError] = useState(null)
    const [saving, setSaving] = useState(false)


    // custom hook to update profiles table
    const { error: profileError, updateTable } = useUpdate()

    // custom hook to update user metadata
    const { updateMetadata } = useUpdateMetadata()


    // populate form fields from profiles table
    useEffect(() => {
        if (user && profile) {
            setDraftLastName(profile.last_name || '')
            setLastName(profile.last_name || '')
        }

        if (profileError) {
           return;
        }
    }, [user, profile, profileError])


    // update last name
    const handleNameUpdate = async () => {
        setSaving(true)

        if (!draftLastName.trim()) {
            setSaving(false)
            setFormError('Please add a Last Name')
            setTimeout(() => setFormError(null), 2000)
            return
        }

        // update user metadata
        updateMetadata({ lastname: draftLastName })

        // update profiles
        await updateTable(user, 'profiles', { last_name: draftLastName }, 'id')

        setTimeout(() => {
            setShowForm(false)
            setLastName(draftLastName)
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
        setDraftLastName(last_name)
    }


    // prevent enter submission
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }


    return (
        <div>

            <div className="max-w-xs">
                <div className="flex items-center justify-between pb-1">
                    <span className="inline-block text-accentRed">Last Name</span>
                    <span className="text-accentRed cursor-pointer" onClick={handleOpenForm}>
                        {last_name ? 'Edit' : 'Add'}
                    </span>
                </div>
                <p className="whitespace-normal break-words">{last_name}</p>
            </div>
  
            {showForm && (
                <Modal>
                    <form>
                        <label>
                            <span className='block mb-2 text-xl'>
                                {last_name ? 'Edit Last Name' : 'Add Last Name'}
                            </span>
                            <input
                                className='w-full p-2.5 rounded-md border-2'
                                type='text'
                                value={draftLastName || ''}
                                placeholder='Last Name'
                                spellCheck='false'
                                autoFocus='true'
                                onChange={(e) => setDraftLastName(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </label>
                    </form>
                    <button className='btn bg-accentRed mt-3 mr-2' onClick={handleCloseForm}>Cancel</button>
                    <button className='btn bg-accentRed mt-3' onClick={handleNameUpdate}>
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

export default LastNameForm
