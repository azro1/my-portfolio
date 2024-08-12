"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

import { FiEye, FiEyeOff } from 'react-icons/fi';


const VerifyLoginOtp = () => {
    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [isEyeOpen, setIsEyeOpen] = useState(false)

    const router = useRouter()




    // verify otp
    const handleVerifyOtp = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (!otp) {
            setIsLoading(false)
            setError('Please enter your verication code');
            setTimeout(() => setError(null), 2000)
            return

        } 
        
        if (otp.length !== 6) {
            setIsLoading(false)
            setError('Otp cannot be less than 6 digits');
            setTimeout(() => setError(null), 2000)
            return

        }


        // get and remove email from local storage
        const email = localStorage.getItem('email')
        localStorage.removeItem('email')


        const supabase = createClientComponentClient()
        const { data: { session }, error } = await supabase.auth.verifyOtp({
            email,
            token: otp,
            type: 'email',
            options: {
                redirectTo: `${location.origin}`
            }
        })

        if (error) {
            setIsLoading(false)
            setError('Verification failed. Please try again.')
            console.log(error.message)
            return

        } else if (session) {
            setSuccessMsg('OTP verification passed. Loggin in...')
            setRedirect(true)
        }
    }




    useEffect(() => {
        if (redirect) {
            router.push('/')
        }
    }, [redirect, router]);






    // Handle OTP input change
    const handleOtpChange = (e) => {
        // Allow only digits and update state
        const newOtp = e.target.value.replace(/\D/g, '');
        if (newOtp.length <= 6) {
            setOtp(newOtp);
        }
    };



    const handleShowCode = () => {
        setIsEyeOpen(!isEyeOpen)
    }


    return (
        <div className="flex items-center justify-center h-auth-page-height mb-4.5">
            <form className="w-full max-w-xs" onSubmit={handleVerifyOtp}>
                <h2 className='text-3xl leading-normal mb-4 font-eb text-deepOlive'>Verify Your Email</h2>
                <p className='mb-3'>Enter the OTP (One-Time-Password) that was sent to your inbox.
                </p>


                <label>
                    <span className='max-w-min mb-2 text-base text-stoneGray block'>
                        Code:
                    </span>
                    <div className='relative'>
                        <input
                            className="w-full p-2.5 rounded-md text-stoneGray shadow-inner bg-nightSky border-2 border-stoneGray"
                            type={`${isEyeOpen ? 'tel' : 'password'}`}
                            spellCheck='false'
                            autoComplete="off"
                            value={otp}
                            maxLength='6'
                            autoFocus='true'
                            onChange={handleOtpChange}
                        />
                        {!isEyeOpen ? (
                            <FiEyeOff 
                                className='text-stoneGray absolute right-3 top-1/3 cursor-pointer' 
                                size={17} 
                                onClick={handleShowCode} 
                            />
                        ) : (
                            <FiEye 
                                className='text-stoneGray absolute right-3 top-1/3 cursor-pointer' 
                                size={17} 
                                onClick={handleShowCode} 
                            />
                        )}
                    </div>
                </label>
                <button className='btn block mt-3.5 bg-deepOlive'>{isLoading ? 'Verifying...' : 'Submit'}</button>
                <div className="mt-3.5 h-5">
                    {successMsg && <div className='success text-center'>{successMsg}</div>}
                    {error && <div className="error text-center">{error}</div>}
                </div>
            </form>
        </div>
    )
}

export default VerifyLoginOtp
