"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

// custom hooks
import { useFetchUser } from '@/app/hooks/useFetchUser';
import { useUpdate } from '@/app/hooks/useUpdate';

const Confirm = () => {
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
    <div className="flex flex-col items-center justify-start gap-8 min-h-custom-md max-w-lg mx-auto">
      <p className='text-base leading-8'>Thanks for your comfirmation. You're email has been updated. Please enter your password to confirm the change.</p>

      <form className="w-full max-w-sm mr-auto md:col-span-2" onSubmit={handleSubmit}>
        <h2 className='pb-2 subheading font-eb text-hint'>Enter Your Password</h2>
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
        {successMsg && <div className='success mt-2'>* {successMsg}</div>}
        {tableError && <div className='error mt-2'>* {tableError}</div>}
        {error && <div className='error mt-2'>* {error}</div>}
        <button className='btn block mt-3.5 bg-hint'>
          {isLoading ? 'Processing...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default Confirm