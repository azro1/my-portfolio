"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation";


// components
import SocialButtons from "../SocialButtons";


const Signup = () => {

  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()


  // check if a given string is a valid email address
  const isValidEmail = (value) => {
    const emailRegex = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', 'u');
    return emailRegex.test(value);
  };

  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // form validation
    if (!email) {
        setError('Please provide your email');
        setTimeout(() => setError(null), 2000)
        setIsLoading(false)
        return

    } else if (!isValidEmail(email)) {
        setError('Unable to validate email address: invalid format');
        setTimeout(() => setError(null), 2000)
        setIsLoading(false)
        return

    } else if (!isChecked) {
        setError('Please confirm you have agreed to the Privacy Policy and Terms of Service');
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
      router.push('/verify-signup-otp')
    }
  }

    return (
      <div className='flex flex-col items-center gap-12 md:flex-row md:justify-evenly md:gap-0 mb-4.5 md:flex-row md:h-auth-page-height'>

        <form onSubmit={handleSubmit} className="w-full max-w-xs">
          <h2 className='text-3xl mb-6 font-eb text-accentRed'>Sign up</h2>
          <p className='mb-3'>Enter your email to recieve a OTP (One-Time Passcode) to create your account.</p>
          
          <label>
            <span className='max-w-min mt-4 mb-2 text-base text-stoneGray block'>
              Email
            </span>
            <input
              className="w-full p-2.5 rounded-md text-stoneGray shadow-inner bg-deepCharcoal border-2 border-stoneGray"
              type='text'
              spellCheck='false'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <div className="mt-5 flex items-center">
            <input className="self-start mt-0.21 max-w-min transform scale-125" type="checkbox" value={isChecked} onChange={handleCheckbox}/>
            <span className="text-base block text-stoneGray ml-2.5 -mt-1">By signing up I agree to the{' '}<Link className="text-accentRed text-base" href='#'>Privacy Policy</Link>{' '}and{' '}<Link className='text-accentRed text-base' href='#'>Terms of Service</Link>
            .</span>
          </div>

          <button className='btn block mt-4 bg-accentRed'>{isLoading ? 'Processing...' : 'Signup'}</button>
          {error && <div className="mt-4 text-center error">{error}</div>}
        </form>
        

        <div className='flex flex-col items-center md:grid-col-start-1 md:grid-row-start-2 md:col-span-2'>
          <p className='mb-8'>or Sign up using</p>
          <SocialButtons text={"Continue"} />
          <div className="mt-7">
            <p className='inline mt-8 pr-2'>Have an account?</p>
            <Link className='text-base text-accentRed' href='/login'>Login</Link>
          </div>
        </div>

      </div>
    );
  }


  export default Signup