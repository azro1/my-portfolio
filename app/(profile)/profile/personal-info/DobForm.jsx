"use client"

import { useState, useEffect } from "react"
import { format, parseISO } from "date-fns";

// custom hooks
import { useUpdate } from '@/app/hooks/useUpdate'

// components
import Modal from "./Modal";

const DobForm = ({ user, profile }) => {
    const [dob, setDob] = useState('')
    const [draftDob, setDraftDob] = useState('');
    const [saving, setSaving] = useState(false)
    const [formError, setFormError] = useState(null)
    const [showForm, setShowForm] = useState(false)
  

    // custom hook to update profiles table
    const { error: profileError, updateTable } = useUpdate()


    // populate form fields from profiles table
    useEffect(() => {
        if (user && profile) {
            setDob(profile.dob || '')
            setDraftDob(profile.dob || '')
        }

        if (profileError) {
            return;
         }
    }, [user, profile])
    


    // update bio
    const handleUpdateDob = async () => {     
        setSaving(true)

        if (!draftDob.trim()) {
            setSaving(false)
            setFormError('Please add your Date of birth.')
            setTimeout(() => setFormError(null), 2000)
            return
        }

        const formattedDate = format(parseISO(draftDob.trim()), 'dd/MM/yyyy');
        console.log(formattedDate)

        await updateTable(user, 'profiles', { dob: formattedDate }, 'id')
        setTimeout(() => {
            setShowForm(false)
            setDob(formattedDate)
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
        setDraftDob(dob)
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
                    <span className="inline-block text-hint">Dob</span>
                    <span className="text-hint cursor-pointer" onClick={handleOpenForm}>
                        {dob ? 'Edit' : 'Add'}
                    </span> 
                </div>
                <p className="whitespace-normal break-words">{dob}</p>
            </div>

            {showForm && (
                <Modal >
                    <form >
                        <label>
                            <span className="block mb-2 text-xl">
                                {dob ? 'Edit Dob' : 'Add Dob'}
                            </span>
                            <input
                                className='w-full p-1.5 rounded-md border-2'
                                type='date'
                                value={draftDob || ''}
                                placeholder='Dob'
                                autoFocus='true'
                                spellCheck='false'
                                maxLength={'10'}
                                onChange={(e) => setDraftDob(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </label>
                    </form>
                    <button className='btn bg-hint mt-3 mr-2' onClick={handleCloseForm}>Cancel</button>
                    <button className='btn bg-hint mt-3' onClick={handleUpdateDob}>
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

export default DobForm
