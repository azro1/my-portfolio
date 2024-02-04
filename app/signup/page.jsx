"use client"
import Link from "next/link"
import Icons from "../components/Icons"
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { useState } from "react"


const Signup = () => {
  const [firstname, setFirstname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isChecked, setIsChecked] = useState(false)

    return (
      <main className='my-16'>
        <div className='grid gap-y-14 md:gap-x-16 md:grid-cols-2 max-w-screen-lg mx-auto'>
          <form className=''>
            <h2 className='pb-2 subheading text-hint'>Sign up</h2>
            <label>
              <span className='max-w-min mt-4 mb-2 text-sm font-os text-secondary block'>
                Username
              </span>
              <input
                className="w-full p-3"
                type='text'
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </label>
            <label>
              <span className='max-w-min mt-4 mb-2 text-sm font-os text-secondary block'>
                Email
              </span>
              <input
                className="w-full p-3"
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
                className="w-full p-3"
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="mt-6 flex items-center">
              <input className="self-start mt-0.5 max-w-min" type="checkbox" value={isChecked} onChange={(e) => setIsChecked(e.target.value)}/>
              <p className="ml-2">I accept the{' '}<Link className="text-hint" href='#'>Privacy Policy</Link>{' '}and the{' '}<Link className='text-hint' href='#'>Terms of Service</Link>
              </p>
            </div>
            <button className='btn block mt-6 bg-hint'>Sign up</button>
          </form>


          <div className='flex flex-col items-center md:md:-mt-48 lg:col-start-1 lg:-mt-24'>
            <p className='mb-8'>or sign up using</p>
            <button className='btn block mb-3 bg-red-600 w-64 flex items-center justify-center'>
              <FaGoogle className="mr-2" size={24} />
              Continue with Google
            </button>
            <button className='btn block bg-blue-600 w-64 flex items-center justify-center'>
              <FaFacebook className="mr-2" size={24} />
              Continue with Facebook
            </button>
            <p className='mt-8'>
              Have an account?{' '}
              <Link className='text-hint' href='/login'>
                Login
              </Link>
            </p>
          </div>


          <div className="grid row-start-1 gap-y-6 md:col-start-2 md:w-full md:mt-44">
            <h2 className="text-1.75xl font-rubik font-eb text-secondary">
              Unlock <span className='text-hint'>CodeDynamic's</span> Creative
              Vault!
            </h2>
            <p className="text-justify leading-6">
              Uncover the secrets behind my web development and graphic design
              projects by signing up for exclusive content:
            </p>
            <p className="text-justify leading-6">
              🚀 Creative Process Unveiled: Get an inside look at the making of
              each project, from concept to completion.
            </p>
            <p className="text-justify leading-6">
              📬 Be the First to Know: Receive notifications on new projects and
              stay in the loop with the latest news and updates.
            </p>
            <p className="text-justify leading-6">
              Ready to dive in? Join now to elevate your understanding of design
              and development with CodeDynamics!
            </p>
          </div>

          <Icons values={"flex gap-x-5 md:h-4.75 place-content-center md:col-start-2 md:place-content-end md:items-end"} />
        </div>
      </main>
    );
  }
  
  export default Signup