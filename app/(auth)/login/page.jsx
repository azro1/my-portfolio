"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// components
import SocialButtons from "../../components/SocialButtons";
import Icons from "../../components/Icons";



const Login = () => {
  const [email, setEmail] = useState('')
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

    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError(error.message)
    }

    if (!error) {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <main className='my-4.5'>
      <div className="grid gap-y-14 place-items-center max-w-screen-lg mx-auto">
        <form className="w-full max-w-sm md:col-span-2" onSubmit={handleSubmit}>
          <h2 className='mb-6 text-1.75xl font-rubik font-eb text-hint'>Login</h2>
          <label>
            <span className='max-w-min mb-2 text-sm font-os text-secondary block'>
              Email
            </span>
            <input
              className='w-full p-2.5 rounded-md'
              type='text'
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <div className="error">{error}</div>}

          <div className="mt-3 flex items-center justify-between">
            <div className="grid grid-col-2 place-items-center">
              <input className="max-w-min" type="checkbox" value={isChecked} onChange={handleCheckbox} />
              <p className="ml-2 col-start-2">Rememeber me</p>
            </div>
            <Link className="text-hint" href="/update/password">Forgot Password?</Link>
          </div>
          <button className='btn block mt-4 bg-hint'>Login</button>
        </form>
  
        <div className='flex flex-col text-center md:col-start-1 md:col-span-2'>
          <p className='mb-8'>or login using</p>
          <SocialButtons text={"Login"} />
          <p className='mt-8'>
            Don't have an account?{' '}
            <Link className='text-hint' href='/signup'>
              Sign Up
            </Link>
          </p>
        </div>

        <Icons values={"flex gap-x-5 md:col-start-2 md:row-start-3 md:place-self-end"} />

      </div>
    </main>
    
  );
};

export default Login;
