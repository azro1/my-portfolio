"use client"

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react"
import { format, parse, parseISO } from "date-fns";
import { useForm } from "react-hook-form";
import Image from "next/image";

// custom hooks
import { useUpdateTable } from '@/app/hooks/useUpdateTable'

// components
import Modal from "./Modal";







const schema = yup.object({
    draftDob: yup
      .string()
      .required('Date of birth is required')
      .test('max-date', 'Date of birth cannot be in the future', value => {
        const selectedDate = new Date(value);
        const today = new Date();
        return selectedDate <= today;  // Ensure the selected date is not in the future
      })
      .transform(value => value.trim())
  });








const DobForm = ({ user, profile, fetchProfile, changeMessage }) => {
    const [dob, setDob] = useState('')
    const [reformattedDob, setReformattedDob] = useState('');
    const [saving, setSaving] = useState(false)
    const [formError, setFormError] = useState(null)
    const [formSuccess, setFormSuccess] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [hasInteracted, setHasInteracted] = useState(false)



    // custom hook to update profiles table
    const { updateTable } = useUpdateTable()






    // populate form fields with dob from profiles table
    useEffect(() => {
        if (user && profile) {
            setDob(profile.dob || '')
        }
    }, [user, profile])
    

    // re-format dob for validation
    useEffect(() => {
        if (dob){
            const reversedDate = format(parse(dob, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd');
            setReformattedDob(reversedDate)
        }
    }, [dob])








    // react-hook-form
    const form = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    })

    // allows us to register a form control
    const { register, handleSubmit, formState, watch, reset } = form;
    const { errors } = formState;

    // Watch the draftFirstName value
    const draftDob = watch("draftDob", "");

    useEffect(() => {

        if (draftDob !== "") {
            setHasInteracted(true);
        }

        if (draftDob === "" || reformattedDob === "") {
            setFormSuccess(null);
        }
    
        // Handle validation errors
        if (errors.draftDob) {
            setFormError(errors.draftDob.message);
            setFormSuccess(null);

        } else if (hasInteracted) {
            // Show success message if names are different
            if (draftDob !== reformattedDob) {
                setFormSuccess('Your date of birth looks good');
                setFormError(null);
            } else {
                setFormSuccess(null); // Reset success message if names are the same
                setFormError('Date of birth cannot be the same');
            }
        }
    
        return () => {
            setFormError(null);
            setFormSuccess(null);
        };
    }, [errors.draftDob, draftDob, reformattedDob, hasInteracted]);









    // update bio
    const handleUpdateDob = async (data) => {                            
        const formattedDate = format(parseISO(data.draftDob), 'dd/MM/yyyy');
        
        if (formattedDate === dob) {
            return;
        }

        try {
            setSaving(true)

            const updateProfilesResult = await updateTable(user, 'profiles', { 
                dob: formattedDate,
                updated_at: new Date().toISOString() 
            }, 'id');
            
            if (!updateProfilesResult.success) {
                throw new Error("An unexpected error occurred and we couldn't update your date of birth. Please try again later. If the issue persists, contact support.")
            }

            setSaving(false)
            setShowForm(false)
            reset({ draftDob: '' });
            changeMessage('success', 'Date of birth updated!')

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
        reset({ draftDob: '' });
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
                    <span className="inline-block text-ashGray">Dob</span>
                    <span className='text-ashGray cursor-pointer' onClick={handleOpenForm}>
                        Edit
                    </span> 
                </div>
                <p className="text-frostWhite frostWhitespace-normal break-words min-h-[24px]">{dob}</p>
            </div>

            {showForm && (
                <Modal >
                    <form noValidate>
                        <label className="block mb-3 text-xl font-medium" htmlFor='draftDob'>Edit Dob</label>
                        <p className='mb-3'>Please enter a valid date of birth to keep your account accurate and up-to-date</p>
                        <input
                            className='w-full p-1.5 rounded-md border-2'
                            id='draftDob'
                            type='date'
                            spellCheck={false}
                            {...register('draftDob')}
                            onKeyDown={handleKeyDown}
                        />
                    </form>
                    <div className='flex items-center'>
                        <button className='btn-small bg-goldenRod mt-3 mr-2' onClick={handleCloseForm}>Cancel</button>
                        <button className='btn-small bg-goldenRod mt-3 w-[64px]' disabled={saving} onClick={handleSubmit(handleUpdateDob)}>
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

export default DobForm
