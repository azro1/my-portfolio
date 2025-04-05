"use client"

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

// custom hooks
import { useUpdateTable } from '@/app/hooks/useUpdateTable'

// components
import Modal from "./Modal";







// yup validation schema
const schema = yup.object({
    draftBio: yup
      .string()
      .required('Please add your new bio.')
      .transform(value => value.trim())
      .test('has-no-digits', "Your bio should not include any digits.", value => {
        return !value || !/\d/.test(value); // Block digits
      })
  });
  












const BioForm = ({ user, profile, fetchProfile, changeMessage }) => {
    const [bio, setBio] = useState('')
    const [saving, setSaving] = useState(false)
    const [formError, setFormError] = useState(null)
    const [formSuccess, setFormSuccess] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [hasInteracted, setHasInteracted] = useState(false);

  

    // custom hook to update profiles table
    const { updateTable } = useUpdateTable()


    // populate form fields from profiles table
    useEffect(() => {
        if (user && profile) {
            setBio(profile.bio || '')
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

    // Watch the draftBio value
    const draftBio = watch("draftBio", "");

    useEffect(() => {
        if (draftBio !== "") {
            setHasInteracted(true);
        }

        if (draftBio === "") {
            setFormSuccess(null);
        }

        // Handle validation errors
        if (errors.draftBio) {
            setFormError(errors.draftBio.message)
            setFormSuccess(null);

        } else if (hasInteracted) {
            // Show success message if names are different
            if (draftBio !== bio) {
                setFormSuccess('Your bio looks good.');
                setFormError(null);
            } else {
                setFormSuccess(null); // Reset success message if names are the same
                setFormError('Bio cannot be the same.');
            }
        }

        return () => {
            setFormError(null)
            setFormSuccess(null)
        };
    }, [errors.draftBio, draftBio, bio, hasInteracted])








    // update bio
    const handleUpdateBio = async (data) => {    

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

        const sanitizedBio = sanitizeInput(data.draftBio);
        if (sanitizedBio === bio) {
            return;
        }
        
        try {
            setSaving(true)

            // check for successful update if not throw new error
            const updateProfilesResult = await updateTable(user, 'profiles', { 
                bio: sanitizedBio,
                updated_at: new Date().toISOString()
            }, 'id');

            if (!updateProfilesResult.success) {
                throw new Error("An unexpected error occurred and we couldn't update your bio. Please try again later. If the issue persists, contact support.")
            } 

            setSaving(false)
            setShowForm(false)
            reset({ draftBio: '' });
            changeMessage('success', 'Bio updated!')

            // Refresh profile data after update
            fetchProfile(user);


        } catch (error) {
            setSaving(false)
            setFormSuccess(null);
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
        reset({ draftBio: '' });
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
            <div className='pb-4'>
                <div className="flex items-center justify-between pb-2">
                    <span className="inline-block text-base text-ashGray">Bio</span>
                    <span className='text-ashGray text-base cursor-pointer' onClick={handleOpenForm}>Edit</span> 
                </div>
                <p className='text-frostWhite frost whitespace-normal break-words min-h-[24px]' >{bio}</p>
            </div>


            {showForm && (
                <Modal >
                    <form noValidate>
                        <label className="block mb-2 text-xl" htmlFor="draftBio">Edit Bio</label>
                        <p className='mb-3'>Please enter your updated bio. Keep it brief and relevant, as this will be displayed on your profile dashboard.</p>
                        <input
                            className='w-full p-2.5 rounded-md border-2'
                            id='draftBio'
                            type='text'
                            placeholder='Bio'
                            autoFocus={true}
                            spellCheck={false}
                            maxLength={80}
                            {...register('draftBio')}
                            onKeyDown={handleKeyDown}
                        />
                    </form>
                    <div className='flex items-center'>
                        <button className='btn-small bg-chocolate mt-3 mr-2' onClick={handleCloseForm}>Cancel</button>
                        <button className='btn-small bg-chocolate mt-3' onClick={handleSubmit(handleUpdateBio)}>
                            {saving ? (
                                <div className='flex items-center justify-center w-[34px] h-[24px]'>
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
                    {formError && <p className='modal-form-error'>{formError}</p>}
                    {formSuccess && <p className='modal-form-success'>{formSuccess}</p>}
                </Modal>
            )}
        </div>
    )
}

export default BioForm
