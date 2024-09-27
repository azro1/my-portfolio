"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";


const ForgotEmail = () => {
    const [phone, setPhone] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const router = useRouter()




    // Phone number validation function
    const isValidPhoneNumber = (phoneNumber) => /^\+\d{1,15}$/.test(phoneNumber);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if (!phone) {
          setError('Please provide your phone number');
          setTimeout(() => setError(null), 2000)
          setIsLoading(false)
          return
        }
    
        if (!isValidPhoneNumber(phone)) {
            setIsLoading(false)
            setError('Invalid format. Use: +14155552671');
            setTimeout(() => setError(null), 2000)
            return
        }
        
        setIsLoading(true)




        try {
            // create api route to check db for phone number and get assocated email
            const res = await fetch(`${location.origin}/api/auth/find-email-by-phone`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone
                })
            })

            // await json response from server and store in const email
            const email = await res.json()

            if (res.status === 404) {
                setIsLoading(false)
                setError('There is no account associated with that phone number.')
                return

            } else if (email.error) {
                setIsLoading(false)
                setError(email.error)
                return

            } else if (email.exists && res.status === 200) {
                setSuccessMsg("We've located your account. A verification code has been sent to your email.")

                // store email temporarily in local storage
                localStorage.setItem('email', email.email)
                setTimeout(() => setRedirect(true), 3000)
            }

        } catch (error) {
            setIsLoading(false)
            console.log(error.message)
            setError('An unexpected error occurred. Please try again.');
        }

      }






      // once email associated with phone number is found send otp from server to recovered email and redirect them to verify-login-otp page
      useEffect(() => {
         if (redirect) {
            router.push('/verify-email-otp')
         }
      }, [router, redirect])






    // prevent enter submission
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') e.preventDefault();
        if (!/[0-9+\(\)\-\s]/.test(e.key) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(e.key)) {
            e.preventDefault();
        }
    }



    
    return (
        <div className='flex items-center justify-center h-auth-page-height'>

            <div className='flex h-80 relative'>
                <div className="absolute -top-10 sm:-top-8 w-full text-center">
                    {error && <div className="error">{error}</div>}
                    {successMsg && <div className='success mt-2'>{successMsg}</div>}
                </div>

                <form className='max-w-max h-fit place-self-end' onSubmit={handleSubmit}>
                    <h2 className='text-3xl mb-4 font-eb text-saddleBrown'>Recover Your email</h2>
                    <p className='mb-4 max-w-lg'>Enter the phone number you provided during your account setup to help us recover your email address.</p>

                    <label>
                        <span className='max-w-min mb-2 text-base text-stoneGray block'>Phone</span>
                        <input
                            className={`w-full max-w-xs p-2.5 rounded-md text-stoneGray bg-deepCharcoal border-2 ${error ? 'border-red-900' : 'border-stoneGray'} focus:border-saddleBrown focus:ring-1 focus:ring-saddleBrown`}
                            type='tel'
                            value={phone}
                            spellCheck='false'
                            maxLength="15"
                            placeholder="e.g., +14155552671"
                            onChange={(e) => setPhone(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </label>
                    <button className='btn block mt-4 bg-saddleBrown' disabled={isLoading}>{isLoading ? 'Processing...' : 'Submit'}</button>

                </form>
            </div>

        </div>
    )
}

export default ForgotEmail
