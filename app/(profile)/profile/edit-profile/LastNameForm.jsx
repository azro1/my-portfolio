"use client"

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Image from "next/image";

// custom hooks
import { useUpdateTable } from '@/app/hooks/useUpdateTable'
import { useUpdateMetadata } from '@/app/hooks/useUpdateMetadata';


// components
import Modal from './Modal'






const schema = yup.object({
    draftLastName: yup
        .string()
        .required('Lastname is required')
        .transform(value => {
            if (value) {
                // Transform to lowercase but keep the first letter uppercase
                return value.trim().charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            }
            return value; // Return the value if empty
        })
        .matches(/^[A-Z][a-z]*$/, "Lastname should not contain any digits or spaces")
        .min(3, 'Lastname must be at least 3 characters long'),
});






const LastNameForm = ({ user, profile, fetchProfile, changeMessage }) => {
    const [lastName, setLastName] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [formError, setFormError] = useState(null)
    const [formSuccess, setFormSuccess] = useState(null)
    const [saving, setSaving] = useState(false)
    const [hasInteracted, setHasInteracted] = useState(false)



    // custom hook to update profiles table
    const { updateTable } = useUpdateTable()

    // custom hook to update user metadata
    const { updateMetadata } = useUpdateMetadata()


    // populate form fields from profiles table
    useEffect(() => {
        if (user && profile) {
            setLastName(profile.last_name || '')
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
    const draftLastName = watch("draftLastName", "");

    useEffect(() => {
        if (draftLastName !== "") {
            setHasInteracted(true);
        }

        if (draftLastName === "" || lastName === "") {
            setFormSuccess(null);
        }
    
        // Handle validation errors
        if (errors.draftLastName) {
            setFormError(errors.draftLastName.message);
            setFormSuccess(null);

        } else if (hasInteracted) {
            // Show success message if names are different
            if (draftLastName !== lastName) {
                setFormSuccess('Your lastname looks good');
                setFormError(null);
            } else {
                setFormSuccess(null); // Reset success message if names are the same
                setFormError('Lastname cannot be the same');
            }
        }
    
        return () => {
            setFormError(null);
            setFormSuccess(null);
        };
    }, [errors.draftLastName, draftLastName, lastName, hasInteracted]);









    // update last name
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

        const sanitizedLastName = sanitizeInput(data.draftLastName);
        if (sanitizedLastName === lastName) {
            return;
        }


        try {
            setSaving(true)

            // check for successful metadata update if not log out error
            const updateMetadataResult = await updateMetadata({ last_name: sanitizedLastName })
            if (!updateMetadataResult.success) {
                console.log('metadata update error:', updateMetadataResult.error)
            }

            // check for successful profiles update if not throw new error
            const updateProfilesResult = await updateTable(user, 'profiles', { 
                last_name: sanitizedLastName,
                updated_at: new Date().toISOString() 
            }, 'id');

            if (!updateProfilesResult.success) {
                throw new Error("An unexpected error occurred and we couldn't update your last name. Please try again later. If the issue persists, contact support.")
            }

            setSaving(false)
            setShowForm(false)
            reset({ draftLastName: '' });
            changeMessage('success', 'Lastname updated!')

            // Refresh profile data after update
            fetchProfile(user);

        } catch (error) {
            setSaving(false)
            setFormSuccess(null);
            setFormError(error.message)
            fetchProfile(user)
        }
    }


    // handleOpenForm function
    const handleOpenForm = () => {
        setFormSuccess(null)
        setShowForm(true)
    }


    // handleCloseForm function
    const handleCloseForm = () => {
        reset({ draftLastName: '' });
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
                    <span className="inline-block text-ashGray">Last Name</span>
                    <span className='text-ashGray cursor-pointer' onClick={handleOpenForm}>Edit</span>
                </div>
                <p className="text-frostWhite frostWhitespace-normal break-words min-h-[24px]">{lastName}</p>
            </div>

            {showForm && (
                <Modal>
                    <form noValidate>
                        <label className='block mb-3 text-xl' htmlFor='draftLastName'>Edit Last Name</label>
                            <span >
                                
                            </span>
                            <p className='mb-3'>Please enter your last name as you&apos;d like it to appear in your profile</p>
                            <input
                                className='w-full p-2.5 rounded-md border-2'
                                id='draftLastName'
                                type='text'
                                placeholder='Last Name'
                                spellCheck={false}
                                autoFocus={true}
                                maxLength={25}
                                {...register('draftLastName')}
                                onKeyDown={handleKeyDown}
                            />
                        
                    </form>
                    <div className='flex items-center'>
                        <button className='btn-small bg-goldenRod mt-3 mr-2' onClick={handleCloseForm}>Cancel</button>
                        <button className='btn-small bg-goldenRod mt-3 w-[64px]' onClick={handleSubmit(handleNameUpdate)}>
                            {saving ? (
                                <div className='flex items-center justify-center gap-2 w-[34px] h-[24px]'>
                                    <Image
                                        className='opacity-65'
                                        width={20}
                                        height={20}
                                        src="/images/loading/reload.svg"
                                        alt="A spinning loading animation on a transparent background"
                                    />
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

export default LastNameForm
