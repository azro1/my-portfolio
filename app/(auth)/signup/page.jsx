"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

// custom hook to display global messages
import { useMessage } from "@/app/hooks/useMessage";

// components
import SocialButtons from "../SocialButtons";


const Signup = () => {

  const [tempEmail, setTempEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
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

  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked)
  }




  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // form validation
    if (!tempEmail.trim()) {
      changeMessage('error', 'Please enter your email address to proceed.');
      return;
    } else if (!isValidEmail(tempEmail)) {
      changeMessage('error', "That doesn't look like a valid email. Please check and try again.");
      return;
    } else if (!isChecked) {
      changeMessage('error', 'You need to agree to our privacy policy and terms of service before signing up.');
      return;
    }

    setIsLoading(true)
    // convert email to lowercase
    const email = tempEmail.toLowerCase();


    // sent email to server endpoint to check if email already exists within profiles table
    try {
      const res = await fetch(`${location.origin}/api/auth/email-exists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          type: 'signup'

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

      } else if (serverEmail.exists && res.status === 409 && accountStatus.is_verified) {
        setIsLoading(false)
        changeMessage('error', 'It looks like this email is already linked to an account. Please log in instead.')
        return

      } else if ((!serverEmail.exists && res.status === 200) || (serverEmail.exists && res.status === 200 && !accountStatus.is_verified)) {

        // store email temporarily in local storage
        localStorage.setItem('email', email);

        const supabase = createClientComponentClient()
        const { error } = await supabase.auth.signInWithOtp({
          email
        })

        if (error) {
          throw new Error(error.message);
        } else {
          setIsLoading(false);
          router.push('/verify-signup-otp')
        }
      }
      
    } catch (error) {
        setIsLoading(false);
        // clear cookie from server if there's an error
        document.cookie = "canAccessOtpPage=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        changeMessage('error', 'An unexpected error occurred. Please try again later or contact support if the issue persists.');
        console.log('sign up error:', error.message)
    }
  }





    return (
      <div className='flex flex-col items-center justify-center gap-12 md:justify-evenly md:flex-row md:gap-0 h-[70vh]'>

          <form className="w-full max-w-xs" onSubmit={handleSubmit} >
            <h2 className='text-3xl mb-6 font-eb text-saddleBrown'>Sign up</h2>
            <p className='mb-4'>Enter your email address to recieve a security code to create your account</p>
            
            <label>
              <span className='max-w-min mt-4 mb-2 text-base text-ashGray block'>
                Email
              </span>
              <input
                className='w-full py-2.5 px-3 rounded-md text-black'
                type='text'
                spellCheck={false}
                placeholder='Enter your email'
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
              />
            </label>

            <div className="mt-5 flex items-center">
              <input className="self-start mt-0.21 max-w-min transform scale-125" type="checkbox" value={isChecked} onChange={handleCheckbox}/>
              <span className="text-base block text-ashGray ml-2.5 -mt-1">By signing up I agree to the{' '}<Link className="text-saddleBrown text-base" href='#'>Privacy Policy</Link>{' '}and{' '}<Link className='text-saddleBrown text-base' href='#'>Terms of Service</Link>
              .</span>
            </div>

            <button className='btn block mt-4 bg-saddleBrown' disabled={isLoading}>
              {isLoading ? (
                <div className='flex items-center gap-2'>
                  <img className="w-5 h-5 opacity-50" src="images/loading/spinner.svg" alt="Loading indicator" />
                  <span>Signup</span>
                </div>
              ) : (
                'Signup'
              )}
            </button>
          </form>

  
        <div className='flex flex-col items-center md:grid-col-start-1 md:grid-row-start-2 md:col-span-2'>
          <p className='mb-8'>or Sign up using</p>
          <SocialButtons text={"Continue"} />
          <div className="mt-7">
            <p className='inline mt-8 pr-2'>Have an account?</p>
            <Link className='text-base text-saddleBrown' href='/login'>Login</Link>
          </div>
        </div>

      </div>
    );
  }


  export default Signup