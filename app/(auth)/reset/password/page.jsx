"use client"

import Link from "next/link";
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
    setError('');
    async function getUser() {
      const supabase = createClientComponentClient();
      try {
        const {data: { user }, error } = await supabase.auth.getUser();
        if (error) {
          throw error;
        }
        if(user) {
          setUser({ ...user });
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(false);
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setIsLoading(false);
      setError('Passwords do not match');
    } else {
      const supabase = createClientComponentClient();
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setIsLoading(false);
        setError(error.message);
        return;
      } else {
        router.push('/confirmation');
      }
    }
  };

  if (loading) {
    return (
      <main className='mb-4.5'>
        <div className="flex items-center justify-center text-center min-h-custom-md"> 
            <h2 className='pb-4 subheading font-b text-hint'>Please wait...</h2>
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
                {error && <div className="error mt-2">* {error}</div>}
                {isLoading && <button className='btn block mt-3.5 bg-hint'>Processing...</button>}
                {!isLoading && <button className='btn block mt-3.5 bg-hint'>Reset</button>}
            </form>
          </div>
        </main>
      )} 

      {!user && (
        <main className='mb-4.5'>
          <div className="flex flex-col items-center justify-center text-center min-h-custom-md">
            <h2 className='pb-4 subheading font-b text-hint'>Unauthorised</h2>
            <p className='text-base leading-8'>Please login before attempting to reset your password. </p>
            <p className='text-base leading-8'>Go back to the <Link className="text-base text-hint" href="/login">Login</Link> page</p>
          </div>
        </main>
      )}
    </>
  )
}

export default UpdatePassword
