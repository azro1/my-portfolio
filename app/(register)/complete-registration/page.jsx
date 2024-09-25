"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import { enGB } from 'date-fns/locale';

// register locale
registerLocale('en-GB', enGB)
setDefaultLocale('en-GB'); 


import { FaCheckCircle } from 'react-icons/fa';

// components
import AvatarUploader from "@/app/(profile)/profile/edit-profile/AvatarUploader";

// hooks
import { useFetchUser } from "@/app/hooks/useFetchUser";
import { useUpdateTable } from "@/app/hooks/useUpdateTable";
import { useUpdateMetadata } from "@/app/hooks/useUpdateMetadata";


import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


const CompleteRegistration = () => {
    const [hasInteracted, setHasInteracted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    
    const [error, setError] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null);
    
    // custom hooks
    const { user } = useFetchUser();
    const { updateTable } = useUpdateTable();
    const { updateMetadata } = useUpdateMetadata();

    const isValidPhoneNumber = (phoneNumber) => /^\+\d{1,15}$/.test(phoneNumber);

    const [redirect, setRedirect] = useState(false);
    const router = useRouter();







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



    // Function to handle input changes and update form data
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name && value !== undefined) {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
        setHasInteracted(true);
    };
      




    // useEffect to validate form inputs and set error messages
    useEffect(() => {
        const { firstName, lastName, dob, phone } = formData;

        if (hasInteracted && !firstName.trim()) {
            setErrors((prev) => ({ ...prev, firstName: 'Please enter a firstname.' }))
        } else {
            setErrors((prev) => ({ ...prev, firstName: '' }))
        }

        if (hasInteracted && !lastName.trim()) {
            setErrors((prev) => ({ ...prev, lastName: 'Please provide your Lastname.' }));
        } else {
            setErrors((prev) => ({ ...prev, lastName: '' }))
        }

        if (hasInteracted && !dob) {
            setErrors((prev) => ({ ...prev, dob: 'Please provide your Date of Birth.' }));
        } else {
            setErrors((prev) => ({ ...prev, dob: '' }))
        }

        if (hasInteracted && !phone) {
            setErrors((prev) => ({ ...prev, phone: 'Please provide your Phone Number.' }));
        } else if (hasInteracted && !isValidPhoneNumber(phone)) {
            setErrors((prev) => ({ ...prev, phone: 'Please use an international code eg: +44 (UK) or +1 (US).' }));
        } else if (hasInteracted && phone.length < 10) {
            setErrors((prev) => ({ ...prev, phone: 'International phone numbers should be at least 10 digits.' }))
        } else {
            setErrors((prev) => ({ ...prev, phone: '' }))
        }

        if (firstName && lastName && dob && phone) {
            setIsButtonDisabled(false)
        }
    }, [formData, hasInteracted])







    // update raw_user_metadata and profiles table
    const handleUpdateProfile = async () => {
        const { firstName, lastName, dob, phone } = formData;

        if (user) {
            const formattedDate = dob.toLocaleDateString()

            try {
                // update raw_user_metadata object
                const metadata = { first_name: firstName, last_name: lastName, phone };
                await updateMetadata(metadata);

                const profileData = {
                    first_name: firstName,
                    last_name: lastName,
                    phone,
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







    // prevent use of using certain keyboard keys when filling in certain fields
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') e.preventDefault();
    };

    const handlePhoneKeyDown = (e) => {
        if (e.key === 'Enter') e.preventDefault();
        if (!/[0-9+\(\)\-\s]/.test(e.key) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(e.key)) {
            e.preventDefault();
        }
    };








    
    return (
        <div className='flex flex-col  w-full'>
            <div className='flex flex-col w-full relative'>

                <h2 className='text-3xl md:text-center leading-normal font-eb text-saddleBrown'>Set Up Your Account</h2>


                <div className="absolute -top-16 text-center w-full place-self-center">
                    {successMsg && <div className='success text-center'>{successMsg}</div>}
                    {error && <div className='error text-center'>{error}</div>}
                </div>


                <div className='mt-8 flex flex-col  gap-6 md:flex-row md:justify-evenly h-fit w-full'>

                    <form className='flex-1 order-2 flex flex-col gap-4 md:order-1'>
                        <div className='relative max-w-sm'>
                            <label>
                                <span className='mb-2 text-base text-stoneGray block'>First Name</span>
                                <input
                                    className={`w-full max-w-sm p-2.5 rounded-md text-stoneGray shadow-inner bg-nightSky border-2 ${errors.firstName ? 'border-red-800' : (formData.firstName ? 'border-green-800' : 'border-stoneGray')}`}
                                    type='text'
                                    spellCheck='false'
                                    value={formData.firstName}
                                    name='firstName'
                                    placeholder='John'
                                    onChange={handleInputChange}
                                />
                            </label>
                            <FaCheckCircle className={`absolute bottom-3.5 right-4 ${errors.firstName ? 'text-red-900' : (formData.firstName ? 'text-green-800' : 'text-stoneGray')}`} size={21} />
                            <p className='text-sm text-red-700 absolute'>{errors.firstName}</p>

                        </div>


                        <div className='relative max-w-sm'>
                            <label>
                                <span className='mb-2 text-base text-stoneGray block'>Last Name</span>
                                <input
                                    className={`w-full max-w-sm p-2.5 rounded-md text-stoneGray shadow-inner bg-nightSky border-2 ${errors.lastName ? 'border-red-800' : (formData.lastName ? 'border-green-800' : 'border-stoneGray')}`}
                                    type='text'
                                    value={formData.lastName}
                                    name='lastName'
                                    placeholder='Smith'
                                    onChange={handleInputChange}
                                />
                            </label>
                            <FaCheckCircle className={`absolute bottom-3.5 right-4 ${errors.lastName ? 'text-red-900' : (formData.lastName ? 'text-green-800' : 'text-stoneGray')}`} size={21} />
                            <p className='text-sm text-red-700 absolute'>{errors.lastName}</p>
                        </div>


                        <div className='relative max-w-sm'>
                            <label>
                                <span className='mb-2 text-base text-stoneGray block'>Date of Birth</span>
                                <DatePicker
                                    className={`w-full max-w-sm p-2.5 rounded-md text-stoneGray shadow-inner bg-nightSky border-2 ${errors.dob ? 'border-red-800' : (formData.dob ? 'border-green-800' : 'border-stoneGray')}`}
                                    wrapperClassName='w-full'
                                    locale="en-GB"
                                    dateFormat="dd/MM/yyyy"
                                    selected={formData.dob}
                                    onChange={(date) => handleInputChange({ target: { name: 'dob', value: date } })}
                                    name='dob'
                                    placeholderText='DD/MM/YYYY'
                                />
                            </label>
                            <FaCheckCircle className={`absolute bottom-3.5 right-4 ${errors.dob ? 'text-red-900' : (formData.dob ? 'text-green-800' : 'text-stoneGray')}`} size={21} />
                            <p className='text-sm text-red-700 absolute'>{errors.dob}</p>
                        </div>


                        <div className='relative max-w-sm'>
                            <label>
                                <span className='max-w-min mb-2 text-base text-stoneGray block'>Phone</span>
                                <input className={`w-full max-w-sm p-2.5 rounded-md text-stoneGray shadow-inner bg-nightSky border-2 ${errors.phone || (formData.phone && !isValidPhoneNumber(formData.phone)) ? 'border-red-800' : (formData.phone && isValidPhoneNumber(formData.phone) ? 'border-green-800' : 'border-stoneGray')}`}
                                    type='tel'
                                    value={formData.phone}
                                    spellCheck='false'
                                    pattern='^\+\d{1,15}$'
                                    maxLength="15"
                                    name='phone'
                                    placeholder="e.g., +14155552671"
                                    onChange={handleInputChange}
                                    onKeyDown={handlePhoneKeyDown}
                                />
                            </label>
                            <FaCheckCircle className={`absolute bottom-3.5 right-4 ${errors.phone || (formData.phone && !isValidPhoneNumber(formData.phone)) ? 'text-red-900' : (formData.phone && isValidPhoneNumber(formData.phone) ? 'text-green-800' : 'text-stoneGray')}`} size={21} />
                            <p className='text-sm text-red-700 absolute'>{errors.phone}</p>
                        </div>
                    </form>

                    <div className='flex-1 order-1 h-fit md:mt-4 md:order-2 md:shadow-outer md:p-5 rounded-md'>
                        <div className='p-6 bg-deepCharcoal border-2 border-saddleBrown rounded-md'>
                            <AvatarUploader
                                user={user}
                                updateProfile={updateProfile}
                                title='Add a profile avatar'
                                displayTitle={true}
                                btnColor='bg-saddleBrown'
                                btnText='Add'
                            />
                        </div>

                    </div>
                </div>

                <button className='btn block w-fit mt-6 bg-saddleBrown' disabled={isButtonDisabled} onClick={handleUpdateProfile}>
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </div>

        </div>

    );
};

export default CompleteRegistration;
