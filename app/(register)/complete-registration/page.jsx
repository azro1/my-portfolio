"use client"

import { useFetchUser } from "@/app/hooks/useFetchUser";
import { useUpdate } from "@/app/hooks/useUpdate";
import { useUpdateMetadata } from "@/app/hooks/useUpdateMetadata";

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";




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
        // Check that the phone number follows E.164 format
        const phoneRegex = /^\+\d{1,15}$/;
        return phoneRegex.test(phoneNumber);

    }


    const isValidDob = (dateOfBirth) => {
        // Check that the dob follows correct format
        const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        return dobRegex.test(dateOfBirth);
    }

    



    const handleUpdateProfile = async () => {
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

        }  else if (!dob) {
            setIsLoading(false)
            setDobError('Please provide your Date of birth');
            setTimeout(() => setDobError(null), 2000)
            return

        } else if (!isValidDob(dob)) {
            setIsLoading(false)
            setDobError('Invalid format. Please try again.');
            setTimeout(() => setDobError(null), 2000)
            return

        } else if (!phone) {
            setIsLoading(false)
            setPhoneError('Please provide a phone number');
            setTimeout(() => setPhoneError(null), 2000)
            return
            
        } else if (!isValidPhoneNumber(phone)) {
            setIsLoading(false)
            setPhoneError('Please enter a valid phone number (e.g., +123456789).')
            setTimeout(() => setPhoneError(null), 2000)
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



    const handleDobChange = (e) => {
        const value = e.target.value;
        // Replace anything that is not a digit or slash with an empty string
        const sanitizedValue = value.replace(/[^0-9/]/g, '');
        setDob(sanitizedValue);
    };
    


    let error = firstNameError || lastNameError || phoneError || dobError;



    return (
        <div className='flex flex-col justify-center items-center my-4.5 w-8/12 mx-auto '>
            <h2 className='text-3xl leading-normal mb-8 font-eb text-deepOlive'>Set Up Your Account</h2>

            <form className='flex gap-8 w-full'>

                <div className='flex-1'>
                    <label>
                        <span className='max-w-max mb-2 text-base text-stoneGray block'>
                            First Name
                        </span>
                        <input
                            className={`w-full p-2.5 rounded-md text-stoneGray shadow-inner bg-nightSky border-2 ${firstNameError ? 'border-red-900' : 'border-stoneGray'}`}
                            type='text'
                            spellCheck='false'
                            value={firstName}
                            placeholder='John'
                            autoFocus='true'
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
                            placeholder='Smith'
                            autoFocus='true'
                            onChange={(e) => setLastName(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </label>
                </div>

                <div className='flex-1'>
                    <label>
                        <span className='mb-2 text-base text-stoneGray block'>
                            Date of Birth
                        </span>
                        <input
                            className={`w-full p-2.5 rounded-md text-stoneGray shadow-inner bg-nightSky border-2 ${dobError ? 'border-red-900' : 'border-stoneGray'}`}
                            type='text'
                            value={dob}
                            spellCheck='false'
                            placeholder='DD/MM/YYYY'
                            pattern='\d{2}/\d{2}/\d{4}'
                            maxLength={10}
                            onChange={handleDobChange}
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
                            pattern='^\+\d{1,15}$' 
                            maxLength="15"
                            placeholder="e.g., +14155552671"
                            onChange={(e) => setPhone(e.target.value)}
                            onKeyDown={handlePhoneKeyDown}
                        />
                    </label>
                </div>

            </form>
            
            <button className='btn block w-full mt-5 bg-deepOlive' onClick={handleUpdateProfile}>{isLoading ? 'Registering...' : 'Register'}</button>
            <div className="mt-5 h-5 w-full text-center">
                {successMsg && <div className='success text-center'>{successMsg}</div>}
                {error && <div className="error text-center">{error}</div>}
            </div>
            
        </div>     
    );
}


  export default CompleteRegistration