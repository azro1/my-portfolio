"use client"

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import disposableDomains from 'disposable-email-domains';


// components
import Modal from './Modal'








// yup validation schema
const schema = yup.object({
    draftEmail: yup
      .string()
      .required('Please enter your new email address.')
      .transform(value => value.trim().toLowerCase())
      .test('has-at-symbol', "Please include an '@' symbol.", value => {
        return value ? value.includes('@') : true;
      })
      .email("Please use a valid domain, e.g., gmail.com.")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid domain, e.g., gmail.com.")
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


    const router = useRouter();

    
    useEffect(() => {
        router.refresh();
        // clear cookie from server if user navigates back to this page so they have to enter email again to get new otp
        document.cookie = "canAccessOtpPage=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      }, [router]);


    // populate form fields from profiles table
    useEffect(() => {
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
            if (draftEmail !== email) {
                setFormSuccess('Your email looks good.');
                setFormError(null);
            } else {
                setFormSuccess(null); // Reset success message if names are the same
                setFormError('Email cannot be the same.');
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

            // store new email temporarily in local storage
            localStorage.setItem('email', newEmail);

            const res = await fetch(`${location.origin}/api/auth/email-update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        email: newEmail
                    })
            })

            const serverEmail = await res.json();

            if (!res.ok && serverEmail.error) {
                throw new Error(serverEmail.error)
            } else if (res.status === 200 && !serverEmail.error) {
                setIsUpdating(false)
                setShowForm(false)
                router.push('/profile/verify-email-otp')
            }
            
            
        } catch (error) {
            setIsUpdating(false)
            setFormSuccess(null);
            // clear cookie if there's an error that comes back from server
            document.cookie = "canAccessOtpPage=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            setFormError(error.message)
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
                    <span className="text-red-800 cursor-pointer" onClick={handleOpenForm}>Edit</span>
                </div>
                <p className="text-cloudGray frostWhitespace-normal break-words">{email}</p>
            </div>

            <div className='bg-onyx h-[2px]'></div>

            {showForm && (
                <Modal>
                    <form noValidate>
                        <label className='block mb-3 text-xl' htmlFor='draftEmail'>Edit Email Address</label>
                        <p className='mb-3'>Please provide your new email address, ensuring it follows a valid format (e.g., example@domain.com). This email will be used for account verification and notifications.</p>
                        <input
                            className='w-full p-2.5 rounded-md border-2'
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
                    <div className='flex items-center'>
                        <button className='btn-small bg-saddleBrown mt-3 mr-2' onClick={handleCloseForm}>Cancel</button>
                        <button className={`btn-small bg-saddleBrown mt-3`} onClick={handleSubmit(handleEmailUpdate)}>
                            {isUpdating ? (
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
                    {formSuccess && <p className='modal-form-success'>{formSuccess}</p>}
                </Modal>
            )}

        </div>

    )
}

export default EmailForm