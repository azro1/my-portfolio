"use client"

import { useState, useEffect } from 'react'

// custom hooks
import { useUpdate } from '@/app/hooks/useUpdate'
import { useUpdateMetadata } from '@/app/hooks/useUpdateMetadata';


// components
import Modal from './Modal'


const PhoneForm = ({ user, profile }) => {
    const [phone, setPhone] = useState('')
    const [draftPhone, setDraftPhone] = useState('');
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
            setDraftPhone(profile.phone || '')
            setPhone(profile.phone || '')
            console.log(user)
        }

        if (profileError) {
           return;
        }
    }, [user, profile, profileError])


    // update last name
    const handlePhoneUpdate = async () => {
        setSaving(true)

        if (!draftPhone) {
            setSaving(false)
            setFormError('Please add a Phone Number.')
            setTimeout(() => setFormError(null), 2000)
            return
        }

        // update user metadata
        updateMetadata({ phone: draftPhone })

        // update profiles
        await updateTable(user, 'profiles', { phone: draftPhone }, 'id')

        setTimeout(() => {
            setShowForm(false)
            setPhone(draftPhone)
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
        setDraftPhone(phone)
    }


    return (
        <div>

            <div className="max-w-xs">
                <div className="flex items-center justify-between pb-1">
                    <span className="inline-block text-hint">Phone Number</span>
                    <span className="text-hint cursor-pointer" onClick={handleOpenForm}>
                        {phone ? 'Edit' : 'Add'}
                    </span>
                </div>
                <p className="whitespace-normal break-words">{phone}</p>
            </div>
  
            {showForm && (
                <Modal>
                    <form>
                        <label>
                            <span className='block mb-2 text-xl'>
                                {phone ? 'Edit Phone Number' : 'Add Phone Number'}
                            </span>
                            <input
                                className='w-full p-2.5 rounded-md border-2'
                                type='tel'
                                value={draftPhone || ''}
                                placeholder='Phone'
                                spellCheck='false'
                                autoFocus='true'
                                pattern='[0-9]{7,15}'
                                maxLength="15"
                                onChange={(e) => setDraftPhone(e.target.value)}
                            />
                        </label>
                    </form>
                    <button className='btn bg-hint mt-3 mr-2' onClick={handleCloseForm}>Cancel</button>
                    <button className='btn bg-hint mt-3' onClick={handlePhoneUpdate}>
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

export default PhoneForm
