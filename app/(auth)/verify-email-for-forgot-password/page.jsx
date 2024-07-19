"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      setError('Please provide your email');
      setTimeout(() => setError(null), 2000)
      return;
    }
    
    setIsLoading(true)

    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/reset/forgot-password`
    })

    if (error) {
      setError(error.message)
      setTimeout(() => setError(null), 2000)
      setIsLoading(false)
    }

    if (!error) {
      router.push('/verify/email-for-forgot-password-instructions')
    }
  }

  return (
    <main>
      <div className="flex items-center justify-center h-auth-page-height">
          <form className="w-full max-w-sm mx-auto md:col-span-2" onSubmit={handleSubmit}>
              <h2 className='mb-5 text-3xl font-eb text-hint leading-normal'>Forgot Your Password?</h2>
              <p className='mb-6 leading-7' >Please enter your email address below, and we'll send you a link to reset your password. If you don't receive the email within a few minutes, check your spam folder or request a new one.</p>
              <label>
                <span className='text-base text-secondary mt-4 mb-2 block'>
                  Enter your email address
                </span>
                <input
                  className='w-full p-2.5 rounded-md'
                  spellCheck='false'
                  type='text'
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <button className='btn block mt-4 bg-hint'>{isLoading ? 'Processing...' : 'Submit'}</button>
              <div className="mt-5 h-5 text-center">
                {error && <div className="error">{error}</div>}
              </div>         
          </form>
       </div>
    </main>
  )
}

export default ResetPassword
