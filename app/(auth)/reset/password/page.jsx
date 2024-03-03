"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


const UpdatePassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    setError('')
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
         setLoading(false)
      } finally {
        setLoading(false)
      }
    }
    getUser()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(false)
    setIsLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
    } else {
      const supabase = createClientComponentClient()
      const { error } = await supabase.auth.updateUser({
        password: password
      })
  
      if (error) {
        setError(error.message)
        setIsLoading(false)
      }
  
      if (!error) {
        router.push('/confirmation')
      }
    }
  }

  if (loading) {
    return (
      <main className='mt-4.5 text-center'>
        <h2 className='pb-4 subheading font-b text-hint'>Please wait...</h2>
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
              {error && <div className="error">* {error}</div>}
              {isLoading && <button className='btn block mt-4 bg-hint'>Processing...</button>}
              {!isLoading && <button className='btn block mt-4 bg-hint'>Reset</button>}
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
