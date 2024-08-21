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
  const [checkBoxError, setCheckBoxError] = useState(null)
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
      setTimeout(() => setError(null), 2000);
      setIsLoading(false);
      return;
    } else if (!isValidEmail(email)) {
      setError('Unable to validate email address: invalid format');
      setTimeout(() => setError(null), 2000);
      setIsLoading(false);
      return;
    } else if (!isChecked) {
      setCheckBoxError(
        'Please confirm you have agreed to the privacy policy and terms of service.'
      );
      setTimeout(() => setCheckBoxError(null), 2000);
      setIsLoading(false);
      return;
    }

    setIsLoading(true)



    
    // sent email to server endpoint to check if email already exists within profiles table
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


        if (userEmail.exists) {
          setIsLoading(false)
          setError('This email is already associated with an account. Please login.')
          return
        } else {
            console.log('the email does not exist!')
    
            // store email temporarily in local storage
            localStorage.setItem('email', email)

            
            const supabase = createClientComponentClient()
            const { data, error } = await supabase.auth.signInWithOtp({
              email
            })
            

            if (error) {
              setIsLoading(false);
              setError(error.message)
              setTimeout(() => setError(null), 2000)
            } 

            if (!error) {
              router.push('/verify-signup-otp')
            }

        }

    } catch (error) {
        console.log(error)
    }

  }





    return (
      <div className='flex flex-col items-center gap-6 mb-4.5 md:justify-evenly md:gap-0 md:flex-row md:h-auth-page-height relative'>

        <form onSubmit={handleSubmit} className="w-full max-w-xs">
          <h2 className='text-3xl mb-6 font-eb text-deepOlive'>Sign up</h2>
          <p className='mb-3'>Enter your email to recieve a OTP (One-Time Passcode) to create your account.</p>
          
          <label>
            <span className='max-w-min mt-4 mb-2 text-base text-stoneGray block'>
              Email
            </span>
            <input
              className={`w-full p-2.5 rounded-md text-stoneGray shadow-inner bg-nightSky border-2 ${error ? 'border-red-900' : 'border-stoneGray'} focus:border-deepOlive focus:ring-1 focus:ring-deepOlive`}
              type='text'
              spellCheck='false'
              autoFocus='true'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <div className="mt-5 flex items-center">
            <input className="self-start mt-0.21 max-w-min transform scale-125" type="checkbox" value={isChecked} onChange={handleCheckbox}/>
            <span className="text-base block text-stoneGray ml-2.5 -mt-1">By signing up I agree to the{' '}<Link className="text-deepOlive text-base" href='#'>Privacy Policy</Link>{' '}and{' '}<Link className='text-deepOlive text-base' href='#'>Terms of Service</Link>
            .</span>
          </div>

          <button className='btn block mt-4 bg-deepOlive' disabled={isLoading}>{isLoading ? 'Processing...' : 'Signup'}</button>
        </form>
  
        <div className="mt-4 text-center h-2 md:h-0 absolute -top-24 md:-top-16 justify-self-center w-80">
          {error && <div className="error">{error}</div>}
          {checkBoxError && <p className="error leading-tight">{checkBoxError}</p>}
        </div>

        <div className='flex flex-col items-center md:grid-col-start-1 md:grid-row-start-2 md:col-span-2'>
          <p className='mb-8'>or Sign up using</p>
          <SocialButtons text={"Continue"} />
          <div className="mt-7">
            <p className='inline mt-8 pr-2'>Have an account?</p>
            <Link className='text-base text-deepOlive' href='/login'>Login</Link>
          </div>
        </div>

      </div>
    );
  }


  export default Signup