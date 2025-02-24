"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import disposableDomains from 'disposable-email-domains';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link"
import { useState, useEffect } from "react"
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





const Signup = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
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
          await deleteOtpAccessBlockedCookie();
          router.push('/auth/verify-signup-otp');

          // set flag to indicate user has visited auth otp page
          localStorage.setItem("hasVisitedAuthOtpPage", "true");
        }
      }
      
    } catch (error) {
        setIsLoading(false);
        await deleteCanAccessAuthOtpPageCookie();
        localStorage.removeItem('email');
        localStorage.removeItem("hasVisitedAuthOtpPage");
        changeMessage('error', 'An unexpected error occurred. Please try again later or contact support if the issue persists.');
        console.log('sign up error:', error.message)
    }
  }



  return (
    <AuthForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      title='Sign up'
      subHeading='Enter your email address to recieve a security code to create your account'
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