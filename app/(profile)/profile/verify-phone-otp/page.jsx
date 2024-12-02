"use client"

import { useEffect, useRef } from "react";

// components
import ProfilePhoneOtpForm from "../ProfilePhoneOtpForm"


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
    <div className='flex items-center justify-center min-h-[580px]'>
      <ProfilePhoneOtpForm
        contact='phone number'
        verificationType='phone_change'
        title='Update Phone'
        subHeading='Enter the code sent to your new phone number to complete the update'
        successMessage='OTP verifcation was successful. Your phone number has been updated.'
        profilePhoneRef={phoneRef}
      />
    </div>
  )
}

export default VerifyPhoneOtp
