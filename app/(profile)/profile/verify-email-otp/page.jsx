import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// components
import ProfileEmailOtpForm from "../../ProfileEmailOtpForm";

const VerifyEmailOtp = () => {
  const otpAccessBlocked = cookies().get('otpAccessBlocked')?.value === 'true';

  // redirect if otpAcessBlocked middleware cookie is present
  if (otpAccessBlocked) {
    redirect('/profile/edit-profile');
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <ProfileEmailOtpForm
        contact='email address'
        verificationType='email_change'
        title='Update Email'
        subHeading='Enter the code we sent to your new email address to complete the update'
        successMessage='OTP verifcation was successful. Your email address has been updated.'
      />
    </div>
  )
}

export default VerifyEmailOtp

