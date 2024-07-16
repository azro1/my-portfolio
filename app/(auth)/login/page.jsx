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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
    }

    if (!error) {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <main className='mt-4.5 md:mt-0 mb-4.5'>
      <div className="flex flex-col items-center justify-center min-h-custom-md gap-12 max-w-screen-lg mx-auto md:flex-row">
        <form className="w-full relative justify-self-center sm:max-w-xs md:justify-self-end" onSubmit={handleSubmit}>
          <h2 className='subheading mb-5 font-eb text-hint'>Login</h2>
          <label>
            <span className='max-w-min mb-2 text-sm font-os text-secondary block'>
              Email
            </span>
            <input
              className='w-full p-2.5 rounded-md'
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
              className='w-full p-2.5 rounded-md'
              type='password'
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <div className="error mt-2">* {error}</div>}
          <div>
            {isLoading && <button className='btn mt-3.5 bg-hint'>Processing...</button>}
            {!isLoading && <button className='btn mt-3.5 bg-hint'>Login</button>}
          </div>
          <Link className="text-hint absolute right-0 top-56" href="/verify-email-for-forgot-password">Forgot Password?</Link>
        </form>

        <div className='flex flex-col items-center md:col-start-2'>
          <p className='text-sm mb-8'>or login using</p>
          <SocialButtons text={"Login"} />
          <p className='mt-8'>
            Don't have an account?{' '}
            <Link className='text-hint' href='/signup'>
              Sign Up
            </Link>
          </p>
        </div>

      </div>
    </main>
  )
};
export default Login;
