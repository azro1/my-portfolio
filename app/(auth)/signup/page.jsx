"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation";


// components
import SocialButtons from "../SocialButtons";


const Signup = () => {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()


  // check if a given string is a valid email address
  const isValidEmail = (value) => {
    const emailRegex = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', 'u');
    return emailRegex.test(value);
  };

  // regex for password validation
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;


  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // form validation
    if (!displayName) {
      setError('Please provide a name');
      setTimeout(() => setError(null), 2000)
      setIsLoading(false)
      return

    } else if (!email) {
        setError('To signup, please provide your email');
        setTimeout(() => setError(null), 2000)
        setIsLoading(false)
        return

    } else if (!isValidEmail(email)) {
        setError('Unable to validate email address: invalid format');
        setTimeout(() => setError(null), 2000)
        setIsLoading(false)
        return

    } else if (!password) {
        setError('Signup requires a valid password');
        setTimeout(() => setError(null), 2000)
        setIsLoading(false)
        return

    } else if (password.length < 8) {
        setError('Password should be at least 8 characters');
        setTimeout(() => setError(null), 2000)
        setIsLoading(false)
        return 

    } else if (!regex.test(password)) {
        setError('Password is invalid. Please check requirements')
        setTimeout(() => setError(null), 2000)
        setIsLoading(false)
        return 

    } else if (!isChecked) {
        setError('Please confirm you have agreed to the Privacy Policy and Terms of Service');
        setTimeout(() => setError(null), 2000)
        setIsLoading(false)
        return
    }

      const supabase = createClientComponentClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: displayName
          },
          emailRedirectTo: `${location.origin}/api/auth/callback`
        }
      })

      if (error) {
        setError(error.message)
        setTimeout(() => setError(null), 2000)
        setIsLoading(false);
      } 

      if (!error) {
        router.push('/verify/email-for-signup-instructions')
      }
  }

    return (
      <div className='max-w-screen-lg mx-auto grid gap-y-16 md:gap-x-8 md:grid-cols-2 mb-4.5'>

        <form onSubmit={handleSubmit} className="justify-self-center place-self-center w-full sm:max-w-sm md:max-w-xs">
          <h2 className='text-3xl mb-6 font-eb text-accentRed'>Sign up</h2>
          <label>
            <span className='max-w-max mb-2 text-base text-stoneGray block'>
              First Name
            </span>
            <input
              className="w-full p-2.5 rounded-md text-stoneGray shadow-inner bg-deepCharcoal border-2 border-stoneGray"
              type='text'
              spellCheck='false'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </label>
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
          <label>
            <span className='max-w-min mt-4 mb-2 text-base text-stoneGray block'>
              Password
            </span>
            <input
              className="w-full p-2.5 rounded-md text-stoneGray shadow-inner bg-deepCharcoal border-2 border-stoneGray"
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>


          <div className="mt-5 flex items-center">
            <input className="self-start mt-0.21 max-w-min transform scale-125" type="checkbox" value={isChecked} onChange={handleCheckbox}/>
            <span className="text-base block text-stoneGray ml-2.5 leading-7 -mt-1">By signing up I agree to the{' '}<Link className="text-accentRed text-base" href='#'>Privacy Policy</Link>{' '}and{' '}<Link className='text-accentRed text-base' href='#'>Terms of Service</Link>
            .</span>
          </div>
          <button className='btn block mt-4 bg-accentRed'>{isLoading ? 'Processing...' : 'Signup'}</button>
          <div className="mt-5 h-5 text-center">
              {error && <div className="error">{error}</div>}
          </div>
        </form>
        

        <div className='flex flex-col items-center md:grid-col-start-1 md:grid-row-start-2 md:col-span-2'>
          <p className='mb-8'>or Sign up using</p>
          <SocialButtons text={"Continue"} />
          <div className="mt-7">
            <p className='inline mt-8 pr-2'>Have an account?</p>
            <Link className='text-base text-accentRed' href='/login'>Login</Link>
          </div>
        </div>

        
        <div className="row-start-1 max-w-sm md:col-start-2 md:row-start-1 md:w-full text-stoneGray">
            <div className="md:mt-32">
              <p className="text-accentRed">Your password must:</p>
              <ul className="list-disc pl-5 mt-2">
                <li>Be at least 8 characters long</li>
                <li>Use at least one uppercase and one lowercase letter (a-z and A-Z)</li>
                <li>Use at least one number (0-9)</li>
                <li>Use at least one special character (! £ $ % & * @)</li>
                <li>Not be a commonly used password</li>
              </ul>
            </div>

          </div>
      </div>
    );
  }


  export default Signup