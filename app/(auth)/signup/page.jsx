"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";


// components
import SocialButtons from "../SocialButtons";


const Signup = () => {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [error, setError] = useState('')
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
    setError('')
    setIsLoading(true)

    // form validation
    if (!displayName) {
      setError('Please provide a name.');
      setIsLoading(false)
      return

    } else if (!email) {
        setError('To signup, please provide your email.');
        setIsLoading(false)
        return

    } else if (!isValidEmail(email)) {
        setError('Unable to validate email address: invalid format.');
        setIsLoading(false)
        return

    } else if (!password) {
        setError('Signup requires a valid password.');
        setIsLoading(false)
        return

    } else if (password.length < 6) {
        setError('Password should be at least 6 characters.');
        setIsLoading(false)
        return

    } else if (!isChecked) {
        setError('Please confirm you have agreed to the Privacy Policy and Terms of Service.');
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
        setIsLoading(false);
      } 

      if (!error) {
        router.push('/verify')
      }
  }

    return (
      <main className='my-4.5 md:mt-6.25'>
        <div className='max-w-screen-lg mx-auto grid gap-y-16 md:gap-x-8 md:grid-cols-2'>

          <form onSubmit={handleSubmit} className="justify-self-center place-self-center w-full sm:max-w-xs">
            <h2 className='subheading mb-5 font-eb text-hint'>Sign up</h2>
            <label>
              <span className='max-w-min mb-2 text-sm font-os text-secondary block'>
                Name
              </span>
              <input
                className="w-full p-2.5 rounded-md"
                type='text'
                placeholder="Name"
                spellCheck='false'
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </label>
            <label>
              <span className='max-w-min mt-4 mb-2 text-sm font-os text-secondary block'>
                Email
              </span>
              <input
                className="w-full p-2.5 rounded-md"
                type='text'
                placeholder="Email"
                spellCheck='false'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              <span className='max-w-min mt-4 mb-2 text-sm font-os text-secondary block'>
                Password
              </span>
              <input
                className="w-full p-2.5 rounded-md"
                type='password'
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {error && <div className="error mt-2">* {error}</div>}

            <div className="mt-2.5 flex items-center">
              <input className="self-start mt-0.21 max-w-min" type="checkbox" value={isChecked} onChange={handleCheckbox}/>
              <span className="text-sm block text-secondary ml-2">I accept the{' '}<Link className="text-hint" href='#'>Privacy Policy</Link>{' '}and the{' '}<Link className='text-hint' href='#'>Terms of Service</Link>
              </span>
            </div>
            {isLoading && <button className='btn block mt-4 bg-hint'>Processing...</button>}
            {!isLoading && <button className='btn block mt-4 bg-hint'>Sign up</button>}
          </form>
          

          <div className='flex flex-col items-center md:grid-col-start-1 md:grid-row-start-2 md:col-span-2'>
            <span className='block text-secondary text-base mb-8'>or sign up using</span>
            <SocialButtons text={"Continue"} />
            <span className='block text-secondary text-base mt-8'>
              Have an account?{' '}
              <Link className='text-base text-hint' href='/login'>
                Login
              </Link>
            </span>
          </div>

          <div className="grid row-start-1 max-w-sm gap-4  justify-self-center md:col-start-2 md:row-start-1 md:w-full md:h-64 ">
            <h2 className="subheading font-rubik font-eb text-secondary leading-normal mb-1 md:mb-0">
              Unlock <span className='text-hint'>CodeDynamic's</span> Creative
              Vault!
            </h2>
            <span className="block text-secondary text-sm font-os text-justify leading-6">
              Uncover the secrets behind my web development and graphic design
              projects by signing up for exclusive content:
            </span>
            <span className="block text-secondary text-sm font-os text-justify leading-6">
              🚀 Creative Process Unveiled: Get an inside look at the making of
              each project, from concept to completion.
            </span>
            <span className="block text-secondary text-sm font-os text-justify leading-6">
              📬 Be the First to Know: Receive notifications on new projects and
              stay in the loop with the latest news and updates.
            </span>
            <span className="block text-secondary text-sm font-os text-justify leading-6">
              Ready to dive in? Join now to elevate your understanding of design
              and development with CodeDynamics!
            </span>
          </div>
        </div>
      </main>
    );
  }


  export default Signup