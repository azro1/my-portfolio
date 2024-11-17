"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

// react icons
import { FiEye, FiEyeOff } from 'react-icons/fi'

// custom hooks
import { useUpdateTable } from "../hooks/useUpdateTable";
import { useMessage } from "../hooks/useMessage";


const OtpForm = ({ method, redirectUrl, subHeading, successMessage }) => {
    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isEyeOpen, setIsEyeOpen] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const router = useRouter()

    // destructure custom hooks
    const { updateTable } = useUpdateTable()
    const { changeMessage } = useMessage()

    // verify otp
    const handleVerifyOtp = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (!otp) {
            setIsLoading(false)
            changeMessage('error', 'Please enter the verification code sent to your email');
            return
        } else if (otp.length !== 6) {
            setIsLoading(false)
            changeMessage('error', 'The verification code must be exactly 6 digits long. Please check and try again.');
            return
        }

        // retrieve and remove email from local storage
        const email = localStorage.getItem('email')
        localStorage.removeItem('email')

        try {
            const supabase = createClientComponentClient()
            const { data: { session }, error } = await supabase.auth.verifyOtp({
                email,
                token: otp,
                type: 'email'
            })

            if (error) {
                console.log('auth otp error:', error.message);
                throw new Error(`Verification failed. To ${method}, please request a new verification code.`);
            } else if (session) {
               // after otp verification is successful it's at this point we have access to user object
                setIsLoading(false);

                // update is_verified column in profiles table
                const is_verifiedResult = await updateTable(session.user, 'profiles', { is_verified: true }, 'id');
                if (!is_verifiedResult.success) {
                    console.log('auth otp page: could not update otp verification status')
                }

                // clear cookie from server after successful verification
                document.cookie = "canAccessOtpPage=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                changeMessage('success', successMessage);
                setRedirect(true);
            }

        } catch (error) {
            setIsLoading(false);
            // clear cookie from server if there's an error
            document.cookie = "canAccessOtpPage=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            router.refresh();
            changeMessage('error', error.message);
        }
    }



    // redirect if otp verification is successful
    useEffect(() => {
        if (redirect) {
            router.push(redirectUrl);
        }
    }, [redirect, redirectUrl, router]);





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
        <div className='sm:shadow-outer sm:p-10 sm:rounded-xl'> 
            <form className="max-w-xs min-w-xs" onSubmit={handleVerifyOtp}>
                <h2 className='text-3xl leading-normal mb-4 font-eb text-saddleBrown'>Verification Required</h2>
                <p className='mb-5 max-w-lg'>{subHeading}</p>

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
                            <div className="absolute right-1 top-1 p-2.5 group bg-eyeBgBase hover:bg-eyeBgHover transition duration-300 rounded-md cursor-pointer fieye-container" onClick={handleShowCode}>
                                <FiEye
                                    className='text-black transition duration-300'
                                    size={17}
                                />
                            </div>

                        ) : (
                            <div className="absolute right-1 top-1 p-2.5 group bg-eyeBgBase hover:bg-eyeBgHover transition duration-300 rounded-md cursor-pointer fieye-container" onClick={handleShowCode}>
                                <FiEyeOff
                                    className='text-black transition duration-300'
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
                            <img className="w-5 h-5 opacity-50" src="images/loading/spinner.svg" alt="Loading indicator" />
                            <span>Verify</span>
                        </div>
                    ) : (
                        'Verify'
                    )}
                </button>
            </form>
        </div>

    )
}

export default OtpForm
