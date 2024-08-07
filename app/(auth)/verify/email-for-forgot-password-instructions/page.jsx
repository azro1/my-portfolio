const VerifyEmailForForgotPassword = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-auth-page-height">
      <h2 className='pb-4 text-3xl font-b text-accentRed'>We've sent you an email!</h2>
      <p className='text-base leading-7'>To reset your password, please check your email for the verification link. Click on the link to proceed with resetting your password.</p>
    </div>
  )
}

export default VerifyEmailForForgotPassword