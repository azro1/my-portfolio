"use client"

import { useState, useEffect } from 'react'

// custom hooks
import { useUpdateTable } from '@/app/hooks/useUpdateTable'
import { useUpdateMetadata } from '@/app/hooks/useUpdateMetadata'

// components
import Modal from './Modal'

const FirstNameForm = ({ user, profile }) => {
    const [first_name, setFirstName] = useState('')
    const [draftFirstName, setDraftFirstName] = useState('');
    const [showForm, setShowForm] = useState(false)
    const [formError, setFormError] = useState(null)
    const [saving, setSaving] = useState(false)

    // custom hook to update profiles table
    const { error: profileError, updateTable } = useUpdateTable()

    // custom hook to update user metadata
    const { updateMetadata } = useUpdateMetadata()


    // populate form fields from profiles table
    useEffect(() => {
        if (user && profile) {
            setDraftFirstName(profile.first_name || user.user_metadata.name || '')
            setFirstName(profile.first_name || user.user_metadata.name || '')
        }

        if (profileError) {
           return;
        }
    }, [user, profile, profileError])


    // update first name
    const handleNameUpdate = async () => {
        setSaving(true)

        if (!draftFirstName.trim()) {
            setSaving(false)
            setFormError('Please add a First Name')
            setTimeout(() => setFormError(null), 2000)
            return
        }

        // update user metadata
        updateMetadata({ first_name: draftFirstName })

        // update profiles
        await updateTable(user, 'profiles', { first_name: draftFirstName }, 'id')
        
        // update comments
        await updateTable(user, 'comments', { first_name: draftFirstName }, 'comment_id')

        setFirstName(draftFirstName)
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
        setDraftFirstName(first_name)
    }


    // prevent enter submission
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }


    return (
        <div>
            <div className='mb-4'>
                <div className="flex items-center justify-between pb-1">
                    <span className="inline-block text-stoneGray">First Name</span>
                    <span className="text-red-600 cursor-pointer" onClick={handleOpenForm}>Edit</span>
                </div>
                <p className="text-nightSky frostWhitespace-normal break-words">{first_name}</p>
            </div>
  
            <div className='bg-cloudGray h-px'></div>
                        
            {showForm && (
                <Modal>
                    <form>
                        <label>
                            <span className='block mb-2 text-xl'>
                                Edit First Name
                            </span>
                            <input
                                className='w-full p-2.5 rounded-md border-2'
                                type='text'
                                value={draftFirstName || ''}
                                placeholder='First Name'
                                spellCheck='false'
                                autoFocus='true'
                                onChange={(e) => setDraftFirstName(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </label>
                    </form>
                    <button className='btn bg-saddleBrown mt-3 mr-2' onClick={handleCloseForm}>Cancel</button>
                    <button className='btn bg-saddleBrown mt-3' onClick={handleNameUpdate}>
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

export default FirstNameForm
