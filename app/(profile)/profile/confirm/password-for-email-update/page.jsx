"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

// custom hooks
import { useFetchUser } from '@/app/hooks/useFetchUser';
import { useUpdate } from '@/app/hooks/useUpdate';

const ConfirmPasswordForEmailUpdate = () => {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [confirmationUrl, setConfirmationUrl] = useState('')
  const searchParams = useSearchParams()

  // custom hooks
  const { user } = useFetchUser()
  const { error: tableError, updateTable } = useUpdate()

  const supabase = createClientComponentClient()



  useEffect(() => {
    const url = searchParams.get('confirmation_url')
    setConfirmationUrl(url)
  }, [])



  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!password) {
      setError('Please enter your password.');
      setTimeout(() => setError(null), 2000)
      return;
    } else if (password.length < 6) {
      setError('Password should be at least 6 characters.');
      setTimeout(() => setError(null), 2000)
      return;
    } 

    try {
      setIsLoading(true)

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password,
      })

      if (signInError) {
        throw Error('Incorrect password. Please try again.')
      } else {
        setSuccessMsg('Password verified. Finalizing email update...')
        setTimeout(() => {
          window.location.href = confirmationUrl;
        }, 3000)
      }


      const newEmail = localStorage.getItem('newEmail')

      let tableData = {
        email: newEmail
      }

      updateTable(user, 'profiles', tableData, 'id') // pass in params to updateTable function from generic custom hook useUpdate to update profiles table
    
    } catch (error) {
      setError(error.message)
      setIsLoading(false)
      setTimeout(() => setError(null), 2000)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 min-h-custom-md max-w-lg mx-auto">
      <p className='leading-7'>Your email update is almost complete. Please enter your password to confirm the change.</p>
      <form className="w-full max-w-sm mr-auto md:col-span-2" onSubmit={handleSubmit}>
        <h2 className='pb-2 text-3xl font-eb text-hint'>Enter Your Password</h2>
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

        <button className='btn block mt-4 bg-hint'>
          {isLoading ? 'Processing...' : 'Submit'}
        </button>
        <div className="mt-5 h-5 text-center">
            {successMsg && <div className='success mt-2'>{successMsg}</div>}
            {tableError && <div className='error mt-2'>{tableError}</div>}
            {error && <div className='error mt-2'>{error}</div>}
        </div>
      </form>
    </div>
  )
}

export default ConfirmPasswordForEmailUpdate