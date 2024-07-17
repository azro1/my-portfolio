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
    setIsLoading(true)

    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError(error.message)
      setTimeout(() => setError(null), 2000)
      setIsLoading(false)
    }

    if (!error) {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <main className='mt-4.5 md:mt-0 mb-4.5'>
      <div className="flex flex-col items-center justify-center gap-12 max-w-screen-lg mx-auto md:flex-row min-h-custom-md">
        <form className="w-full justify-self-center sm:max-w-xs md:justify-self-end" onSubmit={handleSubmit}>
          <h2 className='text-3xl mb-6 font-eb text-hint'>Login</h2>
          <label>
            <span className='max-w-min mb-2 text-base text-secondary block'>
              Email
            </span>
            <input
              className='w-full p-2.5 rounded-md'
              type='text'
              spellCheck='false'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span className='max-w-min mt-4 mb-2 text-base text-secondary block'>
              Password
            </span>
            <input
              className='w-full p-2.5 rounded-md'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="mt-4 flex justify-between items-start">
            <button className='btn bg-hint'>{isLoading ? 'Logging in...' : 'Login'}</button>
            <Link className="text-hint text-base -mt-1.5" href="/verify-email-for-forgot-password">Forgot Password?</Link>
          </div>
          <div className="mt-5 h-5 text-center">
             {error && <div className="error">{error}</div>}
          </div>
        </form>

        <div className='flex flex-col items-center md:col-start-2'>
          <p className='mb-8'>or Login using</p>
          <SocialButtons text={"Login"} />
          <div className="mt-7">
            <p className='mt-8 inline pr-2'>Don't have an account?</p>
            <Link className='text-hint text-base' href='/signup'>Sign up</Link>
          </div>

          
        </div>

      </div>
    </main>
  )
};
export default Login;
