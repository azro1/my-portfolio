"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation";


// components
import SocialButtons from "../SocialButtons";


const Signup = () => {

  const [tempEmail, setTempEmail] = useState('')
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
    setError(null)
    
    // form validation
    if (!tempEmail) {
      setError('Please provide your email');
      setTimeout(() => setError(null), 2000);
      setIsLoading(false);
      return;
    } else if (!isValidEmail(tempEmail)) {
      setError('Invalid format. Please try again.');
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
    // convert email to lowercase
    const email = tempEmail.toLowerCase();




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

      // await json response from server and store in const serverEmail
      const serverEmail = await res.json()

      if (res.status === 409) {
        setIsLoading(false)
        setError('This email is already associated with an account. Please login.')
        return

      } else if (serverEmail.error) {
        setIsLoading(false)
        setError(serverEmail.error)
        return

      } else if (!serverEmail.exists && res.status === 404) {
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
          router.push('/verify-signup-otp')
        }

      }

    } catch (error) {
      setIsLoading(false)
      console.log(error.message)
      setError('An unexpected error occurred. Please try again.');
    }

  }





    return (
      <div className='flex flex-col items-center gap-6 mb-4.5 md:justify-evenly md:gap-0 md:flex-row md:h-auth-page-height'>

        <div className="flex w-full max-w-xs h-72 md:h-96 relative">
          
          <div className="absolute -top-16 md:-top-12 w-full text-center">
            {error && <div className="error"> {error}</div>}
            {checkBoxError && <p className="error leading-tight">{checkBoxError}</p>}
          </div>

          <form onSubmit={handleSubmit} className="h-fit self-end">
            <h2 className='text-3xl mb-6 font-eb text-saddleBrown'>Sign up</h2>
            <p className='mb-4'>Enter your email address to recieve a security code to create your account</p>
            
            <label>
              <span className='max-w-min mt-4 mb-2 text-base text-stoneGray block'>
                Email
              </span>
              <input
                className={`w-full py-2.5 px-3 rounded-md text-stoneGray bg-deepCharcoal border-2 ${error ? 'border-red-900' : 'border-stoneGray'} focus:border-saddleBrown focus:ring-1 focus:ring-saddleBrown`}
                type='text'
                spellCheck='false'
                placeholder='name@domain.com'
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
              />
            </label>

            <div className="mt-5 flex items-center">
              <input className="self-start mt-0.21 max-w-min transform scale-125" type="checkbox" value={isChecked} onChange={handleCheckbox}/>
              <span className="text-base block text-stoneGray ml-2.5 -mt-1">By signing up I agree to the{' '}<Link className="text-saddleBrown text-base" href='#'>Privacy Policy</Link>{' '}and{' '}<Link className='text-saddleBrown text-base' href='#'>Terms of Service</Link>
              .</span>
            </div>

            <button className='btn block mt-4 bg-saddleBrown' disabled={isLoading}>{isLoading ? 'Processing...' : 'Signup'}</button>
          </form>
        </div>

  


        <div className='flex flex-col items-center md:grid-col-start-1 md:grid-row-start-2 md:col-span-2'>
          <p className='mb-8'>or Sign up using</p>
          <SocialButtons text={"Continue"} />
          <div className="mt-7">
            <p className='inline mt-8 pr-2'>Have an account?</p>
            <Link className='text-base text-saddleBrown' href='/login'>Login</Link>
          </div>
        </div>

      </div>
    );
  }


  export default Signup