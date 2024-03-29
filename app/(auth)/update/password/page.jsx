"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/reset/password`
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
    }

    if (!error) {
      router.push('/verify/password')
    }
  }

  return (
    <main className="h-screen">
      <form className="mt-4.5 w-full max-w-sm mx-auto md:col-span-2" onSubmit={handleSubmit}>
          <h2 className='mb-5 text-1.75xl font-rubik font-eb text-hint'>Confirm your email</h2>
          <label>
            <span className='text-sm font-os text-secondary'>
               Please enter your email address
            </span>
            <input
              className='w-full p-2.5 rounded-md mt-3'
              spellCheck='false'
              type='text'
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          {error && <div className="error">* {error}</div>}

          {isLoading && <button className='btn block mt-4 bg-hint'>Processing...</button>}
          {!isLoading && <button className='btn block mt-4 bg-hint'>Submit</button>}
       </form>
    </main>
  )
}

export default ResetPassword
