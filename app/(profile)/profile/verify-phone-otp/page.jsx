import OtpForm from "../OtpForm"

const VerifyPhoneOtp = () => {
  return (
      <OtpForm 
          storageStr='phone'
          verificationType='phone_change'
          redirectUrl='/profile/edit-profile'
          subHeading='A verification code was sent to your email. Please enter the code below to complete your phone update.'
          successMessage='OTP verifcation was successful. Your phone number has been updated.'
      />
  )
}

export default VerifyPhoneOtp
