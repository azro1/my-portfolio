import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// components
import ProfilePhoneOtpForm from "../../ProfilePhoneOtpForm"

const VerifyPhoneOtp = () => {
  const otpAccessBlocked = cookies().get('otpAccessBlocked')?.value === 'true';

  // redirect if otpAcessBlocked middleware cookie is present
  if (otpAccessBlocked) {
    redirect('/profile/edit-profile');
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <ProfilePhoneOtpForm
        contact='phone number'
        verificationType='phone_change'
        title='Update Phone'
        subHeading="For security enter the code we've sent to your new phone number"
        successMessage='OTP verifcation was successful. Your phone number has been updated.'
      />
    </div>
  )
}

export default VerifyPhoneOtp
