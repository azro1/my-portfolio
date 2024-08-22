"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";


const VerifyPhoneNumber = () => {
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

            const email = await res.json()
            console.log('client:', email)

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
            router.push('/verify-login-otp')
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
        <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row auto-rows-fr justify-center md:h-auth-page-height relative ">
            
            <div className='max-w-xs self-center justify-self-center shadow-outer p-6 rounded-md h-fit md:self-end'>
                <p>Enter the phone number you provided during your account setup to help us recover your email address.</p>
            </div>


            <form className="max-w-xs md:row-start-2 md:col-start-2 justify-self-center md:justify-self-start md:place-self-end" onSubmit={handleSubmit}>
                <h2 className='text-3xl mb-6 font-eb text-deepOlive'>Recover Your email</h2>
                <label>
                    <span className='max-w-min mt-4 mb-2 text-base text-stoneGray block'>Phone</span>
                    <input
                        className={`w-full p-2.5 rounded-md text-stoneGray shadow-inner bg-nightSky border-2 ${error ? 'border-red-900' : 'border-stoneGray'} focus:border-deepOlive focus:ring-1 focus:ring-deepOlive`}
                        type='tel'
                        value={phone}
                        spellCheck='false'
                        autoFocus='true'
                        maxLength="15"
                        placeholder="e.g., +14155552671"
                        onChange={(e) => setPhone(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </label>
                <button className='btn block mt-4 bg-deepOlive' disabled={isLoading}>{isLoading ? 'Processing...' : 'Submit'}</button>

            </form>
            <div className="mt-4  text-center h-2 md:h-0 absolute -top-16 justify-self-center w-80">
                {error && <div className="error">{error}</div>}
                {successMsg && <div className='success mt-2'>{successMsg}</div>}
            </div>

        </div>
    )
}

export default VerifyPhoneNumber
