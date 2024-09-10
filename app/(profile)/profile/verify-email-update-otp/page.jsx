"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

// icons
import { FiEye, FiEyeOff } from 'react-icons/fi'

// hooks
import { useUpdate } from "@/app/hooks/useUpdate";
import { useUpdateMetadata } from "@/app/hooks/useUpdateMetadata";


const EmailUpdateOtp = () => {
    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null)
    const [isEyeOpen, setIsEyeOpen] = useState(false)
    const [redirect, setRedirect] = useState(false)

    

    // custom hook to update profiles table
    const { error: updateTableError, updateTable } = useUpdate()
    // custom hook to update metadata
    const { error: updateMetadataError, updateMetadata } = useUpdateMetadata()



    const router = useRouter()

    // verify otp
    const handleVerifyOtp = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (!otp) {
            setError('Please enter your verification code');
            setTimeout(() => setError(null), 2000)
            setIsLoading(false)
            return
        } 
        
        if (otp.length !== 6) {
            setError('The code cannot be less than 6 digits');
            setTimeout(() => setError(null), 2000)
            setIsLoading(false)
            return
        }


        // get and remove email from local storage
        const email = localStorage.getItem('email')
        localStorage.removeItem('email')

        

        const supabase = createClientComponentClient()
        const { data: { session }, error } = await supabase.auth.verifyOtp({
            email,
            token: otp,
            type: 'email_change'
        })

        if (error) {
            setIsLoading(false)
            setError('Verification failed. Please try again.')
            console.log(error.message)
            return

        } else if (session) {
            setSuccessMsg('OTP verification passed. Email updated!')

            // update metadata
            await updateMetadata({ email: email })
            // update profiles table with new email
            await updateTable(session.user, 'profiles', {email: email}, 'id')
            
            if (updateMetadataError) {
               setIsLoading(false)
               setError(updateMetadataError)
               return
            } else if (updateTableError) {
               setIsLoading(false)
               setError(updateTableError)
               return
            } else {
               setTimeout(() => setRedirect(true), 3000)
            }
        }
    }




    useEffect(() => {
        if (redirect) {
            router.push('/profile/edit-profile')
        }
    }, [redirect, router]);





    // Handle OTP input change
    const handleOtpChange = (e) => {
        // Allow only digits and update state
        const newOtp = e.target.value.replace(/\D/g, '');
        if (newOtp.length <= 6) {
            setOtp(newOtp);
        }
    }




    const handleShowCode = () => {
      setIsEyeOpen(!isEyeOpen)
    }





    return (
        <div className="flex items-center justify-center h-profile-page-height relative">
            <form className="w-full max-w-xs relative" onSubmit={handleVerifyOtp}>
                <h2 className='text-3xl leading-normal mb-6 font-eb text-deepOlive'>Verify Your Email</h2>
                <p className='mb-3'>Enter the OTP (One-Time-Passcode) that was sent to your inbox.</p>

                <label>
                    <span className='max-w-min mb-2 text-base text-stoneGray block'>
                        Code:
                    </span>
                    <div className='relative'>
                        <input
                            className={`w-full p-2.5 rounded-md text-stoneGray bg-deepCharcoal border-2 ${error ? 'border-red-900' : 'border-stoneGray'} focus:border-deepOlive focus:ring-1 focus:ring-deepOlive`}
                            type={`${isEyeOpen ? 'text' : 'password'}`}
                            spellCheck='false'
                            autoComplete="off"
                            value={otp}
                            maxLength='6'
                            autoFocus='true'
                            onChange={handleOtpChange}
                        />
                        {!isEyeOpen ? (
                            <div className="absolute right-2 top-2 p-2 group bg-nightSky hover:bg-deepOlive transition duration-300 rounded-md cursor-pointer fieye-container" onClick={handleShowCode}>
                                <FiEye
                                    className='text-stoneGray group-hover:text-frostWhite transition duration-300 fieye'
                                    size={17}
                                />
                            </div>

                        ) : (
                            <div className="absolute right-2 top-2 p-2 group bg-nightSky hover:bg-deepOlive transition duration-300 rounded-md cursor-pointer fieye-container" onClick={handleShowCode}>
                                <FiEyeOff
                                    className='text-stoneGray group-hover:text-frostWhite transition duration-300 fieye-off'
                                    size={17}
                                />
                            </div>
                        )}
                        <div>

                        </div>
                    </div>
                </label>

                <button className='btn block mt-3.5 bg-deepOlive' disabled={isLoading}>{isLoading ? 'Verifying...' : 'Submit'}</button>
                <div className="text-center h-2 md:h-0 absolute -top-24 justify-self-center w-full">
                    {successMsg && <div className='success'>{successMsg}</div>}
                    {error && <div className="error">{error}</div>}
                </div>
            </form>
        </div>
    )
}

export default EmailUpdateOtp

