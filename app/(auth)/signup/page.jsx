"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import disposableDomains from 'disposable-email-domains';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";


// custom hook to display global messages
import { useMessage } from "@/app/hooks/useMessage";

// components
import AuthForm from "../AuthForm";

// server actions
import { setEmail } from "@/app/actions";



// yup validation schema
const schema = yup.object({
  email: yup
    .string()
    .required('Email cannot be empty')
    .transform(value => value.trim().toLowerCase())
    .test('has-at-symbol', "Please include an '@' symbol", value => {
      return value ? value.includes('@') : true;
    })
    .email("Please use a valid domain, e.g., gmail.com")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid domain, e.g., gmail.com")
    .test('is-not-disposable', 'Disposable email addresses are not allowed', value => {
      if (value) {
        const domain = value.split('@')[1];  // Extract domain from email
        return !disposableDomains.includes(domain);  // Check if domain is in disposable list
      }
      return true;  // If no value, pass validation
    })
});





const Signup = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const router = useRouter()

  // global messages function
  const { changeMessage } = useMessage()


  
  // refresh is user navigates back from otp form 
  useEffect(() => {
    router.refresh();
  }, [router])



  // react-hook-form
  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit'
  })

  // allows us to register a form control
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  




  // checkbox input
  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked)
  }




  const onSubmit = async (data) => {

    // checkbox validation
    if (!isChecked) {
      changeMessage('error', 'You need to agree to our privacy policy and terms of service before signing up');
      return;
    }

    setIsLoading(true)
    const email = data.email;


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

      // await json response from server and store in const emailResponse
      const emailResponse = await res.json()
      const { accountStatus } = emailResponse;

      if (emailResponse === undefined || emailResponse === null) {
         throw new Error('server email does not exist.');
         
      } else if (emailResponse.error) {
        setIsLoading(false)
        changeMessage('error', emailResponse.error)
        return

      } else if (res.status === 401) {
        setIsLoading(false);
        changeMessage('error', `To prevent spam and abusive behavior cooldown is active. You must wait ${emailResponse.minutesLeft}m ${emailResponse.secondsLeft}s before you can request a new verification code.`)
      
      } else if (emailResponse.exists && res.status === 409 && accountStatus.is_verified) {
        setIsLoading(false)
        changeMessage('error', 'It looks like this email is already linked to an account. Please log in instead.')
        return

      } else if ((!emailResponse.exists && res.status === 200) || (emailResponse.exists && res.status === 200 && !accountStatus.is_verified)) {

        // store email in redis
        await setEmail(email);

        const supabase = createClientComponentClient()
        const { error } = await supabase.auth.signInWithOtp({
          email
        })

        if (error) {
          throw new Error(error.message);
        } else {
          changeMessage('success', 'A verifcation code has been sent to your email address');
          router.push('/verify-signup-otp');
        }
      }
      
    } catch (error) {
        setIsLoading(false);
        changeMessage('error', 'An unexpected error occurred. Please try again later or contact support if the issue persists.');
        console.log('sign up error:', error.message)
    }
  }



  return (
    <AuthForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      title='Sign Up'
      register={register}
      errors={errors}
      isChecked={isChecked}
      handleCheckbox={handleCheckbox}
      isSignup={true}
      isLoading={isLoading}
    />
  );
}


  export default Signup