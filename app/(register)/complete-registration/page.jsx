"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// components
import AvatarUploader from "@/app/(profile)/profile/edit-profile/AvatarUploader";

import { useFetchUser } from "@/app/hooks/useFetchUser";
import { useUpdateTable } from "@/app/hooks/useUpdateTable";
import { useUpdateMetadata } from "@/app/hooks/useUpdateMetadata";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


const CompleteRegistration = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [imageUrl, setImageUrl] = useState(null);

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [dobError, setDobError] = useState(false);

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const router = useRouter();
    const { user } = useFetchUser();
    const { updateTable } = useUpdateTable();
    const { updateMetadata } = useUpdateMetadata();

    const isValidPhoneNumber = (phoneNumber) => /^\+\d{1,15}$/.test(phoneNumber);
    const isValidDob = (dateOfBirth) => /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(dateOfBirth);

    const handleUpdateProfile = async () => {
        setIsLoading(true);
        setError(null);
        setFirstNameError(false);
        setLastNameError(false);
        setPhoneError(false);
        setDobError(false);

        if (!firstName) {
            setIsLoading(false);
            setFirstNameError(true);
            setError('Please provide your Firstname');
            return;
        }

        if (!lastName) {
            setIsLoading(false);
            setLastNameError(true);
            setError('Please provide your Lastname');
            return;
        }

        if (!dob) {
            setIsLoading(false);
            setDobError(true);
            setError('Please provide your Date of Birth');
            return;
        }

        if (!isValidDob(dob)) {
            setIsLoading(false);
            setDobError(true);
            setError('Invalid Date of Birth format. Use DD/MM/YYYY.');
            return;
        }

        if (!phone) {
            setIsLoading(false);
            setPhoneError(true);
            setError('Please provide a phone number');
            return;
        }

        if (!isValidPhoneNumber(phone)) {
            setIsLoading(false);
            setPhoneError(true);
            setError('Invalid phone number format. Use: +14155552671.');
            return;
        }

        if (user) {
            try {
                // update raw_user_metadata object
                const metadata = { first_name: firstName, last_name: lastName, phone };
                await updateMetadata(metadata);

                const profileData = {
                    first_name: firstName,
                    last_name: lastName,
                    phone,
                    dob,
                    updated_at: new Date().toISOString()
                };
                
                // update profiles table
                await updateTable(user, 'profiles', profileData, 'id');

                setSuccessMsg('Finalizing account setup...');
                setTimeout(() => setRedirect(true), 3000);
            } catch (err) {
                setError('An error occurred. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        }
    };





    const updateProfile = async ({ avatar_url }) => {
        setError(null)
        setImageUrl(avatar_url)

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





    useEffect(() => {
        if (redirect) {
            router.push('/');
        }
    }, [redirect, router]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') e.preventDefault();
    };

    const handlePhoneKeyDown = (e) => {
        if (e.key === 'Enter') e.preventDefault();
        if (!/[0-9+\(\)\-\s]/.test(e.key) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(e.key)) {
            e.preventDefault();
        }
    };

    const handleDobChange = (e) => {
        const value = e.target.value;
        const sanitizedValue = value.replace(/[^0-9/]/g, '');
        setDob(sanitizedValue);
    };





    
    return (
        <div className='flex flex-col  w-full'>
            
            
            
            <div className='flex flex-col relative w-full '>
              
                <h2 className='text-3xl md:text-center leading-normal font-eb text-deepOlive'>Set Up Your Account</h2>


                <div className="absolute -top-20 text-center w-full place-self-center">
                    {successMsg && <div className='success text-center'>{successMsg}</div>}
                    {error && <div className="error text-center">{error}</div>}
                </div>  

             
               <div className='mt-8 flex flex-col  gap-6 md:flex-row md:justify-evenly h-fit w-full'>

                    <form className='flex-1 order-2 md:order-1'>
                        <label>
                            <span className='mb-2 text-base text-stoneGray block'>First Name</span>
                            <input
                                className={`w-full max-w-sm p-2.5 rounded-md text-stoneGray shadow-inner bg-nightSky border-2 ${firstNameError ? 'border-red-900' : 'border-stoneGray'} focus:border-deepOlive focus:ring-1 focus:ring-deepOlive`}
                                type='text'
                                spellCheck='false'
                                value={firstName}
                                placeholder='John'
                                autoFocus
                                onChange={(e) => setFirstName(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </label>
                        <label>
                            <span className='mt-4 mb-2 text-base text-stoneGray block'>Last Name</span>
                            <input
                                className={`w-full max-w-sm p-2.5 rounded-md text-stoneGray shadow-inner bg-nightSky border-2 ${lastNameError ? 'border-red-900' : 'border-stoneGray'} focus:border-deepOlive focus:ring-1 focus:ring-deepOlive`}
                                type='text'
                                value={lastName}
                                placeholder='Smith'
                                onChange={(e) => setLastName(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </label>
                        <label>
                            <span className='mt-4 mb-2 text-base text-stoneGray block'>Date of Birth</span>
                            <input
                                className={`w-full max-w-sm p-2.5 rounded-md text-stoneGray shadow-inner bg-nightSky border-2 ${dobError ? 'border-red-900' : 'border-stoneGray'} focus:border-deepOlive focus:ring-1 focus:ring-deepOlive`}
                                type='text'
                                value={dob}
                                spellCheck='false'
                                placeholder='e.g., DD/MM/YYYY'
                                maxLength={10}
                                onChange={handleDobChange}
                                onKeyDown={handleKeyDown}
                            />
                        </label>
                        <label>
                            <span className='max-w-min mt-4 mb-2 text-base text-stoneGray block'>Phone</span>
                            <input
                                className={`w-full max-w-sm p-2.5 rounded-md text-stoneGray shadow-inner bg-nightSky border-2 ${phoneError ? 'border-red-900' : 'border-stoneGray'} focus:border-deepOlive focus:ring-1 focus:ring-deepOlive`}
                                type='tel'
                                value={phone}
                                spellCheck='false'
                                pattern='^\+\d{1,15}$'
                                maxLength="15"
                                placeholder="e.g., +14155552671"
                                onChange={(e) => setPhone(e.target.value)}
                                onKeyDown={handlePhoneKeyDown}
                            />
                        </label>
                    </form>  

                    <div className='flex-1 order-1 w-fit h-fit md:mt-4 md:order-2 md:shadow-outer md:p-5 '>
                        <div className='p-5 bg-deepCharcoal border-2 border-stoneGray'>
                            <AvatarUploader 
                                user={user}
                                updateProfile={updateProfile}
                                title='Add a profile avatar'
                                displayTitle={true}
                                btnColor='bg-deepOlive'
                                btnText='Add'
                            />
                        </div>

                    </div>
               </div>
  











                        <button className='btn block  w-fit   mt-4 bg-deepOlive' onClick={handleUpdateProfile}>
                            {isLoading ? 'Registering...' : 'Register'}
                        </button>
                </div>








            </div>


    );
};

export default CompleteRegistration;
