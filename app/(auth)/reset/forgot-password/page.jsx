"use client"

import Link from "next/link";
import { useState } from "react"
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
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setFormError('Please enter your new password');
      setTimeout(() => setFormError(null), 2000)
      return;
    } else if (password !== confirmPassword) {
      setFormError('Passwords do not match')
      setTimeout(() => setFormError(null), 2000)
      return;
    } else {
      setIsFormLoading(true);
      const supabase = createClientComponentClient();
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setIsFormLoading(false);
        setFormError(error.message)
        setTimeout(() => setFormError(null), 2000)
        return
      } else {
        setSuccessMsg('Resetting your password...')
        setTimeout(() => {
          router.push('/password-update-success-confirmation')
        }, 2000)
      }
    }
  }

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
        <div className="flex items-center justify-center h-auth-page-height">
          <form className="w-full max-w-sm mx-auto md:col-span-2" onSubmit={handleSubmit}>
            <h2 className='pb-2 text-3xl font-eb text-accentRed'>Reset Password</h2>
            <label>
              <span className='mt-4 mb-2 text-base text-secondary block'>
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
              <span className='mt-4 mb-2 text-base text-secondary block'>
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
