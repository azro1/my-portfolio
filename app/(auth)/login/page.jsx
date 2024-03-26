"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// components
import SocialButtons from "../SocialButtons";
import Icons from "../../components/Icons";



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
    <main className='my-4.5 md:mt-6.25'>
      <div className="grid gap-y-14 place-items-center max-w-screen-lg mx-auto">
        <form className="w-full sm:max-w-xs md:col-span-2 relative" onSubmit={handleSubmit}>
          <h2 className='mb-5 subheading text-hint'>Login</h2>
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

          {error && <div className="error">* {error}</div>}

          <div>
            {isLoading && <button className='btn mt-3.5 bg-hint'>Processing...</button>}
            {!isLoading && <button className='btn mt-3.5 bg-hint'>Login</button>}
          </div>
          <Link className="text-hint absolute right-0 top-56 pt-1" href="/update/password">Forgot Password?</Link>

        </form>
  
        <div className='flex flex-col items-center md:col-start-1 md:col-span-2'>
          <p className='text-sm mb-8'>or login using</p>
          <SocialButtons text={"Login"} />
          <p className='text-sm mt-8'>
            Don't have an account?{' '}
            <Link className='text-sm text-hint' href='/signup'>
              Sign Up
            </Link>
          </p>
        </div>

        <Icons values={"flex gap-x-5 md:col-start-2 md:row-start-3 md:place-self-end"} color={"#F6F9FF"} />

      </div>
    </main>
    
  );
};

export default Login;
