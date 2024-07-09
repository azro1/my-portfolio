"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// components
import Modal from "./Modal";

const BioForm = ({ user, profile }) => {
    const [bio, setBio] = useState('')
    const [draftBio, setDraftBio] = useState('');
    const [saving, setSaving] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [bioError, setBioError] = useState(null)
    const [bioSuccess, setBioSuccess] = useState(null)
    const [showForm, setShowForm] = useState(false)


    const supabase = createClientComponentClient()
    

    // populate form fields from profiles table
    useEffect(() => {
        if (user && profile) {
            setIsLoading(true)
            setBio(profile.bio)
            setDraftBio(profile.bio)
        }
    }, [user, profile])
    


    // update bio function
    const updateBio = async () => {
          
        try {
            setSaving(true)

            if (!draftBio) {
                setSaving(null)
                setBioError('Please add a bio.')
                setTimeout(() => setBioError(''), 2000)
                return
            }

            const { error } = await supabase
                .from('profiles')
                .update({
                    bio: draftBio
                })
                .eq('id', user.id)
                .select()

            if (error) {
                throw new Error(error.message)
            } else {
                setBio(draftBio)
                setBioSuccess('Bio added!')
                setTimeout(() => setShowForm(false), 2000) 
            }

        } catch (error) {
            console.log(error.message)
            setBioError('Something went wrong. Please try again later.')

        } finally {
            function clearBioMsgs() {
                setBioSuccess('')
                setBioError('')
            }
            setTimeout(clearBioMsgs, 2000)    
        }


    }
    

    // handleOpenForm function
    const handleOpenForm = () => {
        setShowForm(true)
        setSaving(null)
    }


    // handleCloseForm function
    const handleCloseForm = () => {
        setShowForm(false)
        setDraftBio(bio)
    }


    return (
        <div className="p-3 relative h-64">

            {isLoading ? (
                <>
                    <div className="max-w-xs">
                        <div className="flex justify-between">
                            <span className="inline-block pb-1 text-hint">Bio</span>
                            <span className="text-hint cursor-pointer" onClick={handleOpenForm}>Edit</span> 
                        </div>


                        <p className="whitespace-normal break-words">{showForm ? '' : `${bio}`}</p>
                    </div>
                </>
            ) : (
                <div className="pt-2">
                    <p className="text-base">Loading...</p>
                </div>
            )}

            {showForm && (
                <Modal >
                    <form>
                        <input
                            className='w-full p-2.5'
                            type='text'
                            value={draftBio || ''}
                            placeholder='Edit Bio'
                            autoFocus='true'
                            spellCheck='false'
                            maxLength={'80'}
                            onChange={(e) => setDraftBio(e.target.value)}
                        />
                    </form>
                    <button className='btn bg-hint mt-3 mr-2' onClick={handleCloseForm}>Cancel</button>
                    <button className='btn bg-hint mt-3' onClick={updateBio}>
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                </Modal>
            )}

            <div className="absolute top-40"> 
                {bioError && <p className='error mt-2'>* {bioError}</p>}
                {bioSuccess && <div className='success mt-2'>* {bioSuccess}</div>}
            </div>

        </div>
    )
}

export default BioForm
