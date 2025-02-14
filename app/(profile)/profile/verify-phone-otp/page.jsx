"use client"

import { useEffect, useRef } from "react";

// components
import ProfilePhoneOtpForm from "../../ProfilePhoneOtpForm"


const VerifyPhoneOtp = () => {

  const phoneRef = useRef(null);

  useEffect(() => {
    const userPhone = localStorage.getItem('phone');
    
    if (userPhone) {
      phoneRef.current = userPhone;
      localStorage.removeItem('phone')
    }
  }, [])

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <ProfilePhoneOtpForm
        contact='phone number'
        verificationType='phone_change'
        title='Update Phone'
        subHeading="For security enter the code we've sent to your new phone number"
        successMessage='OTP verifcation was successful. Your phone number has been updated.'
        profilePhoneRef={phoneRef}
      />
    </div>
  )
}

export default VerifyPhoneOtp
