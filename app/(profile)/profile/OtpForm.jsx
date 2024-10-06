"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

// icons
import { FiEye, FiEyeOff } from 'react-icons/fi'

// hooks
import { useUpdateTable } from "@/app/hooks/useUpdateTable";
import { useUpdateMetadata } from "@/app/hooks/useUpdateMetadata";


const OtpForm = ({ storageStr, verificationType, redirectUrl, title, subHeading, successMessage }) => {
    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null)
    const [isEyeOpen, setIsEyeOpen] = useState(false)
    const [redirect, setRedirect] = useState(false)

    

    // custom hook to update profiles table
    const { error: updateTableError, updateTable } = useUpdateTable()
    // custom hook to update metadata
    const { error: updateMetadataError, updateMetadata } = useUpdateMetadata()



    const router = useRouter()

    // verify otp
    const handleVerifyOtp = async (e) => {
        e.preventDefault()
        setOtp('')
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
        const contactMethod = localStorage.getItem(storageStr)
        localStorage.removeItem(storageStr)

        let email, phone;
        
        
        if (!contactMethod) {
            setError('Verification failed. Please request a new code.')
            setTimeout(() => setError(null), 2000)
        } else if (contactMethod.includes('@')) {
            email = contactMethod
        } else {
            phone = contactMethod
        }
         
        // create verification objects
        const otpVerificationData = email ? { email, token: otp, type: verificationType } : { phone, token: otp, type: verificationType }
        const appData = email ? { email: email } : { phone: phone }

        const supabase = createClientComponentClient()
        const { data: { session }, error } = await supabase.auth.verifyOtp(otpVerificationData)

        if (error) {
            setIsLoading(false)
            setError('Verification failed. Please request a new code.')
            console.log(error.message)
            return

        } else if (session) {
            setSuccessMsg(successMessage)

            // update raw_user_meta_data
            await updateMetadata(appData)
            // update profiles table with new email
            await updateTable(session.user, 'profiles', appData, 'id')
            
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
            router.push(redirectUrl)
        }
    }, [redirect, router, redirectUrl]);





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
        <div className="flex items-center justify-center h-profile-page-height">

            <div className="flex relative max-w-sm">

                <div className="absolute -top-24 w-full text-center">
                    {successMsg && <div className='success'>{successMsg}</div>}
                    {error && <div className="error">{error}</div>}
                </div>

                <form className="max-w-max" onSubmit={handleVerifyOtp}>
                    <h2 className='text-3xl leading-normal mb-4 font-eb text-saddleBrown'>{title}</h2>
                    <p className='mb-4'>{subHeading}</p>

                    <label>
                        <span className='max-w-min mb-2 text-base text-stoneGray block'>
                            Code:
                        </span>
                        <div className='relative max-w-xs'>
                            <input
                                className={`w-full max-w-xs py-2.5 px-3 rounded-md text-stoneGray bg-deepCharcoal border-2 tracking-extra-wide ${error ? 'border-red-900' : 'border-stoneGray'} focus:border-saddleBrown focus:ring-1 focus:ring-saddleBrown`}
                                type={`${isEyeOpen ? 'text' : 'password'}`}
                                spellCheck={false}
                                autoComplete="off"
                                placeholder="123456"
                                value={otp}
                                maxLength={6}
                                onChange={handleOtpChange}
                            />
                            {!isEyeOpen ? (
                                <div className="absolute right-2 top-2 p-2 group bg-nightSky hover:bg-stoneGray transition duration-300 rounded-md cursor-pointer fieye-container" onClick={handleShowCode}>
                                    <FiEye
                                        className='text-stoneGray group-hover:text-deepCharcoal transition duration-300 fieye'
                                        size={17}
                                    />
                                </div>

                            ) : (
                                <div className="absolute right-2 top-2 p-2 group bg-nightSky hover:bg-stoneGray transition duration-300 rounded-md cursor-pointer fieye-container" onClick={handleShowCode}>
                                    <FiEyeOff
                                        className='text-stoneGray group-hover:text-deepCharcoal transition duration-300 fieye-off'
                                        size={17}
                                    />
                                </div>
                            )}
                            <div>

                            </div>
                        </div>
                    </label>
                    <button className='btn block mt-3.5 bg-saddleBrown' disabled={isLoading}>
                        {isLoading ? (
                            <div className='flex items-center gap-2'>
                                <img className="w-5 h-5 opacity-50" src="../images/loading/spinner.svg" alt="Loading indicator" />
                                <span>Verifying</span>
                            </div>
                        ) : (
                            'Verify'
                        )}
                    </button>
                </form>

            </div>

        </div>
    )
}

export default OtpForm

