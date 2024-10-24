"use client"

import { useState, useEffect } from 'react'

// custom hooks
import { useUpdateTable } from '@/app/hooks/useUpdateTable'
import { useUpdateMetadata } from '@/app/hooks/useUpdateMetadata'

// components
import Modal from './Modal'

const FirstNameForm = ({ user, profile, fetchProfile, changeMessage }) => {
    const [first_name, setFirstName] = useState('')
    const [draftFirstName, setDraftFirstName] = useState('');
    const [showForm, setShowForm] = useState(false)
    const [formError, setFormError] = useState(null)
    const [saving, setSaving] = useState(false)

    // custom hook to update profiles table
    const { updateTable } = useUpdateTable()

    // custom hook to update user metadata
    const { updateMetadata } = useUpdateMetadata()


    // populate form fields from profiles table
    useEffect(() => {
        if (user && profile) {
            setDraftFirstName(profile.first_name || user.user_metadata.name || '')
            setFirstName(profile.first_name || user.user_metadata.name || '')
        }
    }, [user, profile])



    // update first name
    const handleNameUpdate = async () => {

        if (!draftFirstName.trim()) {
            setSaving(false)
            setFormError('Please add a first name.')
            setTimeout(() => setFormError(null), 2000)
            return
        } else if (first_name === draftFirstName) {
            setSaving(false)
            setFormError('Please update your first name before saving.')
            setTimeout(() => setFormError(null), 2000)
            return
        }

        try {
            setSaving(true)

            // check for successful metadata update if not log out error
            const updateMetadataResult = await updateMetadata({ first_name: draftFirstName })
            if (!updateMetadataResult.success) {
                console.log('metadata update error:', updateMetadataResult.error)
            }

            // check for successful profiles update if not throw new error
            const updateProfilesResult = await updateTable(user, 'profiles', { 
                first_name: draftFirstName,
                updated_at: new Date().toISOString(), 
            }, 'id');

            if (!updateProfilesResult.success) {
                throw new Error("An unexpected error occurred and we couldn't update your first name. Please try again later. If the issue persists, contact support.")
            }


            // check for successful comments update if not throw new error
            const updateCommentsResult = await updateTable(user, 'comments', { 
                first_name: draftFirstName,
                updated_at: new Date().toISOString(), 
            }, 'comment_id');

            if (!updateCommentsResult.success) {
                setSaving(false)
                fetchProfile(user)
                throw new Error("An unexpected error occurred. Your first name was updated but we couldn't update your comments. Please try again later. If the issue persists, contact support.")
            }


            if (updateProfilesResult.success && updateCommentsResult.success) {
                setFirstName(draftFirstName)
                
                setTimeout(() => {
                    setShowForm(false)
                    changeMessage('success', 'First name updated!')
                }, 1000)
            }
   
        } catch (error) {
            setFormError(error.message)
            setSaving(false)
            fetchProfile(user)
        }
    }


    // handleOpenForm function
    const handleOpenForm = () => {
        setShowForm(true)
        setSaving(false)
    }


    // handleCloseForm function
    const handleCloseForm = () => {
        setFormError(null)
        setShowForm(false)
        setDraftFirstName(first_name)
    }


    // prevent enter submission and only specified keys
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') e.preventDefault()
        
        if (!/^[A-Za-z]$/.test(e.key) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
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
                            <p className='mb-3'>Please enter your first name as you'd like it to appear in your profile.</p>
                            <input
                                className='w-full p-2.5 rounded-md border-2'
                                type='text'
                                value={draftFirstName || ''}
                                placeholder='First Name'
                                spellCheck={false}
                                autoFocus={true}
                                maxLength={15}
                                onChange={(e) => setDraftFirstName(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </label>
                    </form>
                    <div className='flex items-center'>
                        <button className='btn-small bg-saddleBrown mt-3 mr-2' onClick={handleCloseForm}>Cancel</button>
                        <button className='btn-small bg-saddleBrown mt-3' onClick={handleNameUpdate}>
                            {saving ? (
                                <div className='flex items-center gap-2'>
                                    <img className="w-5 h-5 opacity-50" src="../../images/loading/spinner.svg" alt="Loading indicator" />
                                    <span>Save</span>
                                </div>
                            ) : (
                                'Save'
                            )}
                        </button>
                    </div>
                    {formError && <p className='modal-form-error'>{formError}</p>}
                </Modal>
            )}
        </div>
    )
}

export default FirstNameForm
