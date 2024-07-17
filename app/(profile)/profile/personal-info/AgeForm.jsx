"use client"

import { useState, useEffect } from "react"

// custom hooks
import { useUpdate } from '@/app/hooks/useUpdate'

// components
import Modal from "./Modal";

const AgeForm = ({ user, profile }) => {
    const [age, setAge] = useState('')
    const [draftAge, setDraftAge] = useState('');
    const [saving, setSaving] = useState(false)
    const [formError, setFormError] = useState(null)
    const [showForm, setShowForm] = useState(false)
  

    // custom hook to update profiles table
    const { error: profileError, updateTable } = useUpdate()


    // populate form fields from profiles table
    useEffect(() => {
        if (user && profile) {
            setAge(profile.age || '')
            setDraftAge(profile.age || '')
        }

        if (profileError) {
            return;
         }
    }, [user, profile])
    


    // update bio
    const handleUpdateAge = async () => {     
        setSaving(true)

        if (!draftAge.trim()) {
            setSaving(false)
            setFormError('Please add your Age.')
            setTimeout(() => setFormError(null), 2000)
            return
        }

        await updateTable(user, 'profiles', { age: draftAge }, 'id')
        setTimeout(() => {
            setShowForm(false)
            setAge(draftAge)
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
        setDraftAge(age)
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
                    <span className="inline-block text-hint">Age</span>
                    <span className="text-hint cursor-pointer" onClick={handleOpenForm}>
                        {age ? 'Edit' : 'Add'}
                    </span> 
                </div>
                <p className="whitespace-normal break-words">{age}</p>
            </div>

            {showForm && (
                <Modal >
                    <form >
                        <label>
                            <span className="block mb-2 text-xl">
                                {age ? 'Edit Age' : 'Add Age'}
                            </span>
                            <input
                                className='w-full p-2.5 rounded-md border-2'
                                type='text'
                                value={draftAge || ''}
                                placeholder='Age'
                                autoFocus='true'
                                spellCheck='false'
                                maxLength={'3'}
                                onChange={(e) => setDraftAge(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </label>
                    </form>
                    <button className='btn bg-hint mt-3 mr-2' onClick={handleCloseForm}>Cancel</button>
                    <button className='btn bg-hint mt-3' onClick={handleUpdateAge}>
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

export default AgeForm