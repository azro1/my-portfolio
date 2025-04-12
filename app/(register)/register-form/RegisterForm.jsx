"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { format, parseISO } from "date-fns";


import Link from 'next/link';
import Image from 'next/image';
import Select from 'react-select'
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

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

      dob: yup.object({
        day: yup
          .number()
          .required('Day is required')
          .min(1, 'Day must be between 1 and 31')
          .max(31, 'Day must be between 1 and 31')
          .typeError('Day must be a valid number'),
      
        month: yup.object({
          value: yup
            .string()
            .required('Month is required')
            .oneOf(
              [
                'January', 'February', 'March', 'April', 'May', 'June', 'July', 
                'August', 'September', 'October', 'November', 'December'
              ],
              'Month must be a valid month'
            ),
          label: yup.string().notRequired()
        }),
      
        year: yup
          .number()
          .required('Year is required')
          .min(1900, 'Year must be after 1900')
          .max(new Date().getFullYear(), 'Year cannot be in the future')
          .typeError('Year must be a valid number')
      })
      .test('dob-required', 'Date of Birth is required', (value) => {
        return value?.day && value?.month?.value && value?.year;
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









const dobFields = [
    { name: 'day', placeholder: 'Day', maxlength: 2, min: 1, max: 31 },
    { name: 'month', placeholder: 'Month', maxlength: 0, min: 1, max: 12 },
    { name: 'year', placeholder: 'Year', maxlength: 4, min: 1900, max: new Date().getFullYear() },
];

// react select options
const months = [
    { value: 'January', label: 'Jan' },
    { value: 'February', label: 'Feb' },
    { value: 'March', label: 'Mar' },
    { value: 'April', label: 'Apr' },
    { value: 'May', label: 'May' },
    { value: 'June', label: 'Jun' },
    { value: 'July', label: 'Jul' },
    { value: 'August', label: 'Aug' },
    { value: 'September', label: 'Sep' },
    { value: 'October', label: 'Oct' },
    { value: 'November', label: 'Nov' },
    { value: 'December', label: 'Dec' }
];








// react select custom styles
const customStyles = {
    control: (base) => ({
        ...base,
        border: 'none',
        boxShadow: 'none'
    }),
    menu: (base) => ({
        ...base,
        border: 'none',
        padding: '4px',
    }),
    option: (base) => ({
        ...base,
    }),
    placeholder: (base) => ({
        ...base,
        color: '#6B6B6B',
        opacity: '80%',
    }),
};








const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [phoneExists, setPhoneExists] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [user, setUser] = useState(null);
    const [phoneNumbers, setPhoneNumbers] = useState([]);

    const { updateTable } = useUpdateTable();
    const { updateMetadata } = useUpdateMetadata();
    const { changeMessage } = useMessage()

    const isSubmittingRef = useRef(false);
    const router = useRouter();

    const supabase = createClientComponentClient();

    const [isClient, setIsClient] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);


    





    // refresh page to allow server to detect auf
    useEffect(() => {
        router.refresh();
    }, [router])
      
          






    // prevent select SSR error
    useEffect(() => {
        setIsClient(true);
    }, []);








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
        mode: 'onSubmit',
    })

    // allows us to register a form control
    const { register, handleSubmit, formState, watch, control } = form;
    const { errors } = formState;

    const dob = watch('dob', { day: '', month: '', year: '' });
    const phone = watch('phone', '');
   











    // Track interaction when any of the dob fields change
    useEffect(() => {
        if (dob.day || dob.month?.value || dob.year) {
            setHasInteracted(true);
        } else {
            setHasInteracted(false);
        }
    
    }, [dob.day, dob.month?.value, dob.year]);
    
    















    // function to convert uk mobile numbers into E.164 format
    const convertToInternationalFormat = (phoneNumber) => {
        // replace local prefix '0' with international code '+44' if it exists
        if (phoneNumber.startsWith('0')) return phoneNumber.replace('0', '+44');
    
        // return as is if already in international format
        return phoneNumber.startsWith('+') ? phoneNumber : phoneNumber;
    };









   

        // fetch phone numbers
        useEffect(() => {
            const fetchPhoneNumbers = async () => {
                try {
                    const res = await fetch(`${location.origin}/api/auth/phone-exists`);
                    const data = await res.json();

                    if (!res.ok) {
                        throw new Error(res.statusText); 
                    }
                    
                    const { phoneNumbers } = data;
                    setPhoneNumbers(phoneNumbers)

                } catch (error) {
                    console.log(error.message)
                }
            }
            fetchPhoneNumbers();
        }, []);












        // function to check if phone number already exists
        const isPhoneNumberUnique = useCallback((phoneNumber) => {
            const convertedPhoneNumber = convertToInternationalFormat(phoneNumber);

            // Check if the phone number exists in the phoneNumbers state array
            const phoneExists = phoneNumbers.some(
                (phoneObj) => phoneObj.phone === convertedPhoneNumber
            );

            return phoneExists;
        }, [phoneNumbers]);












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
          }, [phone, isPhoneNumberUnique]);













    // update raw_user_metadata and profiles table
    const handleUpdateProfile = async (data) => {
        isSubmittingRef.current = true;

        const monthNumber = new Date(`${dob.month.value} 1, 2000`).getMonth() + 1;
        const dayStr = String(dob.day).padStart(2, '0');
        const monthStr = String(monthNumber).padStart(2, '0');
        const yearStr = String(dob.year); 
        const isoDateString = `${yearStr}-${monthStr}-${dayStr}`;

        const formattedDate = format(parseISO(isoDateString), 'dd/MM/yyyy');
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

                    // reset flag in the table
                    await updateTable(user, 'profiles', { has_visited_reg: false }, 'id');
                }

                navigator.sendBeacon(`${location.origin}/api/auth/is-registered`, JSON.stringify({ isRegistered: true }));

                localStorage.removeItem('hasVisitedRegPage');
                localStorage.removeItem('hasUploadedAvatar');
                changeMessage('success', 'Your account has been created and you are now logged in');
                setRedirect(true)

            } catch (error) {
                setRedirect(false)
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
        changeMessage('info', "looks like you've already uploaded an avatar. Please enter your personal details");
       }
        router.push('/upload-avatar');
    }









  return (
        <div className='flex flex-col justify-center items-center gap-7 min-h-[640px] md:min-h-[824px]'>
                <h2 className='text-3xl font-b text-nightSky'>Create your Profile</h2>

            <div className='flex flex-col gap-4 w-full max-w-xs sm:max-w-md sm:bg-white sm:shadow-outer sm:p-12 sm:pt-10 sm:rounded-xl'>

                <form className='flex flex-col gap-4' noValidate>
                    <h3 className='text-lg font-medium text-nightSky md:text-xl md:mb-4 '>Enter your Personal Details</h3>

                    <div>
                        <div className='relative '>
                            <input
                                id='firstname'
                                type='text'
                                spellCheck='false'
                                autoFocus
                                maxLength='15'
                                placeholder='First Name'
                                minLength='3'
                                {...register('firstname')}
                                className={`w-full  py-2 px-4 text-nightSky rounded-md border-[1px]  ${errors.firstname ? 'border-red-600' : 'border-gray-300'}`}
                            />
                        </div>
                        {errors?.firstname && <p className='text-sm text-red-600 mt-1'>{errors.firstname.message}</p>}
                    </div>


                    <div>
                        <div className='relative '>
                            <input
                                id='lastname'
                                type='text'
                                maxLength='25'
                                placeholder='Last Name'
                                minLength='2'
                                {...register('lastname')}
                                className={`w-full py-2 px-4 text-nightSky rounded-md border-[1px] ${errors.lastname ? 'border-red-600' : 'border-gray-300'}`}
                            />
                        </div>
                        {errors?.lastname && <p className='text-sm text-red-600 mt-1'>{errors.lastname.message}</p>}
                    </div>

                    <div>
                        <div className="flex gap-3">
                            {dobFields.map((field) => (
                                <div key={field.name} className="flex flex-col">
                                {field.name !== 'month' ? (
                                    <input
                                    id={`dob-${field.name}`}
                                    type="text"
                                    inputMode="numeric"
                                    max={field.max}
                                    min={field.min}
                                    maxLength={field.maxlength}
                                    placeholder={field.placeholder}
                                    className={`w-full h-[42px] text-center rounded-md border-[1px] border-gray-300 ${!hasInteracted && formState.isSubmitted && (!dob.day && !dob.month?.value && !dob.year) ? 'border-red-600' : 'border-gray-300'}`}
                                    {...register(`dob.${field.name}`)}
                                    />
                                ) : (
                                    <div className={`w-max min-w-[110px] h-[42px] text-center rounded-md border-[1px] ${!hasInteracted && formState.isSubmitted && (!dob.day && !dob.month?.value && !dob.year) ? 'border-red-600' : 'border-gray-300'} flex-1 flex items-center justify-center`}>
                                    {isClient && (
                                        <Controller
                                        name="dob.month"
                                        control={control}
                                        render={({ field }) => (
                                            <div className='w-full'>
                                                <Select
                                                    {...field}
                                                    options={months}
                                                    placeholder="Month"
                                                    styles={customStyles}
                                                    isSearchable={false}
                                                />
                                            </div>
                                        )}
                                        />
                                    )}
                                    </div>
                                )}

                                </div>
                            ))}
                        </div>
                        {!hasInteracted && formState.isSubmitted && (!dob.day && !dob.month?.value && !dob.year) ? (
                            <p className="text-sm text-red-600 mt-1">Date of birth is required</p>
                        ) : (
                            (errors.dob?.day || errors.dob?.month?.value || errors.dob?.year) && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.dob?.day?.message || errors.dob?.month?.value?.message || errors.dob?.year?.message}
                                </p>
                            )
                        )}
                    </div>
                  
                    <div>
                        <div className='relative'>
                            <input
                                id='phone'
                                type='tel'
                                spellCheck={false}
                                placeholder="Phone Number"
                                {...register('phone')}
                                className={`w-full py-2 px-4 text-nightSky rounded-md border-[1px] ${(errors.phone || phoneExists) ? 'border-red-600' : 'border-gray-300'}`}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        {errors.phone ? <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p> : phoneExists ? <p className="text-sm text-red-600 mt-1">Phone already exists</p> : null}
                    </div>

                    <button className={`p-3 px-3.5 rounded-lg cursor-pointer text-white font-medium block w-full mt-1.5 transition duration-500 bg-green-700 ${(isLoading || phoneExists) ? 'opacity-65' : 'opacity-100'}`} disabled={isLoading || phoneExists} aria-live={Object.keys(errors).length > 0 || isLoading ? 'assertive' : 'off'} onClick={handleSubmit(handleUpdateProfile)}>
                        {isLoading ? (
                            <div className='flex items-center justify-center'>
                                <Image
                                    className='opacity-65'
                                    width={24}
                                    height={24}
                                    src="/images/loading/reload.svg"
                                    alt="A spinning loading animation on a transparent background"
                                />
                            </div>
                        ) : (
                            'Register'
                        )}
                    </button>

                </form>


                <div>
                    <Link href='/upload-avatar' onClick={(e) => handleBackButton(e)}>
                        <button className='text-nightSky hover:underline'>
                            Back
                        </button>
                    </Link>
                </div>
            </div>


        </div>
    )
}

export default RegisterForm
