"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation";


// components
import Icons from "../../components/Icons"
import SocialButtons from "../SocialButtons";


const Signup = () => {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
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
      setIsLoading(false)
    }

    if (!error) {
      router.push('/verify/email')
    }
  }

    return (
      <main className='mt-4.5 mb-28'>
        <div className='max-w-screen-lg mx-auto relative grid gap-y-20 md:gap-x-16 md:grid-cols-2'>
          <form onSubmit={handleSubmit} className="w-full max-w-sm justify-self-center md:justify-self-center">
            <h2 className='mb-6 text-1.75xl font-rubik font-eb text-hint'>Sign up</h2>
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
            {error && <div className="error">* {error}</div>}

            <div className="mt-3 flex items-center">
              <input className="self-start mt-0.21 max-w-min" type="checkbox" value={isChecked} onChange={handleCheckbox}/>
              <span className="text-sm block text-secondary ml-2">I accept the{' '}<Link className="text-hint" href='#'>Privacy Policy</Link>{' '}and the{' '}<Link className='text-hint' href='#'>Terms of Service</Link>
              </span>
            </div>
            {isLoading && <button className='btn block mt-5 bg-hint'>Processing...</button>}
            {!isLoading && <button className='btn block mt-5 bg-hint'>Sign up</button>}
          </form>

          <div className='flex flex-col items-center md:absolute inset-0 top-96 md:mt-28 md:-left-26 lg:mt-24 lg:-left-32'>
            <span className='block text-secondary text-base mb-8'>or sign up using</span>
            <SocialButtons text={"Continue"} />
            <span className='block text-secondary text-base mt-8'>
              Have an account?{' '}
              <Link className='text-base text-hint' href='/login'>
                Login
              </Link>
            </span>
          </div>

          <div className="grid row-start-1 gap-y-6 max-w-sm justify-self-center md:col-start-2 md:w-full md:mt-44">
            <h2 className="text-1.75xl font-rubik font-eb text-secondary leading-normal">
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
          <Icons values={"flex gap-x-5 md:h-4.75 place-content-center md:col-start-2 md:place-content-end md:items-end"} />
        </div>
      </main>
    );
  }
  
  export default Signup