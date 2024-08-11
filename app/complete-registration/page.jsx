"use client"

import { useFetchUser } from "@/app/hooks/useFetchUser";
import { useUpdate } from "@/app/hooks/useUpdate";
import { useUpdateMetadata } from "@/app/hooks/useUpdateMetadata";

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/Navbar";




const CompleteRegistration = () => {
    const [firstName, setFirstName] = useState('')
    const [firstNameError, setFirstNameError] = useState(null)

    const [lastName, setLastName] = useState('')
    const [lastNameError, setLastNameError] = useState(null)

    const [phone, setPhone] = useState('')
    const [phoneError, setPhoneError] = useState(null)

    const [dob, setDob] = useState('')
    const [dobError, setDobError] = useState(null)
 
    const [isLoading, setIsLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState(null)
    const [redirect, setRedirect] = useState(false);


    const router = useRouter()
    


    // hook to get authenticated user
    const { user } = useFetchUser()
    // hook to update profiles
    const { updateTable } = useUpdate()
    // hook to update user metadata
    const { updateMetadata} = useUpdateMetadata()




    // Phone number validation function
    const isValidPhoneNumber = (phoneNumber) => {
        // Check that the phone number contains only valid characters and at least one digit
        const phoneRegex = /^\+?[0-9\(\)\-\s]{7,15}$/;
        const hasDigit = /[0-9]/.test(phoneNumber);
        return phoneRegex.test(phoneNumber) && hasDigit;
    }




    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        // form validation
        if (!firstName) {
            setIsLoading(false)
            setFirstNameError('Please provide your Firstname');
            setTimeout(() => setFirstNameError(null), 2000)
            return

        } else if (!lastName) {
            setIsLoading(false)
            setLastNameError('Please provide your Lastname');
            setTimeout(() => setLastNameError(null), 2000)
            return

        } else if (!phone) {
            setIsLoading(false)
            setPhoneError('Please provide a phone number');
            setTimeout(() => setPhoneError(null), 2000)
            return

        } else if (!isValidPhoneNumber(phone)) {
            setSaving(false)
            setPhoneError('Invalid phone number. Please enter a number between 7 and 15 digits')
            setTimeout(() => setPhoneError(null), 2000)
            return

        } else if (!dob) {
            setIsLoading(false)
            setDobError('Please provide your Date of birth');
            setTimeout(() => setDobError(null), 2000)
            return
        }


        
        if (user) {
            const metadata = {
                firstname: firstName,
                lastname: lastName,
                phone: phone,
            }
            await updateMetadata(metadata)
 

            const profile = {
                first_name: firstName,
                last_name: lastName,
                phone,
                dob,
                updated_at: new Date().toISOString()
            }

            await updateTable(user, 'profiles', profile, 'id')
            setSuccessMsg('Finalizing account setup...')
            setRedirect(true)
        }
    }


    useEffect(() => {
        if (redirect) {
            router.push('/');
        }
    }, [redirect, router]);


    // prevent enter submission
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }

    const handlePhoneKeyDown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();

          // Allow only numeric keys, backspace, and arrow keys
        } else if (!/[0-9+\(\)\-\s]/.test(e.key) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(e.key)
        ) {
          e.preventDefault();
        }
    }

    let error = firstNameError || lastNameError || phoneError || dobError;

    return (
        <>
            <Navbar />
            <div className='flex flex-col justify-center items-center my-4.5'>

                <form onSubmit={handleUpdateProfile} className='w-full max-w-xs'>
                <h2 className='text-3xl leading-normal mb-8 font-eb text-deepOlive'>Set Up Your Account</h2>

                    <label>
                        <span className='max-w-max mb-2 text-base text-stoneGray block'>
                            First Name
                        </span>
                        <input
                            className={`w-full p-2.5 rounded-md text-stoneGray shadow-inner bg-nightSky border-2 ${firstNameError ? 'border-red-900' : 'border-stoneGray'}`}
                            type='text'
                            spellCheck='false'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </label>
                    <label>
                        <span className='mt-4 mb-2 text-base text-stoneGray block'>
                            Last Name
                        </span>
                        <input
                            className={`w-full p-2.5 rounded-md text-stoneGray shadow-inner bg-nightSky border-2 ${lastNameError ? 'border-red-900' : 'border-stoneGray'}`}
                            type='text'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </label>
                    <label>
                        <span className='max-w-min mt-4 mb-2 text-base text-stoneGray block'>
                            Phone
                        </span>
                        <input
                            className={`w-full p-2.5 rounded-md text-stoneGray shadow-inner bg-nightSky border-2 ${phoneError ? 'border-red-900' : 'border-stoneGray'}`}
                            type='tel'
                            value={phone}
                            spellCheck='false'
                            autoFocus='true'
                            pattern='\+?[0-9\(\)\-\s]{7,15}'
                            maxLength="15"
                            onChange={(e) => setPhone(e.target.value)}
                            onKeyDown={handlePhoneKeyDown}
                        />
                    </label>
                    <label>
                        <span className='mt-4 mb-2 text-base text-stoneGray block'>
                            Date of Birth
                        </span>
                        <input
                            className={`w-full p-2.5 rounded-md text-stoneGray shadow-inner bg-nightSky border-2 ${dobError ? 'border-red-900' : 'border-stoneGray'}`}
                            type='text'
                            value={dob}
                            autoFocus='true'
                            spellCheck='false'
                            maxLength={'10'}
                            onChange={(e) => setDob(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </label>


                    <button className='btn block mt-5 bg-deepOlive'>{isLoading ? 'Registering...' : 'Register'}</button>
                    <div className="mt-5 h-5 text-center">
                        {successMsg && <div className='success text-center'>{successMsg}</div>}
                        {error && <div className="error text-center">{error}</div>}
                    </div>
                </form>
            </div>     
        </>
    );
}


  export default CompleteRegistration