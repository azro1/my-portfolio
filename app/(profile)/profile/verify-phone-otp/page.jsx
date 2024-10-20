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
      <OtpForm 
          contact='phone number'
          storageStr='phone'
          verificationType='phone_change'
          title='Verify Your Phone'
          subHeading={<>A verification code was sent to <strong> ****{converPhoneNumber(phoneNumber)}</strong>. Please enter the code below to complete your phone update.</>}
          successMessage='OTP verifcation was successful. Your phone number has been updated.'
      />
  )
}

export default VerifyPhoneOtp
