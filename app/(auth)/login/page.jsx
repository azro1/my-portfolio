"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// components
import SocialButtons from "../SocialButtons";

const Login = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // check if a given string is a valid email address
  const isValidEmail = (value) => {
    const emailRegex = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', 'u');
    return emailRegex.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      setError('Please provide your email');
      setTimeout(() => setError(null), 2000)
      return

    } else if (!isValidEmail(email)) {
      setError('Unable to validate email address: invalid format');
      setTimeout(() => setError(null), 2000)
      setIsLoading(false)
      return
    }

    setIsLoading(true)




    // send email to server endpoint to check if email already exists within profiles table
    try {
      const res = await fetch(`${location.origin}/api/auth/email-exists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email
        })
      })

      const userEmail = await res.json()
      console.log('Server response:', userEmail);


      if (res.status === 404) {
        setIsLoading(false)
        setError('There is no account associated with that email. Please signup.')
        return

      } else if (userEmail.error) {
        setIsLoading(false)
        setError(userEmail.error)
        return

      } else if (userEmail.exists && res.status === 409) {
        // store email temporarily in local storage
        localStorage.setItem('email', email)

        const supabase = createClientComponentClient()
        const { error } = await supabase.auth.signInWithOtp({
          email
        })


        if (error) {
          setIsLoading(false);
          setError(error.message)
          setTimeout(() => setError(null), 2000)
        }

        if (!error) {
          router.push('/verify-login-otp')
        }

      }

    } catch (error) {
      setIsLoading(false)
      console.log(error)
      setError('An unexpected error occurred. Please try again.');
    }

  }

  return (
    <div className='flex flex-col items-center gap-6 md:justify-evenly md:gap-0 md:flex-row md:h-auth-page-height relative'>

      <form className="w-full max-w-xs" onSubmit={handleSubmit}>
        <h2 className='text-3xl mb-6 font-eb text-deepOlive'>Login</h2>
        <p className='mb-3'>Enter your email to recieve a OTP (One-Time Passcode) for Login.</p>

        <label>
          <span className='max-w-min mb-2 text-base text-stoneGray block'>
            Email
          </span>
          <input
            className={`w-full p-2.5 rounded-md bg-nightSky text-stoneGray shadow-inner border-2 ${error ? 'border-red-900' : 'border-stoneGray'} focus:border-deepOlive focus:ring-1 focus:ring-deepOlive`}
            type='text'
            spellCheck='false'
            autoFocus='true'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        
        <div className="flex">
          <button className='mt-4 btn bg-deepOlive' disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
          <Link className='ml-auto mt-2' href={'/verify-phone-number'}>
             <span className='text-deepOlive text-base'>Forgot email?</span>
          </Link>
        </div>
      </form>

      <div className="mt-4 text-center h-2 md:h-0 absolute -top-24 md:-top-16 justify-self-center w-80">
        {error && <div className="error">{error}</div>}
      </div>

      <div className='flex flex-col items-center mb-4.5 md:col-start-2 md:mb-0'>
        <p className='mb-8'>or Login using</p>
        <SocialButtons text={"Login"} />
        <div className="mt-7">
          <p className='mt-8 inline pr-2'>Don't have an account?</p>
          <Link className='text-deepOlive text-base' href='/signup'>Sign up</Link>
        </div>
      </div>
    </div>
  )
};
export default Login;
