"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import disposableDomains from 'disposable-email-domains';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";


// custom hook to display global messages
import { useMessage } from "@/app/hooks/useMessage";

// components
import AuthForm from "../../AuthForm";

// server actions
import { deleteCanAccessAuthOtpPageCookie } from "../actions";
import { deleteOtpAccessBlockedCookie } from "@/app/actions";






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








const Login = () => {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  
  // global messages function
  const { changeMessage } = useMessage()







  // react-hook-form
  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit'
  })

  // allows us to register a form control
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;






  const onSubmit = async (data) => {

    const email = data.email;
    
    // send email to server endpoint to check if email already exists within profiles table
    try {
      setIsLoading(true)

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
          await deleteOtpAccessBlockedCookie();
          router.push('/auth/verify-login-otp');

          // set flag to indicate user has visited auth otp page
          localStorage.setItem("hasVisitedAuthOtpPage", "true");
        }
      }

    } catch (error) {
        setIsLoading(false);
        await deleteCanAccessAuthOtpPageCookie();
        localStorage.removeItem('email');
        localStorage.removeItem("hasVisitedAuthOtpPage");
        changeMessage('error', 'Oops! Something went wrong on our end. Please try again in a moment or contact support if the issue persists.');
        console.log('login error:', error.message)
    }

  }




  return (
    <AuthForm
       handleSubmit={handleSubmit}
       onSubmit={onSubmit}
       title='Login'
       subHeading='Enter your email address to recieve a security code for quick and secure login'
       register={register}
       errors={errors}
       isSignup={false}
       isLoading={isLoading}
    />
  )
};
export default Login;
