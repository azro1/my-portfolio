const VerifyEmailForSignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-auth-page-height">
      <h2 className='pb-4 text-3xl font-b text-accentRed'>Thanks for registering!</h2>
      <p className='leading-7'>To complete your registration, please check your email and click on the verification link we sent you. This will confirm your email address and activate your account. If you don't see the email, check your spam folder or request a new verification email.</p> 
    </div>  
  )
}

export default VerifyEmailForSignUp