"use client"

import { useState, useEffect } from "react"

// components
import OtpForm from "../OtpForm"


const VerifyPhoneOtp = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
     const phone = localStorage.getItem('phone')
     setPhoneNumber(phone)
  }, [])

  const converPhoneNumber = (phone) => {
    if (phone) {
      return phone.slice(-4);
    }
    return ''
  }

  return (
    <div className='flex items-center justify-center h-[90vh]'>
      <OtpForm
        contact='phone number'
        storageStr='phone'
        verificationType='phone_change'
        title='Verify Your Phone'
        subHeading={<>We've sent a verification code to your number ending in <strong> ****{converPhoneNumber(phoneNumber)}</strong>. Please enter the code below to complete your phone update.</>}
        successMessage='OTP verifcation was successful. Your phone number has been updated.'
      />
    </div>
  )
}

export default VerifyPhoneOtp
