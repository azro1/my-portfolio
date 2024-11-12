"use client"

import { useState, useEffect } from "react"

// custom hooks
import { useUpdateTable } from '@/app/hooks/useUpdateTable'

// components
import Modal from "./Modal";

const BioForm = ({ user, profile, fetchProfile, changeMessage }) => {
    const [bio, setBio] = useState('')
    const [draftBio, setDraftBio] = useState('');
    const [saving, setSaving] = useState(false)
    const [formError, setFormError] = useState(null)
    const [showForm, setShowForm] = useState(false)
  

    // custom hook to update profiles table
    const { updateTable } = useUpdateTable()


    // populate form fields from profiles table
    useEffect(() => {
        if (user && profile) {
            setBio(profile.bio || '')
            setDraftBio(profile.bio || '')
        }
    }, [user, profile])
    



    // update bio
    const handleUpdateBio = async () => {    

        if (!draftBio.trim()) {
            setSaving(false)
            setFormError('Please add your new bio.')
            setTimeout(() => setFormError(null), 2000)
            return
        } else if (bio === draftBio) {
            setSaving(false)
            setFormError('Please update your bio before saving.')
            setTimeout(() => setFormError(null), 2000)
            return
        }
        
        try {
            setSaving(true)

            // check for successful update if not throw new error
            const updateProfilesResult = await updateTable(user, 'profiles', { 
                bio: draftBio,
                updated_at: new Date().toISOString()
            }, 'id');

            if (!updateProfilesResult.success) {
                throw new Error("An unexpected error occurred and we couldn't update your bio. Please try again later. If the issue persists, contact support.")
            } 

            setBio(draftBio)
    
            setTimeout(() => {
                setShowForm(false)
                changeMessage('success', 'Bio updated!')
            }, 1000) 

        } catch (error) {
            setSaving(false)
            setFormError(error.message)
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
        setDraftBio(bio)
    }


    // prevent enter submission
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') e.preventDefault()

        if (!/^[A-Za-z]$/.test(e.key) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', ' '].includes(e.key)) {
            e.preventDefault()
        }

        // Allow only one space between words
        const currentValue = e.target.value;
        if (e.key === ' ' && currentValue.endsWith(' ')) {
            e.preventDefault();
        }
    }


    return (
        <div>
            <div>
                <div className="flex items-center justify-between pb-1">
                    <span className="inline-block text-base text-ashGray">Bio</span>
                    <span className='text-red-800 text-base cursor-pointer' onClick={handleOpenForm}>Edit</span> 
                </div>
                <p className="text-cloudGray frost whitespace-normal break-words">{bio}</p>
            </div>

            {showForm && (
                <Modal >
                    <form >
                        <label>
                            <span className="block mb-2 text-xl">
                                Edit Bio
                            </span>
                            <p className='mb-3'>Please enter your updated bio. Keep it brief and relevant, as this will be displayed on your profile dashboard.</p>
                            <input
                                className='w-full p-1.5 rounded-md border-2'
                                type='text'
                                value={draftBio || ''}
                                placeholder='Bio'
                                pattern='^(?!.* {2})[A-Za-z]+( [A-Za-z]+)*$'
                                autoFocus={true}
                                spellCheck={false}
                                maxLength={80}
                                onChange={(e) => setDraftBio(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </label>
                    </form>
                    <div className='flex items-center'>
                        <button className='btn-small bg-saddleBrown mt-3 mr-2' onClick={handleCloseForm}>Cancel</button>
                        <button className='btn-small bg-saddleBrown mt-3' onClick={handleUpdateBio}>
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

export default BioForm
