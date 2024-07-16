import React from 'react'

const VerifyEmailForSignUp = () => {
  return (
    <main className='mb-4.5'>
      <div className="flex flex-col items-center justify-center text-center min-h-custom-md">
        <h2 className='pb-4 subheading font-b text-hint'>Thanks for registering!</h2>
        <p className='text-base leading-8'>To complete your registration, please check your email and click on the verification link we sent you. This will confirm your email address and activate your account. If you don't see the email, check your spam folder or request a new verification email.</p> 
      </div>  
    </main>
  )
}

export default VerifyEmailForSignUp
