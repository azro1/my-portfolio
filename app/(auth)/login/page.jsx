"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// components
import SocialButtons from "../SocialButtons";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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


    // store email temporarily in local storage
    localStorage.setItem('email', email)


    const supabase = createClientComponentClient()
    const { data, error } = await supabase.auth.signInWithOtp({
      email
    })
    

    if (error) {
      setError(error.message)
      setTimeout(() => setError(null), 2000)
      setIsLoading(false);
    } 

    if (!error) {
      router.push('/verify-login-otp')
    }
  }

  return (
    <div className='flex flex-col items-center gap-12 md:flex-row md:justify-evenly md:gap-0 mb-4.5 md:flex-row md:h-auth-page-height'>

      <form className="w-full max-w-xs" onSubmit={handleSubmit}>
        <h2 className='text-3xl mb-6 font-eb text-accentRed'>Login</h2>
        <p className='mb-3'>Enter your email to recieve a OTP (One-Time Passcode) for Login.</p>

        <label>
          <span className='max-w-min mb-2 text-base text-stoneGray block'>
            Email
          </span>
          <input
            className='w-full p-2.5 rounded-md bg-nightSky text-stoneGray shadow-inner border-2 border-stoneGray'
            type='text'
            spellCheck='false'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <button className='mt-4 btn bg-accentRed'>{isLoading ? 'Logging in...' : 'Login'}</button>
        {error && <div className="mt-4 text-center error">{error}</div>}
      </form>

      <div className='flex flex-col items-center md:col-start-2'>
        <p className='mb-8'>or Login using</p>
        <SocialButtons text={"Login"} />
        <div className="mt-7">
          <p className='mt-8 inline pr-2'>Don't have an account?</p>
          <Link className='text-accentRed text-base' href='/signup'>Sign up</Link>
        </div>
      </div>
    </div>
  )
};
export default Login;
