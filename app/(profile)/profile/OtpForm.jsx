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


const OtpForm = ({ contact, storageStr, verificationType, title, subHeading, successMessage }) => {
    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isEyeOpen, setIsEyeOpen] = useState(false)
    const [redirect, setRedirect] = useState(false)

    
    // custom hooks
    const { updateTable } = useUpdateTable()
    const { updateMetadata } = useUpdateMetadata()
    const { changeMessage } = useMessage()


    const router = useRouter()


    // verify otp
    const handleVerifyOtp = async (e) => {
        e.preventDefault()

        const handleError = (errorMessage) => {
            setIsLoading(false);
            changeMessage('error', errorMessage);
        }

        if (!otp) {
            handleError('Please enter your verification code.');
            return
        } else if (otp.length !== 6) {
            handleError('The verification code must be exactly 6 digits long. Please check and try again.');
            return
        }


        // get and remove email from local storage
        const contactMethod = localStorage.getItem(storageStr)
        localStorage.removeItem(storageStr)
        
        
        if (!contactMethod) {
            handleError("We couldn't verify your code. Please request a new verification code and try again.");
            // clear cookie from server if there's no contact method in local storage
            document.cookie = "canAccessOtpPage=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            router.refresh();
        }
         
        // create verification objects
        const appData = contactMethod?.includes('@') ? { email: contactMethod } : { phone: contactMethod };
        const otpVerificationData = { ...appData, token: otp, type: verificationType };

        const supabase = createClientComponentClient()
        const { data: { session }, error } = await supabase.auth.verifyOtp(otpVerificationData)

        if (error) {
            handleError("We couldn't verify your code. Please request a new verification code and try again.");
            // clear cookie from server if code is invalid or expired
            document.cookie = "canAccessOtpPage=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            router.refresh();
            console.log(error.message)
            return

        } else if (session) {

            try {
                setIsLoading(true)

                // check for successful metadata update if not log out error
                const updateMetadataResult = await updateMetadata(appData)
                if (!updateMetadataResult.success) {
                    console.log('metadata update error:', updateMetadataResult.error)
                }

                // check for successful profiles update if not throw new error
                const updateTableResult = await updateTable(session.user, 'profiles', appData, 'id')
                if (!updateTableResult.success) {
                    throw new Error(`An unexpected error occurred and we couldn't update your ${contact}. Please try again later. If the issue persists, contact support.`)
                }

                setIsLoading(false)
                // clear cookie after successful verification
                document.cookie = "canAccessOtpPage=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                router.refresh();
                changeMessage('success', successMessage)

            } catch (error) {
                // clear cookie if profiles update fails
                document.cookie = "canAccessOtpPage=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                router.refresh();
                changeMessage('error', error.message)
            }
        }
    }









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
        <div className="flex items-center justify-center h-[60vh] bg-softCharcoal">

            <div className="flex max-w-sm">

                <form className="max-w-max" onSubmit={handleVerifyOtp}>
                    <h2 className='text-3xl leading-normal mb-4 font-eb text-saddleBrown'>{title}</h2>
                    <p className='mb-4'>{subHeading}</p>

                    <label>
                        <span className='max-w-min mb-2 text-base text-ashGray block'>
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
                                        className='text-ashGray group-hover:text-frostWhite transition duration-300 fieye'
                                        size={17}
                                    />
                                </div>

                            ) : (
                                <div className="absolute right-1 top-1 p-2.5 group bg-nightSky hover:bg-saddleBrown transition duration-300 rounded-md cursor-pointer fieye-container" onClick={handleShowCode}>
                                    <FiEyeOff
                                        className='text-ashGray group-hover:text-frostWhite transition duration-300 fieye-off'
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
                                <span>Verify</span>
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

