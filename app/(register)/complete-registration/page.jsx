"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { format, parse, parseISO } from "date-fns";


import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import { useForm } from "react-hook-form";
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

// hooks
import { useFetchUser } from "@/app/hooks/useFetchUser";
import { useUpdateTable } from "@/app/hooks/useUpdateTable";
import { useUpdateMetadata } from "@/app/hooks/useUpdateMetadata";
import { useMessage } from '@/app/hooks/useMessage';

// components
import AvatarUploader from "@/app/components/AvatarUploader";










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
      .matches(/^[A-Z][a-z]*$/, "Firstname must start with an uppercase letter, with no digits or spaces")
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
      .matches(/^[A-Z][a-z]*$/, "Lastname must start with an uppercase letter, with no digits or spaces")
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
      .test('has-valid-prefix', "Please enter a valid mobile number starting with 0 or an international code (e.g., +44, +1)", value => {
        return value ? value.startsWith('0') || value.startsWith('+') : false;
    })
    .matches(/^(0\d{10,14}|\+\d{1,3}\d{8,12})$/, "Phone must be between 10 and 15 digits with no spaces")
})











const CompleteRegistration = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [firstnameStatus, setFirstnameStatus] = useState(null);
    const [lastnameStatus, setLastnameStatus] = useState(null);
    const [dobStatus, setDobStatus] = useState(null);
    const [phoneStatus, setPhoneStatus] = useState(null);
    const [phoneExists, setPhoneExists] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const isSubmittingRef = useRef(false);


    
    // custom hooks
    const { user } = useFetchUser();
    const { updateTable } = useUpdateTable();
    const { updateMetadata } = useUpdateMetadata();
    const { changeMessage } = useMessage()


    const supabase = createClientComponentClient()








    // react-hook-form
    const form = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    })

    // allows us to register a form control
    const { register, handleSubmit, formState, watch } = form;
    const { errors } = formState;

    const firstname = watch('firstname', '');
    const lastname = watch('lastname', '');
    const dob = watch('dob', '');
    const phone = watch('phone', '');
   









    // set indicator that user has been to this page to prevent them going back
    useEffect(() => {
        localStorage.setItem("hasVisitedRegPage", "true");
    }, []);
    






      





    // triggers a confirmation dialog when the user tries to leave the page 
    useEffect(() => {
        const beforeUnloadListener = (event) => {

            event.preventDefault();
            return (event.returnValue = "");
        };
    
        window.addEventListener("beforeunload", beforeUnloadListener);
    
        return () => window.removeEventListener("beforeunload", beforeUnloadListener);
    }, []);
    











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
            const phoneAlreadyExists = await isPhoneNumberUnique(phone);
      
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













    // realtime validation for input fields

    // firstname
    useEffect(() => {
        if (!firstname) {
            setFirstnameStatus(null);
            return;
        }
        if (errors?.firstname) {
            setFirstnameStatus('error')
        } else if (!errors?.firstname) {
            setFirstnameStatus('success')
        } else {
            setFirstnameStatus(null)
        }
    }, [firstname, errors?.firstname])


    // lastname
    useEffect(() => {
        if (!lastname) {
            setLastnameStatus(null);
            return;
        }
        if (errors?.lastname) {
            setLastnameStatus('error')
        } else if (!errors?.lastname) {
            setLastnameStatus('success')
        } else {
            setLastnameStatus(null)
        }
    }, [lastname, errors?.lastname])


    // dob
    useEffect(() => {
        if (!dob) {
            return;
        }
        if (errors?.dob) {
            setDobStatus('error')
        } else if (!errors?.dob) {
            setDobStatus('success')
        } else {
            setDobStatus(null)
        }
    }, [dob, errors?.dob]);


    // phone
    useEffect(() => {
        if (!phone) {
            setPhoneStatus(null);
            return;
        }
        if (errors?.phone || phoneExists) {
            setPhoneStatus('error');
        }
        else if (phone && !errors?.phone && !phoneExists) {
            setPhoneStatus('success');
        }
        else {
            setPhoneStatus(null);
        }
    }, [phone, errors?.phone, phoneExists])












    // update raw_user_metadata and profiles table
    const handleUpdateProfile = async (data) => {
        isSubmittingRef.current = true;

        const formattedDate = format(parseISO(data.dob), 'dd/MM/yyyy');
        const newPhoneNumber = convertToInternationalFormat(data.phone);

        if (phoneExists) {
            return;
        } else {
            try {
                setIsLoading(true)

                // // update raw_user_metadata object
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
                const updateTableResult = await updateTable(user, 'profiles', profileData, 'id');
                if (!updateTableResult.success) {
                    throw new Error("An unexpected error occurred and we couldn't save your profile information. Please try again later. If the issue persists, contact support.")
                }

                // Remove flag after successful profile update
                localStorage.removeItem("hasVisitedRegPage")

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



    // update user avatar in profiles table
    const updateProfile = async ({ avatar_url }) => {
        
        try {
            const updatedProfile = {
                id: user.id,
                avatar_url,
                updated_at: new Date().toISOString(),
            }

            const { error } = await supabase.from('profiles').upsert(updatedProfile)

            if (error) {
                throw new Error(error.message)
            } else {
                changeMessage('success', 'Avatar added!');
            }

        } catch (error) {
            changeMessage('error', 'Failed to upload avatar.')
            console.log(error.message)
        }
    }



    // redirect after form submission
    useEffect(() => {
        if (redirect) {
            router.push('/');
        }
    }, [redirect, router]);




    




    return (
        <div>
            <div className='flex flex-col items-center justify-center w-full'>

                <div className='max-w-sm md:max-w-none'>
                    <h2 className='text-3xl mb-4 md:text-center leading-normal font-eb text-saddleBrown'>Create Your Profile</h2>
                    <p className='leading-normal md:text-center'>Please fill out the information below to create your profile. This helps us personalize your experience and allows other users to recognize you. All fields are required unless marked as optional.</p>

                    <div className='mt-10 flex flex-col gap-6 lg:gap-0 md:flex-row md:justify-evenly w-full'>
                        <form className='flex-1 order-2 flex flex-col gap-2 md:order-1 max-w-sm' noValidate>
                            <div>
                                <div className='relative max-w-sm'>
                                    <label className='mb-2 text-base text-ashGray block' htmlFor='firstname'>First Name</label>
                                        <input
                                            id='firstname'
                                            type='text'
                                            spellCheck='false'
                                            maxLength='15'
                                            placeholder='eg., John'
                                            minLength='3'
                                            {...register('firstname')}
                                            className='w-full max-w-sm p-2.5 rounded-md text-black'

                                        />

                                    {errors?.firstname ? <FaExclamationCircle className={'absolute bottom-3 right-3 text-red-600'} size={21} /> : (!errors?.firstname && firstnameStatus === 'success' ? <FaCheckCircle className={'absolute bottom-3 right-3 text-green-600'} size={21} /> : (firstnameStatus === 'error' ? <FaExclamationCircle className={'absolute bottom-3 right-4 text-red-600'} size={21} /> : ''))}

                                </div>
                                {errors?.firstname && <p className='text-sm text-red-600 mt-1'>{errors.firstname.message}</p>}
                            </div>


                            <div>
                                <div className='relative max-w-sm'>
                                    <label className='mb-2 text-base text-ashGray block' htmlFor='lastname'>Last Name</label>
                                        <input
                                            id='lastname'
                                            type='text'
                                            maxLength='25'
                                            placeholder='eg., Smith'
                                            minLength='2'
                                            {...register('lastname')}
                                            className='w-full max-w-sm p-2.5 rounded-md text-black'
                                        />
                                     
                                    {errors?.lastname ? <FaExclamationCircle className={'absolute bottom-3 right-3 text-red-600'} size={21} /> : (!errors?.lastname && lastnameStatus === 'success' ? <FaCheckCircle className={'absolute bottom-3 right-3 text-green-600'} size={21} /> : (lastnameStatus === 'error' ? <FaExclamationCircle className={'absolute bottom-3 right-4 text-red-600'} size={21} /> : ''))}
                                </div>
                                {errors?.lastname && <p className='text-sm text-red-600 mt-1'>{errors.lastname.message}</p>}
                            </div>



                            <div>
                                <div className='relative max-w-sm'>
                                    <label className='mb-2 text-base text-ashGray block' htmlFor='dob'>Date of Birth</label>
                                    <input
                                        id='dob'
                                        type='date'
                                        {...register('dob')}
                                        className='w-full max-w-sm p-2.5 rounded-md text-black'
                                    />

                                    {errors?.dob ? <FaExclamationCircle className={'absolute bottom-3 right-3 text-red-600'} size={21} /> : (!errors?.dob && dobStatus === 'success' ? <FaCheckCircle className={'absolute bottom-3 right-3 text-green-600'} size={21} /> : (dobStatus === 'error' ? <FaExclamationCircle className={'absolute bottom-3 right-4 text-red-600'} size={21} /> : ''))}
                                </div>
                                {errors?.dob && <p className='text-sm text-red-600 pt-1'>{errors.dob.message}</p>}
                            </div>


                            <div>
                                <div className='relative max-w-sm'>
                                    <label className='max-w-min mb-2 text-base text-ashGray block' htmlFor='phone'>Phone</label>
                                        <input 
                                            id='phone'
                                            type='tel'
                                            spellCheck={false}
                                            maxLength={15}
                                            placeholder="e.g., 01234 or +44 1234"
                                            {...register('phone')}
                                            className='w-full max-w-sm p-2.5 rounded-md text-black'
                                        />
                                    
                                    {(errors?.phone || phoneExists) ? <FaExclamationCircle className={'absolute bottom-3 right-3 text-red-600'} size={21} /> : (!errors?.phone && phoneStatus === 'success' ? (<FaCheckCircle className={'absolute bottom-3 right-3 text-green-600'} size={21} />) : (phoneStatus === 'error' ? <FaExclamationCircle className={'absolute bottom-3 right-4 text-red-600'} size={21} /> : ''))}
                                </div>
                                {errors?.phone && <p className='text-sm text-red-600 mt-1'>{errors.phone.message}</p>}
                                {phoneExists && <p className='text-sm text-red-600 mt-1'>Phone already exists</p>}
                            </div>

                            <button className={`btn block w-fit mt-1.5 bg-saddleBrown transition duration-500 ${(isLoading || phoneExists) ? 'opacity-65' : 'opacity-100'}`} disabled={isLoading || phoneExists} aria-live={Object.keys(errors).length > 0 || isLoading ? 'assertive' : 'off'} onClick={handleSubmit(handleUpdateProfile)}>
                                {isLoading ? (
                                    <div className='flex items-center gap-2'>
                                        <img className="w-5 h-5 opacity-50" src="../images/loading/spinner.svg" alt="Loading indicator" />
                                        <span>Register</span>
                                    </div>
                                ) : (
                                    'Register'
                                )}
                            </button>

                        </form>

                        <div className='flex-1 order-1 h-fit md:mt-4 md:order-2 md:max-w-md'>
                            <div className='md:shadow-outer md:p-10 md:rounded-xl max-h-max'>
                                    <AvatarUploader
                                        user={user}
                                        updateProfile={updateProfile}
                                        title='Upload a Profile Picture'
                                        isFirstUpload={true}
                                        displayTitle={true}
                                        btnColor='bg-saddleBrown'
                                        show3DAvatar={true}
                                    />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default CompleteRegistration;
