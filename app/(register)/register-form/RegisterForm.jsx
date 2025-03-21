"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { format, parseISO } from "date-fns";


import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

// hooks
import { useUpdateTable } from '@/app/hooks/useUpdateTable';
import { useUpdateMetadata } from '@/app/hooks/useUpdateMetadata';
import { useMessage } from '@/app/hooks/useMessage';









// yup validation schema
const schema = yup.object({
    firstname: yup
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

    lastname: yup
      .string()
      .required('Lastname is required')
      .transform(value => {
        if (value) {
          return value.trim().charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }
        return value;
      })
      .matches(/^[A-Z][a-z]*$/, "Lastname should not contain any digits or spaces")
      .min(3, 'Lastname must be at least 3 characters long'),

    dob: yup
      .string()
      .required('Date of birth is required')
      .test('max-date', 'Date of birth cannot be in the future', value => {
        const selectedDate = new Date(value);
        const today = new Date();
        return selectedDate <= today;  // Ensure the selected date is not in the future
      }),

    phone: yup
      .string()
      .required('Phone is required')
      .transform(value => value.replace(/\s+/g, "")) // Remove spaces for length check

      .test('has-valid-prefix', "Please enter a valid mobile number starting with 0 or an international code (e.g., +44, +1)", value => {
        return value ? value.startsWith('0') || value.startsWith('+') : false;
    })
    .matches(/^(0\d{9,14}|\+\d{1,3}\d{8,12})$/, 'Phone should be between 10 and 15 digits') // Format with 10-15 digits
    .test('valid-length', 'Phone should be between 10 and 15 digits', value => {
        const digits = value.replace(/\D/g, ''); // Remove non-digit characters
        return digits.length >= 10 && digits.length <= 15; // Ensure total digit count is at least 10
    })
})













const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [phoneExists, setPhoneExists] = useState(null);
    const [isFormSubmitted, setFormIsSubmitted] = useState(false)
    const [redirect, setRedirect] = useState(false);
    const [user, setUser] = useState(null);


    const { updateTable } = useUpdateTable();
    const { updateMetadata } = useUpdateMetadata();
    const { changeMessage } = useMessage()

    const isSubmittingRef = useRef(false);
    const router = useRouter();

    const supabase = createClientComponentClient();









    // refresh page to allow server to detect auf
    useEffect(() => {
        router.refresh();
      }, [])
      
          









    // fetch user
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data, error } = await supabase.auth.getUser();
                if (error) {
                    setUser(null);
                    return;
                }
                setUser(data?.user || null);
            } catch (error) {
                console.error("Unexpected error fetching user:", error);
                setUser(null);
            }
        };
        fetchUser();
    }, [supabase]);











    // send beacon to logout if the leave via the address bar
    useEffect(() => {
        const handleBeforeUnload = () => {
            console.log('before unload ran......')
            navigator.sendBeacon(`${location.origin}/api/auth/logout`, JSON.stringify({ hasLeftViaAddressBar: true }));
        };
    
        window.addEventListener("beforeunload", handleBeforeUnload);
    
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);













    // react-hook-form
    const form = useForm({
        resolver: yupResolver(schema),
        mode: 'onSubmit'
    })

    // allows us to register a form control
    const { register, handleSubmit, formState, watch } = form;
    const { errors } = formState;

    const dob = watch('dob', '');
    const phone = watch('phone', '');
   












    // function to convert uk mobile numbers into E.164 format
    const convertToInternationalFormat = (phoneNumber) => {
        // replace local prefix '0' with international code '+44' if it exists
        if (phoneNumber.startsWith('0')) return phoneNumber.replace('0', '+44');
    
        // return as is if already in international format
        return phoneNumber.startsWith('+') ? phoneNumber : phoneNumber;
    };













        // function to check if phone number already exists
        const isPhoneNumberUnique = async (phoneNumber) => {
            const convertedPhoneNumber = convertToInternationalFormat(phoneNumber);
    
            try {
                const res = await fetch(`${location.origin}/api/auth/phone-exists`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        phone: convertedPhoneNumber
                    })
                })
                
                // returns exists object bool value if theres a problem with the json on the server this will reject promise which we catch
                const serverPhoneNumber = await res.json();
    
                if (res.status === 409 && serverPhoneNumber.exists) {
                    return serverPhoneNumber.exists
                }    
                return serverPhoneNumber.exists
    
            } catch (error) {
                console.log(error.message)
            }
        }












        useEffect(() => {
            if (isSubmittingRef.current) return;
    
            let isMounted = true;  // Flag to track if the component is still mounted
          
            const checkPhone = async () => {
              if (phone) {
                const cleanedPhone = phone.replace(/\s+/g, "");
                const phoneAlreadyExists = await isPhoneNumberUnique(cleanedPhone);
          
                // Check if component is still mounted before updating the state
                if (isMounted) {
                  setPhoneExists(phoneAlreadyExists);
                } 
              }
            };
          
            checkPhone();
          
            // Cleanup function to set the flag to false when the component unmounts
            return () => {
              isMounted = false;
            };
          }, [phone, errors]);













    // update raw_user_metadata and profiles table
    const handleUpdateProfile = async (data) => {
        isSubmittingRef.current = true;
        setFormIsSubmitted(true)

        const formattedDate = format(parseISO(data.dob), 'dd/MM/yyyy');
        const newPhoneNumber = convertToInternationalFormat(data.phone);

        if (phoneExists) {
            return;
        } else {
            try {
                setIsLoading(true)

                // update raw_user_metadata object
                const metadata = {
                    first_name: data.firstname,
                    last_name: data.lastname,
                    phone: newPhoneNumber
                };

                const updateMetadataResult = await updateMetadata(metadata);
                if (!updateMetadataResult.success) {
                    console.log('metadata update error:', updateMetadataResult.error)
                }

                const profileData = {
                    first_name: data.firstname,
                    last_name: data.lastname,
                    phone: newPhoneNumber,
                    dob: formattedDate,
                    is_reg_complete: true,
                    created_at: new Date().toISOString()
                };

                // update profiles table
                if (user) {
                    const updateTableResult = await updateTable(user, 'profiles', profileData, 'id');
                    
                    if (!updateTableResult.success) {
                        throw new Error("An unexpected error occurred and we couldn't save your profile information. Please try again later. If the issue persists, contact support.")
                    }
                }
                
                // remove local stroage flag
                localStorage.removeItem("hasVisitedRegPage")

                // reset flag in the table
                await updateTable(user, 'profiles', { has_visited_reg: false }, 'id');
                
                
                navigator.sendBeacon(`${location.origin}/api/auth/is-registered`, JSON.stringify({ isRegistered: true }));


                changeMessage('success', 'Your account has been created and you are now logged in');
                setRedirect(true)

            } catch (error) {
                setRedirect(false)
                setFormIsSubmitted(false)
                changeMessage('error', error.message);

            } finally {
                isSubmittingRef.current = false;
                setIsLoading(false);
            }
        }
    };








    // redirect after form submission
    useEffect(() => {
        if (redirect) {
            router.push('/');
        }
    }, [redirect, router]);








    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }

        const regex = /^[0-9]$/;
        if (!regex.test(e.key) && e.key !== '+' && e.key !== ' ' && e.key !== 'Backspace' && e.key !== 'Delete') {
            e.preventDefault();
        }
        
    }





    const handleBackButton = (e) => {
       e.preventDefault();
       const hasUploadedAvatar = localStorage.getItem('hasUploadedAvatar') === 'true';
       
       if (hasUploadedAvatar) {
        changeMessage('info', "looks like you've already uploaded an avatar. Please enter your personal information");
       }
        router.push('/upload-avatar');
    }







  return (
    <div className='flex flex-col justify-center min-h-[640px] md:min-h-[924px]'>
            <p className='pb-2'>Step 2/2</p>        

            <form className='flex flex-col gap-3 max-w-[500px] sm:bg-white sm:shadow-outer sm:p-12 sm:pt-10 sm:rounded-xl' noValidate>
            <h2 className='text-3xl mb-4 text-start font-b text-nightSky leading-normal sm:text-center'>Enter your personal information</h2>

            <div>
                <div className='relative '>
                    <label className='mb-1 text-base text-ashGray block' htmlFor='firstname'>First Name</label>
                        <input
                            id='firstname'
                            type='text'
                            spellCheck='false'
                            autoFocus
                            maxLength='15'
                            placeholder='John'
                            minLength='3'
                            {...register('firstname')}
                            className={`w-full  py-2 px-4 text-nightSky rounded-md border-[1px]  ${errors.firstname ? 'border-red-600' : 'border-gray-300'}`}

                        />

                    {errors?.firstname ? <FaExclamationCircle className={'absolute bottom-2.5 right-3 text-red-600'} size={21} /> : ((!errors?.firstname && isFormSubmitted) ? <FaCheckCircle className={'absolute bottom-2.5 right-3 text-green-600'} size={21} /> : '')}

                </div>
                {errors?.firstname && <p className='text-sm text-red-600 mt-1'>{errors.firstname.message}</p>}
            </div>


            <div>
                <div className='relative '>
                    <label className='mb-1 text-base text-ashGray block' htmlFor='lastname'>Last Name</label>
                        <input
                            id='lastname'
                            type='text'
                            maxLength='25'
                            placeholder='Smith'
                            minLength='2'
                            {...register('lastname')}
                            className={`w-full py-2 px-4 text-nightSky rounded-md border-[1px] ${errors.lastname ? 'border-red-600' : 'border-gray-300'}`}
                        />
                        
                    {errors?.lastname ? <FaExclamationCircle className={'absolute bottom-2.5 right-3 text-red-600'} size={21} /> : ((!errors?.lastname && isFormSubmitted) ? <FaCheckCircle className={'absolute bottom-2.5 right-3 text-green-600'} size={21} /> : '')}
                </div>
                {errors?.lastname && <p className='text-sm text-red-600 mt-1'>{errors.lastname.message}</p>}
            </div>



            <div>
                <div className='relative'>
                    <label className='mb-1 text-base text-ashGray block' htmlFor='dob'>Date of Birth</label>
                    <input
                        id='dob'
                        type='date'
                        {...register('dob')}
                        className={`w-full py-2 px-4 text-nightSky ${!dob ? 'text-opacity-55' : 'text-opacity-100'}  rounded-md border-[1px] ${errors.dob ? 'border-red-600' : 'border-gray-300'}`}
                    />

                    {errors?.dob ? <FaExclamationCircle className={'absolute bottom-3.5 right-2.5 text-red-600'} size={21} /> : ((!errors?.dob && isFormSubmitted) ? <FaCheckCircle className={'absolute bottom-2.5 right-3 text-green-600'} size={21} />  : '')}
                </div>
                {errors?.dob && <p className='text-sm text-red-600 pt-1'>{errors.dob.message}</p>}
            </div>


            <div>
                <div className='relative'>
                    <label className='max-w-min mb-1 text-base text-ashGray block' htmlFor='phone'>Phone</label>
                        <input 
                            id='phone'
                            type='tel'
                            spellCheck={false}
                            placeholder="01234 or +44 1234"
                            {...register('phone')}
                            className={`w-full py-2 px-4 text-nightSky rounded-md border-[1px] ${(errors.phone || phoneExists) ? 'border-red-600' : 'border-gray-300'}`}
                            onKeyDown={handleKeyDown}
                        />
                    
                    {(errors?.phone || phoneExists) ? <FaExclamationCircle className={'absolute bottom-2.5 right-3 text-red-600'} size={21} /> : ((!errors?.phone && !phoneExists && isFormSubmitted) ? <FaCheckCircle className={'absolute bottom-2.5 right-3 text-green-600'} size={21} /> : '')}
                </div>
                {errors.phone ? <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p> : phoneExists ? <p className="text-sm text-red-600 mt-1">Phone already exists</p> : null}
            </div>

            <button className={`btn block w-full mt-1.5 transition duration-500 ${(isLoading || phoneExists) ? 'opacity-65' : 'opacity-100'}`} disabled={isLoading || phoneExists} aria-live={Object.keys(errors).length > 0 || isLoading ? 'assertive' : 'off'} onClick={handleSubmit(handleUpdateProfile)}>
                {isLoading ? (
                    <div className='flex items-center justify-center gap-2'>
                        <img className="w-6 h-6 opacity-65" src="../images/loading/reload.svg" alt="Loading indicator" />
                    </div>
                ) : (
                    'Register'
                )}
            </button>
            <button className='btn-small bg-nightSky w-max' onClick={(e) => handleBackButton(e)}>
                Back
            </button>
        </form>
    </div>
  )
}

export default RegisterForm
