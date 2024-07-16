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
  const [formError, setFormError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormLoading(true);
    setFormError('');

    if (password !== confirmPassword) {
      setIsFormLoading(false);
      setFormError('Passwords do not match');
    } else {
      const supabase = createClientComponentClient();
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setIsFormLoading(false);
        setFormError(error.message)
        setTimeout(() => setFormError(''), 2000)
        console.log(error.message)
        return
      } else {
        router.push('/password-update-success-confirmation')
      }
    }
  }

  if (isLoading) {
    return (
      <main className='mb-4.5'>
        <div className="flex items-center justify-center min-h-custom-md"> 
          <img className="w-20" src="../../images/loading/loading.gif" alt="a loading gif" />
        </div>
      </main>
    )
  }

  return (
    <>
      {user && (
        <main className="mb-4.5">
          <div className="flex items-center justify-center min-h-custom-md">
            <form className="w-full max-w-sm mx-auto md:col-span-2" onSubmit={handleSubmit}>
              <h2 className='pb-2 subheading font-eb text-hint'>Reset Password</h2>
              <label>
                <span className='mt-4 mb-2 text-sm font-os text-secondary block'>
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
              <label>
                <span className='mt-4 mb-2 text-sm font-os text-secondary block'>
                  Confirm Password
                </span>
                <input
                  className='w-full p-2.5 rounded-md'
                  type='password'
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
              {error && <div className="error mt-2">* {error}</div>}
              {formError && <div className="error mt-2">* {formError}</div>}
              {isFormLoading && <button className='btn block mt-3.5 bg-hint'>Processing...</button>}
              {!isFormLoading && <button className='btn block mt-3.5 bg-hint'>Reset</button>}
            </form>
          </div>
        </main>
      )}

      {!user && (
        <main className='mb-4.5'>
          <div className="flex flex-col items-center justify-center text-center min-h-custom-md">
            <h2 className='pb-4 subheading font-b text-hint'>Unauthorised</h2>
            <p className='text-base leading-8'>Please <Link className="text-base text-hint" href="/login">Login</Link> before attempting to reset your password.</p>
          </div>
        </main>
      )}
    </>
  )
}

export default UpdatePassword
