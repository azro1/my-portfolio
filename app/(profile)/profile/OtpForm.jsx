"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

// icons
import { FiEye, FiEyeOff } from 'react-icons/fi'

// hooks
import { useUpdateTable } from "@/app/hooks/useUpdateTable";
import { useUpdateMetadata } from "@/app/hooks/useUpdateMetadata";
// custom hook to display global messages
import { useMessage } from "@/app/hooks/useMessage";


const OtpForm = ({ storageStr, verificationType, redirectUrl, title, subHeading, successMessage }) => {
    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isEyeOpen, setIsEyeOpen] = useState(false)
    const [redirect, setRedirect] = useState(false)

    
    // custom hook to update profiles table
    const { error: updateTableError, updateTable } = useUpdateTable()
    // custom hook to update metadata
    const { error: updateMetadataError, updateMetadata } = useUpdateMetadata()
    // global messages function
    const { changeMessage } = useMessage()


    const router = useRouter()

    // verify otp
    const handleVerifyOtp = async (e) => {
        e.preventDefault()
        setOtp('')
        setIsLoading(true)

        if (!otp) {
            setIsLoading(false)
            changeMessage('error', 'Please enter your verification code.');
            return
        } else if (otp.length !== 6) {
            setIsLoading(false)
            changeMessage('error', 'The verification code must be exactly 6 digits long. Please check and try again.');
            return
        }

        // get and remove email from local storage
        const contactMethod = localStorage.getItem(storageStr)
        localStorage.removeItem(storageStr)

        let email, phone;
        
        
        if (!contactMethod) {
            changeMessage('error', "We couldn't verify your code. Please request a new verification code and try again.")
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
            changeMessage('error', "We couldn't verify your code. Please request a new verification code and try again.")
            console.log(error.message)
            return

        } else if (session) {
            changeMessage('success', successMessage)

            // update raw_user_meta_data
            await updateMetadata(appData)
            // update profiles table with new email
            await updateTable(session.user, 'profiles', appData, 'id')
            
            if (updateMetadataError) {
               setIsLoading(false)
               changeMessage('error', "Oops! Somethings gone wrong on our end. We're working on it. Please try again later.")
               return
            } else if (updateTableError) {
               setIsLoading(false)
               changeMessage('error', "Oops! Somethings gone wrong on our end. We're working on it. Please try again later.")
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

            <div className="flex max-w-sm">

                <form className="max-w-max" onSubmit={handleVerifyOtp}>
                    <h2 className='text-3xl leading-normal mb-4 font-eb text-saddleBrown'>{title}</h2>
                    <p className='mb-4'>{subHeading}</p>

                    <label>
                        <span className='max-w-min mb-2 text-base text-stoneGray block'>
                            Code:
                        </span>
                        <div className='relative max-w-xs'>
                            <input
                                className='w-full max-w-xs py-2.5 px-3 rounded-md text-black tracking-extra-wide'
                                type={`${isEyeOpen ? 'text' : 'password'}`}
                                spellCheck={false}
                                autoComplete="off"
                                placeholder="123456"
                                value={otp}
                                maxLength={6}
                                onChange={handleOtpChange}
                            />
                            {!isEyeOpen ? (
                                <div className="absolute right-1 top-1 p-2.5 group bg-nightSky hover:bg-saddleBrown transition duration-300 rounded-md cursor-pointer fieye-container" onClick={handleShowCode}>
                                    <FiEye
                                        className='text-stoneGray group-hover:text-frostWhite transition duration-300 fieye'
                                        size={17}
                                    />
                                </div>

                            ) : (
                                <div className="absolute right-1 top-1 p-2.5 group bg-nightSky hover:bg-saddleBrown transition duration-300 rounded-md cursor-pointer fieye-container" onClick={handleShowCode}>
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

