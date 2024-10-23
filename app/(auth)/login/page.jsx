"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// custom hook to display global messages
import { useMessage } from "@/app/hooks/useMessage";

// components
import SocialButtons from "../SocialButtons";

const Login = () => {
  const [tempEmail, setTempEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // global messages function
  const { changeMessage } = useMessage()


  useEffect(() => {
    router.refresh();
    // clear cookie from server if user navigates back to this page so they have to enter email again to get new otp
    document.cookie = "canAccessOtpPage=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }, [router]);
  

  // check if a given string is a valid email address
  const isValidEmail = (value) => {
    const emailRegex = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', 'u');
    return emailRegex.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!tempEmail.trim()) {
      changeMessage('error', 'Please enter your email address to continue.');
      return
    } else if (!isValidEmail(tempEmail)) {
      changeMessage('error', "Hmm, that doesn't look like a valid email. Double-check and try again.");
      return
    }

    setIsLoading(true)
    // convert email to lowercase
    const email = tempEmail.toLowerCase();



    // send email to server endpoint to check if email already exists within profiles table
    try {
      const res = await fetch(`${location.origin}/api/auth/email-exists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          type: 'login'
        })
      })
     
      // await json response from server and store in const serverEmail
      const serverEmail = await res.json()
      const { accountStatus } = serverEmail;

      if (serverEmail === undefined || serverEmail === null) {
         throw new Error('server email does not exist.');
         
      } else if (serverEmail.error) {
        setIsLoading(false)
        changeMessage('error', serverEmail.error)
        return

      } else if ((!serverEmail.exists && res.status === 404) || (serverEmail.exists && res.status === 401 && !accountStatus.is_verified)) {
        setIsLoading(false)
        changeMessage('error', "We couldn't find an account with that email. Please sign up or check your email for typos.")
        return

      } else if ((serverEmail.exists && res.status === 200 && accountStatus.is_verified)) {
        
        // store email temporarily in local storage
        localStorage.setItem('email', email);

        const supabase = createClientComponentClient()
        const { error } = await supabase.auth.signInWithOtp({
          email
        })

        if (error) {
          throw new Error(error.message)
        }

        if (!error) {
          setIsLoading(false);
          router.push('/verify-login-otp')
        }
      }

    } catch (error) {
        setIsLoading(false);
        // clear cookie from server if there's an error
        document.cookie = "canAccessOtpPage=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        changeMessage('error', 'Oops! Something went wrong on our end. Please try again in a moment or contact support if the issue persists.');
        console.log('login error:', error.message)
    }

  }

  return (
    <div className='flex flex-col items-center md:justify-evenly md:flex-row md:h-auth-page-height'>

        <form className="w-full max-w-xs" onSubmit={handleSubmit}>
          <h2 className='text-3xl mb-6 font-eb text-saddleBrown'>Login</h2>
          <p className='mb-4'>Enter your email address to recieve a security code for quick and secure login</p>

          <label>
            <span className='max-w-min mb-2 text-base text-stoneGray block'>
              Email
            </span>
            <input
              className='w-full py-2.5 px-3 rounded-md text-black'
              type='text'
              placeholder='Enter your email'
              spellCheck={false}
              value={tempEmail}
              onChange={(e) => setTempEmail(e.target.value)}
            />
          </label>

          <div className="flex">
            <button className='mt-4 btn bg-saddleBrown' disabled={isLoading}>
              {isLoading ? (
                <div className='flex items-center gap-2'>
                  <img className="w-5 h-5 opacity-50" src="images/loading/spinner.svg" alt="Loading indicator" />
                  <span>Login</span>
                </div>
              ) : (
                'Login'
              )}
            </button>
            <Link className='ml-auto mt-2' href={'/forgot-email'}>
              <span className='text-saddleBrown text-base'>Forgot email?</span>
            </Link>
          </div>
        </form>

      <div className='flex flex-col items-center mb-4.5 md:col-start-2 md:mb-0'>
        <p className='mb-8'>or Login using</p>
        <SocialButtons text={"Login"} />
        <div className="mt-7">
          <p className='mt-8 inline pr-2'>Don't have an account?</p>
          <Link className='text-saddleBrown text-base' href='/signup'>Sign up</Link>
        </div>
      </div>
    </div>
  )
};
export default Login;
