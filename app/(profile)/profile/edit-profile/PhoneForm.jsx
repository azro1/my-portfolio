"use client"

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

// components
import Modal from './Modal'

// server actions
import { deleteOtpAccessBlockedCookie } from "@/app/actions";




// yup validation schema
const schema = yup.object({
    draftPhone: yup
    .string()
    .required('Phone is required')
    .transform(value => value.replace(/\s+/g, "")) // Remove spaces for length check

    .test('has-valid-prefix', "Please enter a valid mobile number starting with 0 or an international code (e.g., +44, +1).", value => {
        return value ? value.startsWith('0') || value.startsWith('+') : false;
    })
    .matches(/^(0\d{9,14}|\+\d{1,3}\d{8,12})$/, 'Phone should be between 10 and 15 digits') // Format with 10-15 digits
    .test('valid-length', 'Phone should be between 10 and 15 digits', value => {
        const digits = value.replace(/\D/g, ''); // Remove non-digit characters
        return digits.length >= 10 && digits.length <= 15; // Ensure total digit count is at least 10
    })
});









const PhoneForm = ({ user, profile }) => {
    const [phone, setPhone] = useState('')
    const [reformattedPhone, setReformattedPhone] = useState('');
    const [showForm, setShowForm] = useState(false)
    const [formError, setFormError] = useState(null)
    const [formSuccess, setFormSuccess] = useState(null)
    const [isUpdating, setIsUpdating] = useState(false)
    const [hasInteracted, setHasInteracted] = useState(false)

    
    const router = useRouter();



    // populate form fields from profiles table
    useEffect(() => {
        if (user && profile) {
            setPhone(profile.phone || '')
        }
    }, [user, profile])




    
    // function to convert E.164 format into uk mobile numbers
    const convertToLocalFormat = useCallback((phoneNumber) => {
        // replace international code '+44' with local prefix '0' if it exists
        if (phoneNumber.startsWith('+44')) return phoneNumber.replace('+44', '0');
    
        // return as is if already in local format
        return phoneNumber.startsWith('0') ? phoneNumber : phoneNumber;
    }, []);
   

    // re-format phone for validation
    useEffect(() => {
        if (phone){
            const reversedPhone = convertToLocalFormat(phone)
            setReformattedPhone(reversedPhone)
        }
    }, [phone, convertToLocalFormat])






    // function to convert uk mobile numbers into E.164 format
    const convertToInternationalFormat = (phoneNumber) => {
        // replace local prefix '0' with international code '+44' if it exists
        if (phoneNumber.startsWith('0')) return phoneNumber.replace('0', '+44');
    
        // return as is if already in international format
        return phoneNumber.startsWith('+') ? phoneNumber : phoneNumber;
    };







    // react-hook-form
    const form = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    })

    // allows us to register a form control
    const { register, handleSubmit, formState, watch, reset } = form;
    const { errors } = formState;

    // Watch the draftFirstName value
    const draftPhone = watch("draftPhone", "");

    useEffect(() => {

        if (draftPhone !== "") {
            setHasInteracted(true);
        }

        if (draftPhone === "" || phone === "" || reformattedPhone === "") {
            setFormSuccess(null);
        }
    
        // Handle validation errors
        if (errors.draftPhone) {
            setFormError(errors.draftPhone.message);
            setFormSuccess(null);

        } else if (hasInteracted) {
            // Remove any spaces before validation check
            const cleanedPhone = draftPhone.replace(/\s+/g, "");

            if (cleanedPhone !== phone && cleanedPhone !== reformattedPhone) {
                setFormSuccess('Your phone number looks good.');
                setFormError(null);
            } else {
                setFormSuccess(null); // Reset success message if numbers are the same
                setFormError('Phone number cannot be the same.');
            }
        }
    
        return () => {
            setFormError(null);
            setFormSuccess(null);
        };
    }, [errors.draftPhone, draftPhone, phone, reformattedPhone, hasInteracted]);



    





    // update phone
    const handlePhoneUpdate = async (data) => {        
        
        if (data.draftPhone === phone || data.draftPhone === reformattedPhone) {
            return;
        }

        const convertedPhoneNumber = convertToInternationalFormat(data.draftPhone);
        // store phone temporarily in local storage
        localStorage.setItem('phone', convertedPhoneNumber);
        // console.log(convertedPhoneNumber)
        
        try {
            setIsUpdating(true)

            const res = await fetch(`${location.origin}/api/auth/phone-update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        phone: convertedPhoneNumber
                      })
            })

            const serverPhone = await res.json();

            if (!res.ok && serverPhone.error) {
                throw new Error(serverPhone.error)
            } else if (res.status === 200 && !serverPhone.error) {
                await deleteOtpAccessBlockedCookie();
                setIsUpdating(false)
                setShowForm(false)
                router.push('/profile/verify-phone-otp')

                // set flag to indicate user has visited profile otp page
                localStorage.setItem('hasVisitedProfileOtpPage', 'true');
            }

        } catch (error) {
            setIsUpdating(false)
            setFormSuccess(null);
            localStorage.removeItem("phone");
            localStorage.removeItem('hasVisitedProfileOtpPage');
            setFormError('An unexpected error occurred while updating your phone. Please try again later. If the issue persists, contact support.')
            console.log(error.message)
        }

    }


    // handleOpenForm function
    const handleOpenForm = () => {
        setFormSuccess(null);
        setShowForm(true)
    }


    // handleCloseForm function
    const handleCloseForm = () => {
        reset({ draftPhone: '' });
        setShowForm(false)
    }


    // prevent enter submission
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }

        const regex = /^[0-9]$/;
        if (!regex.test(e.key) && e.key !== '+' && e.key !== ' ' && e.key !== 'Backspace' && e.key !== 'Delete') {
            e.preventDefault();
        }
        
    }


    return (
        <div>
            <div className='pt-4'>
                <div className="flex items-center justify-between pb-2">
                    <span className="inline-block text-ashGray">Phone Number</span>
                    <span className='text-red-600 cursor-pointer' onClick={handleOpenForm}>
                        Edit
                    </span>
                </div>
                <p className="text-cloudGray frostWhitespace-normal break-words min-h-[24px]">{reformattedPhone}</p>
            </div>
  
            {showForm && (
                <Modal>
                    <form noValidate>
                        <label className='block mb-4 text-xl' htmlFor='draftPhone'>Phone Number</label>
                            <p className='mb-3'>Please enter your new phone number. This number will be used for account verification purposes</p>
                            <input
                                className='w-full p-2.5 rounded-md border-2'
                                id='draftPhone'
                                type='tel'
                                placeholder='Phone'
                                spellCheck={false}
                                autoFocus={true}
                                {...register('draftPhone')}
                                onKeyDown={handleKeyDown}
                            />
                        
                    </form>
                    <div className='flex items-center'>
                        <button className='btn-small bg-saddleBrown mt-3 mr-2' onClick={handleCloseForm}>Cancel</button>
                        <button className='btn-small bg-saddleBrown mt-3' onClick={handleSubmit(handlePhoneUpdate)}>
                            {isUpdating ? (
                                <div className='flex items-center gap-2'>
                                    <img className="w-5 h-5 opacity-50" src="../../images/loading/reload.svg" alt="Loading indicator" />
                                    <span>Save</span>
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

export default PhoneForm
