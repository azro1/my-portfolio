"use client"

import Link from "next/link";
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// custom hooks
import { useFetchUser } from "@/app/hooks/useFetchUser";
import { useUpdateMetadata } from "@/app/hooks/useUpdateMetadata";


const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [isFormLoading, setIsFormLoading] = useState(false)
  const [formError, setFormError] = useState(null)

  // custom hook to fetch user
  const { isLoading, user } = useFetchUser(true)

  // custom hook to update user metadata
  const { error: updateError, updateMetadata } = useUpdateMetadata()

  const router = useRouter()
  const supabase = createClientComponentClient()
//   console.log(user)





  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (!oldPassword) {
        setFormError('For security please enter your old password.')
        setTimeout(() => setFormError(null), 2000)
        return;

    } else if (!newPassword) {
        setFormError('Please enter a new password.')
        setTimeout(() => setFormError(null), 2000)
        return;

    } else if (newPassword.length < 6) {
        setFormError('Password should be at least 6 characters.');
        setTimeout(() => setFormError(null), 2000)
        return;

    } else if (newPassword === oldPassword) {
        setFormError('New password must be different from the old password.');
        setTimeout(() => setFormError(null), 2000);
        return;
    }






    try {
      const { error: signInWithOldPasswordError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: oldPassword
      })

      if (signInWithOldPasswordError) {
        throw new Error('Please double-check your old password and try again.')
      } 

      // if checks pass then proceed to use custom hook function to update password
      setIsFormLoading(true);
      const { error: updatePasswordError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updatePasswordError) {
        throw new Error('Failed to update password. Please try again.');
      } 

      // Successful update
        router.push('/profile/confirmation')
      
    } catch (error) {
        setIsFormLoading(false);
        setFormError(error.message)
        console.log(error.message)
      } finally {
        setTimeout(() => setFormError(null), 2000)
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
      {!user && (
        <main className='mb-4.5'>
          <div className="flex flex-col items-center justify-center text-center min-h-custom-md">
            <h2 className='pb-4 subheading font-b text-hint'>Unauthorised</h2>
            <p className='text-base leading-8'>Please <Link className="text-base text-hint" href="/login">Login</Link> before attempting to reset your password.</p>
          </div>
        </main>
      )}

      {user && (
        <main className="mb-4.5">
          <div className="flex items-center justify-center min-h-custom-md">
            <form className="w-full max-w-sm mx-auto md:col-span-2" onSubmit={handleSubmit}>
              <h2 className='pb-2 subheading font-eb text-hint'>New Reset Password Page</h2>
              <label>
                <span className='mt-4 mb-2 text-sm font-os text-secondary block'>
                  Old Password
                </span>
                <input
                  className='w-full p-2.5 rounded-md'
                  type='password'
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </label>
              <label>
                <span className='mt-4 mb-2 text-sm font-os text-secondary block'>
                  New Password
                </span>
                <input
                  className='w-full p-2.5 rounded-md'
                  type='password'
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </label>
              {updateError && <div className="error mt-2">* {updateError}</div>}
              {formError && <div className="error mt-2">* {formError}</div>}
              <button className='btn block mt-3.5 bg-hint'>{isFormLoading ? 'Finalizing...' : 'Update'}</button>
            </form>
          </div>
        </main>
      )}
    </>
  )
}

export default UpdatePassword