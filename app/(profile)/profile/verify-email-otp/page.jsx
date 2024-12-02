"use client"

import { useEffect, useRef } from "react";

// components
import ProfileEmailOtpForm from "../ProfileEmailOtpForm"


const VerifyEmailOtp = () => {

    const emailRef = useRef(null);

    useEffect(() => {
       const userEmail = localStorage.getItem('email');
       if (userEmail) {
          emailRef.current = userEmail;
          localStorage.removeItem('email')
       }
    }, [])

    return (
        <div className='flex items-center justify-center min-h-[580px]'>
            <ProfileEmailOtpForm
                contact='email address'
                verificationType='email_change'
                title='Update Email'
                subHeading='Enter the code we sent to your email address to complete the update'
                successMessage='OTP verifcation was successful. Your email address has been updated.'
                profileEmailRef={emailRef}
            />
        </div>
    )
}

export default VerifyEmailOtp

