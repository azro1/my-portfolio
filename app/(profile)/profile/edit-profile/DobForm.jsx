"use client"

import { useState, useEffect } from "react"
import { format, parseISO } from "date-fns";

// custom hooks
import { useUpdateTable } from '@/app/hooks/useUpdateTable'

// components
import Modal from "./Modal";

const DobForm = ({ user, profile, displayGlobalMsg }) => {
    const [dob, setDob] = useState('')
    const [draftDob, setDraftDob] = useState('')
    const [saving, setSaving] = useState(false)
    const [formError, setFormError] = useState(null)
    const [showForm, setShowForm] = useState(false)


    // custom hook to update profiles table
    const { error: updateTableError, updateTable } = useUpdateTable()


    // populate form fields from profiles table
    useEffect(() => {
        if (user && profile) {
            setDob(profile.dob || '')
        }

        if (updateTableError) {
            setFormError(updateTableError)
         }
         return () => setFormError(null);

    }, [user, profile, updateTableError])
    


    // update bio
    const handleUpdateDob = async () => {     
        if (!draftDob.trim()) {
            setSaving(false)
            setFormError('Please enter your date of birth')
            setTimeout(() => setFormError(null), 2000)
            return
        }

        const formattedDate = format(parseISO(draftDob.trim()), 'dd/MM/yyyy');

        setSaving(true)
        await updateTable(user, 'profiles', { dob: formattedDate }, 'id')
        
        setTimeout(() => {
            setSaving(false)
            setShowForm(false)
            setDob(formattedDate)
            setDraftDob('')
            displayGlobalMsg('success', 'Date of birth updated!')
        }, 2000)

    }
    

    // handleOpenForm function
    const handleOpenForm = () => {
        setShowForm(true)
        setSaving(false)
    }


    // handleCloseForm function
    const handleCloseForm = () => {
        setShowForm(false)
        setDraftDob('')
    }


    // prevent enter submission
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }



    return (
        <div>
            <div className='my-4'>
                <div className="flex items-center justify-between pb-1">
                    <span className="inline-block text-stoneGray">Dob</span>
                    <span className='text-red-600 cursor-pointer' onClick={handleOpenForm}>
                        Edit
                    </span> 
                </div>
                <p className="text-nightSky frostWhitespace-normal break-words">{dob}</p>
            </div>

            <div className='bg-cloudGray h-px'></div>

            {showForm && (
                <Modal >
                    <form >
                        <label>
                            <span className="block mb-2 text-xl">
                                Edit Dob
                            </span>
                            <p className='mb-3'>Please enter a valid date of birth to keep your account accurate and up-to-date.</p>
                            <input
                                className='w-full p-1.5 rounded-md border-2'
                                type='date'
                                value={draftDob || ''}
                                autoFocus={true}
                                spellCheck={false}
                                max={new Date().toISOString().split("T")[0]}
                                onChange={(e) => setDraftDob(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </label>
                    </form>
                    <div className='flex items-center'>
                        <button className='btn-small bg-saddleBrown mt-3 mr-2' onClick={handleCloseForm}>Cancel</button>
                        <button className='btn-small bg-saddleBrown mt-3' disabled={saving} onClick={handleUpdateDob}>
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

export default DobForm
