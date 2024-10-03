"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

import { FiEye, FiEyeOff } from 'react-icons/fi'


const OtpForm = ({ redirectUrl, subHeading, successMessage }) => {
    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null)
    const [isEyeOpen, setIsEyeOpen] = useState(false)
    const [redirect, setRedirect] = useState(false)

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
            type: 'email'
        })

        if (error) {
            setIsLoading(false)
            setError('Verification failed. Please request a new code.')
            console.log(error.message)
            return

        } else if (session) {
            setSuccessMsg(successMessage)
            setTimeout(() => setRedirect(true), 3000)
        }
    }




    useEffect(() => {
        if (redirect) {
            router.push(redirectUrl)
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
        <div className="flex items-center justify-center h-auth-page-height">

            <div className="flex relative h-80">

                <div className="absolute -top-24 sm:-top-8 w-full text-center">
                    {successMsg && <div className='success'>{successMsg}</div>}
                    {error && <div className="error">{error}</div>}
                </div>

                <form className="max-w-max h-fit place-self-end" onSubmit={handleVerifyOtp}>
                    <h2 className='text-3xl leading-normal mb-4 font-eb text-saddleBrown'>Email Verification Required</h2>
                    <p className='mb-4 max-w-lg'>{subHeading}</p>

                    <label>
                        <span className='max-w-min mb-2 text-base text-stoneGray block'>
                            Code:
                        </span>
                        <div className='relative max-w-xs'>
                            <input
                                className={`w-full max-w-xs py-2 px-3 text-lg rounded-md text-stoneGray bg-deepCharcoal border-2 tracking-extra-wide ${error ? 'border-red-900' : 'border-stoneGray'} focus:border-saddleBrown focus:ring-1 focus:ring-saddleBrown`}
                                type={`${isEyeOpen ? 'text' : 'password'}`}
                                spellCheck='false'
                                autoComplete="off"
                                placeholder="123456"
                                value={otp}
                                maxLength='6'
                                onChange={handleOtpChange}
                            />
                            {!isEyeOpen ? (
                                <div className="absolute right-1.5 top-1.5 p-2 group bg-nightSky hover:bg-stoneGray transition duration-300 rounded-md cursor-pointer fieye-container" onClick={handleShowCode}>
                                    <FiEye
                                        className='text-stoneGray group-hover:text-deepCharcoal transition duration-300 fieye'
                                        size={20}
                                    />
                                </div>

                            ) : (
                                <div className="absolute right-1.5 top-1.5 p-2 group bg-nightSky hover:bg-stoneGray transition duration-300 rounded-md cursor-pointer fieye-container" onClick={handleShowCode}>
                                    <FiEyeOff
                                        className='text-stoneGray group-hover:text-deepCharcoal transition duration-300 fieye-off'
                                        size={20}
                                    />
                                </div>
                            )}
                            <div>

                            </div>
                        </div>
                    </label>

                    <button className='btn block mt-3.5 bg-saddleBrown' disabled={isLoading}>{isLoading ? 'Verifying...' : 'Verify'}</button>

                </form>

            </div>


        </div>
    )
}

export default OtpForm
