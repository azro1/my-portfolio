"use client"

import Link from "next/link";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// custom hooks
import { useFetchUser } from "@/app/hooks/useFetchUser";


const UpdatePassword = () => {
  // custom hook to fetch user
  const { user, error, isLoading } = useFetchUser(true)
  
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isFormLoading, setIsFormLoading] = useState(false)
  const [formError, setFormError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [redirect, setRedirect] = useState(false);

  const router = useRouter()


  // regex for password validation
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setFormError('Please enter your new password');
      setTimeout(() => setFormError(null), 2000)
      return

    } else if (password.length < 8) {
      setFormError('Password should be at least 8 characters');
      setTimeout(() => setFormError(null), 2000)
      return

    } else if (!regex.test(password)) {
      setFormError('Password is invalid. Please check requirements')
      setTimeout(() => setFormError(null), 2000)
      return 
    } 
      else if (password !== confirmPassword) {
      setFormError('Passwords do not match')
      setTimeout(() => setFormError(null), 2000)
      return;

    } else {
      setIsFormLoading(true);
      const supabase = createClientComponentClient();
      const { error } = await supabase.auth.updateUser({
        password
      })

      if (error) {
        setIsFormLoading(false);
        setFormError(error.message)
        setTimeout(() => setFormError(null), 8000)
        return
      } else {
        setSuccessMsg('Resetting password...')
        setRedirect(true);
      }
    }
  }


  useEffect(() => {
    if (redirect) {
        router.push('/password-update-success-confirmation');
    }
  }, [redirect, router])


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-auth-page-height"> 
        <img className="w-32" src="../../images/loading/loading.gif" alt="a loading gif" />
      </div>
    )
  }

  return (
    <>
      {user && (
        <div className="flex flex-col-reverse justify-center gap-12  md:h-auth-page-height md:flex-row md:gap-8">
        
            <form className="w-full max-w-xs mx-auto md:justify-self-center md:place-self-center" onSubmit={handleSubmit}>
              <h2 className='text-3xl font-eb text-accentRed'>Create a password</h2>
              <label>
                <span className='mt-6 mb-2 text-base text-stoneGray block'>
                  Password
                </span>
                <input
                  className='w-full p-2.5 rounded-md'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <label>
                <span className='mt-4 mb-2 text-base text-stoneGray block'>
                  Confirm Password
                </span>
                <input
                  className='w-full p-2.5 rounded-md'
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
              <button className='btn block mt-4 bg-accentRed'>{isFormLoading ? 'Processing...' : 'Reset'}</button>
              <div className="mt-5 h-5 text-center">
                {error && <div className="error">{error}</div>}
                {successMsg && <div className="success">{successMsg}</div>}
                {formError && <div className="error">{formError}</div>}
              </div>
            </form>


            <div className="w-full max-w-xs mx-auto text-stoneGray md:max-w-max md:mt-20">
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
      )}

      {!user && (
        <div className="flex flex-col items-center justify-center text-center h-auth-page-height">
          <h2 className='pb-4 text-3xl font-b text-accentRed'>Unauthorised</h2>
          <p className='text-base leading-7'>Please <Link className="text-base text-accentRed" href="/login">Login</Link> before attempting to reset your password.</p>
        </div>
      )}
    </>
  )
}

export default UpdatePassword
