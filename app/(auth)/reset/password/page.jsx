"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


const UpdatePassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function getUser() {
      const supabase = createClientComponentClient()
      
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) {
          throw error
        }
        setUser({...user})
      } catch (err) {
         setError(err.message)
         setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    }
    getUser()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(false)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
    } else {
      const supabase = createClientComponentClient()
      const { error } = await supabase.auth.updateUser({
        password: password
      })
  
      if (error) {
        setError(error.message)
      }
  
      if (!error) {
        router.push('/confirmation')
      }
    }
  }

  if (isLoading) {
    return (
      <main className='mt-4.5 text-center'>
        <h2 className='pb-4 subheading font-b text-hint'>Loading...</h2>
      </main>
    )
  }

  return (
    <>
      {user && (
        <main className="mt-4.5 mb-56">
          <form className="w-full max-w-sm mx-auto md:col-span-2" onSubmit={handleSubmit}>
              <h2 className='pb-2 text-1.75xl font-rubik font-eb text-hint'>Reset Password</h2>
              <label>
                <span className='mt-4 mb-2 text-sm font-os text-secondary block'>
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
                <span className='mt-4 mb-2 text-sm font-os text-secondary block'>
                    Confirm Password
                </span>
                <input
                  className='w-full p-2.5 rounded-md'
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
      
              {error && <div className="error">* {error}</div>}
              <button className='btn block mt-4 bg-hint'>Reset</button>
          </form>
        </main>
      )} 

      {!user && (
        <main className='mt-4.5 text-center'>
          <h2 className='pb-4 subheading font-b text-hint'>Unauthorised</h2>
          <p className='text-base leading-8'>Please Login before attempting to reset your password.</p>
        </main>
      )}
    </>
  )
}

export default UpdatePassword
