"use client"

import { useState, useEffect } from 'react'
import Modal from './Modal'

// custom hooks
import { useUpdate } from '@/app/hooks/useUpdate'

const LastNameForm = ({ user, profile }) => {
    const [last_name, setLastName] = useState('')
    const [draftLastName, setDraftLastName] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [formError, setFormError] = useState(null)
    const [saving, setSaving] = useState(false)


    // custom hook to update profiles table
    const { error: profileError, updateTable } = useUpdate()


    // populate form fields from profiles table
    useEffect(() => {
        if (user && profile) {
            setIsLoading(true)
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
            setFormError('Please add a Last Name.')
            setTimeout(() => setFormError(null), 2000)
            return
        }

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


    return (
        <div>
            {isLoading ? (
                <>
                    <div className="max-w-xs">
                        <div className="flex items-center justify-between pb-1">
                            <span className="inline-block text-hint">Last Name</span>
                            <span className="text-hint cursor-pointer" onClick={handleOpenForm}>
                                {last_name ? 'Edit' : 'Add'}
                            </span>
                        </div>
                        <p className="whitespace-normal break-words">{last_name}</p>
                    </div>
                </>
            ) : (
                <div className="pt-2">
                    <p className="text-base">Loading...</p>
                </div>
            )}

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
                            />
                        </label>
                    </form>
                    <button className='btn bg-hint mt-3 mr-2' onClick={handleCloseForm}>Cancel</button>
                    <button className='btn bg-hint mt-3' onClick={handleNameUpdate}>
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

export default LastNameForm
