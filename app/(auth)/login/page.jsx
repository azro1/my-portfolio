"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// components
import SocialButtons from "../SocialButtons";

const Login = () => {
  const [tempEmail, setTempEmail] = useState('')
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

    if (!tempEmail) {
      setError('Please provide your email');
      setTimeout(() => setError(null), 2000)
      return

    } else if (!isValidEmail(tempEmail)) {
      setError('Invalid format. Please try again.');
      setTimeout(() => setError(null), 2000)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    // convert email to lowercase
    const email = tempEmail.toLowerCase();



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
     
      // await json response from server and store in const serverEmail
      const serverEmail = await res.json()

      if (res.status === 404) {
        setIsLoading(false)
        setError('There is no account associated with that email. Please signup.')
        return

      } else if (serverEmail.error) {
        setIsLoading(false)
        setError(serverEmail.error)
        return

      } else if (serverEmail.exists && res.status === 409) {
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
    <div className='flex flex-col items-center md:justify-evenly md:flex-row md:h-auth-page-height'>


      <div className="flex w-full max-w-xs relative h-72 md:h-80">
        <div className="absolute -top-16 md:-top-10 w-full text-center">
          {error && <div className="error">{error}</div>}
        </div>

        <form className="h-fit self-end" onSubmit={handleSubmit}>
          <h2 className='text-3xl mb-6 font-eb text-saddleBrown'>Login</h2>
          <p className='mb-4'>Enter your email address to recieve a security code for quick and secure login</p>

          <label>
            <span className='max-w-min mb-2 text-base text-stoneGray block'>
              Email
            </span>
            <input
              className={`w-full py-2.5 px-3 rounded-md bg-deepCharcoal text-stoneGray border-2 ${error ? 'border-red-900' : 'border-stoneGray'} focus:border-saddleBrown focus:ring-1 focus:ring-saddleBrown`}
              type='text'
              placeholder='name@domain.com'
              spellCheck='false'
              value={tempEmail}
              onChange={(e) => setTempEmail(e.target.value)}
            />
          </label>

          <div className="flex">
            <button className='mt-4 btn bg-saddleBrown' disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
            <Link className='ml-auto mt-2' href={'/forgot-email'}>
              <span className='text-saddleBrown text-base'>Forgot email?</span>
            </Link>
          </div>
        </form>
      </div>



      <div className='flex flex-col items-center mb-4.5 md:col-start-2 md:mb-0'>
        <p className='mb-8'>or Login using</p>
        <SocialButtons text={"Login"} />
        <div className="mt-7">
          <p className='mt-8 inline pr-2'>Don't have an account?</p>
          <Link className='text-saddleBrown text-base' href='/signup'>Sign up</Link>
        </div>
      </div>
    </div>
  )
};
export default Login;
