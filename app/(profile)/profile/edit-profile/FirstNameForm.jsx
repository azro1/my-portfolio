"use client"

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";


// custom hooks
import { useUpdateTable } from '@/app/hooks/useUpdateTable'
import { useUpdateMetadata } from '@/app/hooks/useUpdateMetadata'

// components
import Modal from './Modal'





// yup validation schema
const schema = yup.object({
    draftFirstName: yup
        .string()
        .required('Firstname is required')
        .transform(value => {
            if (value) {
                // Transform to lowercase but keep the first letter uppercase
                return value.trim().charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            }
            return value; // Return the value if empty
        })
        .matches(/^[A-Z][a-z]*$/, "Firstname should not contain any digits or spaces")
        .min(3, 'Firstname must be at least 3 characters long'),
});



  




const FirstNameForm = ({ user, profile, fetchProfile, changeMessage }) => {
    const [firstName, setFirstName] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [formError, setFormError] = useState(null)
    const [formSuccess, setFormSuccess] = useState(null)
    const [saving, setSaving] = useState(false)
    const [hasInteracted, setHasInteracted] = useState(false);
    


    // custom hook to update profiles table
    const { updateTable } = useUpdateTable()

    // custom hook to update user metadata
    const { updateMetadata } = useUpdateMetadata()


    // populate form fields from profiles table
    useEffect(() => {
        if (user && profile) {
            setFirstName(profile.first_name || profile.full_name || '')
        }
    }, [user, profile])





    // react-hook-form
    const form = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    })

    // allows us to register a form control
    const { register, handleSubmit, formState, watch, reset } = form;
    const { errors } = formState;

    // Watch the draftFirstName value
    const draftFirstName = watch("draftFirstName", "");

    useEffect(() => {
        if (draftFirstName !== "") {
            setHasInteracted(true);
        }

        if (draftFirstName === "" || firstName === "") {
            setFormSuccess(null);
        }
    
        // Handle validation errors
        if (errors.draftFirstName) {
            setFormError(errors.draftFirstName.message);
            setFormSuccess(null);

        } else if (hasInteracted) {
            // Show success message if names are different
            if (draftFirstName !== firstName) {
                setFormSuccess('Your firstname looks good');
                setFormError(null);
            } else {
                setFormSuccess(null); // Reset success message if names are the same
                setFormError('Firstname cannot be the same');
            }
        }
    
        return () => {
            setFormError(null);
            setFormSuccess(null);
        };
    }, [errors.draftFirstName, draftFirstName, firstName, hasInteracted]);





    // update first name
    const handleNameUpdate = async (data) => {
        
        const sanitizeInput = (input) => {
            return input.replace(/[&<>]/g, (char) => {
                const entityMap = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                };
                return entityMap[char] || char;
            });
        };

        const sanitizedFirstName = sanitizeInput(data.draftFirstName);
        if (sanitizedFirstName === firstName) {
            return;
        }


        try {
            setSaving(true)

            // check for successful metadata update if not log out error
            const updateMetadataResult = await updateMetadata({ first_name: sanitizedFirstName })
            if (!updateMetadataResult.success) {
                console.log('metadata update error:', updateMetadataResult.error)
            }
            
            // check for successful profiles update if not throw new error
            const updateProfilesResult = await updateTable(user, 'profiles', { 
                first_name: sanitizedFirstName,
                updated_at: new Date().toISOString(), 
            }, 'id');

            if (!updateProfilesResult.success) {
                throw new Error("An unexpected error occurred and we couldn't update your firstname. Please try again later. If the issue persists, contact support.")
            }


            // check for successful comments update if not throw new error
            const updateCommentsResult = await updateTable(user, 'comments', { 
                first_name: sanitizedFirstName,
                updated_at: new Date().toISOString(), 
            }, 'comment_id');

            if (!updateCommentsResult.success) {
                setSaving(false)
                fetchProfile(user)
                throw new Error("An unexpected error occurred. Your firstname was updated but we couldn't update your comments. Please try again later. If the issue persists, contact support.")
            }


            if (updateProfilesResult.success && updateCommentsResult.success) {
                setSaving(false)
                setShowForm(false)
                reset({ draftFirstName: '' });
                changeMessage('success', 'Firstname updated!')

                // Refresh profile data after update
                fetchProfile(user);
            }

   
        } catch (error) {
            setSaving(false)
            setFormSuccess(null);
            fetchProfile(user)
            setFormError(error.message)
        }
    }


    // handleOpenForm function
    const handleOpenForm = () => {
        setFormSuccess(null)
        setShowForm(true)
    }


    // handleCloseForm function
    const handleCloseForm = () => {
        reset({ draftFirstName: '' });
        setShowForm(false)
    }


    // prevent enter submission
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }



    return (
        <div>
            <div className='py-4'>
                <div className="flex items-center justify-between pb-2">
                    <span className="inline-block text-ashGray">First Name</span>
                    <span className="text-ashGray cursor-pointer" onClick={handleOpenForm}>Edit</span>
                </div>
                <p className="text-frostWhite frostWhitespace-normal break-words min-h-[24px]">{firstName}</p>
            </div>
                          
            {showForm && (
                <Modal>
                    <form noValidate>
                        <label className='block mb-3 text-xl font-medium' htmlFor='draftFirstName'>Edit First Name</label>
                        <p className='mb-3'>Please enter your first name as you'd like it to appear in your profile</p>
                        <input
                            className='w-full p-2.5 rounded-md border-2'
                            id='draftFirstName'
                            type='text'
                            placeholder='First Name'
                            spellCheck={false}
                            autoFocus={true}
                            maxLength={15}
                            {...register('draftFirstName')}
                            onKeyDown={handleKeyDown}
                        />
                        
                    </form>
                    <div className='flex items-center'>
                        <button className='btn-small bg-rust mt-3 mr-2' onClick={handleCloseForm}>Cancel</button>
                        <button className='btn-small bg-rust mt-3 w-[64px]' onClick={handleSubmit(handleNameUpdate)}>
                            {saving ? (
                                <div className='flex items-center justify-center gap-2'>
                                    <img className="w-6 h-6 opacity-50" src="../../images/loading/reload.svg" alt="Loading indicator" />
                                </div>
                            ) : (
                                'Save'
                            )}
                        </button>
                    </div>
                    {(formError || formSuccess) && (
                        <p className={`${formError ? 'modal-form-error' : 'modal-form-success'}`}>{formError || formSuccess}</p>
                    )} 
                </Modal>
            )}
        </div>
    )
}

export default FirstNameForm
