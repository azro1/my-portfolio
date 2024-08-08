"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

const VerifySignupOtp = () => {
    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null)
    const [redirect, setRedirect] = useState(false)


    const router = useRouter()


    // verify otp
    const handleVerifyOtp = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (!otp) {
            setError('Please enter your verication code');
            setTimeout(() => setError(null), 2000)
            setIsLoading(false)
            return
        } else if (otp.length < 6) {
            setError('Otp cannot be less than 6 digits');
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
            setError('Verification failed. Please try again.')
            console.log(error.message)
            return

        } else if (session) {
            setSuccessMsg('OTP verification passed. Creating your account...')
            setRedirect(true)
        }
    }





    useEffect(() => {
        if (redirect) {
            router.push('/complete-registration')
        }
    }, [redirect, router]);




    // prevent enter submission
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }



    return (
        <div className="flex items-center justify-center h-auth-page-height mb-4.5">
            <form className="w-full max-w-xs" onSubmit={handleVerifyOtp}>
                <h2 className='text-3xl leading-normal mb-5 font-eb text-accentRed'>Verify Your Email</h2>
                <p className='mb-3'>Enter the OTP (One-Time-Password) that was sent to your inbox.
                </p>


                <label>
                <span className='max-w-min mb-2 text-base text-stoneGray block'>
                    Code:
                </span>
                    <input
                        className="w-full p-2.5 rounded-md text-stoneGray shadow-inner bg-deepCharcoal border-2 border-stoneGray"
                        type='password'
                        spellCheck='false'
                        autoComplete="off"
                        value={otp}
                        maxLength='6'
                        onChange={(e) => setOtp(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </label>
                <button className='btn block mt-4 bg-accentRed'>{isLoading ? 'Verifying...' : 'Verify'}</button>
                <div className="mt-5 h-5">
                    {successMsg && <div className='success text-center'>{successMsg}</div>}
                    {error && <div className="error text-center">{error}</div>}
                </div>
            </form>
        </div>
    )
}

export default VerifySignupOtp
