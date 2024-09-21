"use client";

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
            setFirstNameError(true);
            setError('Please provide your Firstname');
            setIsLoading(false);
            return;
        }

        if (!lastName) {
            setLastNameError(true);
            setError('Please provide your Lastname');
            setIsLoading(false);
            return;
        }

        if (!dob) {
            setDobError(true);
            setError('Please provide your Date of Birth');
            setIsLoading(false);
            return;
        }

        if (!isValidDob(dob)) {
            setDobError(true);
            setError('Invalid Date of Birth format. Use DD/MM/YYYY.');
            setIsLoading(false);
            return;
        }

        if (!phone) {
            setPhoneError(true);
            setError('Please provide a phone number');
            setIsLoading(false);
            return;
        }

        if (!isValidPhoneNumber(phone)) {
            setPhoneError(true);
            setError('Invalid phone number format. Use: +14155552671.');
            setIsLoading(false);
            return;
        }

        if (user) {
            try {
                const metadata = { first_name: firstName, last_name: lastName, phone };
                await updateMetadata(metadata);

                const profileData = {
                    first_name: firstName,
                    last_name: lastName,
                    phone,
                    dob,
                    updated_at: new Date().toISOString()
                };

                await updateTable(user, 'profiles', profileData, 'id');
                setSuccessMsg('Finalizing account setup...');
                setTimeout(() => setRedirect(true), 3000);
            } catch (err) {
                setError('An error occurred. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }
    };

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
        <div className='flex flex-col justify-center items-center md:h-auth-page-height w-full'>
            
            
            
            <div className='w-full sm:w-9/12 relative'>
                <h2 className='text-3xl md:text-center leading-normal mb-6 font-eb text-deepOlive'>Set Up Your Account</h2>

                <form className='flex flex-col md:flex-row gap-4'>
                    <div className='flex-1'>
                        <label>
                            <span className='max-w-max mb-2 text-base text-stoneGray block'>First Name</span>
                            <input
                                className={`w-full p-2.5 rounded-md text-stoneGray shadow-inner bg-nightSky border-2 ${firstNameError ? 'border-red-900' : 'border-stoneGray'} focus:border-deepOlive focus:ring-1 focus:ring-deepOlive`}
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
                            <span className='mt-4 mb-2 text-base text-stoneGray block'>Date of Birth</span>
                            <input
                                className={`w-full p-2.5 rounded-md text-stoneGray shadow-inner bg-nightSky border-2 ${dobError ? 'border-red-900' : 'border-stoneGray'} focus:border-deepOlive focus:ring-1 focus:ring-deepOlive`}
                                type='text'
                                value={dob}
                                spellCheck='false'
                                placeholder='e.g., DD/MM/YYYY'
                                maxLength={10}
                                onChange={handleDobChange}
                                onKeyDown={handleKeyDown}
                            />
                        </label>
                    </div>
                    <div className='flex-1'>
                    <label>
                            <span className='mb-2 text-base text-stoneGray block'>Last Name</span>
                            <input
                                className={`w-full p-2.5 rounded-md text-stoneGray shadow-inner bg-nightSky border-2 ${lastNameError ? 'border-red-900' : 'border-stoneGray'} focus:border-deepOlive focus:ring-1 focus:ring-deepOlive`}
                                type='text'
                                value={lastName}
                                placeholder='Smith'
                                onChange={(e) => setLastName(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </label>
                        <label>
                            <span className='max-w-min mt-4 mb-2 text-base text-stoneGray block'>Phone</span>
                            <input
                                className={`w-full p-2.5 rounded-md text-stoneGray shadow-inner bg-nightSky border-2 ${phoneError ? 'border-red-900' : 'border-stoneGray'} focus:border-deepOlive focus:ring-1 focus:ring-deepOlive`}
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
                    </div>
                </form>



                <button className='btn block w-full mt-5 bg-deepOlive' onClick={handleUpdateProfile}>
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
                <div className="mt-4 w-full text-center absolute">
                    {successMsg && <div className='success text-center'>{successMsg}</div>}
                    {error && <div className="error text-center">{error}</div>}
                </div>


            </div>


        </div>
    );
};

export default CompleteRegistration;
