"use client"

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import disposableDomains from 'disposable-email-domains';
import Image from "next/image";

// hooks
import { useMessage } from "@/app/hooks/useMessage";

// components
import Modal from '../../../components/Modal'







// yup validation schema
const schema = yup.object({
    draftEmail: yup
      .string()
      .required('Email is required')
      .transform(value => value.trim().toLowerCase())
      .test('has-at-symbol', "Please include an '@' symbol", value => {
        return value ? value.includes('@') : true;
      })
      .email("Please use a valid domain, e.g., gmail.com")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid domain, e.g., gmail.com")
      .test('is-not-disposable', 'Disposable email addresses are not allowed. Please use a valid email.', value => {
        if (value) {
          const domain = value.split('@')[1];  // Extract domain from email
          return !disposableDomains.includes(domain);  // Check if domain is in disposable list
        }
        return true;  // If no value, pass validation
      })
  });









const EmailForm = ({ user, profile }) => {
    const [email, setEmail] = useState('')
    const [formError, setFormError] = useState(null)
    const [formSuccess, setFormSuccess] = useState(null)
    const [isUpdating, setIsUpdating] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [hasInteracted, setHasInteracted] = useState(false)

    const { changeMessage } = useMessage();
    const router = useRouter();




    // populate form fields from profiles table
    useEffect(() => {
        // setIsUpdating(true)

        if (user && profile) {
            setEmail(profile.email || '')
        }
    }, [user, profile]);






    
    // react-hook-form
    const form = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    })

    // allows us to register a form control
    const { register, handleSubmit, formState, watch, reset } = form;
    const { errors, isValid } = formState;

    // Watch the draftFirstName value
    const draftEmail = watch("draftEmail", "");

    useEffect(() => {
        if (draftEmail !== "") {
            setHasInteracted(true);
        }

        if (draftEmail === "" || email === "") {
            setFormSuccess(null);
        }
    
        // Handle validation errors
        if (errors.draftEmail) {
            setFormError(errors.draftEmail.message);
            setFormSuccess(null);

        } else if (hasInteracted && isValid) {
            // Show success message if names are different
            if (draftEmail.toLowerCase() !== email.toLowerCase()) {
                setFormSuccess('Your email looks good!');
                setFormError(null);
            } else {
                setFormSuccess(null); // Reset success message if names are the same
                setFormError('Email cannot be the same');
            }
        }
    
        return () => {
            setFormError(null);
            setFormSuccess(null);
        };
    }, [errors.draftEmail, draftEmail, email, hasInteracted, isValid]);












    const handleEmailUpdate = async (data) => {
        const newEmail = data.draftEmail;

        if (newEmail === email) {
            return;
        }
        
        try {
           setIsUpdating(true)

            const res = await fetch(`${location.origin}/api/auth/email-update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        email: newEmail
                    })
            })

            const updateResponse = await res.json();

            if (!res.ok && updateResponse.error) {
                throw new Error(updateResponse.error)

            } else if (res.status === 401) {
                setIsUpdating(false);
                setFormError(<>To prevent spam and abusive behavior <strong>cooldown</strong> is active. You must wait <strong>{updateResponse.minutesLeft}</strong>m <strong>{updateResponse.secondsLeft}</strong>s before you can request a new verification code.</>);

            } else if (res.status === 200 && !updateResponse.error) {
                setIsUpdating(false);
                setShowForm(false);

                // send new email to endpoint and set cookie and flag to indicate a refresh is necessary if they abort otp verification
                navigator.sendBeacon(`${location.origin}/api/auth/is-verifying`, JSON.stringify({ email: newEmail, isVerifying: true }));

                changeMessage('success', 'A verifcation code has been sent to your email address');
                router.push('/verify-email-otp');
            }
            
            
        } catch (error) {
            setIsUpdating(false)
            setFormSuccess(null);
            setFormError(error.message)
            console.log(error.message)
        }
        
    }


    // handleOpenForm function
    const handleOpenForm = () => {
        setFormSuccess(null);
        setFormError(null);
        setShowForm(true)
    }


    // handleCloseForm function
    const handleCloseForm = () => {
        reset({ draftEmail: '' });
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
                <div className="flex items-center justify-between pb-1">
                    <span className="inline-block text-ashGray">Email</span>
                    <span className="text-ashGray cursor-pointer" onClick={handleOpenForm}>Edit</span>
                </div>
                <p className="text-cloudGray frostWhitespace-normal break-words min-h-[24px]">{email}</p>
            </div>

            {showForm && (
                <Modal
                    className='bg-softGray p-6 sm:p-10 w-[420px] mx-auto rounded-md sm:rounded-xl'
                    backdrop='bg-modal-translucent-dark'
                >
                    <form noValidate>
                        <label className='block mb-2 text-xl font-medium' htmlFor='draftEmail'>Email Address</label>
                        <p className='mb-3 font-light'>Please enter your new email address. This email will be used for account verification and notifications</p>
                        <input
                            className='w-full p-2.5 px-4 rounded-md border-[1px] border-gray-300'
                            id='draftEmail'
                            type='email'
                            placeholder='Email'
                            maxLength={40}
                            spellCheck={false}
                            autoFocus={true}
                            {...register('draftEmail')}
                            onKeyDown={handleKeyDown}
                        />
                    </form>
                    <div className='flex items-center mt-3'>
                        <button className='btn-small py-2 px-3 bg-goldenOchre mr-2' onClick={handleCloseForm}>Cancel</button>
                        <button className={`btn-small py-2 px-3 bg-goldenOchre w-[64px]`} onClick={handleSubmit(handleEmailUpdate)}>
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
                    {(formError || formSuccess) && (
                        <p className={`${formError ? 'modal-form-error' : 'modal-form-success'}`}>{formError || formSuccess}</p>
                    )} 
                </Modal>
            )}

        </div>

    )
}

export default EmailForm