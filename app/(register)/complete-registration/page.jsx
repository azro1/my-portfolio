"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import { enGB } from 'date-fns/locale';

// register locale
registerLocale('en-GB', enGB)
setDefaultLocale('en-GB'); 


import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

// components
import AvatarUploader from "@/app/(profile)/profile/edit-profile/AvatarUploader";

// hooks
import { useFetchUser } from "@/app/hooks/useFetchUser";
import { useUpdateTable } from "@/app/hooks/useUpdateTable";
import { useUpdateMetadata } from "@/app/hooks/useUpdateMetadata";


import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';


const CompleteRegistration = () => {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingPhone, setIsCheckingPhone] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    
    const [error, setError] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null);
    const [infoMsg, setInfoMsg] = useState(null);
    
    // custom hooks
    const { user } = useFetchUser();
    const { updateTable } = useUpdateTable();
    const { updateMetadata } = useUpdateMetadata();



    // regex validation functions
    const startsWithCaps = (name) => /^[A-Z].*$/.test(name);
    const allLowerCase = (name) => /^[A-Z][a-z]*$/.test(name);
    const isValidPhoneNumber = (phoneNumber) => /^(0\d{10}|\+\d{1,3}\d{1,14})$/.test(phoneNumber);


    // State to track name length for each input
    const [isFirstNameLongEnough, setIsFirstNameLongEnough] = useState(false);
    const [isLastNameLongEnough, setIsLastNameLongEnough] = useState(false);

    const [redirect, setRedirect] = useState(false);
    const router = useRouter();
    const pathname = usePathname();



    // prevents users from navigating back using the browser's back button by disabling it
    useEffect(() => {
        if (pathname === '/complete-registration') {
            const handlePopState = () => {
                // Replace current history entry with the same state to prevent going back
                history.pushState(null, null, window.location.href);
            };
    
            // Replace the current state when component mounts
            history.pushState(null, null, window.location.href);
    
            // Listen to the popstate event and trigger handlePopState
            window.addEventListener('popstate', handlePopState);
    
            return () => {
                // Clean up the event listener when the component unmounts
                window.removeEventListener('popstate', handlePopState);
            };
        }
    }, [pathname]);



    // triggers a confirmation dialog when the user tries to leave the page 
    useEffect(() => {
        const beforeUnloadListener = (event) => {
            event.preventDefault();
            return (event.returnValue = "");
        };
    
        window.addEventListener("beforeunload", beforeUnloadListener);
    
        return () => window.removeEventListener("beforeunload", beforeUnloadListener);
    }, []);
    

      

    // State to hold form input values
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: null,
        phone: ''
    })

    // State to track errors for each input field
    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        dob: false,
        phone: false
    })




    // function to handle input changes and update form data
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let processedValue;

        // check if the value is a string before trimming
        if (typeof value === 'string') {
            processedValue = value.trim();
        } else if (value instanceof Date) {
           // keep the Date object as is
            processedValue = value; 
        } else {
           // fallback for any other type (if necessary)
            processedValue = ''; 
        }

        setFormData((prev) => ({ ...prev, [name]: processedValue }));

        // Check name length dynamically
        if (name === 'firstName') {
            setIsFirstNameLongEnough(value.length >= 3);
        } else if (name === 'lastName') {
            setIsLastNameLongEnough(value.length >= 2);
        }
    };
      





    // useEffect to disable button if form fields have values
    useEffect(() => {
        const { firstName, lastName, dob, phone } = formData;

        if (firstName && lastName && dob && phone) {
            setIsButtonDisabled(false)
        } else {
            setIsButtonDisabled(true)
        }
        
        if (startsWithCaps(firstName) && allLowerCase(firstName) && startsWithCaps(lastName) && allLowerCase(lastName) && dob && isValidPhoneNumber(phone)) {
            setInfoMsg("Upload an avatar before you register!")
        } else {
            setInfoMsg(null)
        }
    }, [formData])







    // function to convert uk mobile numbers into E.164 format
    const convertToInternationalFormat = (phoneNumber) => {
        // replace local prefix '0' with international code '+44' if it exists
        if (phoneNumber.startsWith('0')) return phoneNumber.replace('0', '+44');
    
        // return as is if already in international format
        return phoneNumber.startsWith('+') ? phoneNumber : phoneNumber;
    };





    // function to check if phone number already exists
    const isPhoneNumberUnique = async (phoneNumber) => {
        setIsCheckingPhone(true);
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
            
            // if theres a problem with the json on the server this will reject promise which we catch
            const serverPhoneNumber = await res.json();

            if (res.status === 409 && serverPhoneNumber.exists) {
                return serverPhoneNumber.exists
            }    
            return serverPhoneNumber.exists

        } catch (error) {
            console.log(error.message)
        } finally {
            setIsCheckingPhone(false)
        }
    }
    
    




    // update raw_user_metadata and profiles table
    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        setFormIsSubmitted(true)
        setInfoMsg(null)
        const { firstName, lastName, dob, phone } = formData;
        let formIsValid = true;

        if (!firstName) {
            setErrors((prev) => ({ ...prev, firstName: 'Please enter your first name.' }))
            formIsValid = false;
        } else if (!isFirstNameLongEnough) {
            setErrors((prev) => ({ ...prev, firstName: 'First names must be at least 3 characters.' }))
            formIsValid = false;
        } else if (!startsWithCaps(firstName)) {
            setErrors((prev) => ({ ...prev, firstName: 'First names should start with a uppercase letter.' }))
            formIsValid = false;
        } else if (!allLowerCase(firstName)) {
            setErrors((prev) => ({ ...prev, firstName: 'Only the initial character may be uppercase.' }))
            formIsValid = false;
        } else {
            setErrors((prev) => ({ ...prev, firstName: '' }))
        }

        if (!lastName) {
            setErrors((prev) => ({ ...prev, lastName: 'Please provide your last name.' }));
            formIsValid = false;
        } else if (!isLastNameLongEnough) {
            setErrors((prev) => ({ ...prev, lastName: 'Last names must be at least 2 characters.' }))
            formIsValid = false;
        } else if (!startsWithCaps(lastName)) {
            setErrors((prev) => ({ ...prev, lastName: 'Last names should start with a uppercase letter.' }))
            formIsValid = false;    
        } else if (!allLowerCase(lastName)) {
            setErrors((prev) => ({ ...prev, lastName: 'Only the initial character may be uppercase.' }))
            formIsValid = false;     
        } else {
            setErrors((prev) => ({ ...prev, lastName: '' }))
        }

        if (!dob) {
            setErrors((prev) => ({ ...prev, dob: 'Please provide your date of birth.' }));
            formIsValid = false;
        } else {
            setErrors((prev) => ({ ...prev, dob: '' }))
        }

        if (!phone) {
            setErrors((prev) => ({ ...prev, phone: 'Please provide your phone number.' }));
            formIsValid = false;
        } else if (!isValidPhoneNumber(phone)) {
            setErrors((prev) => ({ ...prev, phone: 'Please enter a valid mobile number (11 digits, starting with 0) or an international code (e.g., +44 for UK, +1 for US).'}))
            formIsValid = false;
        } else if (phone && isValidPhoneNumber(phone)) {
            const exists = await isPhoneNumberUnique(phone);
            if (exists) {
                setErrors((prev) => ({ ...prev, phone: 'Phone number is already in use.' }));
                formIsValid = false;
            } else {
                setErrors((prev) => ({ ...prev, phone: '' }))
            }
        } else {
            setErrors((prev) => ({ ...prev, phone: '' }))
        }



        if (user && formIsValid) {
            setIsLoading(true)
            const formattedDate = dob.toLocaleDateString('en-GB')
            const convertedPhoneNumber = convertToInternationalFormat(phone);

            try {
                // update raw_user_metadata object
                const metadata = { first_name: firstName, last_name: lastName };
                await updateMetadata(metadata);

                const profileData = {
                    first_name: firstName,
                    last_name: lastName,
                    phone: convertedPhoneNumber,
                    dob: formattedDate,
                    updated_at: new Date().toISOString()
                };
 
                // update profiles table
                await updateTable(user, 'profiles', profileData, 'id');

                setSuccessMsg('Finalizing account setup');
                setTimeout(() => setRedirect(true), 3000);
            } catch (err) {
                setError('An error occurred. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        }
    };



    // update user avatar
    const updateProfile = async ({ avatar_url }) => {
        setError(null)
        setInfoMsg(null)
        
        try {
            const updatedProfile = {
                id: user.id,
                avatar_url,
                updated_at: new Date().toISOString(),
            }

            const supabase = createClientComponentClient()
            const { error } = await supabase.from('profiles').upsert(updatedProfile)

            if (error) {
                throw new Error(error.message)
            } else {
                setSuccessMsg('Avatar added!');
                setTimeout(() => setSuccessMsg(null), 2000)    
            }

        } catch (error) {
            setError('Failed to upload avatar.')
            console.log(error.message)
        } finally {
            setTimeout(() => setError(null), 2000)    
        }
    }



    // redirect after form submission
    useEffect(() => {
        if (redirect) {
            router.push('/');
        }
    }, [redirect, router]);





    // function to handle onKeyDown events
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') e.preventDefault();

        if (e.target.name === 'firstName' || e.target.name === 'lastName') {
            if (!/^[A-Za-z]$/.test(e.key) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                e.preventDefault()
            }
        } else if (e.target.name === 'dob') {
            const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/', 'Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
            if (!allowedKeys.includes(e.key)) {
                e.preventDefault();
            }
        } else if (e.target.name === 'phone') {
            if (!/[0-9+]/.test(e.key) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(e.key)) {
                e.preventDefault();
            }
        }
    }
    




    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-col w-full relative'>
                <h2 className='text-3xl md:text-center leading-normal font-eb text-saddleBrown'>Set Up Your Account</h2>


                <div className="absolute -top-16 text-center w-full place-self-center">
                    {successMsg || error ? (
                        <div className={successMsg ? 'success text-center' : 'error text-center'}>
                            {successMsg || error}
                        </div>
                    ) : null}
                </div>


                <div className='mt-8 flex flex-col gap-6 md:flex-row md:justify-evenly  w-full'>
                    <form className={`flex-1 order-2 flex flex-col gap-2 md:order-1`}>
                        <div>
                            <div className='relative max-w-sm'>
                                <label>
                                    <span className='mb-2 text-base text-stoneGray block'>First Name</span>
                                    <input
                                        className='w-full max-w-sm p-2.5 rounded-md text-stoneGray bg-nightSky shadow-inner border-2 border-stoneGray'
                                        type='text'
                                        spellCheck='false'
                                        value={formData.firstName}
                                        name='firstName'
                                        maxLength='15'
                                        placeholder='eg., John'
                                        onChange={handleInputChange}
                                        onKeyDown={handleKeyDown}
                                        minLength='3'

                                    />
                                </label>
                                {formIsSubmitted && (errors.firstName || !isFirstNameLongEnough || !startsWithCaps(formData.firstName) || !allLowerCase(formData.firstName)) ? <FaExclamationCircle className={'absolute bottom-3.5 right-4 text-red-800'} size={21} /> : (formIsSubmitted && !errors.firstName && !isCheckingPhone ? <FaCheckCircle className={'absolute bottom-3.5 right-4 text-green-600'} size={21} /> : '' )}
                            
                            </div>
                               {(errors.firstName || !isFirstNameLongEnough || !startsWithCaps(formData.firstName) || !allLowerCase(formData.firstName))  && <p className='text-sm text-red-700 mt-1'>{errors.firstName}</p>}
                        </div>


                        <div>
                            <div className='relative max-w-sm'>
                                <label>
                                    <span className='mb-2 text-base text-stoneGray block'>Last Name</span>
                                    <input
                                        className='w-full max-w-sm p-2.5 rounded-md text-stoneGray bg-nightSky shadow-inner border-2 border-stoneGray'
                                        type='text'
                                        value={formData.lastName}
                                        name='lastName'
                                        maxLength='25'
                                        placeholder='eg., Smith'
                                        onChange={handleInputChange}
                                        onKeyDown={handleKeyDown}
                                        minLength='2'
                                    />
                                </label>
                                {formIsSubmitted && (errors.lastName || !isLastNameLongEnough || !startsWithCaps(formData.lastName) || !allLowerCase(formData.lastName)) ? <FaExclamationCircle className={'absolute bottom-3.5 right-4 text-red-800'} size={21} /> : (formIsSubmitted && !errors.lastName && !isCheckingPhone ? <FaCheckCircle className={'absolute bottom-3.5 right-4 text-green-600'} size={21} /> : '')}
                            </div>
                            {(errors.lastName || !isLastNameLongEnough || !startsWithCaps(formData.lastName) || !allLowerCase(formData.lastName)) && <p className='text-sm text-red-700 mt-1'>{errors.lastName}</p>}
                        </div>



                        <div>
                            <div className='relative max-w-sm'>
                                <label>
                                    <span className='mb-2 text-base text-stoneGray block'>Date of Birth</span>
                                    <DatePicker
                                        className='w-full max-w-sm p-2.5 rounded-md text-stoneGray bg-nightSky shadow-inner border-2 border-stoneGray'
                                        wrapperClassName='w-full'
                                        locale="en-GB"
                                        dateFormat="dd/MM/yyyy"
                                        selected={formData.dob}
                                        onChange={(date) => handleInputChange({ target: { name: 'dob', value: date } })}
                                        onKeyDown={handleKeyDown}
                                        name='dob'
                                        placeholderText='DD/MM/YYYY'
                                        maxDate={new Date()}
                                        maxLength={'8'}
                                    />
                                </label>
                                {formIsSubmitted && (errors.dob || !formData.dob) ? <FaExclamationCircle className={'absolute bottom-3.5 right-4 text-red-800'} size={21} /> : (!errors.dob && formData.dob && formIsSubmitted && !isCheckingPhone ? <FaCheckCircle className={'absolute bottom-3.5 right-4 text-green-600'} size={21} /> : '')}
                            </div>
                            {(errors.dob && !formData.dob || formData.dob) && <p className='text-sm text-red-700 pt-1'>{errors.dob}</p>}
                        </div>


                        <div>
                            <div className='relative max-w-sm'>
                                <label>
                                    <span className='max-w-min mb-2 text-base text-stoneGray block'>Phone</span>
                                    <input className='w-full max-w-sm p-2.5 rounded-md text-stoneGray bg-nightSky shadow-inner border-2 border-stoneGray'
                                        type='tel'
                                        value={formData.phone}
                                        spellCheck={false}
                                        maxLength={15}
                                        name='phone'
                                        placeholder="e.g., +44XXXXXXXXX or 07XXXXXXXX"
                                        onChange={handleInputChange}
                                        onKeyDown={handleKeyDown}
                                    />
                                </label>
                                {formIsSubmitted && (errors.phone || !isValidPhoneNumber(formData.phone)) ? (<FaExclamationCircle className={'absolute bottom-3.5 right-4 text-red-800'} size={21} />) : (!errors.phone && isValidPhoneNumber(formData.phone) && formIsSubmitted && !isCheckingPhone ? (<FaCheckCircle className={'absolute bottom-3.5 right-4 text-green-600'} size={21} />) : '')}
                            </div>
                            {(errors.phone || !isValidPhoneNumber(formData.phone)) && <p className='text-sm text-red-700 mt-1'>{errors.phone}</p>}
                        </div>

                        <button className={`btn block w-fit mt-1.5 bg-saddleBrown transition duration-500 ${isButtonDisabled ? 'opacity-65' : 'opacity-100'}`} disabled={isButtonDisabled} onClick={handleUpdateProfile}>
                            {isLoading ? (
                                <div className='flex items-center gap-2'>
                                    <img className="w-5 h-5 opacity-50" src="images/loading/spinner.svg" alt="Loading indicator" />
                                    <span>Registering</span>
                                </div>
                            ) : (
                                'Register'
                            )}
                        </button>
                        
                    </form>
                   
                   <div className='flex-1 order-1 h-fit md:mt-4 md:order-2 '>
                        <div className='md:shadow-outer md:p-5 rounded-md max-h-max'>
                            <div className='md:p-2 rounded-md'>
                                <AvatarUploader
                                    user={user}
                                    updateProfile={updateProfile}
                                    title='Upload a Profile Picture'
                                    text='This helps others recognize you. You can change it later in your profile settings. (Optional)'
                                    displayTitle={true}
                                    btnColor='bg-saddleBrown'
                                    show3DAvatar={true}
                                />
                            </div>
                        </div>
                        {infoMsg && <div className='info text-center mt-3'>{infoMsg}</div>}
                   </div>

                </div>
            </div>
        </div>

    );
};

export default CompleteRegistration;
