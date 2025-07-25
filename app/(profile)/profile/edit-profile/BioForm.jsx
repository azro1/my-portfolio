"use client"

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

// custom hooks
import { useUpdateTable } from '@/app/hooks/useUpdateTable'

// components
import Modal from "../../../components/Modal";







// yup validation schema
const schema = yup.object({
    draftBio: yup
      .string()
      .required('Please add your new bio')
      .transform(value => value.trim())
      .test('has-no-digits', "Your bio should not include any digits", value => {
        return !value || !/\d/.test(value); // Block digits
      })
  });
  












const BioForm = ({ user, profile, fetchProfile, changeMessage }) => {
    const [bio, setBio] = useState('')
    const [isUpdating, setIsUpdating] = useState(false)
    const [formError, setFormError] = useState(null)
    const [formSuccess, setFormSuccess] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [hasInteracted, setHasInteracted] = useState(false);
    const modalRef = useRef();
  

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
            if (draftBio.toLowerCase() !== bio.toLowerCase()) {
                setFormSuccess('Your bio looks good!');
                setFormError(null);
            } else {
                setFormSuccess(null); // Reset success message if names are the same
                setFormError('Bio cannot be the same');
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
            setIsUpdating(true)

            // check for successful update if not throw new error
            const updateProfilesResult = await updateTable(user, 'profiles', { 
                bio: sanitizedBio,
                updated_at: new Date().toISOString()
            }, 'id');

            if (!updateProfilesResult.success) {
                throw new Error("An unexpected error occurred and we couldn't update your bio. Please try again later. If the issue persists, contact support.")
            } 

            setIsUpdating(false)
            setShowForm(false)
            reset({ draftBio: '' });
            changeMessage('success', 'Bio updated!')

            // Refresh profile data after update
            fetchProfile(user);


        } catch (error) {
            setIsUpdating(false)
            setFormSuccess(null);
            fetchProfile(user)
        }
    }
    






    // handleOpenForm function
    const handleOpenForm = () => {
        setFormSuccess(null)
        setFormError(null)
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






    // close modal form if user clicks outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickedOutsideMenu = modalRef.current && !modalRef.current.contains(event.target)

            if (clickedOutsideMenu && showForm) {
                setShowForm(false)
            }

        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [showForm]);
    





    return (
        <div >
         <div className='pb-4 w-full'>
            <div className="flex items-center justify-between pb-1">
                <span className="inline-block text-ashGray">Bio</span>
                <span className='text-ashGray cursor-pointer' onClick={handleOpenForm}>Edit</span> 
            </div>
            <div className="w-full break-words">
                <p className='text-cloudGray frost min-h-[24px]'>{bio}</p>
            </div>
        </div>


            {showForm && (
                <Modal 
                    className='bg-softGray p-6 sm:p-10 w-[420px] mx-auto rounded-md sm:rounded-xl'
                    backdrop='bg-modal-translucent-dark'
                    ref={modalRef}
                >
                    <form noValidate>
                        <label className="block mb-2 text-xl font-medium" htmlFor="draftBio">Edit Bio</label>
                        <p className='mb-3 font-light'>Please enter your updated bio. Keep it brief and relevant, as this will be displayed on your profile dashboard.</p>
                        <input
                            className='w-full p-2.5 px-4 rounded-md border-[1px] border-gray-300'
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
                    <div className='flex items-center mt-3'>
                        <button className='btn-small py-2 px-3 bg-goldenOchre mr-2' onClick={handleCloseForm}>Cancel</button>
                        <button className={`btn-small  py-2 px-3 bg-goldenOchre w-[64px] ${isUpdating ? 'opacity-65' : 'opacity-100'}`} disabled={isUpdating} onClick={handleSubmit(handleUpdateBio)}>
                            {isUpdating ? (
                                <div className='flex items-center justify-center h-[24px]'>
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
