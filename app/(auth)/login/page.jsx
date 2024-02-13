"use client"

import { useState } from "react";
import Link from "next/link";

// components
import SocialButtons from "../../components/SocialButtons";
import Icons from "../../components/Icons";

// metadata
export const metadata = {
  title: 'My Portfolio | Login',
  description: 'Log in to access exclusive content and manage your portfolio account.'
}

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email, password, isChecked)
  }

  return (
    <main className='my-36'>
      <div className="grid gap-y-14 place-items-center max-w-screen-lg mx-auto">
        <form className="w-full max-w-md md:col-span-2" onSubmit={handleSubmit}>
          <h2 className='pb-2 subheading text-hint'>Login</h2>
          <label>
            <span className='max-w-min mt-4 mb-2 text-sm font-os text-secondary block'>
              Email
            </span>
            <input
              className='w-full p-2.5'
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
              className='w-full p-2.5'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="flex items-center justify-between mt-5">
            <div className="grid grid-col-2 place-items-center">
              <input className="max-w-min" type="checkbox" value={isChecked} onChange={handleCheckbox} />
              <p className="ml-2 col-start-2">Rememeber me</p>
            </div>
            <Link className="text-hint" href="#">Forgot Password?</Link>
          </div>
          <button className='btn block mt-5 bg-hint'>Login</button>
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
